(function () {
  var PAGE_TITLE_TEXT = "Mango Clips";
  var HERO_HEADLINE_PREFIX = "AI UGC that actually looks ";
  var HERO_HEADLINE_WORDS = ["human.", "real.", "legit.", "sweet.", "tasty.", "yum."];
  var HERO_DESCRIPTION_TEXT =
    "Send us a few photos. Get 50+ creator-style videos that look like real people shot them — across every major AI model, in under 24 hours. Yes, it's AI. No, your buyers won't be able to tell.";
  var DISCORD_SUPPORT_URL = "https://discord.gg/4VA8F58WaQ";
  var MANGO_STICKER_URL =
    "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHRscHNiZndtOG54b3l0eXhoMzlscGE2bzRhaWRxMHB3NTN5MHVjbSZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/L2l4HpbpRw4TeRfYVl/giphy.webp";
  var STRIPE_DEFAULT_CHECKOUT_URL = "https://stripe.com";
  var PLAYKIT_VIDEO_SOURCES = [
    "/assets/playkit/pk-01.mp4",
    "/assets/playkit/pk-02.mp4",
    "/assets/playkit/pk-03.mp4",
    "/assets/playkit/pk-04.mp4",
    "/assets/playkit/pk-05.mp4",
    "/assets/playkit/pk-06.mp4",
    "/assets/playkit/pk-07.mp4",
    "/assets/playkit/pk-08.mp4",
  ];

  // Quick revert switch:
  // - true  => new layout structure using existing visual style language
  // - false => previous site layout logic below
  var ENABLE_WIREFRAME_LAYOUT = false;

  function mountWireframeLayout() {
    var main = document.querySelector("main");
    if (!main) return;

    document.title = "👀 for realistic AI UGC?";

    var tiktokRows = [
      {
        title: "Tik Tok Video",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        detail: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      {
        title: "Tik Tok Video",
        body: "Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
        detail: "Laboris nisi ut aliquip ex ea commodo consequat lorem ipsum.",
      },
      {
        title: "Tik Tok Video",
        body: "Duis aute irure dolor in reprehenderit in voluptate velit.",
        detail: "Esse cillum dolore eu fugiat nulla pariatur lorem ipsum.",
      },
    ];

    var socialProofRows = [
      {
        title: "Social Proof",
        body: "Lorem ipsum dolor sit amet.",
      },
      {
        title: "Social Proof",
        body: "Consectetur adipiscing elit.",
      },
      {
        title: "Social Proof",
        body: "Sed do eiusmod tempor.",
      },
      {
        title: "Social Proof",
        body: "Ut labore et dolore magna.",
      },
    ];

    var app = document.createElement("div");
    app.id = "ugc-layout-app";
    app.className = "ugc-layout-shell";
    app.innerHTML =
      '<header class="flex items-center justify-between gap-3 mb-6">' +
      '  <a href="#" class="inline-flex items-center rounded-full border border-border/60 bg-card/30 px-3 py-1 text-[12px] font-medium tracking-tight text-foreground">UGC GO</a>' +
      '  <div class="flex items-center gap-2">' +
      '    <button type="button" class="inline-flex rounded-full border border-border/60 bg-card/30 px-3 py-1 text-[11px] font-medium text-muted-foreground">Editor</button>' +
      '    <button type="button" class="inline-flex rounded-full border border-border/60 bg-card/30 px-3 py-1 text-[11px] font-medium text-muted-foreground">Export</button>' +
      "  </div>" +
      "</header>" +
      '<section class="flex flex-col items-center gap-2 mb-6">' +
      '  <div class="inline-flex items-center rounded-lg border border-border/70 bg-card/40 p-1 gap-1">' +
      '    <button type="button" class="rounded border border-border/70 px-2 py-1 text-[10px] text-foreground">I</button>' +
      '    <button type="button" class="rounded px-2 py-1 text-[10px] text-muted-foreground">II</button>' +
      '    <button type="button" class="rounded px-2 py-1 text-[10px] text-muted-foreground">III</button>' +
      "  </div>" +
      '  <p class="text-[10px] tracking-[0.12em] text-subtle-foreground">TABS</p>' +
      "</section>" +
      '<section class="grid grid-cols-[86px_1fr_116px] items-center gap-3 mb-6">' +
      '  <div id="ugc-video-stack" class="relative h-[106px]"></div>' +
      '  <div class="text-center text-[30px] text-muted-foreground">→</div>' +
      '  <article class="relative overflow-hidden rounded-xl border border-border/60 bg-card/50 h-[152px]">' +
      '    <video src="/assets/products/sogni.webm" autoplay muted loop playsinline preload="metadata" class="absolute inset-0 size-full object-cover opacity-60"></video>' +
      '    <span class="absolute inset-x-0 bottom-2 text-center text-[14px] tracking-tight text-foreground">Tik Tok</span>' +
      "  </article>" +
      "</section>" +
      '<div class="border-t border-border/60 my-5"></div>' +
      '<section class="space-y-4" id="ugc-list-section"></section>' +
      '<div class="border-t border-border/60 my-5"></div>' +
      '<section class="grid grid-cols-2 gap-3" id="ugc-social-section"></section>' +
      '<div class="border-t border-border/60 my-5"></div>' +
      '<section class="flex items-center justify-center gap-3">' +
      '  <button type="button" class="inline-flex h-6 min-w-9 items-center justify-center rounded-full border border-border/70 bg-card/30 text-[11px] text-muted-foreground">←</button>' +
      '  <button type="button" class="inline-flex h-6 min-w-9 items-center justify-center rounded-full border border-border/70 bg-card/30 text-[11px] text-muted-foreground">→</button>' +
      "</section>";

    var stackTarget = app.querySelector("#ugc-video-stack");
    var stackMedia = [
      "/assets/products/dmos.webm",
      "/assets/products/darwin.webm",
      "/assets/products/wayve.webm",
    ];
    stackMedia.forEach(function (src, index) {
      var card = document.createElement("article");
      card.className =
        "absolute overflow-hidden rounded-lg border border-border/60 bg-card/50";
      card.style.width = "72px";
      card.style.height = "92px";
      card.style.left = index * 8 + "px";
      card.style.top = (2 - index) * 8 + "px";
      card.innerHTML =
        '<video src="' +
        src +
        '" autoplay muted loop playsinline preload="metadata" class="absolute inset-0 size-full object-cover opacity-55"></video>';
      if (index === 2) {
        var label = document.createElement("div");
        label.className =
          "absolute left-2 bottom-2 text-[10px] leading-tight text-foreground";
        label.textContent = "Videos";
        card.appendChild(label);
      }
      stackTarget.appendChild(card);
    });

    var list = app.querySelector("#ugc-list-section");
    tiktokRows.forEach(function (item, index) {
      var row = document.createElement("article");
      row.className = "grid grid-cols-[68px_1fr] gap-3 items-center";
      row.innerHTML =
        '<div class="relative overflow-hidden rounded-lg border border-border/60 bg-card/50 h-[94px]">' +
        '  <video src="' +
        ["/assets/products/dmos.webm", "/assets/products/darwin.webm", "/assets/products/wayve.webm"][index % 3] +
        '" autoplay muted loop playsinline preload="metadata" class="absolute inset-0 size-full object-cover opacity-56"></video>' +
        '  <span class="absolute left-2 bottom-2 text-[10px] leading-tight text-foreground">' +
        item.title +
        "</span>" +
        "</div>" +
        '<div class="min-w-0">' +
        '  <h3 class="mb-1 text-[12px] font-medium tracking-tight text-foreground">' +
        item.title +
        "</h3>" +
        '  <p class="text-[10px] leading-snug text-muted-foreground">' +
        item.body +
        "</p>" +
        '  <p class="mt-1 text-[10px] leading-snug text-muted-foreground">' +
        item.detail +
        "</p>" +
        "</div>";
      list.appendChild(row);
    });

    var social = app.querySelector("#ugc-social-section");
    socialProofRows.forEach(function (item, index) {
      var card = document.createElement("article");
      card.className = "grid grid-cols-[68px_1fr] gap-2 items-center";
      card.innerHTML =
        '<div class="relative overflow-hidden rounded-lg border border-border/60 bg-card/50 h-[46px]">' +
        '  <video src="' +
        ["/assets/products/sogni.webm", "/assets/products/dmos.webm", "/assets/products/darwin.webm", "/assets/products/wayve.webm"][index % 4] +
        '" autoplay muted loop playsinline preload="metadata" class="absolute inset-0 size-full object-cover opacity-56"></video>' +
        '  <span class="absolute left-2 bottom-2 text-[10px] leading-tight text-foreground">' +
        item.title +
        "</span>" +
        "</div>" +
        '<div class="min-w-0">' +
        '  <h4 class="mb-1 text-[12px] font-medium tracking-tight text-foreground">' +
        item.title +
        "</h4>" +
        '  <p class="text-[10px] leading-snug text-muted-foreground">' +
        item.body +
        "</p>" +
        "</div>";
      social.appendChild(card);
    });

    main.innerHTML = "";
    main.appendChild(app);
    document.body.classList.remove("reader-open");
  }

  if (ENABLE_WIREFRAME_LAYOUT) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", mountWireframeLayout);
    } else {
      mountWireframeLayout();
    }
    return;
  }

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

  var lazyVideoObserver = null;
  var heroHeadlineWordIndex = 0;
  var heroHeadlineWordIntervalId = null;

  function hydrateLazyVideo(video) {
    if (!video) return;
    var lazySrc = video.getAttribute("data-ugc-lazy-src");
    if (!lazySrc) return;
    var currentSrc = video.getAttribute("src") || "";
    if (currentSrc !== lazySrc) {
      video.setAttribute("src", lazySrc);
      video.load();
    }
    video.removeAttribute("data-ugc-lazy-src");
    var playPromise = video.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(function () {});
    }
  }

  function ensureLazyVideoObserver() {
    if (lazyVideoObserver || typeof window === "undefined") return lazyVideoObserver;
    if (!("IntersectionObserver" in window)) return null;
    lazyVideoObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var video = entry.target;
          hydrateLazyVideo(video);
          lazyVideoObserver.unobserve(video);
        });
      },
      {
        root: null,
        rootMargin: "220px 0px",
        threshold: 0.1,
      },
    );
    return lazyVideoObserver;
  }

  function setupLazyVideos() {
    var videos = qsa("video[data-ugc-lazy-src]");
    if (!videos.length) return;
    var observer = ensureLazyVideoObserver();
    videos.forEach(function (video) {
      if (observer) {
        observer.observe(video);
      } else {
        hydrateLazyVideo(video);
      }
    });
  }

  function setHeroHeadlineContent(target) {
    if (!target) return;
    var wordNode = target.querySelector("[data-ugc-hero-word]");
    if (!wordNode) {
      target.textContent = "";
      target.appendChild(document.createTextNode(HERO_HEADLINE_PREFIX));
      wordNode = document.createElement("span");
      wordNode.setAttribute("data-ugc-hero-word", "true");
      target.appendChild(wordNode);
    }
    wordNode.textContent = HERO_HEADLINE_WORDS[heroHeadlineWordIndex % HERO_HEADLINE_WORDS.length];
  }

  function renderHeroHeadlineWord() {
    var lineOne = document.querySelector("#ugc-headline-area [data-ugc-hero-headline]");
    if (!lineOne) return;
    setHeroHeadlineContent(lineOne);
  }

  function startHeroHeadlineWordRotation() {
    if (heroHeadlineWordIntervalId !== null) return;
    renderHeroHeadlineWord();
    heroHeadlineWordIntervalId = window.setInterval(function () {
      heroHeadlineWordIndex = (heroHeadlineWordIndex + 1) % HERO_HEADLINE_WORDS.length;
      renderHeroHeadlineWord();
    }, 1000);
  }

  function normalizeBrandAndIntro() {
    document.title = PAGE_TITLE_TEXT;

    var heading = document.querySelector("main h2");
    if (heading && heading.textContent.trim() === "jasonfesta") {
      heading.textContent = "Jason Festa";
    }

    // Scope this to the original about section only so it never overwrites the hero headline.
    var introHeading = document.querySelector("#about h1.text-foreground");
    if (!introHeading) return;
    introHeading.textContent = "Jason Festa";
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

  function removeAboutSectionAndTightenTop() {
    var about = document.querySelector("#about");
    if (about) about.remove();

    var products = document.querySelector("#products");
    if (products) {
      products.classList.remove("pt-3", "pb-10", "sm:pt-4", "sm:pb-12", "py-14", "sm:py-20", "md:py-24", "lg:py-28");
      products.classList.add("py-8", "sm:py-12", "md:py-14", "lg:py-16");
    }
  }

  function removeWritingSection() {
    var writing = document.querySelector("#writing");
    if (writing) writing.remove();
  }

  function renderProductsGrid() {
    var section = document.querySelector("#products");
    if (!section) return;

    var heading = section.querySelector("header h2");
    if (heading) heading.textContent = "Bundles";

    var subtitle = section.querySelector("header p");
    if (subtitle) subtitle.textContent = "Software for brands, creators, and consumers.";

    var host = section.querySelector(".full-bleed-scroll");
    if (!host) return;

    var packageCards = [
      {
        title: "Starter - 25 UGC Posts",
        description: "Mix of 25 Forward Facing, Talking Head, Carsourel per month.",
        href: STRIPE_DEFAULT_CHECKOUT_URL,
        stripePlan: "starter",
        videoSrc: "/assets/playkit/pk-01.mp4",
        ctaLabel: "Starter - $99",
      },
      {
        title: "Go Get It - 100 UGC Posts",
        description: "Mix of 100 Forward Facing, Talking Head, Carsourel per month.",
        href: STRIPE_DEFAULT_CHECKOUT_URL,
        stripePlan: "go_get_it",
        videoSrc: "/assets/playkit/pk-02.mp4",
        ctaLabel: "Go Get It - $299",
      },
      {
        title: "Blast Off - 500 UGC Posts",
        description: "Mix of 500 Forward Facing, Talking Head, Carsourel per month.",
        href: STRIPE_DEFAULT_CHECKOUT_URL,
        stripePlan: "blast_off",
        videoSrc: "/assets/playkit/pk-03.mp4",
        ctaLabel: "Blast Off - $499",
      },
      {
        title: "Chat With Us",
        description: "Need custom support? Talk directly with our team.",
        href: DISCORD_SUPPORT_URL,
        isSolidCta: true,
        ctaLabel: "Chat With Us",
      },
    ];

    var cards = packageCards
      .map(function (item) {
        var media = item.isSolidCta
          ? ""
          : '<video data-ugc-lazy-src="' +
            item.videoSrc +
            '" autoplay muted loop playsinline preload="none" class="ugc-package-media"></video>' +
            '<span class="ugc-package-fade"></span>';
        var cardClass = item.isSolidCta
          ? "ugc-package-card ugc-package-card--cta"
          : "ugc-package-card";

        return (
          '<li class="ugc-package-item">' +
          '  <a href="' +
          item.href +
          '" data-ugc-stripe-link="' +
          (item.stripePlan ? "true" : "false") +
          '" data-ugc-stripe-plan="' +
          (item.stripePlan || "") +
          '" target="_blank" rel="noopener noreferrer" class="' +
          cardClass +
          '">' +
          media +
          '    <div class="ugc-package-copy">' +
          '      <p class="ugc-package-title">' +
          item.title +
          "</p>" +
          '      <p class="ugc-package-subtitle">' +
          item.description +
          "</p>" +
          '      <button type="button" class="ugc-package-cta">' +
          item.ctaLabel +
          "</button>" +
          "    </div>" +
          "  </a>" +
          "</li>"
        );
      })
      .join("");

    host.className = "ugc-packages-host mx-auto w-full max-w-5xl px-6 sm:px-10 lg:px-16";
    host.innerHTML =
      '<ul role="list" class="ugc-packages-grid">' +
      cards +
      "</ul>";
  }

  function ensureTopHeader() {
    var main = document.querySelector("main > .flex.flex-1.flex-col");
    if (!main) return;

    var existing = document.getElementById("ugc-top-header");
    if (existing) {
      var logoMark = existing.querySelector("[data-ugc-logo-image]");
      if (!logoMark) {
        var oldLabel = existing.querySelector("[data-ugc-logo]");
        if (oldLabel) {
          oldLabel.outerHTML =
            '<span data-ugc-logo-image class="ugc-top-logo-mark" role="img" aria-label="Mangos sticker logo"></span>';
        }
      } else {
        logoMark.textContent = "";
        logoMark.setAttribute("aria-label", "Mangos sticker logo");
      }
      var discord = existing.querySelector("[data-ugc-discord]");
      var schedule = existing.querySelector("[data-ugc-schedule]");
      if (schedule) schedule.textContent = "Book a call";
      if (discord) discord.textContent = "Support";
      existing.style.paddingTop = "20px";
      existing.style.paddingBottom = "20px";
      return;
    }

    var header = document.createElement("header");
    header.id = "ugc-top-header";
    header.className = "py-6 sm:py-8";
    header.style.paddingTop = "20px";
    header.style.paddingBottom = "20px";
    header.innerHTML =
      '<div class="mx-auto w-full max-w-5xl px-6 sm:px-10 lg:px-16">' +
      '  <div class="flex items-center justify-between gap-4">' +
      '    <span data-ugc-logo-image class="ugc-top-logo-mark" role="img" aria-label="Mangos sticker logo"></span>' +
      '    <div class="flex items-center gap-2">' +
      '      <button data-ugc-schedule type="button" class="inline-flex items-center rounded-full border border-border/60 px-3 py-1.5 text-[12px] font-medium tracking-tight text-muted-foreground transition-colors duration-200 hover:text-foreground">Book a call</button>' +
      '      <button data-ugc-discord type="button" class="inline-flex items-center rounded-full border border-border/60 px-3 py-1.5 text-[12px] font-medium tracking-tight text-muted-foreground transition-colors duration-200 hover:text-foreground">Support</button>' +
      "    </div>" +
      "  </div>" +
      "</div>";

    main.insertBefore(header, main.firstChild);
  }

  function removeTopHeader() {
    var header = document.getElementById("ugc-top-header");
    if (header) header.remove();
  }

  function ensureHeadlineArea() {
    var main = document.querySelector("main > .flex.flex-1.flex-col");
    if (!main) return;

    var existing = document.getElementById("ugc-headline-area");
    if (existing) {
      var lineOne = existing.querySelector("[data-ugc-hero-headline]");
      var lineTwo = existing.querySelector("[data-ugc-headline-line2]");
      var cta = existing.querySelector("[data-ugc-headline-cta]");
      var discord = existing.querySelector("[data-ugc-headline-discord]");
      if (lineOne) {
        setHeroHeadlineContent(lineOne);
      }
      if (lineTwo) {
        lineTwo.textContent = HERO_DESCRIPTION_TEXT;
      }
      if (cta) cta.textContent = "Book a call";
      if (discord) discord.textContent = "Support";
      return;
    }

    var headline = document.createElement("section");
    headline.id = "ugc-headline-area";
    headline.className = "pb-8 sm:pb-10";
    headline.innerHTML =
      '<div class="mx-auto w-full max-w-5xl px-6 sm:px-10 lg:px-16">' +
      '  <div class="space-y-3">' +
      '    <h1 data-ugc-hero-headline data-ugc-headline-line1 class="text-[22px] font-medium leading-[1.15] tracking-tight text-foreground sm:text-[30px]">' +
      HERO_HEADLINE_PREFIX +
      HERO_HEADLINE_WORDS[0] +
      "</h1>" +
      '    <p data-ugc-headline-line2 class="max-w-[56ch] text-[14px] leading-[1.35] text-muted-foreground sm:text-[16px]">' +
      HERO_DESCRIPTION_TEXT +
      "</p>" +
      '    <div class="flex flex-wrap items-center gap-2.5">' +
      '      <a data-ugc-headline-cta href="https://cal.com/jasonfesta" target="_blank" rel="noopener noreferrer" class="inline-flex items-center rounded-full border border-border/60 px-4 py-2 text-[12px] font-medium tracking-tight text-muted-foreground transition-colors duration-200 hover:text-foreground">Book a call</a>' +
      '      <a data-ugc-headline-discord href="' +
      DISCORD_SUPPORT_URL +
      '" target="_blank" rel="noopener noreferrer" class="inline-flex items-center rounded-full border border-border/60 px-4 py-2 text-[12px] font-medium tracking-tight text-muted-foreground transition-colors duration-200 hover:text-foreground">Support</a>' +
      "    </div>" +
      "  </div>" +
      "</div>";

    var header = document.getElementById("ugc-top-header");
    if (header && header.parentElement === main) {
      header.insertAdjacentElement("afterend", headline);
      return;
    }
    main.insertBefore(headline, main.firstChild);
  }

  function ensureScrollingShowcase() {
    var main = document.querySelector("main > .flex.flex-1.flex-col");
    if (!main) return;
    var products = document.querySelector("#products");
    if (!products) return;

    var existing = document.getElementById("ugc-scrolling-showcase");
    var cards = PLAYKIT_VIDEO_SOURCES.concat(PLAYKIT_VIDEO_SOURCES)
      .map(function (src, idx) {
        return (
          '<article class="ugc-scroll-card" aria-hidden="' +
          (idx >= PLAYKIT_VIDEO_SOURCES.length ? "true" : "false") +
          '">' +
          '  <video data-ugc-lazy-src="' +
          src +
          '" autoplay muted loop playsinline preload="none" class="ugc-scroll-video"></video>' +
          "</article>"
        );
      })
      .join("");

    if (existing) {
      var track = existing.querySelector(".ugc-scroll-track");
      if (track) track.innerHTML = cards;
      return;
    }

    var section = document.createElement("section");
    section.id = "ugc-scrolling-showcase";
    section.className = "py-8 sm:py-10";
    section.innerHTML =
      '<div class="mx-auto w-full max-w-5xl px-6 sm:px-10 lg:px-16">' +
      '  <div class="ugc-scroll-viewport">' +
      '    <div class="ugc-scroll-track">' +
      cards +
      "    </div>" +
      "  </div>" +
      "</div>";

    products.insertAdjacentElement("beforebegin", section);
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
    var section = document.querySelector("#inspiration");
    if (section) {
      section.classList.remove("pt-3", "pb-10", "sm:pt-4", "sm:pb-12", "py-14", "sm:py-20", "md:py-24", "lg:py-28");
      section.classList.add("py-8", "sm:py-12", "md:py-14", "lg:py-16");
    }
    var heading = document.querySelector("#inspiration header h2");
    if (heading) heading.textContent = "Mangos";

    var cards = qsa(":scope > div", grid);
    if (cards.length === 0) return;
    var targetCount = 16;

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
      var model = CONTENT.portfolioItems[idx % CONTENT.portfolioItems.length] || {};
      card.style.setProperty("--portfolio-hover-scale", String(1.03 + (idx % 4) * 0.01));
      var meta = card.querySelector(".portfolio-card-meta");
      if (meta) meta.remove();

      qsa("img", card).forEach(function (img) {
        img.remove();
      });

      var clipSrc = PLAYKIT_VIDEO_SOURCES[(idx * 5 + 2) % PLAYKIT_VIDEO_SOURCES.length];
      var cardVideo = card.querySelector("video.ugc-example-video");
      if (!cardVideo) {
        cardVideo = document.createElement("video");
        cardVideo.className = "absolute inset-0 size-full object-cover ugc-example-video";
        cardVideo.autoplay = true;
        cardVideo.loop = true;
        cardVideo.muted = true;
        cardVideo.playsInline = true;
        cardVideo.preload = "none";
        cardVideo.setAttribute("aria-hidden", "true");
        card.appendChild(cardVideo);
      }
      if (cardVideo.getAttribute("data-ugc-lazy-src") !== clipSrc) {
        cardVideo.removeAttribute("src");
        cardVideo.setAttribute("data-ugc-lazy-src", clipSrc);
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
    if (heading) heading.textContent = "Chat with us";

    var list = section.querySelector(".divide-y");
    if (!list) return;

    var rows = qsa("a", list);
    var templateRow = rows[0] || null;

    qsa("a", list).forEach(function (row) {
      row.remove();
    });

    var callRow = null;
      var discordRow = null;
    if (templateRow) {
      callRow = templateRow.cloneNode(true);
      callRow.setAttribute("href", "https://cal.com/jasonfesta");
      callRow.setAttribute("target", "_blank");
      callRow.setAttribute("rel", "noopener noreferrer");

      var callName = callRow.querySelector(".min-w-0.flex-1 span");
      if (callName) callName.textContent = "Book a call";

      var callMeta = callRow.querySelector(".hidden.sm\\:inline-block");
      if (callMeta) callMeta.textContent = "Schedule";

      discordRow = templateRow.cloneNode(true);
      discordRow.setAttribute("href", DISCORD_SUPPORT_URL);
      discordRow.setAttribute("target", "_blank");
      discordRow.setAttribute("rel", "noopener noreferrer");

      var discordName = discordRow.querySelector(".min-w-0.flex-1 span");
      if (discordName) discordName.textContent = "Support";

      var discordMeta = discordRow.querySelector(".hidden.sm\\:inline-block");
      if (discordMeta) discordMeta.textContent = "Discord";
    }

    [callRow, discordRow].forEach(function (row) {
      if (!row) return;
      var wrapper = document.createElement("div");
      wrapper.appendChild(row);
      list.appendChild(wrapper);
    });
  }

  function syncFooterLocation() {
    var footerRow = document.querySelector(
      "footer .mt-3.flex.w-full.items-center.justify-center.gap-6.text-\\[15px\\].tracking-tight.text-muted-foreground.sm\\:gap-10",
    );
    if (!footerRow) return;

    footerRow.innerHTML = '<span class="ugc-footer-logo-mark" role="img" aria-label="Mango logo"></span>';
  }

  function syncBrowserIcons() {
    qsa('link[rel="icon"], link[rel="apple-touch-icon"], link[rel="shortcut icon"]').forEach(function (link) {
      link.setAttribute("href", MANGO_STICKER_URL);
    });
  }

  function consumePreloadedFont() {
    if (document.getElementById("ugc-preload-font-consume")) return;
    var preloadLink = null;
    qsa('link[rel="preload"][as="font"]').forEach(function (link) {
      var href = link.getAttribute("href") || "";
      if (
        href.indexOf("83afe278b6a6bb3c-s.p.0q-301v4kxxnr.woff2") !== -1 &&
        !preloadLink
      ) {
        preloadLink = href;
      }
    });
    if (!preloadLink) return;

    var style = document.createElement("style");
    style.id = "ugc-preload-font-consume-style";
    style.textContent =
      '@font-face{font-family:"ugc-preload-consume";src:url("' +
      preloadLink +
      '") format("woff2");font-style:normal;font-weight:400;font-display:swap;}' +
      '#ugc-preload-font-consume{position:fixed;left:-9999px;top:-9999px;opacity:0;pointer-events:none;font-family:"ugc-preload-consume",sans-serif;font-size:12px;line-height:1;}';
    document.head.appendChild(style);

    var probe = document.createElement("span");
    probe.id = "ugc-preload-font-consume";
    probe.textContent = "font";
    document.body.appendChild(probe);
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

        var supportButton = event.target.closest("[data-ugc-discord]");
        if (supportButton) {
          event.preventDefault();
          window.open(DISCORD_SUPPORT_URL, "_blank", "noopener,noreferrer");
          return;
        }

        var productLink = event.target.closest("#products a");
        if (productLink) {
          if (productLink.getAttribute("data-ugc-stripe-link") === "true") {
            event.preventDefault();
            fallbackOpenStripe(productLink);
          }
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
          openExampleOverlay(portfolioCard);
        }
      },
      true,
    );

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeReaderOverlay();
        closeExampleOverlay();
      }
      if (event.key === "Enter" || event.key === " ") {
        var portfolioCard = event.target.closest('[role="button"][aria-label*="Expand inspiration map"] > .grid > div');
        if (portfolioCard) {
          event.preventDefault();
          openExampleOverlay(portfolioCard);
        }
      }
    });
  }

  function ensureExampleOverlay() {
    var overlay = document.getElementById("ugc-example-overlay");
    if (overlay) return overlay;

    overlay = document.createElement("div");
    overlay.id = "ugc-example-overlay";
    overlay.className = "ugc-example-overlay";
    overlay.innerHTML =
      '<button type="button" class="ugc-example-close" aria-label="Close example overlay">×</button>' +
      '<div class="ugc-example-shell">' +
      '  <div class="ugc-example-media-wrap"></div>' +
      "</div>";
    document.body.appendChild(overlay);

    var close = overlay.querySelector(".ugc-example-close");
    close.addEventListener("click", closeExampleOverlay);
    overlay.addEventListener("click", function (event) {
      if (event.target === overlay) closeExampleOverlay();
    });

    return overlay;
  }

  function closeExampleOverlay() {
    var overlay = document.getElementById("ugc-example-overlay");
    if (!overlay) return;
    overlay.classList.remove("open");
    document.body.classList.remove("reader-open");
    var wrap = overlay.querySelector(".ugc-example-media-wrap");
    if (wrap) wrap.innerHTML = "";
  }

  function openExampleOverlay(portfolioCard) {
    if (!portfolioCard) return;
    var overlay = ensureExampleOverlay();
    var wrap = overlay.querySelector(".ugc-example-media-wrap");
    if (!wrap) return;
    wrap.innerHTML = "";

    var sourceVideo = portfolioCard.querySelector("video");
    var sourceImage = portfolioCard.querySelector("img");

    if (sourceVideo) {
      var video = document.createElement("video");
      video.src = sourceVideo.currentSrc || sourceVideo.getAttribute("src") || "";
      video.autoplay = true;
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.controls = false;
      video.preload = "auto";
      video.className = "ugc-example-media";
      video.setAttribute("controlsList", "nodownload noplaybackrate noremoteplayback nofullscreen");
      video.setAttribute("disablePictureInPicture", "true");
      video.setAttribute("aria-hidden", "true");
      var playAttempt = video.play();
      if (playAttempt && typeof playAttempt.catch === "function") {
        playAttempt.catch(function () {});
      }
      wrap.appendChild(video);
    } else if (sourceImage) {
      var img = document.createElement("img");
      img.src = sourceImage.currentSrc || sourceImage.getAttribute("src") || "";
      img.alt = sourceImage.getAttribute("alt") || "Example";
      img.className = "ugc-example-media";
      wrap.appendChild(img);
    } else {
      return;
    }

    overlay.classList.add("open");
    document.body.classList.add("reader-open");
  }

  function fallbackOpenStripe(linkEl) {
    var href = linkEl ? linkEl.getAttribute("href") : "";
    var destination = href || STRIPE_DEFAULT_CHECKOUT_URL;
    window.open(destination, "_blank", "noopener,noreferrer");
  }

  function applyHomeSurface() {
    ensureTopHeader();
    ensureHeadlineArea();
    ensureScrollingShowcase();
    removeAboutSectionAndTightenTop();
    normalizeBrandAndIntro();
    removeWritingSection();
    renderProductsGrid();
    syncPortfolio();
    syncContactSection();
    syncFooterLocation();
    syncBrowserIcons();
    consumePreloadedFont();
    setupLazyVideos();
    startHeroHeadlineWordRotation();
  }

  function runStabilizedPasses() {
    setTimeout(function () {
      applyHomeSurface();
    }, 450);
  }

  function startObserver() {
    var scheduled = false;
    var suppressUntil = 0;
    var observer = new MutationObserver(function (mutations) {
      var onlyHeroWordMutations = mutations.length > 0 && mutations.every(function (mutation) {
        var node = mutation.target;
        var element = node && node.nodeType === 1 ? node : node && node.parentElement;
        return !!(element && element.closest("[data-ugc-hero-headline]"));
      });
      if (onlyHeroWordMutations) return;
      if (Date.now() < suppressUntil) return;
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(function () {
        scheduled = false;
        applyHomeSurface();
        suppressUntil = Date.now() + 220;
      });
    });
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: false,
    });
  }

  installReaderEvents();
  applyHomeSurface();
  runStabilizedPasses();
  startObserver();
})();
