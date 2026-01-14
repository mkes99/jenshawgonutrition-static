import type { CollectionEntry } from "astro:content";

export type BlogEntry = CollectionEntry<"blog">;

// Treat dates as America/Phoenix (UTC-07:00). We interpret frontmatter strings like:
// - "2026-01-12" (midnight)
// - "2026-01-12 09:00"
// as Phoenix local time and convert to a UTC Date for stable comparisons.
export function parsePhoenixDateTime(input: unknown): Date | null {
  if (!input) return null;
  if (input instanceof Date) return input;
  if (typeof input !== "string") return null;

  const s = input.trim();
  // If an explicit timezone/offset is provided, trust the built-in parser.
  // Example: 2026-01-12T09:00:00Z or 2026-01-12T09:00:00-07:00
  if (/[zZ]|[+-][0-9]{2}:[0-9]{2}$/.test(s)) {
    const d = new Date(s);
    return Number.isNaN(d.getTime()) ? null : d;
  }

  // Accept common no-timezone formats and interpret as Phoenix local time.
  // - 2026-01-12
  // - 2026-01-12 09:00
  // - 2026-01-12T09:00
  // - 2026-01-12T09:00:00
  const m = s.match(
    /^([0-9]{4})-([0-9]{2})-([0-9]{2})(?:[\sT]+([0-9]{2}):([0-9]{2})(?::([0-9]{2}))?)?$/
  );
  if (!m) return null;

  const year = Number(m[1]);
  const month = Number(m[2]);
  const day = Number(m[3]);
  const hour = m[4] ? Number(m[4]) : 0;
  const minute = m[5] ? Number(m[5]) : 0;
  const second = m[6] ? Number(m[6]) : 0;

  if (!Number.isFinite(year) || !Number.isFinite(month) || !Number.isFinite(day)) return null;

  // Phoenix is UTC-7 => UTC = local + 7 hours
  const utcMs = Date.UTC(year, month - 1, day, hour + 7, minute, second);
  return new Date(utcMs);
}

export function getPublishDate(entry: BlogEntry): Date {
  const raw = (entry.data as any).pubDate ?? (entry.data as any).date ?? (entry.data as any).pubDate;
  const parsed = parsePhoenixDateTime(raw);
  if (parsed) return parsed;
  if (raw instanceof Date) return raw;
  // fallback
  return new Date(0);
}

export function isPostPublished(entry: BlogEntry): boolean {
  // Drafts hidden in prod
  if (import.meta.env.PROD && (entry.data as any).draft === true) return false;

  const publishDate = getPublishDate(entry);
  // Scheduled: hide until publishDate
  if (import.meta.env.PROD && publishDate.getTime() > Date.now()) return false;

  return true;
}

export function sortByPublishDateDesc(entries: BlogEntry[]): BlogEntry[] {
  return [...entries].sort((a, b) => getPublishDate(b).getTime() - getPublishDate(a).getTime());
}

export function formatPostDateLong(entry: BlogEntry): string {
  const d = getPublishDate(entry);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export function getReadingTimeMinutes(input: unknown): number {
  const text =
    typeof input === "string"
      ? input
      : input && typeof (input as any).body === "string"
        ? (input as any).body
        : "";

  const words = (text || "")
    .replace(/<[^>]*>/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  const minutes = Math.max(1, Math.ceil(words / 200));
  return minutes;
}
