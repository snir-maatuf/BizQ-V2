# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: **customers** looking for a local service business (aesthetics, hair, fitness,
education, health) and wanting to book an appointment without phone calls or back-and-forth.
They arrive by category or by browsing all businesses, look at a business's details and
availability, pick a service and time slot, and confirm. They may later need to cancel.

Secondary: **business owners** who register their business, describe it, set weekly working
hours and services, and manage the resulting appointment calendar (month/day views, cancel).

Auth today is minimal — a `userId` in `localStorage` distinguishes a logged-in owner from an
anonymous visitor; there is no customer account.

## Product Purpose

BizQ is a scheduling platform that connects local service businesses with customers in one
flow: discover a nearby business by category, then book it. It exists to remove the friction
of finding and booking small service providers. Success = a customer discovers a business
and completes a booking in one session, and an owner fills their calendar without manual
coordination.

## Positioning

**Local discovery + booking in one product.** Unlike scheduling-only tools (Calendly) or
directories without integrated booking, BizQ pairs category-based discovery of nearby
businesses with the appointment flow. The discovery step — browse by category / see all,
scoped to the visitor's location — is the hook that a booking-link tool cannot copy.

## Operating Context

- Customer journey: Home (category cubes + "Show All") → Filtered businesses list →
  Business details → Appointment (service + date/time selection → summary → confirm).
  Cancellation via a dedicated link/route.
- Owner journey: Sign up / register business → Business management → Scheduler (DevExpress
  month + day views) → edit business.
- Location is resolved by IP on load and used to scope business results.
- Routes in place: `/`, `/Login`, `/SignUp/:userId?`, `/FilterBusiness/:category`,
  `/FilterBusiness/all`, `/BusinessDetails/:userId`, `/BusinessOwner/:id`,
  `/Appointment/:id`, `/CancelAppointment/:appointmentId`, `/SchedulerPage`,
  `/BusinessManagement`.

## Capabilities and Constraints

- Current stack: Vite + React 18, Material UI 6, `@devexpress/dx-react-scheduler`,
  React Router 7, Firebase (client SDK + Firestore) with an Express + firebase-admin
  backend. Deployed on Netlify (`https://bizq.netlify.app/`).
- **Nothing is locked** — stack, brand (name "BizQ", the #667eea→#764ba2 purple gradient),
  and the fixed five categories (Aesthetics, Education, Fitness, Hair salons, Health) are
  all open to change in future design work.
- Firestore collections in use include `businesses` and appointments; business records carry
  `businessName`, `description`, `address.city`, `phone`, working days, services.
- Undecided product facts: customer accounts / auth model; payments; notifications/reminders;
  reviews and ratings; multi-staff businesses; real category taxonomy and geographic market.

## Brand Commitments

None binding. Current identity ("BizQ", purple gradient, frosted-glass surfaces, MUI
defaults) is treated as evidence, not a commitment.

## Evidence on Hand

- Working app with real routes and Firebase integration (not mock).
- Tagline in use: "Smart scheduling platform — connecting businesses and customers in one
  seamless solution."
- Category icon art at `/static/topics/*.png`.
- No testimonials, customer logos, usage metrics, press, or case studies exist — future
  work must not fabricate them.

## Product Principles

1. Discovery and booking are one continuous flow, not two separate products.
2. The customer path must work with zero prior account or setup.
3. Location-relevance is a feature: show what the visitor can actually reach.
4. Owner tooling stays lightweight — register, set hours, watch the calendar fill.
5. Every appointment is cancellable without friction by either side.

## Accessibility & Inclusion

No product-specific requirement established. Treat WCAG AA as the baseline for future work.
