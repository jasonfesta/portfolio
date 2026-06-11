# Site Structure (Simple)

This local build now runs with two clear surfaces:

1. `index.html` + `ui-tweaks.css` + `ui-tweaks.js`  
   Home page layout, section labels, cards, and full-screen overlay behavior.
2. Full-screen detail pages (`/writing/*.html` and `/products/*.html`)  
   Shared visual system powered by `writing/_article.css`.

## What to edit most often

- Home content lists:
  - `ui-tweaks.js` -> `CONTENT.projects`
  - `ui-tweaks.js` -> `CONTENT.motion`
  - `ui-tweaks.js` -> `CONTENT.portfolioItems`
  - `ui-tweaks.js` -> `CONTENT.writingItems`
- Home visual tweaks:
  - `ui-tweaks.css`
- Full-screen view styles (writing + products):
  - `writing/_article.css`
  - `portfolio/_portfolio.css` (portfolio-specific pill styling)

## Why this is simpler now

- Product detail pages no longer maintain a second duplicate stylesheet.
- `products/_product.css` imports `writing/_article.css` and only keeps product-only styles.
- Home behavior no longer depends on long polling loops; it uses one pass + mutation observer.
