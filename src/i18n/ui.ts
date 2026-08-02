import type { Lang } from '../config';

/** UI chrome only. Substance lives in src/data/content.ts. */
export const ui = {
  en: {
    'nav.work': 'Work',
    'nav.leadership': 'Leadership',
    'nav.writing': 'Writing',
    'nav.about': 'About',
    'nav.blog': 'Blog',
    'nav.contact': 'Contact',
    'nav.menu': 'Open menu',
    'nav.theme': 'Switch theme',

    'kicker.work': 'Selected work',
    'kicker.leadership': 'Leadership & People',
    'kicker.writing': 'Writing & Talks',
    'kicker.contact': 'Contact',
    'kicker.experience': 'Career',
    'kicker.skills': 'What I work with',
    'kicker.about': 'About',
    'kicker.interests': 'Off the clock',

    'cta.work': 'Selected work',
    'cta.contact': 'Get in touch',
    'cta.cv': 'Download CV',
    'cta.all': 'All work',
    'cta.allWriting': 'Everything I have published',
    'cta.more': 'Read more',

    'label.ongoing': 'ongoing',
    'label.stack': 'Stack',
    'label.role': 'My role',
    'label.email': 'Email',
    'label.linkedin': 'LinkedIn',
    'label.github': 'GitHub',
    'label.todo': 'to be written',

    'page.work.title': 'Work',
    'page.work.lede': 'Five engagements worth writing about. Client names appear only where Quantyca already names them publicly.',
    'page.writing.title': 'Writing & Talks',
    'page.writing.lede': 'Articles, a podcast, an interview, teaching material.',
    'page.about.title': 'About',

    'footer.built': 'Built with Astro',
  },
  it: {
    'nav.work': 'Progetti',
    'nav.leadership': 'Leadership',
    'nav.writing': 'Pubblicazioni',
    'nav.about': 'Chi sono',
    'nav.blog': 'Blog',
    'nav.contact': 'Contatti',
    'nav.menu': 'Apri il menu',
    'nav.theme': 'Cambia tema',

    'kicker.work': 'Progetti selezionati',
    'kicker.leadership': 'Leadership e persone',
    'kicker.writing': 'Pubblicazioni e talk',
    'kicker.contact': 'Contatti',
    'kicker.experience': 'Carriera',
    'kicker.skills': 'Con cosa lavoro',
    'kicker.about': 'Chi sono',
    'kicker.interests': 'Fuori dal lavoro',

    'cta.work': 'I progetti',
    'cta.contact': 'Scrivimi',
    'cta.cv': 'Scarica il CV',
    'cta.all': 'Tutti i progetti',
    'cta.allWriting': 'Tutto quello che ho pubblicato',
    'cta.more': 'Continua',

    'label.ongoing': 'in corso',
    'label.stack': 'Stack',
    'label.role': 'Il mio ruolo',
    'label.email': 'Email',
    'label.linkedin': 'LinkedIn',
    'label.github': 'GitHub',
    'label.todo': 'da scrivere',

    'page.work.title': 'Progetti',
    'page.work.lede': 'Cinque progetti che vale la pena raccontare. I nomi dei clienti compaiono solo dove Quantyca li cita già pubblicamente.',
    'page.writing.title': 'Pubblicazioni e talk',
    'page.writing.lede': 'Articoli, un podcast, un’intervista, materiale didattico.',
    'page.about.title': 'Chi sono',

    'footer.built': 'Costruito con Astro',
  },
} as const;

export type UIKey = keyof (typeof ui)['en'];

export function t(lang: Lang) {
  return (key: UIKey): string => ui[lang][key] ?? ui.en[key];
}

/**
 * Prefix a root-relative path with the locale. English lives at the root.
 * Hashes are preserved: '/#contact' must not become '/it/#contact/'.
 */
export function localePath(lang: Lang, path: string): string {
  const [rawPath, hash] = path.split('#');
  let clean = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;
  if (!clean.endsWith('/')) clean += '/';
  const prefixed = lang === 'en' ? clean : `/it${clean}`;
  return hash ? `${prefixed}#${hash}` : prefixed;
}

/** The same page in the other language, for the EN|IT switch. */
export function otherLangPath(lang: Lang, path: string): string {
  return localePath(lang === 'en' ? 'it' : 'en', path);
}
