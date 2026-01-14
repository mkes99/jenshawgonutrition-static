# Jen Shawgo Nutrition — Astro v3

## Global layout/components
- `src/layouts/BaseLayout.astro` provides the shared `<html><head><body>` scaffold.
- `src/components/Header.astro` + `Footer.astro` extracted from the mirrored homepage.
- `src/components/CommonHead.astro` extracted from the mirrored homepage head (WP runtime removed). Page titles are set per-route.

## Blog
- Markdown posts in `src/content/blog/*.md`
- Frontmatter uses `excerpt` (not `description`)
- `tags` are sourced from `article:tag` only (categories are not used)

## Uploads too large
`public/_redirects` proxies `/wp-content/uploads/*` from live.

# Jen Shawgo Nutrition – Static Image Inventory
This document lists all images expected by the Astro build that were
previously causing 404s and have been normalized to local, static paths.

All images listed below should exist under `/public/wp-content/uploads/`
or `/public/wp-content/themes/psychare/`.

---

## Homepage / Hero Slider Images

These replace DigitalOcean Spaces and RevSlider dynamic paths.

- /wp-content/uploads/2024/06/homepage-new-scaled.jpg
- /wp-content/uploads/2024/06/home-page-banner-2-scaled.jpg

Used by:
- Home page hero slider
- Slider arrows preview thumbnails
- Slider bullet thumbnails

---

## Blog Images

### Blog card / featured images
Used on:
- Blog index
- Blog masonry layout
- Blog slug pages
- Related posts

Examples (actual set depends on your content):

- /wp-content/uploads/2024/01/fiber-why-this-nutrient-deserves-more-attention.jpg
- /wp-content/uploads/2024/02/non-negotiables-of-wellness.jpg
- /wp-content/uploads/2024/03/the-table-header.jpg

> NOTE:
> All blog images are normalized to `/wp-content/uploads/YYYY/MM/filename.ext`
> No `/version/`, no timestamps, no external hosts.

---

## Author / Avatar Images

Used in:
- Blog sidebar
- Author block
- Post meta

- /wp-content/uploads/2024/01/jen-shawgo-avatar.jpg

---

## Sidebar / Decorative Assets

These were common 404 offenders due to protocol-relative or malformed URLs.

- /wp-content/uploads/2024/06/dotted-pattern-large.png
- /wp-content/uploads/2020/10/map-pattern.png
- /wp-content/uploads/2020/11/bg-pattern-2.png
- /wp-content/uploads/2020/12/brush-effect-1-1.png
- /wp-content/uploads/2024/06/brush-effect.png

---

## Header / Section Backgrounds

Used across interior pages and blog hero sections.

- /wp-content/uploads/2024/05/everyBODY-header-scaled.jpg
- /wp-content/uploads/2025/06/personalized-nutrition-mid-page-scaled.jpg

---

## Logo Assets

Used in:
- Header
- Footer
- Blog pages
- Mobile nav

- /wp-content/uploads/2024/01/logo_horizontal_transparent_background.png
- /wp-content/uploads/2024/05/logo_horizontal_white_background.png

---

## Placeholder / Fallback Images

Used when a referenced image is missing or optional.

- /wp-content/uploads/2024/06/blog-placeholder.jpg
- /wp-content/uploads/2024/06/slider-placeholder.jpg

---

## Important Rules (Do Not Break These)

- ❌ No external hosts (DigitalOcean, CDN URLs)
- ❌ No `/version/` folders
- ❌ No protocol-relative URLs (`//`)
- ✅ Always root-relative (`/wp-content/...`)
- ✅ All files must physically exist in `/public/`

---

## If You See a New 404

1. Copy the URL
2. Normalize it to `/wp-content/uploads/...`
3. Add it to this document
4. Place the file in `/public/` or update the reference

This guarantees zero asset regressions going forward.

# Environment Variables (Cloudflare Pages + Astro)

