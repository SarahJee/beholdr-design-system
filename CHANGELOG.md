# Changelog

What's changed in the package, newest first. Only changes that affect the site are listed here. The scripts in `figma/` are for the designer and don't need to be copied into the site.

## 29 October 2026

**View Toggle** (`css/components.css`, `components/beholdr-components.js`)
- Labels now use the Button/Text style: weight 670, 20px line height, no letter spacing. They were weight 450, 16px line height, 0.02em letter spacing.
- The List icon is now 16px. The Map icon stays at 24px.
- This matches the Figma component `M_View Toggle`.

## 27 October 2026

**Heading links** (`css/tokens.css`)
- Added `.type-link-h3`, `.type-link-h4`, and `.type-link-h5`, for card titles that are links: the heading style with a dotted underline (7% thick, 15% offset).
- They match the Figma styles Link/h3, Link/h4, and Link/h5.

## 17 October 2026

**First release**
- Tokens: colour, spacing, radius, font weights, and responsive type (`css/tokens.css`, `tokens/tokens.json`).
- The Forno Standard Variable font, with metric overrides (`css/fonts.css`, `fonts/`).
- Tailwind v3 preset and v4 theme (`tailwind/`).
- Reference styles and components for 32 components (`css/components.css`, `components/`).
