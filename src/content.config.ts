import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * The blog is English-only by design: a bilingual blog means writing every piece
 * twice, forever, and a missing translation reads worse than a single language.
 * See docs/redesign-plan.md.
 */
const blog = defineCollection({
  loader: glob({ pattern: ['**/*.{md,mdx}', '!**/README.md'], base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
