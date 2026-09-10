---
name: BizQ
description: Book a local business near you — a search-first landing page in warm off-white with one trust-green accent.
colors:
  green: "#1f6f5c"
  green-deep: "#185a4a"
  green-soft: "#e3f0ec"
  ink: "#1e1b16"
  ink-soft: "#544e44"
  muted: "#5f5d55"
  faint: "#6b685f"
  ground: "#fbfaf6"
  paper: "#ffffff"
  line: "#e8e4db"
  field-fill: "#f5f3ee"
typography:
  display:
    fontFamily: "'Bricolage Grotesque', 'Figtree', -apple-system, sans-serif"
    fontSize: "clamp(2.5rem, 5vw, 3.5rem)"
    fontWeight: 800
    lineHeight: 1.06
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "'Bricolage Grotesque', 'Figtree', -apple-system, sans-serif"
    fontSize: "clamp(1.35rem, 3vw, 1.75rem)"
    fontWeight: 700
    lineHeight: 1.18
    letterSpacing: "-0.02em"
  body:
    fontFamily: "'Figtree', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "'Figtree', -apple-system, sans-serif"
    fontSize: "0.66rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.09em"
rounded:
  sm: "10px"
  md: "12px"
  lg: "16px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "48px"
  xl: "88px"
components:
  button-primary:
    backgroundColor: "{colors.green}"
    textColor: "{colors.paper}"
    rounded: "{rounded.md}"
    padding: "8px 18px"
  button-primary-hover:
    backgroundColor: "{colors.green-deep}"
    textColor: "{colors.paper}"
    rounded: "{rounded.md}"
    padding: "8px 18px"
  button-pill:
    backgroundColor: "{colors.green}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "8px 20px"
  chip:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
  chip-hover:
    backgroundColor: "{colors.green-soft}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
  search-field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "8px"
  nav:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    height: "64px"
    padding: "0 24px"
  owner-band:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.lg}"
    padding: "36px 40px"
---

# Design System: BizQ

## Overview

**Creative North Star: "The High-Street Front Desk"**

BizQ's home page is a search-first utility landing page — the kind of surface people already
know how to use from OpenTable, Fresha, or Booking. It states the offer in one line, puts a
single prominent search bar at the centre of the hero, lays the five service categories
directly beneath it as quick entries, and keeps "how it works" one scroll down. It
deliberately refuses two category defaults: the abstract concept-hero (a mood, not a page)
and the SaaS gradient-with-three-feature-cards template.

The surface is warm and plain-spoken. A near-white ground with a faint warmth to it
(`#fbfaf6`), near-black ink, and exactly one accent — **trust green `#1f6f5c`** — which
appears only on things the visitor can act on: the wordmark's Q, the Search button, primary
CTAs, links, focus rings, and the step numerals' tint. Depth is minimal: one soft,
warm-neutral shadow under the search bar, hairline dividers elsewhere. Nothing glows.

Type does the identity work. **Bricolage Grotesque** — a grotesque with a real point of view
(a subtle optical-size wobble, slightly humanist proportions) — carries the wordmark and
every heading at heavy weight. **Figtree**, a clean workhorse, carries all UI and body text.
Hierarchy is a hard jump from 800-weight display to 400-weight body, not a ladder of
in-between weights.

**Key Characteristics:**
- Search bar as the hero — the primary action is a field group, not a link
- One trust-green accent, reserved for interactive and brand elements only
- Warm off-white ground; faint warm blooms for atmosphere, never flat colour blocks
- Bricolage Grotesque display against Figtree body; weight jump carries hierarchy
- Rounded but restrained: 10–16px on surfaces, pill on chips and nav CTAs
- One soft warm-neutral shadow (under the search bar); hairlines everywhere else
- Motion is one below-the-fold reveal; the hero renders at rest and is usable at first paint

## Colors

A near-monochrome warm-neutral system with a single green accent.

### Primary
- **Trust Green** (`#1f6f5c`): the one accent. Search button, `List your business` / primary
  CTAs, links, focus ring, the wordmark's "Q", the step-number tint (`#e3f0ec` fill). Used on
  well under 10% of any screen — its scarcity is the point.
- **Green Deep** (`#185a4a`): hover/pressed state of every green fill.
- **Green Soft** (`#e3f0ec`): tint fill behind step numerals and the category-chip hover.

