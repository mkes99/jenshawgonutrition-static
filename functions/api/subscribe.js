export async function onRequestPost(context) {
  const { request, env } = context;
  const body = await request.json().catch(() => ({}));

  const apiKey = env.MAILCHIMP_API_KEY; // format: <key>-<dc>
  const audienceId = env.MAILCHIMP_AUDIENCE_ID;
  const defaultTags = (env.MAILCHIMP_TAGS || "").split(",").map(s => s.trim()).filter(Boolean);
  const requestTags = Array.isArray(body.tags) ? body.tags : [];
  const tags = Array.from(new Set([...defaultTags, ...requestTags])).filter(Boolean);

  if (!apiKey || !audienceId) {
    return new Response(JSON.stringify({ ok: false, error: "Missing Mailchimp env vars" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }

  const email = (body.email || "").toLowerCase().trim();
  if (!email) {
    return new Response(JSON.stringify({ ok: false, error: "Missing email" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const dc = apiKey.split("-")[1];
  const auth = btoa(`anystring:${apiKey}`);


function md5hex(str) {
  // Minimal MD5 implementation for Mailchimp member hash
  // Source: public-domain style snippet adapted for Workers.
  function cmn(q, a, b, x, s, t) {
    a = (a + q + x + t) | 0;
    return (((a << s) | (a >>> (32 - s))) + b) | 0;
  }
  function ff(a, b, c, d, x, s, t) { return cmn((b & c) | (~b & d), a, b, x, s, t); }
  function gg(a, b, c, d, x, s, t) { return cmn((b & d) | (c & ~d), a, b, x, s, t); }
  function hh(a, b, c, d, x, s, t) { return cmn(b ^ c ^ d, a, b, x, s, t); }
  function ii(a, b, c, d, x, s, t) { return cmn(c ^ (b | ~d), a, b, x, s, t); }

  function toBytes(s) {
    const utf8 = new TextEncoder().encode(s);
    const bytes = [];
    for (const b of utf8) bytes.push(b);
    return bytes;
  }

  const bytes = toBytes(str);
  const origLenBits = bytes.length * 8;

  bytes.push(0x80);
  while ((bytes.length % 64) !== 56) bytes.push(0);

  for (let i = 0; i < 8; i++) bytes.push((origLenBits >>> (8 * i)) & 0xff);

  let a0 = 0x67452301;
  let b0 = 0xefcdab89;
  let c0 = 0x98badcfe;
  let d0 = 0x10325476;

  const K = new Array(64).fill(0).map((_, i) => Math.floor(Math.abs(Math.sin(i + 1)) * 2 ** 32) | 0);
  const S = [
    7,12,17,22, 7,12,17,22, 7,12,17,22, 7,12,17,22,
    5,9,14,20, 5,9,14,20, 5,9,14,20, 5,9,14,20,
    4,11,16,23, 4,11,16,23, 4,11,16,23, 4,11,16,23,
    6,10,15,21, 6,10,15,21, 6,10,15,21, 6,10,15,21
  ];

  for (let i = 0; i < bytes.length; i += 64) {
    const M = new Array(16);
    for (let j = 0; j < 16; j++) {
      const idx = i + j * 4;
      M[j] = (bytes[idx]) | (bytes[idx + 1] << 8) | (bytes[idx + 2] << 16) | (bytes[idx + 3] << 24);
    }

    let A = a0, B = b0, C = c0, D = d0;

    for (let j = 0; j < 64; j++) {
      let F, g;
      if (j < 16) { F = (B & C) | (~B & D); g = j; }
      else if (j < 32) { F = (D & B) | (~D & C); g = (5*j + 1) % 16; }
      else if (j < 48) { F = B ^ C ^ D; g = (3*j + 5) % 16; }
      else { F = C ^ (B | ~D); g = (7*j) % 16; }

      const tmp = D;
      D = C;
      C = B;
      B = (B + ((A + F + K[j] + M[g]) << S[j] | (A + F + K[j] + M[g]) >>> (32 - S[j]))) | 0;
      A = tmp;
    }

    a0 = (a0 + A) | 0;
    b0 = (b0 + B) | 0;
    c0 = (c0 + C) | 0;
    d0 = (d0 + D) | 0;
  }

  function toHex(num) {
    let s = "";
    for (let i = 0; i < 4; i++) s += ((num >>> (i * 8)) & 0xff).toString(16).padStart(2, "0");
    return s;
  }

  return (toHex(a0) + toHex(b0) + toHex(c0) + toHex(d0));
}


  const hashHex = md5hex(email);
  const base = `https://${dc}.api.mailchimp.com/3.0/lists/${audienceId}/members/${hashHex}`;

  const upsert = await fetch(base, {
    method: "PUT",
    headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      email_address: email,
      status_if_new: "subscribed",
      status: "subscribed",
      merge_fields: body.merge_fields || {},
    }),
  });

  if (!upsert.ok) {
    const text = await upsert.text();
    return new Response(JSON.stringify({ ok: false, error: text }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }

  if (tags.length) {
    await fetch(base + "/tags", {
      method: "POST",
      headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/json" },
      body: JSON.stringify({ tags: tags.map(t => ({ name: t, status: "active" })) }),
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "content-type": "application/json" },
  });
}
