(function () {
  function createPost(post) {
    return {
      date: post.date,
      title: post.title,
      body: post.body,
      page: post.page,
      // Keep existing keys for backward-compatible rendering logic.
      description: post.body,
      href: post.page,
      videoSrc: post.videoSrc,
    };
  }

  var PRODUCT_POSTS = [
    createPost({
      date: "GTM",
      title: "Darwin (a16z)",
      body: "Figma, Cursor, Opus, Remotion, Fal",
      page: "/pages/products/darwin.html",
      videoSrc: "/assets/products/home-card-darwin.webm",
    }),
    createPost({
      date: "GTM",
      title: "Sogni",
      body: "Figma, Jitter, Kling, After Effects",
      page: "/pages/products/sogni-gtm.html",
      videoSrc: "/assets/products/home-card-sogni.webm",
    }),
    createPost({
      date: "GTM",
      title: "Wayve (a16z)",
      body: "Figma, Fal, Remotion",
      page: "/pages/products/wayve-gtm.html",
      videoSrc: "/assets/products/home-card-wayve.webm",
    }),
  ];

  var MOTION_POSTS = [
    createPost({
      date: "Social",
      title: "Rubbrband (Y Combinator)",
      body: "Fal, Cursor, Remotion, FFmpeg",
      page: "/pages/products/rubbrband-gtm.html",
      videoSrc: "/assets/products/home-card-rubbrband.webm?v=3",
    }),
    createPost({
      date: "UGC",
      title: "AI UGC",
      body: "Fal, Cursor, Remotion, FFmpeg",
      page: "/pages/products/ai-native-ugc.html",
      videoSrc: "/assets/products/home-card-ai-ugc.webm",
    }),
    createPost({
      date: "Influencer",
      title: "AI Ads",
      body: "Fal, Cursor, Remotion, FFmpeg",
      page: "/pages/products/darwin-ads-gtm.html",
      videoSrc: "/assets/products/home-card-ai-ads.webm",
    }),
    createPost({
      date: "Social",
      title: "OpenSea",
      body: "Veo, Hailuo, Udio, Figma, After Effects",
      page: "/pages/products/opensea-gtm.html",
      videoSrc: "/assets/products/home-card-opensea.webm",
    }),
  ];

  var SMALL_CAPS_BRAND_TITLES = {
    FIFA: true,
    NFL: true,
    Disney: true,
    Pixar: true,
    Neopets: true,
    "Coin Market Cap": true,
    Kraken: true,
  };

  var CONTENT = {
    projects: [
      {
        title: "Dmos",
        subtitle: "Autonomous growth operations platform.",
        href: "/pages/products/dmos-gtm.html",
      },
      {
        title: "Darwin",
        subtitle: "Multiplayer AI networks for brands and creators.",
        href: "/pages/products/darwin.html",
      },
      {
        title: "Wayve",
        subtitle: "A consumer iOS app for personalized AI video.",
        href: "/pages/products/wayve-gtm.html",
      },
      {
        title: "Sogni",
        subtitle: "Creative AI workflows for visual ideation.",
        href: "/pages/products/sogni-gtm.html",
      },
    ],
    productsShelf: PRODUCT_POSTS,
    portfolioTitles: [
      "Amazon MGM",
      "NFL",
      "FIFA",
      "Adobe",
      "Disney",
      "Pixar",
      "Coin Market Cap",
      "Kraken",
    ],
    portfolioItems: [
      {
        title: "Amazon MGM",
        subtitle: "2026",
        href: "",
        imageSrc: "/assets/images/brands/amazon-mgm.png?v=20260613c",
      },
      {
        title: "NFL",
        subtitle: "2023",
        href: "",
        imageSrc: "/assets/images/brands/nfl.png",
      },
      {
        title: "FIFA",
        subtitle: "2022",
        href: "",
        imageSrc: "/assets/images/brands/fifa.png",
      },
      {
        title: "Adobe",
        subtitle: "2021",
        href: "",
        imageSrc: "/assets/images/brands/adobe.png",
      },
      {
        title: "Disney",
        subtitle: "2015",
        href: "",
        imageSrc: "/assets/images/brands/disney.png",
      },
      {
        title: "Pixar",
        subtitle: "2015",
        href: "",
        imageSrc: "/assets/images/brands/pixar.png",
      },
      {
        title: "Coin Market Cap",
        subtitle: "2026",
        href: "",
        imageSrc: "/assets/images/brands/coinmarketcap.png",
      },
      {
        title: "Kraken",
        subtitle: "2026",
        href: "",
        imageSrc: "/assets/images/brands/kraken.png",
      },
    ],
    portfolioSubtitles: ["2018", "2019", "2020", "2021"],
    writingItems: MOTION_POSTS,
  };

  function qsa(selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  }

  function normalizeBrandAndIntro() {
    if (document.title === "jasonfesta") {
      document.title = "Jason Festa";
    }

    var heading = document.querySelector("main h2");
    if (heading && heading.textContent.trim() === "jasonfesta") {
      heading.textContent = "Jason Festa";
    }

    var introHeading = document.querySelector("h1.text-foreground");
    if (!introHeading) return;
    introHeading.textContent = "Creative Director, Designer";
    introHeading.style.opacity = "1";
    var introParagraphs = qsa("p.text-foreground", introHeading.parentElement);
    var introCopy = [
      "I help early-stage startups & brands go-to-market with hands-on design, content, & motion, usually all three at once.",
      "Currently: I'm designing with Figma, Fal, Cursor, & Remotion.",
      "Recent Highlights: 100M+ GIPHY views, 7K+ Karma, & 55.3B tokens burned.",
    ];
    introParagraphs.forEach(function (p, index) {
      if (index < introCopy.length) {
        p.textContent = introCopy[index];
      } else {
        p.remove();
        return;
      }
      p.style.opacity = "1";
    });
  }

  function syncFavicon() {
    var faviconHref = "/assets/images/favicon-32-dark.png?v=20260611a";
    var iconHref = "/assets/images/icon-dark.png?v=20260611a";
    var appleHref = "/assets/images/apple-icon-dark.png?v=20260611a";

    function ensureLink(selector, rel, href, type, sizes) {
      var link = document.head.querySelector(selector);
      if (!link) {
        link = document.createElement("link");
        link.rel = rel;
        document.head.appendChild(link);
      }
      if (type) link.type = type;
      if (sizes) link.sizes = sizes;
      link.href = href;
      return link;
    }

    // Force a generic favicon entry (most browsers prioritize this).
    ensureLink(
      'link[rel="icon"][data-local-favicon="primary"]',
      "icon",
      faviconHref,
      "image/png",
      "32x32",
    ).setAttribute("data-local-favicon", "primary");

    // Keep the existing dark/light entries pointed at the same icon.
    qsa('link[rel="icon"]', document.head).forEach(function (link) {
      if (link.getAttribute("sizes") === "512x512") {
        link.href = iconHref;
      } else if (link.getAttribute("sizes") === "32x32") {
        link.href = faviconHref;
      }
    });

    qsa('link[rel="apple-touch-icon"]', document.head).forEach(function (link) {
      link.href = appleHref;
    });
  }

  function syncProjects() {
    syncWritingCardsInSection(
      "#products",
      CONTENT.productsShelf,
      "data-product-href",
      true,
    );
  }

  function ensureProductsSectionFromWriting() {
    var productsSection = document.querySelector("#products");
    if (
      productsSection &&
      productsSection.getAttribute("data-local-generated") === "products-writing"
    ) {
      return;
    }

    var writingSection = document.querySelector("#writing");
    if (!writingSection || !writingSection.parentElement) return;

    if (productsSection) {
      productsSection.remove();
    }

    var clone = writingSection.cloneNode(true);
    clone.id = "products";
    clone.setAttribute("data-local-generated", "products-writing");

    var heading = clone.querySelector("header h2");
    if (heading) heading.textContent = "Product";

    var subtitle = clone.querySelector("header p");
    if (subtitle) subtitle.textContent = "Selected product work.";

    writingSection.insertAdjacentElement("beforebegin", clone);
  }

  function removeMotionSection() {
    var motion = document.querySelector("#motion");
    if (motion) motion.remove();
  }

  function syncCardSection(sectionSelector, items) {
    var section = document.querySelector(sectionSelector);
    if (!section) return;

    var cards = qsa("a", section);
    if (cards.length === 0) return;

    while (cards.length < items.length) {
      var clone = cards[cards.length - 1].cloneNode(true);
      cards[cards.length - 1].parentElement.appendChild(clone);
      cards.push(clone);
    }

    if (cards.length > items.length) {
      cards.slice(items.length).forEach(function (card) {
        card.remove();
      });
      cards = qsa("a", section);
    }

    cards.slice(0, items.length).forEach(function (card, idx) {
      var model = items[idx];
      card.setAttribute("href", model.href);
      card.setAttribute("aria-label", model.title + " — " + model.subtitle);
      card.setAttribute("title", model.title);

      var titleEl = card.querySelector(".text-foreground, .font-semibold, .tracking-tight");
      var subtitleEl = card.querySelector(".text-muted-foreground");
      if (titleEl) titleEl.textContent = model.title;
      if (subtitleEl) subtitleEl.textContent = model.subtitle;
    });
  }

  function setVideoCardMedia(button, videoSrc) {
    if (!button || !videoSrc) return;
    var mediaFrame = button.querySelector("div.relative.overflow-hidden.rounded-2xl");
    if (!mediaFrame) return;
    var normalizedSrc = String(videoSrc);

    var existingVideo = mediaFrame.querySelector("video");
    if (existingVideo) {
      var currentSrc =
        existingVideo.getAttribute("src") ||
        (existingVideo.currentSrc ? existingVideo.currentSrc : "");
      if (currentSrc.indexOf(normalizedSrc) === -1) {
        existingVideo.src = normalizedSrc;
      }
      existingVideo.muted = true;
      existingVideo.defaultMuted = true;
      existingVideo.autoplay = true;
      existingVideo.loop = true;
      existingVideo.playsInline = true;
      existingVideo.setAttribute("muted", "");
      existingVideo.setAttribute("autoplay", "");
      existingVideo.setAttribute("playsinline", "");
      if (existingVideo.dataset.loopFallbackBound !== "1") {
        existingVideo.dataset.loopFallbackBound = "1";
        existingVideo.addEventListener("ended", function () {
          try {
            existingVideo.currentTime = 0;
            var replayPromise = existingVideo.play();
            if (replayPromise && typeof replayPromise.catch === "function") {
              replayPromise.catch(function () {});
            }
          } catch (_err) {}
        });
      }
      var existingPlay = existingVideo.play();
      if (existingPlay && typeof existingPlay.catch === "function") {
        existingPlay.catch(function () {});
      }
      return;
    }

    var img = mediaFrame.querySelector("img");
    if (img) img.remove();

    var video = document.createElement("video");
    video.src = normalizedSrc;
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.preload = "metadata";
    video.setAttribute("muted", "");
    video.setAttribute("autoplay", "");
    video.setAttribute("playsinline", "");
    if (video.dataset.loopFallbackBound !== "1") {
      video.dataset.loopFallbackBound = "1";
      video.addEventListener("ended", function () {
        try {
          video.currentTime = 0;
          var replayPromise = video.play();
          if (replayPromise && typeof replayPromise.catch === "function") {
            replayPromise.catch(function () {});
          }
        } catch (_err) {}
      });
    }
    video.setAttribute("aria-hidden", "true");
    video.className = "absolute inset-0 size-full object-cover";
    mediaFrame.appendChild(video);
    var playPromise = video.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(function () {});
    }
  }

  function syncWritingCardsInSection(sectionSelector, items, hrefAttr, includeMotionMedia) {
    var section = document.querySelector(sectionSelector);
    if (!section) return;

    var cards = qsa("button[aria-label]", section);
    if (cards.length === 0) return;

    while (cards.length < items.length) {
      var lastListItem = cards[cards.length - 1].closest("li");
      if (!lastListItem || !lastListItem.parentElement) return;
      var clonedListItem = lastListItem.cloneNode(true);
      lastListItem.parentElement.appendChild(clonedListItem);
      cards = qsa("button[aria-label]", section);
    }

    if (cards.length > items.length) {
      cards.slice(items.length).forEach(function (button) {
        var item = button.closest("li");
        if (item) item.remove();
      });
      cards = qsa("button[aria-label]", section);
    }

    cards.slice(0, items.length).forEach(function (button, idx) {
      var item = items[idx];
      button.setAttribute("aria-label", item.title + " — " + item.description);
      button.setAttribute("title", "Open " + item.title);
      button.setAttribute(hrefAttr, item.href);

      var textColumn = button.querySelector(".min-w-0.flex-1");
      var dateEl = textColumn
        ? textColumn.querySelector("span.text-subtle-foreground")
        : null;
      var titleEl = textColumn
        ? textColumn.querySelector("span.text-foreground")
        : null;
      var descriptionEl = textColumn
        ? textColumn.querySelector("span.text-muted-foreground")
        : null;

      if (dateEl) dateEl.textContent = item.date;
      if (titleEl) titleEl.textContent = item.title;
      if (descriptionEl) descriptionEl.textContent = item.description;

      if (includeMotionMedia) {
        setVideoCardMedia(button, item.videoSrc);
      }
    });
  }

  function syncPortfolio() {
    var grid = document.querySelector('[role="button"][aria-label*="Expand inspiration map"] > .grid');
    if (!grid) return;
    grid.style.gridAutoFlow = "row";
    var heading = document.querySelector("#inspiration header h2");
    if (heading) heading.textContent = "Brands";

    var cards = qsa(":scope > div", grid);
    if (cards.length === 0) return;
    var targetCount = CONTENT.portfolioItems.length;

    while (cards.length < targetCount) {
      var clone = cards[cards.length - 1].cloneNode(true);
      grid.appendChild(clone);
      cards = qsa(":scope > div", grid);
    }

    if (cards.length > targetCount) {
      cards.slice(targetCount).forEach(function (card) {
        card.remove();
      });
      cards = qsa(":scope > div", grid);
    }

    cards.forEach(function (card, idx) {
      var model = CONTENT.portfolioItems[idx] || {};
      card.style.setProperty("--portfolio-hover-scale", String(1.03 + (idx % 4) * 0.01));
      card.style.order = String(idx);
      var imageEl = card.querySelector("img");
      if (imageEl && model.imageSrc) {
        imageEl.src = model.imageSrc;
        imageEl.removeAttribute("srcset");
        imageEl.style.opacity = "1";
        imageEl.style.filter = "none";
      }
      var meta = card.querySelector(".portfolio-card-meta");
      if (!meta) {
        meta = document.createElement("div");
        meta.className = "portfolio-card-meta";
        meta.innerHTML =
          '<span class="portfolio-card-title"></span><span class="portfolio-card-subtitle"></span>';
        card.appendChild(meta);
      }
      var titleEl = meta.querySelector(".portfolio-card-title");
      var subtitleEl = meta.querySelector(".portfolio-card-subtitle");
      if (titleEl) {
        titleEl.textContent = "";
        titleEl.style.display = "none";
      }
      if (subtitleEl) {
        subtitleEl.textContent = model.subtitle || CONTENT.portfolioSubtitles[idx % CONTENT.portfolioSubtitles.length];
        subtitleEl.style.display = "none";
      }

      card.setAttribute("data-portfolio-href", model.href || "");
      card.setAttribute("title", model.title || "Portfolio");
      card.setAttribute("tabindex", "-1");
      card.style.cursor = "default";
      grid.appendChild(card);
    });
  }

  function getPortfolioHref(card) {
    if (!card) return null;
    var explicitHref = card.getAttribute("data-portfolio-href");
    if (explicitHref) return explicitHref;
    var title = card.querySelector(".portfolio-card-title");
    var titleText = (title ? title.textContent : "").trim();
    for (var i = 0; i < CONTENT.portfolioItems.length; i += 1) {
      if (CONTENT.portfolioItems[i].title === titleText) {
        return CONTENT.portfolioItems[i].href;
      }
    }
    return null;
  }

  function syncWriting() {
    syncWritingCardsInSection(
      "#writing",
      CONTENT.writingItems,
      "data-writing-href",
      true,
    );
    var heading = document.querySelector("#writing header h2");
    if (heading) heading.textContent = "Content";
  }

  function syncContactSection() {
    var section = document.querySelector("#socials");
    if (!section) return;

    var heading = section.querySelector("header h2");
    if (heading) heading.textContent = "Links";

    var list = section.querySelector(".divide-y");
    if (!list) return;

    var rows = qsa("a", list);
    var templateRow = rows[0] || null;
    var xRow = null;
    var linkedInRow = null;
    var githubRow = null;
    var cursorRow = null;
    var socialRows = [
      { label: "X", href: "https://x.com/jasonfesta", handle: "jasonfesta" },
      { label: "Cursor", href: "https://cursor.com/@jasonfesta", handle: "jasonfesta" },
      { label: "Reddit", href: "https://www.reddit.com/user/jasonfesta/", handle: "jasonfesta" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/jasonfesta/", handle: "jasonfesta" },
    ];
    var currentRows = qsa("button[data-social-link]", list);
    if (list.dataset.socialLinksVersion === "buttons-v2" && currentRows.length === socialRows.length) {
      return;
    }

    function showHandle(row) {
      if (!row) return;
      var handleEl =
        row.querySelector(".hidden.sm\\:inline-block") ||
        row.querySelector(".sm\\:inline-block");
      if (!handleEl) return;
      handleEl.textContent = "@jasonfesta";
      handleEl.classList.remove("hidden");
      handleEl.classList.add("inline-block");
    }

    rows.forEach(function (row) {
      var href = row.getAttribute("href") || "";
      if (href.indexOf("x.com") >= 0) xRow = row;
      if (href.indexOf("linkedin.com") >= 0) linkedInRow = row;
      if (href.indexOf("github.com") >= 0) githubRow = row;
    });

    qsa("a", list).forEach(function (row) {
      row.remove();
    });

    list.innerHTML = "";

    socialRows.forEach(function (item) {
      var wrapper = document.createElement("div");
      var row = document.createElement("button");
      row.type = "button";
      row.dataset.socialLink = item.label;
      row.dataset.href = item.href;
      row.className =
        "group flex min-h-[64px] w-full items-center justify-between gap-4 py-4 text-left text-[15px] tracking-tight text-foreground transition-colors hover:text-muted-foreground";
      row.style.background = "transparent";
      row.style.border = "0";
      row.style.cursor = "pointer";
      row.style.font = "inherit";
      row.innerHTML =
        '<span class="min-w-0 flex-1"><span>' +
        item.label +
        '</span></span><span class="inline-block shrink-0 text-muted-foreground">' +
        item.handle +
        "</span>";
      row.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        window.open(item.href, "_blank", "noopener,noreferrer");
      });
      wrapper.appendChild(row);
      list.appendChild(wrapper);
    });

    list.dataset.socialLinksVersion = "buttons-v2";

    return;

    var scheduleCallRow = null;
    var redditRow = null;
    if (templateRow) {
      scheduleCallRow = templateRow.cloneNode(true);
      scheduleCallRow.setAttribute("href", "https://cal.com/jasonfesta");
      scheduleCallRow.setAttribute("target", "_blank");
      scheduleCallRow.setAttribute("rel", "noopener noreferrer");

      var nameEl = scheduleCallRow.querySelector(".min-w-0.flex-1 span");
      if (nameEl) nameEl.textContent = "iMessage";

      var metaEl = scheduleCallRow.querySelector(".hidden.sm\\:inline-block");
      if (metaEl) metaEl.textContent = "650-657-7808";

      redditRow = templateRow.cloneNode(true);
      redditRow.setAttribute("href", "https://www.reddit.com/user/jasonfesta/");
      redditRow.setAttribute("target", "_blank");
      redditRow.setAttribute("rel", "noopener noreferrer");

      var redditNameEl = redditRow.querySelector(".min-w-0.flex-1 span");
      if (redditNameEl) redditNameEl.textContent = "Reddit";

      var redditMetaEl = redditRow.querySelector(".hidden.sm\\:inline-block");
      if (redditMetaEl) redditMetaEl.textContent = "@jasonfesta";

      cursorRow = templateRow.cloneNode(true);
      cursorRow.setAttribute("href", "https://cursor.com/@jasonfesta");
      cursorRow.setAttribute("target", "_blank");
      cursorRow.setAttribute("rel", "noopener noreferrer");

      var cursorNameEl = cursorRow.querySelector(".min-w-0.flex-1 span");
      if (cursorNameEl) cursorNameEl.textContent = "Cursor";

      var cursorMetaEl = cursorRow.querySelector(".hidden.sm\\:inline-block");
      if (cursorMetaEl) cursorMetaEl.textContent = "@jasonfesta";
    }

    [xRow, cursorRow, githubRow, redditRow, linkedInRow].forEach(function (row) {
      if (!row) return;
      row.setAttribute("target", "_blank");
      row.setAttribute("rel", "noopener noreferrer");
      showHandle(row);
      bindExternalLink(row);
      var wrapper = document.createElement("div");
      wrapper.appendChild(row);
      list.appendChild(wrapper);
    });

    // Safety guard in case stale cached rows persist.
    qsa('a[href*="cal.com/jasonfesta"]', list).forEach(function (stale) {
      var staleWrap = stale.parentElement;
      if (staleWrap && staleWrap.parentElement === list) staleWrap.remove();
    });
  }

  function installSocialLinkEvents() {
    // Footer links are native anchors. Avoid intercepting them so target="_blank" works normally.
  }

  function syncFooterLocation() {
    var footerRow = document.querySelector(
      "footer .mt-3.flex.w-full.items-center.justify-center.gap-6.text-\\[15px\\].tracking-tight.text-muted-foreground.sm\\:gap-10",
    );
    if (!footerRow) return;
    footerRow.style.justifyContent = "center";
    footerRow.style.textAlign = "center";
    footerRow.innerHTML =
      "<span style=\"display:inline-block;text-align:center;\">Palm Beach, Florida<br><s style=\"opacity:.75;\">Palo Alto, California</s></span>";
  }

  function syncChatCardToDiscord() {
    var discordUrl = "https://discord.com/";
    var seen = [];

    qsa("a, button, div").forEach(function (el) {
      var text = (el.textContent || "").trim().toLowerCase();
      if (text.indexOf("chat with us") === -1) return;

      var card = el.closest("a, button");
      if (!card || seen.indexOf(card) >= 0) return;
      seen.push(card);

      if (card.tagName === "A") {
        card.setAttribute("href", discordUrl);
        card.setAttribute("target", "_blank");
        card.setAttribute("rel", "noopener noreferrer");
        return;
      }

      card.style.cursor = "pointer";
      if (card.dataset.discordBound === "1") return;
      card.dataset.discordBound = "1";
      card.addEventListener("click", function () {
        window.open(discordUrl, "_blank", "noopener,noreferrer");
      });
    });
  }

  function getProductHref(button) {
    var explicitHref = button.getAttribute("data-product-href");
    if (explicitHref) return explicitHref;
    var aria = (button.getAttribute("aria-label") || "").trim();
    for (var i = 0; i < CONTENT.productsShelf.length; i += 1) {
      var item = CONTENT.productsShelf[i];
      if (aria.indexOf(item.title) === 0) {
        return item.href;
      }
    }
    return null;
  }

  function getWritingHref(button) {
    var explicitHref = button.getAttribute("data-writing-href");
    if (explicitHref) return explicitHref;

    var aria = (button.getAttribute("aria-label") || "").trim();
    for (var i = 0; i < CONTENT.writingItems.length; i += 1) {
      var item = CONTENT.writingItems[i];
      if (aria.indexOf(item.title) === 0) {
        return item.href;
      }
    }
    return null;
  }

  function ensureReaderOverlay() {
    var overlay = document.getElementById("local-reader-overlay");
    if (overlay) return overlay;

    overlay = document.createElement("div");
    overlay.id = "local-reader-overlay";
    overlay.className = "local-reader-overlay";
    overlay.innerHTML =
      '<button type="button" class="local-reader-close" aria-label="Close reader">×</button>' +
      '<iframe class="local-reader-frame" title="Local reader" loading="eager"></iframe>';
    document.body.appendChild(overlay);
    var iframe = overlay.querySelector(".local-reader-frame");

    overlay.querySelector(".local-reader-close").addEventListener("click", closeReaderOverlay);
    overlay.addEventListener("click", function (event) {
      if (event.target === overlay) closeReaderOverlay();
    });

    iframe.addEventListener("load", function () {
      var expectedHref = iframe.getAttribute("data-current-href") || "";
      var loadedPath = "";
      try {
        loadedPath = iframe.contentWindow && iframe.contentWindow.location
          ? iframe.contentWindow.location.pathname
          : "";
      } catch (_e) {
        loadedPath = "";
      }

      if (!expectedHref || !loadedPath || loadedPath === "about:blank") {
        return;
      }

      if (loadedPath !== expectedHref) {
        return;
      }

      applyReaderContentCleanup(iframe);
      overlay.classList.remove("loading");
      iframe.removeAttribute("aria-busy");
    });

    return overlay;
  }

  function applyReaderContentCleanup(iframe) {
    if (!iframe || !iframe.contentDocument) return;
    var doc = iframe.contentDocument;
    var selectors = [".reader-back", ".reader-rule", ".product-pill", ".portfolio-pill"];
    selectors.forEach(function (selector) {
      qsa(selector, doc).forEach(function (el) {
        el.style.display = "none";
      });
    });
  }

  function revealReaderWhenDomReady(overlay, iframe, expectedHref) {
    var attempts = 0;
    var timer = setInterval(function () {
      attempts += 1;

      try {
        var loadedPath = iframe.contentWindow && iframe.contentWindow.location
          ? iframe.contentWindow.location.pathname
          : "";
        var readyState = iframe.contentDocument ? iframe.contentDocument.readyState : "";

        if (loadedPath === expectedHref && readyState && readyState !== "loading") {
          clearInterval(timer);
          applyReaderContentCleanup(iframe);
          overlay.classList.remove("loading");
          iframe.removeAttribute("aria-busy");
        }
      } catch (_e) {
        // The pages are same-origin locally; keep the load-event fallback if access is blocked.
      }

      if (attempts > 40) {
        clearInterval(timer);
      }
    }, 50);
  }

  function openReaderOverlay(href) {
    if (!href) return;
    var overlay = ensureReaderOverlay();
    var iframe = overlay.querySelector(".local-reader-frame");
    var currentHref = iframe.getAttribute("data-current-href") || "";
    if (overlay.classList.contains("open") && currentHref === href) return;

    overlay.classList.add("loading");
    iframe.setAttribute("aria-busy", "true");
    iframe.setAttribute("data-current-href", href);

    // Prevent a flash of stale content when switching between overlay pages.
    if (overlay.classList.contains("open")) {
      iframe.src = "about:blank";
    }

    overlay.querySelector(".local-reader-frame").src = href;
    revealReaderWhenDomReady(overlay, iframe, href);
    setTimeout(function () {
      applyReaderContentCleanup(iframe);
    }, 120);
    overlay.classList.add("open");
    document.body.classList.add("reader-open");
  }

  function closeReaderOverlay() {
    var overlay = document.getElementById("local-reader-overlay");
    if (!overlay) return;
    overlay.classList.remove("open");
    overlay.classList.remove("loading");
    var iframe = overlay.querySelector(".local-reader-frame");
    if (iframe) {
      iframe.removeAttribute("data-current-href");
      iframe.removeAttribute("aria-busy");
      iframe.src = "about:blank";
    }
    document.body.classList.remove("reader-open");
    resumeShelfVideos();
    setTimeout(resumeShelfVideos, 120);
    setTimeout(resumeShelfVideos, 360);
  }

  function resumeShelfVideos() {
    var videos = qsa("#products button video, #writing button video");
    videos.forEach(function (video) {
      if (!video) return;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      var playPromise = video.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(function () {
          // Ignore autoplay promise rejections; next user interaction will resume.
        });
      }
    });
  }

  function installReaderEvents() {
    if (document.body.dataset.readerEventsInstalled === "1") return;
    document.body.dataset.readerEventsInstalled = "1";

    document.addEventListener(
      "click",
      function (event) {
        var productButton = event.target.closest("#products button[aria-label]");
        if (productButton) {
          var productHref = getProductHref(productButton);
          if (productHref) {
            event.preventDefault();
            openReaderOverlay(productHref);
          }
          return;
        }

        var productLink = event.target.closest("#products a");
        if (productLink) {
          event.preventDefault();
          openReaderOverlay(productLink.getAttribute("href"));
          return;
        }

        var writingButton = event.target.closest("#writing button[aria-label]");
        if (writingButton) {
          var href = getWritingHref(writingButton);
          if (href) {
            event.preventDefault();
            openReaderOverlay(href);
          }
          return;
        }

        var portfolioCard = event.target.closest('[role="button"][aria-label*="Expand inspiration map"] > .grid > div');
        if (portfolioCard) {
          event.preventDefault();
          event.stopPropagation();
          var portfolioHref = getPortfolioHref(portfolioCard);
          if (portfolioHref) {
            openReaderOverlay(portfolioHref);
          }
        }
      },
      true,
    );

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeReaderOverlay();
      if (event.key === "Enter" || event.key === " ") {
        var portfolioCard = event.target.closest('[role="button"][aria-label*="Expand inspiration map"] > .grid > div');
        if (portfolioCard) {
          event.preventDefault();
          event.stopPropagation();
          var portfolioHref = getPortfolioHref(portfolioCard);
          if (portfolioHref) {
            openReaderOverlay(portfolioHref);
          }
        }
      }
    });
  }

  function revealHomeSurface() {
    document.documentElement.classList.add("home-ready");
    document.documentElement.classList.remove("home-prehide");
  }

  function applyHomeSurface() {
    syncFavicon();
    normalizeBrandAndIntro();
    removeMotionSection();
    ensureProductsSectionFromWriting();
    syncProjects();
    syncWriting();
    syncPortfolio();
    syncContactSection();
    installSocialLinkEvents();
    syncFooterLocation();
    syncChatCardToDiscord();
    resumeShelfVideos();
    revealHomeSurface();
  }

  function startObserver() {
    var scheduled = false;
    var observer = new MutationObserver(function () {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(function () {
        scheduled = false;
        applyHomeSurface();
      });
    });
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["style", "class", "aria-label"],
    });
  }

  installReaderEvents();
  applyHomeSurface();
  startObserver();
})();
