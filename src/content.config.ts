import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const writing = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/writing" }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    date: z.coerce.date().optional(),
    order: z.number().optional(),
    category: z.enum(["fiction", "tech"]),
    published: z.string().optional(),
  }),
});

export const collections = { writing };
