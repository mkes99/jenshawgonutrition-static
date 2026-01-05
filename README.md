# Jenshawgo Nutrition — Astro rebuild

This project is rebuilt from a static mirror export, with:

- **Pages** as clean `.astro` pages (flat files).
- **Blog ("The Table")** as **Markdown** via Astro Content Collections.
- **Gravity Forms runtime removed** (styles kept). Forms submit to Cloudflare Pages **Functions**.
- **RevSlider runtime removed** and replaced with a lightweight JS slider that keeps the existing slider markup + CSS.

## Local dev

```bash
npm i
npm run dev
```

## Cloudflare Pages Functions

These endpoints are included:

- `POST /api/contact` → sends email via **Resend**
- `POST /api/subscribe` → adds subscriber to **Mailchimp audience** and applies tags

### Required environment variables

**Resend (contact form)**

- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`

**Mailchimp (newsletter form)**

- `MAILCHIMP_API_KEY` (format: `xxxxx-usX`)
- `MAILCHIMP_AUDIENCE_ID`
- `MAILCHIMP_TAGS` (comma-separated default tags, optional)

## reCAPTCHA v3

Set this in Cloudflare Pages env vars (Public):

- `PUBLIC_RECAPTCHA_SITEKEY`

The site includes the v3 script in `BaseLayout.astro` and the client form handler requests a token.

**Recommended next step:** add server-side verification of the token inside the Functions before sending email / subscribing.

## Notes

### Per-form Mailchimp tags

Each newsletter form can declare its standardized tag(s) via:

`data-mailchimp-tag="Tag One,Tag Two"`

If omitted, a safe default mapping is applied based on the Gravity Forms id.

- Static assets are currently served from `public/wp-content` and `public/wp-includes` to preserve styling.
  We can further reduce WordPress paths once parity is locked in.
