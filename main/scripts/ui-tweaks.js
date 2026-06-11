(function () {
  var CONTENT = {
    projects: [
      {
        title: "Dmos",
        subtitle: "Autonomous growth operations platform.",
        href: "/pages/products/dmos.html",
      },
      {
        title: "Darwin",
        subtitle: "Multiplayer AI networks for brands and creators.",
        href: "/pages/products/darwin.html",
      },
      {
        title: "Wayve",
        subtitle: "A consumer iOS app for personalized AI video.",
        href: "/pages/products/wayve.html",
      },
      {
        title: "Sogni",
        subtitle: "Creative AI workflows for visual ideation.",
        href: "/pages/products/sogni.html",
      },
    ],
    productsShelf: [
      {
        date: "APR 2026",
        title: "Claude, Apify, Dmos",
        description: "Autonomous growth operations platform.",
        href: "/pages/products/dmos.html",
        videoSrc: "/assets/products/dmos.webm",
      },
      {
        date: "APR 2026",
        title: "Figma, Cusor, Fal, Darwin",
        description: "Multiplayer AI networks for brands and creators.",
        href: "/pages/products/darwin.html",
        videoSrc: "/assets/products/darwin.webm",
      },
      {
        date: "MAR 2026",
        title: "Figma, Fal, Wayve",
        description: "A consumer iOS app for personalized AI video.",
        href: "/pages/products/wayve.html",
        videoSrc: "/assets/products/wayve.webm",
      },
      {
        date: "JAN 2026",
        title: "Figma, Midjourney, Sogni",
        description: "Creative AI workflows for visual ideation.",
        href: "/pages/products/sogni.html",
        videoSrc: "/assets/products/sogni.webm",
      },
    ],
    portfolioTitles: [
      "FIFA",
      "NFL",
      "Adobe",
      "Disney",
      "Pixar",
      "Upland",
      "Coin Market",
      "Kraken",
    ],
    portfolioItems: [
      {
        title: "FIFA",
        subtitle: "Portfolio case study",
        href: "/pages/portfolio/fifa.html",
      },
      {
        title: "NFL",
        subtitle: "Portfolio case study",
        href: "/pages/portfolio/nfla.html",
      },
      {
        title: "Adobe",
        subtitle: "Portfolio case study",
        href: "/pages/portfolio/adobe.html",
      },
      {
        title: "Disney",
        subtitle: "Portfolio case study",
        href: "/pages/portfolio/disney.html",
      },
      {
        title: "Pixar",
        subtitle: "Portfolio case study",
        href: "/pages/portfolio/upland.html",
      },
      {
        title: "Upland",
        subtitle: "Portfolio case study",
        href: "/pages/portfolio/tap-tap-revenge.html",
      },
      {
        title: "Coin Market",
        subtitle: "Portfolio case study",
        href: "/pages/portfolio/app-store.html",
      },
      {
        title: "Kraken",
        subtitle: "Portfolio case study",
        href: "/pages/portfolio/giphy.html",
      },
    ],
    portfolioSubtitles: [
      "Portfolio case study",
      "Portfolio case study",
      "Portfolio case study",
      "Portfolio case study",
    ],
    writingItems: [
      {
        date: "APR 2026",
        title: "Cursor, Remotion, Darwin Ads",
        description: "Motion stack",
        href: "/pages/products/darwin-ads.html",
        videoSrc: "/assets/products/dmos.webm",
      },
      {
        date: "APR 2026",
        title: "Fal, Cursor, Remotion, Darwin Ads",
        description: "Motion stack",
        href: "/pages/products/darwin-studio.html",
        videoSrc: "/assets/products/darwin.webm",
      },
      {
        date: "MAR 2026",
        title: "Jitter, Wayve",
        description: "Motion stack",
        href: "/pages/products/wayve.html",
        videoSrc: "/assets/products/wayve.webm",
      },
      {
        date: "JAN 2026",
        title: "Fal, After Effects, OpenSea",
        description: "Motion stack",
        href: "/pages/products/opensea.html",
        videoSrc: "/assets/products/sogni.webm",
      },
    ],
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
    introHeading.textContent = "Creative Director";
    introHeading.style.opacity = "1";
    var introParagraphs = qsa("p.text-foreground", introHeading.parentElement);
    var introCopy = [
      "Currently designing Darwin — multiplayer AI networks for brands, creators, and consumers.",
      "My work sits at the intersection of AI, media, and new networks — usually wherever two or three of those threads meet.",
      "I'm drawn to software that makes powerful things feel approachable — tools that hand you the depth, but only when you ask for it.",
    ];
    introParagraphs.forEach(function (p, index) {
      if (index < introCopy.length) {
        p.textContent = introCopy[index];
      }
      p.style.opacity = "1";
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
      existingVideo.loop = true;
      existingVideo.playsInline = true;
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
    video.playsInline = true;
    video.preload = "metadata";
    video.setAttribute("aria-hidden", "true");
    video.className = "absolute inset-0 size-full object-cover";
    mediaFrame.appendChild(video);
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
    var heading = document.querySelector("#inspiration header h2");
    if (heading) heading.textContent = "Projects";

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
      if (titleEl) titleEl.textContent = model.title || CONTENT.portfolioTitles[idx];
      if (subtitleEl) {
        subtitleEl.textContent = model.subtitle || CONTENT.portfolioSubtitles[idx % CONTENT.portfolioSubtitles.length];
      }

      card.setAttribute("data-portfolio-href", model.href || "");
      card.setAttribute("title", model.title || "Portfolio");
      card.setAttribute("tabindex", "0");
      card.style.cursor = "pointer";
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
    if (heading) heading.textContent = "Motion";
  }

  function syncContactSection() {
    var section = document.querySelector("#socials");
    if (!section) return;

    var heading = section.querySelector("header h2");
    if (heading) heading.textContent = "Contact";

    var list = section.querySelector(".divide-y");
    if (!list) return;

    var rows = qsa("a", list);
    var templateRow = rows[0] || null;
    var xRow = null;
    var linkedInRow = null;
    var githubRow = null;

    rows.forEach(function (row) {
      var href = row.getAttribute("href") || "";
      if (href.indexOf("x.com") >= 0) xRow = row;
      if (href.indexOf("linkedin.com") >= 0) linkedInRow = row;
      if (href.indexOf("github.com") >= 0) githubRow = row;
    });

    qsa("a", list).forEach(function (row) {
      row.remove();
    });

    var scheduleCallRow = null;
    if (templateRow) {
      scheduleCallRow = templateRow.cloneNode(true);
      scheduleCallRow.setAttribute("href", "https://cal.com/jasonfesta");
      scheduleCallRow.setAttribute("target", "_blank");
      scheduleCallRow.setAttribute("rel", "noopener noreferrer");

      var nameEl = scheduleCallRow.querySelector(".min-w-0.flex-1 span");
      if (nameEl) nameEl.textContent = "Schedule call";

      var metaEl = scheduleCallRow.querySelector(".hidden.sm\\:inline-block");
      if (metaEl) metaEl.textContent = "Book time";
    }

    [scheduleCallRow, xRow, linkedInRow, githubRow].forEach(function (row) {
      if (!row) return;
      var wrapper = document.createElement("div");
      wrapper.appendChild(row);
      list.appendChild(wrapper);
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
      applyReaderContentCleanup(iframe);
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

  function openReaderOverlay(href) {
    if (!href) return;
    var overlay = ensureReaderOverlay();
    var iframe = overlay.querySelector(".local-reader-frame");
    overlay.querySelector(".local-reader-frame").src = href;
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
          var portfolioHref = getPortfolioHref(portfolioCard);
          if (portfolioHref) {
            event.preventDefault();
            event.stopPropagation();
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
          var portfolioHref = getPortfolioHref(portfolioCard);
          if (portfolioHref) {
            event.preventDefault();
            openReaderOverlay(portfolioHref);
          }
        }
      }
    });
  }

  function applyHomeSurface() {
    normalizeBrandAndIntro();
    removeMotionSection();
    ensureProductsSectionFromWriting();
    syncProjects();
    syncWriting();
    syncPortfolio();
    syncContactSection();
    resumeShelfVideos();
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