This project uses **Astro (client)** + **Cloudflare Pages Functions (server)** for:
- Contact form: `/api/contact`
- Subscribe form: `/api/subscribe`
- Mailchimp upsert + tagging
- Resend email notification
- Google reCAPTCHA v3 verification

---

## Astro Client (PUBLIC)

These must be available to the browser.

### `PUBLIC_RECAPTCHA_SITEKEY`
- **Used by:** Contact + Subscribe components (client-side token generation)
- **Where:** Cloudflare Pages → Environment variables (Production + Preview)
- **Example:** `6LfPm1spAAAAAH53IvP6pykD-RbA2f3EKlWcbLSu`

> Note: In Astro, only variables prefixed with `PUBLIC_` are exposed to the client.

---

## Cloudflare Pages Functions (SERVER)

These are read server-side only (not exposed to the browser).

### reCAPTCHA v3
#### `RECAPTCHA_SECRET`
- **Used by:** `/api/contact`, `/api/subscribe`
- **Purpose:** Server-side verification with Google
- **Example:** `6LfPm1spAAAAA...your_secret...`

#### `RECAPTCHA_MIN_SCORE` (optional)
- **Used by:** `/api/contact`, `/api/subscribe`
- **Purpose:** Reject submissions below threshold
- **Default:** `0.5`
- **Example:** `0.5`

---

### Mailchimp
#### `MAILCHIMP_API_KEY`
- **Used by:** `/api/contact`, `/api/subscribe`
- **Example:** `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-us21`

#### `MAILCHIMP_SERVER_PREFIX`
- **Used by:** `/api/contact`, `/api/subscribe`
- **Purpose:** Data center prefix from Mailchimp (the `usXX` part)
- **Example:** `us21`

#### `MAILCHIMP_AUDIENCE_ID`
- **Used by:** `/api/contact`, `/api/subscribe`
- **Purpose:** List/Audience ID to upsert subscribers into
- **Example:** `a1b2c3d4e5`

#### `MAILCHIMP_CONTACT_TAG`
- **Used by:** `/api/contact`
- **Purpose:** Tag applied to contacts coming from the contact form
- **Example:** `Contact Form`

#### `MAILCHIMP_SUBSCRIBE_TAG`
- **Used by:** `/api/subscribe`
- **Purpose:** Tag applied to newsletter subscribers
- **Example:** `Table Talk`

---

### Resend (Email notifications)
#### `RESEND_API_KEY`
- **Used by:** `/api/contact` (required), `/api/subscribe` (optional notification)
- **Example:** `re_xxxxxxxxxxxxxxxxxxxxxxxxxx`

#### `EMAIL_TO`
- **Used by:** `/api/contact` (required), `/api/subscribe` (optional)
- **Purpose:** Where form notifications are sent (your inbox)
- **Example:** `hello@jenshawgonutrition.com`

#### `EMAIL_FROM`
- **Used by:** `/api/contact` (required), `/api/subscribe` (optional)
- **Purpose:** Verified sender identity in Resend
- **Example:** `Jen Shawgo Nutrition <no-reply@yourdomain.com>`

---

## Recommended: Example `.env.example`

> This is for local dev. In Cloudflare Pages you set these in the dashboard.

PUBLIC_RECAPTCHA_SITEKEY=your_site_key_here

RECAPTCHA_SECRET=your_secret_here
RECAPTCHA_MIN_SCORE=0.5

MAILCHIMP_API_KEY=your_mailchimp_key-usXX
MAILCHIMP_SERVER_PREFIX=usXX
MAILCHIMP_AUDIENCE_ID=your_audience_id
MAILCHIMP_CONTACT_TAG=Contact Form
MAILCHIMP_SUBSCRIBE_TAG=Table Talk

RESEND_API_KEY=re_your_resend_key
EMAIL_TO=hello@jenshawgonutrition.com
EMAIL_FROM="Jen Shawgo Nutrition <no-reply@yourdomain.com>"
