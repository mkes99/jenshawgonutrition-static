export function normalizeWpAssetUrl(input?: string): string {
  if (!input) return "";
  let url = String(input).trim();

  // Strip query string (e.g. ?ver=6.9)
  url = url.split("?")[0];

  // Drop known origins (WP + DigitalOcean Spaces)
  url = url.replace(/^https?:\/\/jenshawgonutrition\.com/i, "");
  url = url.replace(/^https?:\/\/jenshawgonutrition2024\.sfo3\.digitaloceanspaces\.com/i, "");

  // Fix common bad rewrites that lost the leading slash (e.g. "wp-content/..." or "css/wp-content/..." )
  url = url.replace(/^css\//, "/");
  if (url.startsWith("wp-content/")) url = "/" + url;

  // Remove /version/<something>/ segment used by some CDN setups
  url = url.replace(/(\/wp-content\/uploads\/\d{4}\/\d{2})\/version\/[^\/]+\//i, "$1/");

  // Ensure root-relative for our static build
  if (!url.startsWith("/")) url = "/" + url;

  return url;
}
