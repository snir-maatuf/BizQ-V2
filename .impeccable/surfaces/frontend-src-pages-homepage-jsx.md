---
version: 1
slug: "frontend-src-pages-homepage-jsx"
primary_target: "frontend/src/pages/HomePage.jsx"
related_targets: ["frontend/src/features/Generics/NavBar.jsx"]
---

# Surface brief — Home (`/`)

Scope: the public landing page at `/`, plus the shared `NavBar` and a new global MUI theme
(the "design system" half of this task). Visitor mode: **Persuade** — a first-time visitor
must understand what BizQ is and start a booking within seconds.

Audience: a customer in Israel, phone-first, who needs a local service appointment
(barber, clinic, studio, tutor) this week and wants to skip the phone call.
Action: run the hero search or tap a category → land on the results page.
Owner path: a relabelled nav CTA ("List your business" / "Business log in") to the
existing `/signup` and `/login` (there are no customer accounts; owner auth is all there is).
Constraints: keep routing to `/FilterBusiness/:category` and `/FilterBusiness/all`; reuse
`getLocationByIP` (`api/Location.jsx`, writes `localStorage.currentCity`); MUI 6 stack;
no image-generation available so the page is typographic, not illustrated.

Unresolved: real per-business availability on Home is out of scope for v1 (illustrative copy
only where a slot would show); customer accounts are a separate future project.

## Direction contract

THESIS: The home page is a **search-first utility landing page** — headline states the offer,
a single prominent search bar (service + city) is the hero, categories sit directly beneath
it as quick entries, and "how it works" is one scroll down. It refuses the abstract
concept-hero and the SaaS gradient-with-three-feature-cards template; it looks like a tool
people already know how to use (OpenTable, Fresha, Booking), executed with care.

OWN-WORLD: Warm off-white ground (`#fbfaf6`), near-black ink (`#1e1b16`), one accent —
**trust green `#1f6f5c`** — carrying the wordmark's Q, primary buttons, focus, and links,
nothing else. Soft warm-neutral shadows (no colour halos). Fully rounded: 10–14px on
surfaces, pill on the search button and chips. Type: **Bricolage Grotesque** for the
wordmark and headings (a face with a point of view), **Figtree** for UI and body. Generous
line height, one 8px spacing rhythm. Motion via Framer Motion: a single staggered entrance
from a near-visible resting state, hover lift on chips and cards, nothing scattered.

STORY: The visitor reads "Book a local business near you", understands BizQ finds nearby
service businesses and books a real time with no account, types what they need (or taps a
category), and is taken to results scoped to their city. An owner sees a clear, secondary
path to list their business.

FIRST VIEWPORT: Opaque nav (wordmark left; "How it works" + owner CTA + "Business log in"
right). Centered hero: H1 (Bricolage, ~44px), one-line subhead, then the search bar — a
single rounded white field-group holding [service or business] · [city, pre-filled from IP] ·
[Search, green pill]. Below: five category chips in a centered row. Below that: a quiet
trust line ("N businesses taking bookings near תל אביב" — shown only when the real Firestore
count clears a threshold, else qualitative). The top of "How it works" peeks above the fold.

FORM: Search-first landing page. Position on the ordered list: user-pinned (chose it from a
built preview and confirmed). Seed key: n/a — direction is user-pinned, concept-seed roll
skipped per new-work ("a user- or brief-pinned direction beats the roll").

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review,
the verdict, DESIGN.md, and every shipping raster carrying its provenance.
