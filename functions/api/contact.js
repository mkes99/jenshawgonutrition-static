/**
 * POST /api/contact
 * - verifies reCAPTCHA v3 token
 * - upserts to Mailchimp audience + applies contact tag
 * - sends admin email via Resend with reply_to
 *
 * Env:
 * - RECAPTCHA_SECRET
 * - RECAPTCHA_MIN_SCORE (optional, default 0.5)
 * - MAILCHIMP_API_KEY
 * - MAILCHIMP_SERVER_PREFIX
 * - MAILCHIMP_AUDIENCE_ID
 * - MAILCHIMP_CONTACT_TAG
 * - RESEND_API_KEY
 * - EMAIL_TO
 * - EMAIL_FROM
 */

export async function onRequestPost({ request, env }) {
  try {
    const ct = request.headers.get("content-type") || "";
    const isForm =
      ct.includes("multipart/form-data") ||
      ct.includes("application/x-www-form-urlencoded");

    const input = isForm ? await request.formData() : await request.json().catch(() => ({}));

    const hp = (isForm ? input.get("hp_comments") : input.hp_comments) || "";
    if (String(hp).trim()) {
      return json({ ok: true, message: "Thanks! Your message has been sent." }, 200);
    }

    const token = str(isForm ? input.get("recaptchaToken") : input.recaptchaToken);

    await verifyRecaptchaV3({ env, token, action: "contact" });

    const firstName = str(isForm ? input.get("firstName") : input.firstName);
    const lastName = str(isForm ? input.get("lastName") : input.lastName);
    const email = str(isForm ? input.get("email") : input.email).toLowerCase();
    const subject = str(isForm ? input.get("subject") : input.subject) || "Website Contact";
    const message = str(isForm ? input.get("message") : input.message);

    if (!firstName || !lastName || !email || !message) {
      return json({ ok: false, message: "Please complete all required fields." }, 400);
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json({ ok: false, message: "Please enter a valid email address." }, 400);
    }

    const listId = str(env.MAILCHIMP_AUDIENCE_ID);
    const tag = str(env.MAILCHIMP_CONTACT_TAG);
    if (!listId) return json({ ok: false, message: "Mailchimp audience is not configured." }, 500);
    if (!tag) return json({ ok: false, message: "Mailchimp contact tag is not configured." }, 500);

    await upsertMailchimpMember({
      env,
      listId,
      email,
      tag,
      merge_fields: { FNAME: firstName, LNAME: lastName },
    });

    await sendResendAdminEmail({
      env,
      fromName: `${firstName} ${lastName}`.trim(),
      email,
      subject,
      message,
    });

    return json({ ok: true, message: "Thanks! Your message has been sent." }, 200);
  } catch (err) {
    return json({ ok: false, message: err?.message || "There was a problem. Please try again." }, 500);
  }
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

function str(v) {
  return String(v ?? "").trim();
}

async function verifyRecaptchaV3({ env, token, action }) {
  const secret = env.RECAPTCHA_SECRET;
  const minScore = Number(env.RECAPTCHA_MIN_SCORE ?? 0.5);

  if (!secret) throw new Error("reCAPTCHA secret is not configured.");
  if (!token) throw new Error("reCAPTCHA validation failed. Please try again.");

  const body = new URLSearchParams();
  body.set("secret", secret);
  body.set("response", token);

  const resp = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body,
  });

  const data = await resp.json().catch(() => null);

  if (!data?.success) throw new Error("reCAPTCHA validation failed. Please try again.");
  if (typeof data.score === "number" && data.score < minScore) {
    throw new Error("reCAPTCHA score too low. Please try again.");
  }
  if (action && data.action && data.action !== action) {
    throw new Error("reCAPTCHA validation mismatch. Please try again.");
  }
}

async function upsertMailchimpMember({ env, listId, email, tag, merge_fields }) {
  const apiKey = env.MAILCHIMP_API_KEY;
  const server = env.MAILCHIMP_SERVER_PREFIX;
  if (!apiKey || !server) throw new Error("Mailchimp is not configured.");

  const subscriberHash = await md5(email);
  const base = `https://${server}.api.mailchimp.com/3.0`;
  const memberUrl = `${base}/lists/${listId}/members/${subscriberHash}`;

  const putRes = await fetch(memberUrl, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      authorization: "Basic " + btoa(`anystring:${apiKey}`),
    },
    body: JSON.stringify({
      email_address: email,
      status_if_new: "subscribed",
      status: "subscribed",
      ...(merge_fields ? { merge_fields } : {}),
    }),
  });

  if (!putRes.ok) throw new Error(`Mailchimp upsert failed: ${await safeMailchimpError(putRes)}`);

  const tagRes = await fetch(`${memberUrl}/tags`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: "Basic " + btoa(`anystring:${apiKey}`),
    },
    body: JSON.stringify({ tags: [{ name: tag, status: "active" }] }),
  });

  if (!tagRes.ok) throw new Error(`Mailchimp tag failed: ${await safeMailchimpError(tagRes)}`);
}

async function sendResendAdminEmail({ env, fromName, email, subject, message }) {
  const apiKey = env.RESEND_API_KEY;
  const emailTo = env.EMAIL_TO;
  const emailFrom = env.EMAIL_FROM;

  if (!apiKey || !emailTo || !emailFrom) {
    // Don't fail user submission if email isn't configured
    return;
  }

  const html = `
    <p><strong>New contact request</strong></p>
    <p><strong>From:</strong> ${escapeHtml(fromName)} (${escapeHtml(email)})</p>
    <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
  `;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: emailFrom,
      to: [emailTo],
      subject: `[Website] ${subject}`,
      html,
      reply_to: email,
      headers: { "Reply-To": email },
    }),
  });
}

async function safeMailchimpError(res) {
  try {
    const data = await res.json();
    return data?.detail || data?.title || `${res.status}`;
  } catch {
    return `${res.status}`;
  }
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function md5(input) {
  const enc = new TextEncoder();
  const buf = await crypto.subtle.digest("MD5", enc.encode(input));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}