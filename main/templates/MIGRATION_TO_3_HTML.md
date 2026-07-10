# Migration to 3 Clean HTML Files

This scaffolds the new structure without changing current live rendering.

## New Templates

- `templates/home.html`
- `templates/product.html`
- `templates/content.html`

These are tokenized templates intended for a build step.

## Current Status

- Existing `index.html` and current JS-driven rendering remain untouched.
- New templates are added only as migration artifacts.
- No routing cutover has happened yet.

## Phase 3 (Completed)

Create md content model and wire it to a builder:

- `content/site/home.md`
- `content/products/*.md`
- `content/content/*.md`
- `scripts/build-pages.js`

Builder responsibilities:

1. Parse frontmatter/body from md.
2. Render pages from template tokens.
3. Output generated files into `dist/`.

## Cutover Rule

Do not edit generated html directly.
Only edit templates + md data.
