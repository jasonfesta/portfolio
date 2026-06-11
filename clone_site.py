#!/usr/bin/env python3
import hashlib
import os
import posixpath
import re
from collections import deque
from html import unescape
from html.parser import HTMLParser
from pathlib import Path
from typing import Dict, List, Optional, Set, Tuple
from urllib.parse import urljoin, urlsplit, urlunsplit

import requests


START_URL = "https://www.sanjitjuneja.com/"
OUT_DIR = Path("sanjitjuneja-local")
USER_AGENT = "Mozilla/5.0 (compatible; LocalSiteCloner/1.0)"


def normalize_url(url: str) -> str:
    parts = urlsplit(url)
    scheme = parts.scheme or "https"
    netloc = parts.netloc.lower()
    path = parts.path or "/"
    if path != "/" and path.endswith("/"):
        path = path.rstrip("/")
    return urlunsplit((scheme, netloc, path, parts.query, ""))


def is_same_domain(url: str, origin_domain: str) -> bool:
    return urlsplit(url).netloc.lower() == origin_domain


def should_skip_url(url: str) -> bool:
    lower = url.lower()
    return (
        lower.startswith("mailto:")
        or lower.startswith("tel:")
        or lower.startswith("javascript:")
        or lower.startswith("data:")
        or lower.startswith("#")
    )


def ext_from_path(path: str) -> str:
    return posixpath.splitext(path)[1].lower()


def is_likely_html(url: str) -> bool:
    path = urlsplit(url).path
    ext = ext_from_path(path)
    if not ext:
        return True
    return ext in {".html", ".htm", ".php", ".asp", ".aspx", ".jsp"}


def extension_from_content_type(content_type: str) -> str:
    ct = (content_type or "").split(";")[0].strip().lower()
    mapping = {
        "image/webp": ".webp",
        "image/png": ".png",
        "image/jpeg": ".jpg",
        "image/gif": ".gif",
        "image/svg+xml": ".svg",
        "video/mp4": ".mp4",
        "video/webm": ".webm",
        "application/javascript": ".js",
        "text/javascript": ".js",
        "text/css": ".css",
    }
    return mapping.get(ct, "")


def local_path_for_url(url: str, content_type: str = "") -> Path:
    parts = urlsplit(url)
    path = parts.path or "/"
    if path.endswith("/"):
        path += "index.html"
    if path == "/":
        path = "/index.html"
    has_extension = bool(posixpath.splitext(path)[1])
    # Keep extensionless pages as directories with index.html unless content hints at binary asset.
    if not has_extension:
        ext = extension_from_content_type(content_type)
        if ext and "text/html" not in content_type.lower():
            base = path.rstrip("/") or "/resource"
            path = f"{base}{ext}"
        else:
            path = f"{path}/index.html"

    local = OUT_DIR / parts.netloc / path.lstrip("/")

    if parts.query:
        qhash = hashlib.md5(parts.query.encode("utf-8")).hexdigest()[:10]
        stem = local.stem
        suffix = local.suffix
        local = local.with_name(f"{stem}__q_{qhash}{suffix}")
    return local


class LinkCollector(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.links: List[Tuple[str, str]] = []

    def handle_starttag(self, tag: str, attrs: List[Tuple[str, Optional[str]]]) -> None:
        attr_map: Dict[str, str] = {k: v for k, v in attrs if v is not None}
        for name in ("href", "src", "poster", "data-src", "data-href"):
            if name in attr_map:
                self.links.append((name, attr_map[name]))

        if "srcset" in attr_map:
            raw = attr_map["srcset"]
            for part in raw.split(","):
                token = part.strip().split(" ")[0]
                if token:
                    self.links.append(("srcset", token))

        # Some sites preload CSS/JS via link rel=preload.
        if tag == "link" and "href" in attr_map:
            self.links.append(("href", attr_map["href"]))


def rewrite_html(html: str, page_url: str, mapping: Dict[str, Path]) -> str:
    replacements: Dict[str, str] = {}
    collector = LinkCollector()
    collector.feed(html)
    page_local = local_path_for_url(page_url)

    for _, raw in collector.links:
        if should_skip_url(raw):
            continue
        abs_url = urljoin(page_url, unescape(raw))
        abs_url = normalize_url(abs_url)
        if abs_url not in mapping:
            continue
        rel = os.path.relpath(mapping[abs_url], page_local.parent).replace(os.sep, "/")
        replacements[raw] = rel

    # Replace longest strings first to avoid partial collisions.
    expanded: Dict[str, str] = {}
    for old, new in replacements.items():
        expanded[old] = new
        if "&" in old:
            expanded[old.replace("&", "&amp;")] = new

    for old in sorted(expanded.keys(), key=len, reverse=True):
        html = html.replace(old, expanded[old])
    return html


def main() -> None:
    session = requests.Session()
    session.headers.update({"User-Agent": USER_AGENT})

    origin_domain = urlsplit(START_URL).netloc.lower()
    start = normalize_url(START_URL)

    queue: deque[str] = deque([start])
    seen: Set[str] = set()
    html_pages: Dict[str, str] = {}
    downloaded: Dict[str, Path] = {}

    while queue:
        current = queue.popleft()
        if current in seen:
            continue
        seen.add(current)

        try:
            resp = session.get(current, timeout=30)
            resp.raise_for_status()
        except Exception as exc:
            print(f"SKIP {current} ({exc})")
            continue

        content_type = resp.headers.get("content-type", "").lower()
        # Trust explicit response content-type first; only infer HTML when header is absent.
        as_html = "text/html" in content_type or (not content_type and is_likely_html(current))
        local = local_path_for_url(current, content_type)
        local.parent.mkdir(parents=True, exist_ok=True)

        if as_html:
            text = resp.text
            html_pages[current] = text
            downloaded[current] = local
            collector = LinkCollector()
            collector.feed(text)
            for _, raw in collector.links:
                if should_skip_url(raw):
                    continue
                abs_url = normalize_url(urljoin(current, unescape(raw)))
                if not is_same_domain(abs_url, origin_domain):
                    continue
                if abs_url not in seen:
                    queue.append(abs_url)
        else:
            local.write_bytes(resp.content)
            downloaded[current] = local
            print(f"ASSET {current} -> {local}")

    for url, html in html_pages.items():
        rewritten = rewrite_html(html, url, downloaded)
        out = downloaded[url]
        out.write_text(rewritten, encoding="utf-8")
        print(f"PAGE {url} -> {out}")

    print(f"Done. Downloaded {len(downloaded)} files.")
    print(f"Serve from: {OUT_DIR / origin_domain}")


if __name__ == "__main__":
    main()
