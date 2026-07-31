import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const writing = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/writing" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      subtitle: z.string(),
      date: z.coerce.date(),
      category: z.enum(["fiction", "tech"]),
      cover: image(),
      published: z.string().optional(),
    }),
});

export const collections = { writing };
