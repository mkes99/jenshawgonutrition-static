(function () {
  // Prefer a sitekey configured on the document.
  const SITEKEY =
    document.documentElement.getAttribute("data-recaptcha-sitekey") ||
    document.querySelector('meta[name="recaptcha-sitekey"]')?.getAttribute("content") ||
    "";

  function showStatus(form, ok, message) {
    let box = form.querySelector(".gform_confirmation_message") || form.querySelector(".form-status");
    if (!box) {
      box = document.createElement("div");
      box.className = "gform_confirmation_message form-status";
      box.style.marginTop = "12px";
      form.appendChild(box);
    }
    box.textContent = message;
    box.setAttribute("role", "status");
    box.style.opacity = "1";
  }

  async function getRecaptchaToken(action) {
    if (!window.grecaptcha) return "";
    return new Promise((resolve) => {
      window.grecaptcha.ready(async () => {
        try {
          const token = await window.grecaptcha.execute(SITEKEY, { action });
          resolve(token);
        } catch {
          resolve("");
        }
      });
    });
  }

  function pickEndpoint(form) {
    const id = form.getAttribute("id") || "";
    // gform_1 = contact, gform_2 = newsletter (based on current export)
    if (id === "gform_1") return "/api/contact";
    if (id === "gform_2") return "/api/subscribe";
    // fallback
    return "/api/contact";
  }

  function extractTags(form) {
    // Standardized per-form tag(s).
    // Prefer explicit attribute, fall back to form id mapping.
    const attr = form.getAttribute("data-mailchimp-tag") || "";
    if (attr.trim()) return attr.split(",").map((s) => s.trim()).filter(Boolean);

    const id = form.getAttribute("id") || "";
    const map = {
      gform_2: ["Newsletter"],
    };
    return map[id] || [];
  }

  function extract(form) {
    const fd = new FormData(form);
    const data = {};
    for (const [k, v] of fd.entries()) {
      // normalize Gravity Forms field names like input_8.3
      data[k] = typeof v === "string" ? v.trim() : v;
    }
    // best-effort mapping for contact form fields
    data.name = data.name || data["input_5"] || [data["input_8.3"], data["input_8.6"]].filter(Boolean).join(" ").trim();
    data.email = data.email || data["input_6"] || data["input_1"];
    data.subject = data.subject || data["input_7"];
    data.message = data.message || data["input_9"] || data["input_2"];
    return data;
  }

  async function handleSubmit(e) {
    const form = e.target;
    if (!(form instanceof HTMLFormElement)) return;

    // only intercept Gravity Forms exports
    if (!form.id || !form.id.startsWith("gform_")) return;

    e.preventDefault();
    showStatus(form, true, "Sending…");

    const endpoint = pickEndpoint(form);
    const payload = extract(form);
    payload.recaptchaToken = await getRecaptchaToken("submit");

    // Newsletter endpoint accepts tags
    if (endpoint === "/api/subscribe") {
      payload.tags = extractTags(form);
    }

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json.ok === false) throw new Error(json.error || "Request failed");
      showStatus(form, true, "Thanks! Your submission was received.");
      form.reset();
    } catch (err) {
      showStatus(form, false, "Sorry — something went wrong. Please try again.");
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }

  document.addEventListener("submit", handleSubmit, true);
})();
