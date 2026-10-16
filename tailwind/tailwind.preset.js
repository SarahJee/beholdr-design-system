// Tailwind v3 preset. In tailwind.config.js: presets: [require("./tailwind.preset.js")]. Also import css/tokens.css and css/fonts.css.
module.exports = {
  "theme": {
    "extend": {
      "colors": {
        "text-black": "var(--text-black)",
        "text-white": "var(--text-white)",
        "text-accent": "var(--text-accent)",
        "surface-white": "var(--surface-white)",
        "surface-black": "var(--surface-black)",
        "surface-accent": "var(--surface-accent)",
        "surface-placeholder": "var(--surface-placeholder)",
        "border-black": "var(--border-black)",
        "border-white": "var(--border-white)",
        "border-accent": "var(--border-accent)",
        "icon-black": "var(--icon-black)",
        "icon-white": "var(--icon-white)",
        "category-neighborhoods": "var(--category-neighborhoods)",
        "category-guides": "var(--category-guides)",
        "category-art-spaces": "var(--category-art-spaces)",
        "category-other-places": "var(--category-other-places)",
        "category-exhibitions": "var(--category-exhibitions)",
        "category-eat-drink": "var(--category-eat-drink)",
        "category-shop": "var(--category-shop)",
        "category-relax": "var(--category-relax)",
        "category-stay": "var(--category-stay)",
        "category-tint-art-spaces": "var(--category-tint-art-spaces)",
        "category-tint-eat-drink": "var(--category-tint-eat-drink)",
        "category-tint-shop": "var(--category-tint-shop)",
        "category-tint-relax": "var(--category-tint-relax)",
        "category-tint-stay": "var(--category-tint-stay)"
      },
      "spacing": {
        "0": "0px",
        "1": "4px",
        "2": "8px",
        "3": "12px",
        "4": "16px",
        "6": "24px",
        "8": "32px",
        "10": "40px",
        "12": "48px",
        "16": "64px",
        "20": "80px",
        "24": "96px",
        "30": "120px",
        "32": "128px",
        "46": "184px"
      },
      "fontSize": {
        "display-1": [
          "var(--type-display-1)",
          {
            "lineHeight": "var(--type-display-1--line-height)",
            "letterSpacing": "var(--type-display-1--letter-spacing)",
            "fontWeight": "var(--type-display-1--weight)"
          }
        ],
        "display-2": [
          "var(--type-display-2)",
          {
            "lineHeight": "var(--type-display-2--line-height)",
            "letterSpacing": "var(--type-display-2--letter-spacing)",
            "fontWeight": "var(--type-display-2--weight)"
          }
        ],
        "h1": [
          "var(--type-h1)",
          {
            "lineHeight": "var(--type-h1--line-height)",
            "letterSpacing": "var(--type-h1--letter-spacing)",
            "fontWeight": "var(--type-h1--weight)"
          }
        ],
        "h2": [
          "var(--type-h2)",
          {
            "lineHeight": "var(--type-h2--line-height)",
            "letterSpacing": "var(--type-h2--letter-spacing)",
            "fontWeight": "var(--type-h2--weight)"
          }
        ],
        "h3": [
          "var(--type-h3)",
          {
            "lineHeight": "var(--type-h3--line-height)",
            "letterSpacing": "var(--type-h3--letter-spacing)",
            "fontWeight": "var(--type-h3--weight)"
          }
        ],
        "h4": [
          "var(--type-h4)",
          {
            "lineHeight": "var(--type-h4--line-height)",
            "letterSpacing": "var(--type-h4--letter-spacing)",
            "fontWeight": "var(--type-h4--weight)"
          }
        ],
        "h5": [
          "var(--type-h5)",
          {
            "lineHeight": "var(--type-h5--line-height)",
            "letterSpacing": "var(--type-h5--letter-spacing)",
            "fontWeight": "var(--type-h5--weight)"
          }
        ],
        "h6": [
          "var(--type-h6)",
          {
            "lineHeight": "var(--type-h6--line-height)",
            "letterSpacing": "var(--type-h6--letter-spacing)",
            "fontWeight": "var(--type-h6--weight)"
          }
        ],
        "body-xl": [
          "var(--type-body-xl)",
          {
            "lineHeight": "var(--type-body-xl--line-height)",
            "letterSpacing": "var(--type-body-xl--letter-spacing)",
            "fontWeight": "var(--type-body-xl--weight)"
          }
        ],
        "body-lg": [
          "var(--type-body-lg)",
          {
            "lineHeight": "var(--type-body-lg--line-height)",
            "letterSpacing": "var(--type-body-lg--letter-spacing)",
            "fontWeight": "var(--type-body-lg--weight)"
          }
        ],
        "body-lg-bold": [
          "var(--type-body-lg-bold)",
          {
            "lineHeight": "var(--type-body-lg-bold--line-height)",
            "letterSpacing": "var(--type-body-lg-bold--letter-spacing)",
            "fontWeight": "var(--type-body-lg-bold--weight)"
          }
        ],
        "body": [
          "var(--type-body)",
          {
            "lineHeight": "var(--type-body--line-height)",
            "letterSpacing": "var(--type-body--letter-spacing)",
            "fontWeight": "var(--type-body--weight)"
          }
        ],
        "body-bold": [
          "var(--type-body-bold)",
          {
            "lineHeight": "var(--type-body-bold--line-height)",
            "letterSpacing": "var(--type-body-bold--letter-spacing)",
            "fontWeight": "var(--type-body-bold--weight)"
          }
        ],
        "body-sm": [
          "var(--type-body-sm)",
          {
            "lineHeight": "var(--type-body-sm--line-height)",
            "letterSpacing": "var(--type-body-sm--letter-spacing)",
            "fontWeight": "var(--type-body-sm--weight)"
          }
        ],
        "body-sm-bold": [
          "var(--type-body-sm-bold)",
          {
            "lineHeight": "var(--type-body-sm-bold--line-height)",
            "letterSpacing": "var(--type-body-sm-bold--letter-spacing)",
            "fontWeight": "var(--type-body-sm-bold--weight)"
          }
        ],
        "body-xs": [
          "var(--type-body-xs)",
          {
            "lineHeight": "var(--type-body-xs--line-height)",
            "letterSpacing": "var(--type-body-xs--letter-spacing)",
            "fontWeight": "var(--type-body-xs--weight)"
          }
        ],
        "link-lg": [
          "var(--type-link-lg)",
          {
            "lineHeight": "var(--type-link-lg--line-height)",
            "letterSpacing": "var(--type-link-lg--letter-spacing)",
            "fontWeight": "var(--type-link-lg--weight)"
          }
        ],
        "link": [
          "var(--type-link)",
          {
            "lineHeight": "var(--type-link--line-height)",
            "letterSpacing": "var(--type-link--letter-spacing)",
            "fontWeight": "var(--type-link--weight)"
          }
        ],
        "link-sm": [
          "var(--type-link-sm)",
          {
            "lineHeight": "var(--type-link-sm--line-height)",
            "letterSpacing": "var(--type-link-sm--letter-spacing)",
            "fontWeight": "var(--type-link-sm--weight)"
          }
        ],
        "button": [
          "var(--type-button)",
          {
            "lineHeight": "var(--type-button--line-height)",
            "letterSpacing": "var(--type-button--letter-spacing)",
            "fontWeight": "var(--type-button--weight)"
          }
        ]
      },
      "fontFamily": {
        "sans": [
          "var(--font-sans)"
        ]
      },
      "fontWeight": {
        "regular": "450",
        "semibold": "650",
        "bold": "670"
      },
      "borderRadius": {
        "none": "0px",
        "sm": "4px",
        "full": "9999px"
      }
    }
  }
};