### Neutral
- **Ink** (`#1e1b16`): headings, wordmark, primary body text.
- **Soft Ink** (`#544e44`): the hero subhead and other secondary reading text.
- **Muted** (`#5f5d55`): nav links, footer links, quiet labels.
- **Faint** (`#6b685f`): the trust line, field kicker labels, footer copyright — the lightest
  text used, still AA against the warm ground.
- **Ground** (`#fbfaf6`): the page plane, set on `body` and the fixed `Background`.
- **Paper** (`#ffffff`): the nav bar, the search-bar container, cards.
- **Line** (`#e8e4db`): hairline borders and dividers.
- **Field Fill** (`#f5f3ee`): reserved for inset input surfaces.

### Atmosphere (background only)
Two very faint blurred blooms fixed behind everything: a green one
(`rgba(31,111,92,0.06)`) top-left, a warm sand one (`rgba(214,180,130,0.10)`) bottom-right,
each `blur(90px)`. Quiet enough to sit under any downstream surface.

### Named Rules
**The One-Accent Rule.** Green appears only on interactive or brand elements — Search button,
CTAs, links, focus, the wordmark Q. It never fills a heading, a body paragraph, a page
region, or a static container.

**The No-Glow Rule.** Depth is a single soft shadow (`0 10px 30px rgba(31,111,92,0.08)`,
under the search bar only) plus 1px hairlines. No coloured halos, no shadow on every card.

## Typography

**Display Font:** Bricolage Grotesque (600/700/800), with Figtree then the system sans as
fallback.
**Body / UI Font:** Figtree (400/500/600/700), with the system sans as fallback.

**Character:** the display face is confident and a touch idiosyncratic; the body face is
invisible on purpose. The pairing reads as "a real product made this", not "a template".

### Hierarchy
- **Display** (800, `clamp(2.5rem, 5vw, 3.5rem)`, line-height 1.06, tracking `-0.03em`):
  the hero H1 only. `text-wrap: balance`.
- **Headline** (700, `~1.35–1.75rem`, tracking `-0.02em`): section titles ("How it works"),
  the owner-band heading.
- **Title** (700, `~1rem`): step titles, the wordmark, business names.
- **Body** (400, `~1rem`, line-height 1.5): the hero subhead (in Soft Ink), step
  descriptions, helper text. Measure ~46ch on the subhead.
- **Label** (600, `~0.66rem`, tracking `0.09em`, uppercase): the search-field kickers
  ("SERVICE OR BUSINESS", "WHERE"). Sentence case everywhere else — buttons included.

### Named Rules
**The Weight-Jump Rule.** Hierarchy comes from jumping 800 → 400, not from 500–600
intermediates. The only uppercase text is the two search-field kicker labels.

## Layout

A single centred column, `Container maxWidth="md"`, `24px` side padding (`20px` on mobile).
Vertical rhythm is one 8px scale through MUI spacing units. The home page is a flex column
sized to the content area (viewport − 64px nav): the hero grows to fill and vertically
centres its own content (`maxWidth: 640`), and the compact band (How it works, owner CTA,
footer) is `flex-shrink: 0` at the bottom. It fits common desktop heights with no scroll;
shorter viewports and mobile scroll rather than clip.

The hero is centred text; the band below is left-aligned. The search bar is a horizontal
field group up to `maxWidth: 620` that stacks to a vertical group below `sm` (service field,
hairline, city field, full-width Search button). Category chips wrap in a centred row.
"How it works" is a 3-column grid on `sm+`, one column on mobile.

The app shell is a `100vh` flex column: static nav, then the page content in a
`flex: 1; overflow-y: auto` region — so every route's content area is exactly the viewport
minus the nav, with no offset hack.

## Elevation & Depth

Near-flat. The only shadow is `0 10px 30px rgba(31,111,92,0.08)` under the hero search bar —
soft, wide, faintly green-tinted, signalling "this is the thing to use". Everything else
separates with a 1px `#e8e4db` hairline or a fill change. The nav is a flat `#ffffff` bar
with a hairline bottom border, no blur, no shadow.

### Named Rule
**The Flat-Nav Rule.** The nav is opaque white with one bottom hairline. It reads correctly
over the new home ground and over the older frosted downstream pages precisely because it
commits to neither — it is just a solid bar.

## Shapes

Rounded but disciplined, three tiers:
- **Surfaces** — the search-bar container, cards, the owner band: `12–16px`.
- **Controls** — buttons: `12px`; nav CTAs and category chips: full pill (`999px`).
- **Ornament** — step numerals: `50%` circles.

