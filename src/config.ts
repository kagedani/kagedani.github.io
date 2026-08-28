/**
 * Site-wide switches.
 *
 * BLOG_ENABLED: the blog engine is fully wired but produces no routes and no nav
 * link until this is true. Deliberate — a "Blog" section whose latest post is two
 * years old does more damage than no blog at all. Flip it when there are at least
 * two pieces in src/content/blog/.
 */
export const BLOG_ENABLED = false;

export const SITE = {
  url: 'https://kagedani.github.io',
  name: 'Daniele Uboldi',
  initials: 'DU',
  role: 'Data Architect',
  company: 'Quantyca',
  location: 'Monza, Italy',
  email: 'daniele.uboldi.job@gmail.com',
  linkedin: 'https://linkedin.com/in/daniele-uboldi/',
  github: 'https://github.com/kagedani',
  githubHandle: '@kagedani',
  cv: '/assets/cv.pdf',
  photo: '/assets/foto.jpg',
} as const;

export const LOCALES = ['en', 'it'] as const;
export type Lang = (typeof LOCALES)[number];
