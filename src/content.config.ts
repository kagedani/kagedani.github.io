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

/**
 * Long-form case study bodies, one file per project per language:
 *   src/content/case-studies/<project-slug>.<lang>.md
 * Card metadata stays in src/data/content.ts; only the narrative lives here,
 * because long prose is miserable to author inside a TypeScript string.
 * A project with no file here simply has no detail page and no card link.
 */
const caseStudies = defineCollection({
  loader: glob({ pattern: ['**/*.md', '!**/README.md'], base: './src/content/case-studies' }),
});

export const collections = { blog, caseStudies };
