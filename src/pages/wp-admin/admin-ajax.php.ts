import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  return new Response("", { status: 200, headers: { "content-type": "text/plain" } });
};

export const POST: APIRoute = async () => {
  return new Response("", { status: 200, headers: { "content-type": "text/plain" } });
};
