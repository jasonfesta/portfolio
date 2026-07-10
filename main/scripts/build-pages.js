#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const TEMPLATES_DIR = path.join(ROOT, "templates");
const CONTENT_DIR = path.join(ROOT, "content");
const DIST_DIR = path.join(ROOT, "dist");

function read(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function write(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content);
}

function parseJsonCodeFence(markdown) {
  const match = markdown.match(/```json\s*([\s\S]*?)```/i);
  if (!match || !match[1]) {
    throw new Error("Missing ```json code fence in markdown data file.");
  }
  return JSON.parse(match[1]);
}

function htmlEscape(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function videoMimeType(src) {
  return String(src || "").toLowerCase().endsWith(".webm") ? "video/webm" : "video/mp4";
}

function renderParagraphs(lines) {
  if (!Array.isArray(lines)) return "";
  return lines
    .map((line) => `<p>${htmlEscape(line)}</p>`)
    .join("\n");
}

function renderGridImages(items) {
  if (!Array.isArray(items) || items.length === 0) return "";
  return items
    .map((item) => {
      if (!item || !item.src) return "";
      const src = htmlEscape(item.src);
      const alt = htmlEscape(item.alt || "");
      const mediaType = String(item.type || "").toLowerCase();
      const inferredVideo = /\.(mp4|webm|mov)$/i.test(item.src);
      if (mediaType === "video" || inferredVideo) {
        return [
          '<video autoplay muted loop playsinline preload="metadata" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">',
          `  <source src="${src}" type="${videoMimeType(item.src)}" />`,
          "</video>",
        ].join("\n");
      }
      return `<img src="${src}" alt="${alt}" loading="lazy" />`;
    })
    .filter(Boolean)
    .join("\n");
}

function renderMediaSource(source, ariaLabel) {
  if (!source || typeof source !== "object" || !source.src) return "";
  const src = htmlEscape(source.src);
  const type = String(source.type || "").toLowerCase();
  const inferredVideo = /\.(mp4|webm|mov)$/i.test(source.src);
  if (type === "video" || inferredVideo) {
    return [
      '<video autoplay muted loop playsinline preload="metadata" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">',
      `  <source src="${src}" type="${videoMimeType(source.src)}" />`,
      "</video>",
    ].join("\n");
  }
  return `<img src="${src}" alt="${ariaLabel}" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;" />`;
}

function renderMediaBlock(media) {
  if (!media || typeof media !== "object") return "";
  const variant = String(media.variant || "bucket");
  const className = htmlEscape(media.class_name || "");
  const classes = (base) => (className ? `${base} ${className}` : base);
  const ariaLabel = htmlEscape(media.aria_label || "Media area");
  const inlineStyle = media.inline_style ? ` style="${htmlEscape(media.inline_style)}"` : "";

  if (variant === "grid") {
    return [
      `<div class="${classes("darwin-brand-grid")}" aria-label="${ariaLabel}"${inlineStyle}>`,
      renderGridImages(media.items),
      "</div>",
    ].join("\n");
  }

  if (variant === "asset" && (media.asset || media.source)) {
    const sourceMarkup = media.source
      ? renderMediaSource(media.source, ariaLabel)
      : `<img src="${htmlEscape(media.asset)}" alt="${ariaLabel}" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;" />`;
    return [
      `<div class="${classes("darwin-brief-bucket")}" aria-label="${ariaLabel}"${inlineStyle}>`,
      `  ${sourceMarkup}`,
      "</div>",
    ].join("\n");
  }

  return `<div class="${classes("darwin-brief-bucket")}" aria-label="${ariaLabel}"${inlineStyle}></div>`;
}

function renderSections(sections) {
  if (!Array.isArray(sections) || sections.length === 0) return "";
  return sections
    .map((section) => {
      if (!section || typeof section !== "object") return "";
      const heading = section.title
        ? `<h2${section.title_class ? ` class="${htmlEscape(section.title_class)}"` : ""}>${htmlEscape(section.title)}</h2>`
        : "";
      const body = renderParagraphs(section.paragraphs);
      const media = renderMediaBlock(section.media_area);
      return [heading, media, body].filter(Boolean).join("\n");
    })
    .filter(Boolean)
    .join("\n");
}

function renderMediaArea(area, label) {
  if (!area || typeof area !== "object") return "";
  const title = htmlEscape(label);
  const mode = String(area.mode || "gray_overlay");
  if (mode === "asset" && area.asset) {
    const asset = htmlEscape(area.asset);
    return [
      `<h2>${title}</h2>`,
      `<div class="darwin-brief-bucket ${htmlEscape(label.toLowerCase().replace(/\s+/g, "-"))}-card">`,
      `  <img src="${asset}" alt="${title}" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;" />`,
      `</div>`,
    ].join("\n");
  }
  return [`<h2>${title}</h2>`, `<div class="darwin-brief-bucket" aria-label="${title} gray media area"></div>`].join(
    "\n",
  );
}

function renderChannels(channels) {
  if (!Array.isArray(channels) || channels.length === 0) return "";
  const items = channels.map((ch) => `<li>${htmlEscape(ch)}</li>`).join("");
  return [`<h2>Channels</h2>`, `<ul class="project-channels">${items}</ul>`].join("\n");
}

function renderTeam(team) {
  if (!Array.isArray(team) || team.length === 0) return "";
  const items = team.map((member) => `<li>${htmlEscape(member)}</li>`).join("");
  return [`<h2>Team</h2>`, `<ul class="project-team">${items}</ul>`].join("\n");
}

function replaceTokens(template, replacements) {
  let output = template;
  Object.keys(replacements).forEach((token) => {
    output = output.split(`{{${token}}}`).join(replacements[token]);
  });
  return output;
}

function renderProjectBody(data) {
  if (Array.isArray(data.sections) && data.sections.length > 0) {
    return renderSections(data.sections);
  }
  return [
    "<h2>Overview</h2>",
    renderParagraphs(data.all_text),
    renderMediaArea(data.style_media_area, "Style Media Area"),
    renderMediaArea(data.design_media_area, "Design Media Area"),
    renderChannels(data.channels),
    renderMediaArea(data.system_media_area, "System Media Area"),
    renderTeam(data.team),
  ]
    .filter(Boolean)
    .join("\n");
}

function renderHomeCards(cards, basePath) {
  return (
    '<ul class="home-card-list">\n' +
    cards
      .map((card) => {
        const href = htmlEscape(`${basePath}/${card.slug}.html`);
        const cardLogo = card.card_logo
          ? `<img src="${htmlEscape(card.card_logo)}" alt="${htmlEscape(card.title || "Card logo")}" loading="lazy" style="width:20px;height:20px;object-fit:cover;border-radius:6px;" />`
          : "";
        return [
          '<li class="home-card-item">',
          `  <a href="${href}">`,
          `    <span class="home-card-date">${htmlEscape(card.date)}</span>`,
          `    <span class="home-card-title">${cardLogo}${cardLogo ? " " : ""}${htmlEscape(card.title)}</span>`,
          `    <span class="home-card-subtitle">${htmlEscape(card.subtitle)}</span>`,
          "  </a>",
          "</li>",
        ].join("\n");
      })
      .join("\n") +
    "\n</ul>"
  );
}

function renderHomeLinks(links) {
  return (
    '<ul class="home-link-list">\n' +
    links
      .map((link) => {
        return [
          '<li class="home-link-item">',
          `  <a href="${htmlEscape(link.url)}" target="_blank" rel="noopener noreferrer">`,
          `    <span>${htmlEscape(link.label)}</span>`,
          `    <span>${htmlEscape(link.handle || "")}</span>`,
          "  </a>",
          "</li>",
        ].join("\n");
      })
      .join("\n") +
    "\n</ul>"
  );
}

function loadProjectData(relativePath) {
  const md = read(path.join(ROOT, relativePath));
  return parseJsonCodeFence(md);
}

function hydrateCardsFromMd(cards) {
  if (!Array.isArray(cards)) return [];
  return cards.map((card) => {
    if (!card || !card.md_file) return card;
    const mdData = loadProjectData(card.md_file);
    return {
      ...card,
      date: mdData.date || card.date || "",
      title: mdData.title || card.title || "",
      subtitle: mdData.subtitle || mdData.summary || card.subtitle || "",
      card_logo: mdData.card_logo || card.card_logo || "",
    };
  });
}

function build() {
  const homeTemplate = read(path.join(TEMPLATES_DIR, "home.html"));
  const productTemplate = read(path.join(TEMPLATES_DIR, "product.html"));
  const contentTemplate = read(path.join(TEMPLATES_DIR, "content.html"));
  const homeData = parseJsonCodeFence(read(path.join(CONTENT_DIR, "site", "home.md")));

  const site = homeData.site || { title: "Portfolio", description: "Portfolio site" };

  // Build product pages.
  (homeData.product_cards || []).forEach((entry) => {
    const data = loadProjectData(entry.md_file);
    const page = replaceTokens(productTemplate, {
      "site.title": htmlEscape(site.title),
      "project.title": htmlEscape(data.title),
      "project.summary": htmlEscape(data.summary || ""),
      "project.main_video": htmlEscape(data.main_video || ""),
      "project.main_video_type": htmlEscape(videoMimeType(data.main_video || "")),
      "project.subtitle": htmlEscape(data.subtitle || ""),
      "project.all_text": renderProjectBody(data),
      "project.style_media_area": "",
      "project.design_media_area": "",
      "project.channels": "",
      "project.system_media_area": "",
      "project.team": "",
    });
    write(path.join(DIST_DIR, "products", `${entry.slug}.html`), page);
  });

  // Build content pages.
  (homeData.content_cards || []).forEach((entry) => {
    const data = loadProjectData(entry.md_file);
    const page = replaceTokens(contentTemplate, {
      "site.title": htmlEscape(site.title),
      "content.title": htmlEscape(data.title),
      "content.summary": htmlEscape(data.summary || ""),
      "content.main_video": htmlEscape(data.main_video || ""),
      "content.main_video_type": htmlEscape(videoMimeType(data.main_video || "")),
      "content.subtitle": htmlEscape(data.subtitle || ""),
      "content.all_text": renderProjectBody(data),
      "content.style_media_area": "",
      "content.design_media_area": "",
      "content.channels": "",
      "content.system_media_area": "",
      "content.team": "",
    });
    write(path.join(DIST_DIR, "content", `${entry.slug}.html`), page);
  });

  const hydratedProductCards = hydrateCardsFromMd(homeData.product_cards || []);
  const hydratedContentCards = hydrateCardsFromMd(homeData.content_cards || []);

  const homePage = replaceTokens(homeTemplate, {
    "site.title": htmlEscape(site.title),
    "site.description": htmlEscape(site.description),
    "home.hero_title": htmlEscape(homeData.hero_title || "Home"),
    "home.intro_line_1": htmlEscape((homeData.intro_copy || [])[0] || ""),
    "home.intro_line_2": htmlEscape((homeData.intro_copy || [])[1] || ""),
    "home.intro_line_3": htmlEscape((homeData.intro_copy || [])[2] || ""),
    "home.product_cards": renderHomeCards(hydratedProductCards, "/products"),
    "home.content_cards": renderHomeCards(hydratedContentCards, "/content"),
    "home.links": renderHomeLinks(homeData.links || []),
  });

  write(path.join(DIST_DIR, "home.html"), homePage);
  write(path.join(DIST_DIR, "index.html"), homePage);
}

build();
console.log("Built pages to dist/");