Borders are 1px hairlines (`#e8e4db`) and used freely for separation, since there is almost
no shadow to do that job. No border thicker than 1px anywhere.

## Components

### Buttons
- **Primary (Search, CTAs):** solid `#1f6f5c` fill, white text, weight 700, sentence case,
  `12px` radius (pill on nav CTAs), `~8px 18px` padding. Hover → `#185a4a`. No elevation.
- **Outlined (My business):** 1px green border, green text, pill, transparent fill; hover
  adds a faint green wash.
- **Text (Business log in):** muted-ink text, no fill, no border; hover darkens to ink.
- **On dark (owner band):** white fill, ink text, pill; hover → `#efece3`.

### Category chips
- Pill, 1px `#e8e4db` border, transparent fill, Soft-Ink text at `13px`/500.
- Hover: `#e3f0ec` fill, `#cfe4dd` border, `translateY(-1px)`, `0.18s ease`.
- Keyboard-focusable (`role="button"`, Enter/Space activate); green focus ring.

### Search bar (signature component)
- A `#ffffff` container, 1px `#e8e4db` border, `16px` radius (`12px` on mobile),
  `8px` inner padding, the one soft shadow.
- Two field cells (`Service or business`, `Where`) separated by a vertical hairline
  (horizontal hairline when stacked). Each cell: an uppercase `0.66rem` kicker label above an
  unboxed `InputBase` at `15px`.
- A solid-green Search button with a leading search icon, `12px` radius, right-aligned
  (full-width when stacked).
- Submits to `/FilterBusiness/all?q=<term>&city=<city>`.

### Navigation
- Static (in the app-shell flex column, not fixed), `#ffffff`, 64px, `1px #e8e4db` bottom
  border, inner content capped at 1200px. The page content area is exactly the viewport
  minus the nav — the home page fits it with no scroll.
- Left: the "BizQ" wordmark (Bricolage 800, green "Q"), a button that routes home.
- Right, auth-aware — logged out: "Business log in" (text) + "List your business" (green pill,
  → `/signup`; "List business" below `sm`); logged in: "My business" (outlined pill) +
  "Log out" (green pill). No other nav links.

### Owner band
- Full-width `#1e1b16` panel, `16px` radius, white text, one heading + one line of
  72%-opacity white body, and a white pill CTA. Row on desktop, stacked on mobile.

### Footer
- A hairline-topped row: the wordmark, three muted links (How it works, For businesses,
  Business log in), and a faint line ("Serving <city> and nearby · © <year> BizQ").

## Do's and Don'ts

### Do:
- **Do** keep green for interactive and brand elements only — the One-Accent Rule.
- **Do** state what BizQ is in the first line, and make the primary action (search or a
  category) reachable without scrolling.
- **Do** carry hierarchy with the 800 → 400 weight jump; reserve uppercase for the two
  search kicker labels.
- **Do** separate with 1px hairlines and fill changes; keep the single soft shadow for the
  search bar alone.
- **Do** render the hero at rest — readable and usable at first paint, no entrance animation.
- **Do** keep buttons and labels sentence case.

### Don't:
- **Don't** add a second accent colour, or fill a heading / region / container with green.
- **Don't** put a shadow on every card, or any coloured glow.
- **Don't** animate the hero, or park any above-the-fold element at `opacity: 0`.
- **Don't** reintroduce the old violet gradient, frosted-glass panels, or `backdrop-filter`
  as decoration — that world was replaced.
- **Don't** use a display face other than Bricolage Grotesque, or a body face other than
  Figtree.
- **Don't** make a border thicker than 1px.

---

_This world replaces the previous "Frosted Atrium" system across the whole app. Every route
now runs on the green theme, the flat `FrostedBackground` surface, and Bricolage/Figtree
type: home, `LoginPage`, `SignUpPage`, `FilteredBusinessesPage`, `BusinessOwnerPage`, the
appointment flow (`OptionsSection` / `OptionComponent` / `ScheduleSection` /
`AppointmentTimeSelection` / `AppointmentSummary`), `SchedulerPage`, `BusinessManagement`,
`CancelAppointment`. The DevExpress calendar on `SchedulerPage` picks up the theme's primary
green for its selection marker; its grid chrome stays close to the library default. No
hardcoded violet (`#667eea` / `#764ba2`) or gradient text remains in the source._
