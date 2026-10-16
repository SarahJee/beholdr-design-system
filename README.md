# Beholdr Design System

Design tokens, type, components, and the brand font for [beholdr.com](https://beholdr.com), generated from the Figma library **Beholdr Design System 2025-26**. Figma is the source of truth: change things there, then regenerate this package. Don't edit the generated files by hand.

The visual reference, with live component previews, is the Beholdr design system page in Claude.

## What's here

| Path | What it is |
| --- | --- |
| `css/tokens.css` | Every token as a CSS custom property: colour, spacing, radius, font weights, and responsive type. Also `.type-*` classes. |
| `css/fonts.css` | The `@font-face` rule for Forno Standard Variable, with the metric overrides (see below). |
| `css/components.css` | Reference styles for the 32 components. |
| `tailwind/theme.css` | Tailwind v4 theme (`@theme`). |
| `tailwind/tailwind.preset.js` | Tailwind v3 preset. |
| `tokens/tokens.json` | The tokens as data, for tooling. |
| `components/` | Reference React components (`beholdr-components.js`), their prop types (`index.d.ts`), and usage notes (`COMPONENTS.md`). |
| `fonts/` | The licensed Forno Standard Variable font file. This repo is private for that reason: don't make it public. |
| `figma/` | The script that collapses the Figma text styles onto the Responsive variables. |

## Getting started

1. Copy `fonts/`, `css/tokens.css`, and `css/fonts.css` into the site.
2. Import both stylesheets globally, `fonts.css` first.
3. **Tailwind v4:** after `@import "tailwindcss";`, add `@import "./tailwind/theme.css";`.
   **Tailwind v3:** add `presets: [require("./tailwind/tailwind.preset.js")]` to `tailwind.config.js`.
4. Use the semantic tokens (`text-black`, `surface-accent`, `category-art-spaces`…), never the `--color-*` primitives directly.

With Next.js, `next/font/local` works too. Pass the same metric overrides through its `declarations` option:

```js
import localFont from "next/font/local";
export const forno = localFont({
  src: "./fonts/FornoStandardVariable.woff2",
  weight: "100 900",
  variable: "--font-sans",
  declarations: [
    { prop: "ascent-override", value: "92%" },
    { prop: "descent-override", value: "22.5%" },
    { prop: "line-gap-override", value: "0%" },
  ],
});
```

## The font

**Forno Standard Variable**, one variable file covering weights 100 to 900. Beholdr uses three weights, set as numbers rather than names:

| Token | Weight | Used for |
| --- | --- | --- |
| `--font-weight-regular` | 450 | Body text, h6 labels |
| `--font-weight-semibold` | 650 | Bold body text, links |
| `--font-weight-bold` | 670 | Headings, button text |

**Keep the metric overrides.** The font file tells browsers to use one set of vertical measurements, and Figma uses another. Without the overrides, every line of text sits about 1px higher in the browser than in the designs, which shows in tight labels, tags, and buttons.

## Type

Mobile first. Every style has a size, line height, letter spacing, and weight that change at the tablet and desktop breakpoints:

- **Variables:** `--type-h1`, `--type-h1--line-height`, `--type-h1--letter-spacing`, `--type-h1--weight`.
- **Classes:** `.type-h1`, `.type-body`, `.type-link`, `.type-button`, and so on.
- **Tailwind v4:** `text-h1`, `text-body`, and so on.

Styles: `display-1`, `display-2`, `h1` to `h6`, `body-xl`, `body-lg`, `body-lg-bold`, `body`, `body-bold`, `body-sm`, `body-sm-bold`, `body-xs`, `link-lg`, `link`, `link-sm`, `button`. `h6` is an uppercase label, and the `link` styles are underlined.

**Breakpoints to confirm:** the package uses 48rem (768px) for tablet and 64rem (1024px) for desktop, the Tailwind `md` and `lg` defaults. Change the two media queries in `tokens.css` if the site uses different ones.

## Spacing and radius

Spacing is on an 8px grid with 4px half steps: `--space-0` to `--space-128`, plus `--space-120` for gaps between page sections and `--space-184` for large padding. In Tailwind the spacing unit is 4px, so `p-4` is 16px. Radius is `none` (0), `sm` (4px), or `full` (pills).

## Components

Each Figma component set is one component with a `device` prop (`desktop`, `tablet`, `mobile`) in place of the Figma `Device` property. Build one component per set and switch by breakpoint. `components/COMPONENTS.md` has the usage notes, and `components/index.d.ts` has the props. The reference components are plain React (`React.createElement`, no build step) and are a spec to build from, not a dependency.

## Not included yet

- **Card / Map:** only the Best of layout. The Big Map, Collection, Art Walk, and XL layouts are in Figma only.
- **Italics:** the font has an italic axis that isn't set up here.
- **Breakpoint widths:** see Type above.
