import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    heroImage: z.string().optional(),
  }),
});

const heroSlider = defineCollection({
  type: "data",
  schema: z.array(
    z.object({
      id: z.string(),
      image: z.string(),
      imageAlt: z.string().optional(),
      subheading: z.string().optional(),
      heading: z.string(),
      body: z.string().optional(),
      primaryCta: z
        .object({
          label: z.string(),
          href: z.string(),
          target: z.enum(["_self", "_blank"]).optional(),
        })
        .optional(),
      secondaryCta: z
        .object({
          label: z.string(),
          href: z.string(),
          target: z.enum(["_self", "_blank"]).optional(),
        })
        .optional(),
    })
  ),
});

export const collections = {
  blog,
  "hero-slider": heroSlider,
};