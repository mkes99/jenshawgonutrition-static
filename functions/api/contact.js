export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const payload = await request.json();

    // Expected fields from client
    const {
      name = "",
      email = "",
      message = "",
      recaptchaToken = "",
      subject = "Website Contact Form",
    } = payload ?? {};

    if (!env.RESEND_API_KEY) {
      return new Response("Missing RESEND_API_KEY", { status: 500 });
    }
    if (!env.CONTACT_TO_EMAIL || !env.CONTACT_FROM_EMAIL) {
      return new Response("Missing CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL", { status: 500 });
    }
    if (!env.RECAPTCHA_SECRET_KEY) {
      return new Response("Missing RECAPTCHA_SECRET_KEY", { status: 500 });
    }

    // Verify reCAPTCHA v3 token
    const verifyRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: env.RECAPTCHA_SECRET_KEY,
        response: recaptchaToken,
      }),
    });

    const verifyJson = await verifyRes.json();
    const ok = verifyJson?.success === true;
    const score = typeof verifyJson?.score === "number" ? verifyJson.score : 0;

    // Adjust threshold if needed
    if (!ok || score < 0.5) {
      return new Response(JSON.stringify({ ok: false, reason: "recaptcha_failed", score }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Send email via Resend
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: env.CONTACT_FROM_EMAIL,
        to: [env.CONTACT_TO_EMAIL],
        reply_to: email || undefined,
        subject,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      }),
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text();
      return new Response(JSON.stringify({ ok: false, reason: "resend_failed", error: errText }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ ok: false, reason: "bad_request", error: String(e) }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}