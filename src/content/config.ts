import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional().default(""),
    excerpt: z.string().optional().default(""),
    // Live WP export uses `date:` (string) in most posts. We support both:
    // - date: "YYYY-MM-DD" or "YYYY-MM-DD HH:mm"
    // - pubDate: same formats (for newer content)
    date: z.union([z.string(), z.date()]).optional(),
    pubDate: z.union([z.string(), z.date()]).optional(),
    heroImage: z.string().optional().default(""),
    tags: z.array(z.string()).optional().default([]),
    categories: z.array(z.string()).optional().default([]),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { blog };
