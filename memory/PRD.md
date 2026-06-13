# XPDC Group — Freight Forwarding Landing Page

## Original Problem Statement
Build landing page for Freight Forwarding (XPDC Group / PT Xentra Platform Digital Cargo) with Air Freight, LCL, FCL services. Per-service "Get Inquiry" CTA opening a quote form with loading + success/error toasts. Design reference: sougen.co (preloader, 3D scroll, parallax, animated 3D ship/cargo plane). Multi-language ID/EN. Dark/Light mode.

## User Choices (verbatim)
- Inquiry data: NOT stored in DB, NOT emailed — proxied POST to `https://xpdcargo.id/login/BindV6/onInsertInquiryFreightForwarding`.
- 3D objects: Cargo ship + Cargo plane (alternating).
- Sections: About, Why Choose Us, Process, Contact + Testimonials + Tracking placeholder.
- Default language: English.
- Office address: Commercial Park ACP2 No. UG 16, RT.002/RW.007, Neglasari, Kec. Neglasari, Kota Tangerang, Banten 15129.
- Contact email: halo@forwarding.xpdc.co.id.

## Architecture
- Frontend: React 19 + CRA/Craco + Tailwind + shadcn/ui + framer-motion + lenis + react-three-fiber + drei + three.
- Backend: FastAPI + httpx proxy. `/api/health` and `/api/inquiry` (validates payload, forwards form-encoded to XPDC URL).
- MongoDB: connected for env compat, unused (no persistence required).

## Implemented (2026-06-13)
- Cinematic preloader with 0–100% counter, curtain split reveal.
- Header: logo, nav, lang toggle (EN/ID), theme toggle, Get Quote CTA, mobile menu.
- Continuous fixed 3D Canvas with stylised low-poly cargo ship + cargo plane, scroll-bound rotation, Float animation.
- Hero with massive Clash Display typography ("Global freight. Beyond borders."), stats strip, scroll cue.
- About section with 3 pillars (digital orchestration, customs-aware routing, carrier-neutral).
- Services bento (Tetris layout) for Air Freight, FCL, LCL — each with `Get Inquiry` testid'd CTA.
- Inquiry modal (shadcn Dialog) with 10 fields, loading state, sonner toasts on success/error, posts to `/api/inquiry`.
- Why Choose Us 4-up stat grid.
- Vertical Process timeline with scroll-bound primary fill.
- Testimonials marquee.
- Tracking input (mocked client-side lookup).
- Footer/contact section with address & email, ticker, copyright.
- Theme persistence (localStorage `xpdc-theme`) + Language persistence (localStorage `xpdc-lang`).
- Smooth scroll via Lenis.

## API Surface
- GET `/api/health` → `{status, ts}`
- POST `/api/inquiry` body: `{service_type, full_name, company?, email, phone, origin, destination, cargo_type?, weight?, volume?, ready_date?, notes?}`. Returns `{success, inquiry_id, upstream_status, message}`.

## Testing
- iteration_1.json — 7/7 backend + 15/15 frontend scenarios passed.

## Backlog / Next Actions
- P1: Replace stylised low-poly meshes with real GLTF cargo ship/plane models when assets available.
- P1: Add anti-spam (Turnstile/reCAPTCHA) on inquiry endpoint.
- P2: Wire real shipment tracking once API available from XPDC.
- P2: Add SEO meta tags + Open Graph image.
- P2: Sitemap, robots.txt, structured data (LocalBusiness).
- P3: Convert inquiry to also email halo@forwarding.xpdc.co.id when SMTP/Resend is provisioned.
