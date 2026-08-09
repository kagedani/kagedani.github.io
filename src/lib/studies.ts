import { getCollection } from 'astro:content';
import type { Lang } from '../config';

/**
 * Case studies live in per-language folders — src/content/case-studies/<lang>/<slug>.md —
 * which makes the entry id `en/data-mesh-energy`. Do NOT go back to a dotted
 * filename like `data-mesh-energy.en.md`: Astro slugifies ids and swallows the
 * dot, producing the unusable `data-mesh-energyen`.
 */
export async function studiesFor(lang: Lang) {
  const prefix = `${lang}/`;
  const all = await getCollection('caseStudies');
  return all
    .filter((e) => e.id.startsWith(prefix))
    .map((entry) => ({ slug: entry.id.slice(prefix.length), entry }));
}

/** Slugs that have a written case study in this language. */
export async function slugsWithStudy(lang: Lang): Promise<Set<string>> {
  return new Set((await studiesFor(lang)).map((s) => s.slug));
}
