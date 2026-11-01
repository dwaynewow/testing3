---
name: IVA AMU
description: A natural-stone jewelry storefront in deep teal, sand and apricot.
colors:
  paper: "#f7f0e4"
  sand: "#f1e6d3"
  ink: "#203e3a"
  teal: "#124f50"
  teal-hover: "#0a393b"
  apricot: "#edb48d"
  muted: "#52635f"
  line: "#dacbb4"
  soft: "#f3eadb"
  utility: "#e7d7bd"
  field: "#fff8ed"
  focus: "#98643d"
typography:
  display:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(37px, 3.4vw, 53px)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Manrope, sans-serif"
    fontSize: "34px"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.035em"
  product-title:
    fontFamily: "Manrope, sans-serif"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1.5
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.9
  art-caption:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "39px"
    fontWeight: 400
    lineHeight: 1.1
rounded:
  control: "5px"
  search: "7px"
  card: "9px"
  card-mobile: "6px"
  circle: "50%"
spacing:
  filter-gap: "10px"
  product-gap: "20px"
  section-block: "60px"
  section-mobile: "37px"
  page-gutter: "5%"
components:
  button-primary:
    backgroundColor: "{colors.red}"
    textColor: "{colors.paper}"
    rounded: "{rounded.control}"
    padding: "16px 22px"
  button-primary-hover:
    backgroundColor: "{colors.red-hover}"
  button-hero:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.hero-button-text}"
    rounded: "{rounded.control}"
    padding: "16px 22px"
  filter-active:
    backgroundColor: "{colors.red}"
    textColor: "{colors.paper}"
    rounded: "{rounded.control}"
    padding: "10px 18px"
  search:
    backgroundColor: "{colors.field}"
    textColor: "{colors.ink}"
    rounded: "{rounded.search}"
    padding: "15px 17px"
  product-card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
  drawer:
    backgroundColor: "{colors.paper}"
    padding: "32px"
    width: "min(520px, 100%)"
---

# Design System: IVA AMU

## Overview

A jewelry storefront in deep teal, warm sand and apricot, as explicitly requested by the user. The established catalogue layout, typography and interactions are preserved. The supplied IVA AMU logo and generated bracelet photography remain unchanged.

## Colors

Deep teal defines primary actions, selected filters, icons, hero and closing panels. Warm sand replaces white backgrounds. Apricot emphasizes hero text and the hero action and fills the personal-selection panel. Cream product cards contrast subtly against the sandy page. Dark green-gray secondary text maintains legibility. Legacy CSS variables `--red` and `--olive` both resolve to teal; `--rose` resolves to apricot.

## Typography

Locally bundled Manrope is the main family. Display: 37–53px, weight 600, line-height 1.15. Section headings: 34px desktop, 26px mobile. Product titles: 14px desktop, 11px mobile. Prices: 17px desktop, 14px mobile, weight 700. Cormorant Garamond remains for the photographic caption.

## Layout

Preserve search, category navigation, four-column desktop and two-column mobile catalogue. At 760px the header stacks with full-width search, hero and editorial panels become single-column, and navigation scrolls horizontally. Desktop sections use 5% gutters and 60px vertical padding; mobile sections use 5% and 37px.

## Elevation & Depth

Fine warm borders separate cards and fields. Product hover shadow and the existing drawer/backdrop remain. Photography supplies texture; do not introduce artificial gradients.

## Shapes

Product cards use 9px desktop and 6px mobile rounding. Primary controls use 5px rounding; search uses 7px. Favorite controls and the handmade stamp remain circular.

## Components

- Primary actions use teal with cream labels. Hover darkens teal.
- Hero action uses apricot with teal text, providing contrast against the teal panel.
- Product cards use cream surfaces and teal prices and controls. Mood tags use sand backgrounds.
- Personal-selection content uses an apricot panel with dark teal text and controls.
- Drawers use the light sand surface, cream fields and warm borders.
- Focus uses a brown outline on light backgrounds and apricot on teal panels.
- Search, favourites, cart, quiz and downloads retain their existing behavior.

## Do's and Don'ts

- Do retain the user's three-color palette and existing logo.
- Do verify readable text on apricot and teal surfaces.
- Don't reintroduce red retail accents or large pure-white backgrounds.
- Don't imply generated examples or demonstration prices are real inventory.
