import type { Lang } from '../config';

/** A bilingual string. English is authored first — it is the default language. */
export type L = Record<Lang, string>;

export const pick = (l: L, lang: Lang) => l[lang];

/** Marks content still waiting on material from Daniele. Rendered visibly in dev. */
export type Todo = string | undefined;

/* ------------------------------------------------------------------ hero */

export const hero = {
  role: {
    en: 'Solutions Architect at',
    it: 'Solutions Architect in',
  } satisfies L,
  headline: {
    en: 'I make complicated data architectures',
    it: 'Rendo usabili le architetture dati',
  } satisfies L,
  headlineEm: {
    en: 'usable',
    it: 'complesse',
  } satisfies L,
  lede: {
    en: "I'm Daniele. I design data platforms — <strong>Data Mesh, MLOps, cloud</strong> — for companies where hundreds of people depend on them.",
    it: 'Sono Daniele. Progetto piattaforme dati — <strong>Data Mesh, MLOps, cloud</strong> — per aziende dove centinaia di persone ci lavorano ogni giorno.',
  } satisfies L,
  aside: {
    en: 'When I’m not doing that: basketball, Inter, and a manga backlog I will never finish.',
    it: 'Quando non lo faccio: basket, Inter, e una pila di manga che non finirò mai.',
  } satisfies L,
};

/* ----------------------------------------------------------------- stats */

export const stats: { num: string; label: L }[] = [
  { num: '6+', label: { en: 'Years in data', it: 'Anni nei dati' } },
  { num: '20+', label: { en: 'People led', it: 'Persone guidate' } },
  { num: '100+', label: { en: 'Platform users', it: 'Utenti sulle piattaforme' } },
  { num: '5', label: { en: 'Industries', it: 'Settori' } },
];

/* -------------------------------------------------------------- projects */

export type Project = {
  slug: string;
  title: L;
  sector: L;
  role: L;
  period?: string;
  summary: L;
  stack: string[];
  featured: boolean;
  ongoing?: boolean;
  todo?: Todo;
};

export const projects: Project[] = [
  {
    slug: 'data-mesh-energy',
    title: { en: 'Data Mesh Platform', it: 'Piattaforma Data Mesh' },
    sector: { en: 'Energy', it: 'Energy' },
    role: { en: 'Architecture lead', it: 'Referente architetturale' },
    period: '2025 — now',
    summary: {
      en: 'Architecture lead for Data Mesh adoption at a European energy utility, with 100+ users on the Experience Plane. Data product discovery, observability and control plane — and the 3–5 year data strategy that decides what gets built next.',
      it: 'Referente architetturale per l’adozione del Data Mesh in una utility energetica europea, con oltre 100 utenti sull’Experience Plane. Discovery dei data product, observability e control plane — e la data strategy a 3–5 anni che decide cosa costruire dopo.',
    },
    stack: ['Azure', 'ADLS Gen2', 'AKS', 'PostgreSQL', 'OpenDataMesh', 'Azure Purview', 'Great Expectations', 'OpenTelemetry', 'Grafana', 'Blindata'],
    featured: true,
    todo: 'Case study lungo: contesto, problema, UNA decisione architetturale con il suo trade-off, ruolo ed esito.',
  },
  {
    slug: 'mlops-banking',
    title: { en: 'MLOps Platform', it: 'Piattaforma MLOps' },
    sector: { en: 'Banking', it: 'Banking' },
    role: { en: 'Founding architect', it: 'Architetto fondatore' },
    period: '2022 — 2025',
    summary: {
      en: 'Founded and grew a platform that lets 100+ data scientists build and ship advanced analytics models on their own.',
      it: 'Fondazione ed evoluzione di una piattaforma che permette a oltre 100 data scientist di sviluppare e rilasciare modelli di analytics avanzata in autonomia.',
    },
    stack: ['Kubernetes', 'Docker', 'MLflow', 'JupyterHub', 'AWS', 'Apache Spark'],
    featured: true,
    todo: 'Case study lungo. Verificare se il cliente è citabile: Quantyca cita pubblicamente BNL con un "Data Science Lab".',
  },
  {
    slug: 'ml-blackbox-migration',
    title: {
      en: 'From black box to shared knowledge',
      it: 'Dalla black box alla conoscenza condivisa',
    },
    sector: { en: 'Banking', it: 'Banking' },
    role: { en: 'Data Architect & technical lead', it: 'Data Architect e guida tecnica' },
    period: '2022 — 2023',
    summary: {
      en: 'Four AI use cases were sealed inside a vendor’s black box: no explainability towards risk or the regulator, no knowledge left in-house, and a per-use-case licence that grew with usage instead of value. We rebuilt all four on an open, reproducible platform the bank owns — four out of four migrated with zero downtime, model performance in line with the vendor’s, and the manual work now automated put by the bank itself at 45 FTE.',
      it: 'Quattro use case AI erano sigillati dentro la black box di un vendor: nessuna explainability verso risk e regolatore, nessuna competenza che restasse in casa, e una licenza per use case che cresceva con l’utilizzo invece che con il valore. Li abbiamo ricostruiti tutti e quattro su una piattaforma aperta e riproducibile che la banca possiede — quattro su quattro migrati senza downtime, performance dei modelli in linea con quelle del vendor, e il lavoro manuale ora automatizzato quantificato dalla banca stessa in 45 FTE.',
    },
    stack: ['Kubernetes', 'GitLab CI/CD', 'MLflow', 'Jupyter', 'Python', 'SQL Server'],
    featured: true,
  },
  {
    slug: 'cicd-appliances',
    title: { en: 'CI/CD Architecture', it: 'Architettura CI/CD' },
    sector: { en: 'Appliances', it: 'Appliances' },
    role: { en: 'DevOps architecture', it: 'Architettura DevOps' },
    summary: {
      en: 'CI/CD and DevOps architecture designed and set up from scratch.',
      it: 'Architettura CI/CD e DevOps progettata e messa in piedi da zero.',
    },
    stack: [],
    featured: false,
    todo: 'Testo breve (2 paragrafi) e stack. Nessun nome cliente: solo il settore.',
  },
  {
    slug: 'brewery-us',
    title: { en: 'Brewery platform', it: 'Piattaforma brewery' },
    sector: { en: 'Beverage · US', it: 'Beverage · USA' },
    role: { en: 'Assessment → pre-sales → technical lead', it: 'Assessment → pre-sales → guida tecnica' },
    summary: {
      en: "First engagement led end to end as head of Quantyca's international team — from assessment through pre-sales to technical leadership.",
      it: 'Primo progetto condotto end to end come responsabile del team internazionale di Quantyca — dall’assessment alla pre-sales alla guida tecnica.',
    },
    stack: [],
    featured: false,
    ongoing: true,
    todo: 'Testo breve e stack. Resta marcato "ongoing" finché non ci sono esiti.',
  },
];

/* ------------------------------------------------------------ leadership */

export type LeaderCell = { num: string; head: L; body: L; todo?: Todo };

export const leadershipVoice: L = {
  en: 'Architecture is the part of the job people can see. The other part is who ends up able to do it after you.',
  it: 'L’architettura è la parte del lavoro che si vede. L’altra parte è chi, dopo di te, è in grado di farla.',
};

export const leadership: LeaderCell[] = [
  {
    num: '—',
    head: { en: 'Technical hiring', it: 'Colloqui tecnici' },
    body: {
      en: "I run the technical interviews for Quantyca's data roles. Deciding who comes in shapes what the company can take on two years later.",
      it: 'Conduco i colloqui tecnici per i profili data di Quantyca. Decidere chi entra determina cosa l’azienda potrà prendersi in carico due anni dopo.',
    },
    todo: 'Numero di candidati valutati e da che anno.',
  },
  {
    num: '—',
    head: { en: 'Architects grown', it: 'Architetti cresciuti' },
    body: {
      en: 'People I mentored who now work as architects in their own right.',
      it: 'Persone che ho seguito e che oggi lavorano come architetti a pieno titolo.',
    },
    todo: 'Numero, più l’episodio di promozione specifico da raccontare.',
  },
  {
    num: '20+',
    head: { en: 'Teams led', it: 'Team guidati' },
    body: {
      en: "Across multi-supplier programmes — and today, Quantyca's international team.",
      it: 'In programmi multi-fornitore — e oggi il team internazionale di Quantyca.',
    },
  },
  {
    num: '—',
    head: { en: 'Career reviews', it: 'Valutazioni' },
    body: {
      en: 'People whose annual review and growth path I contribute to.',
      it: 'Persone di cui seguo la valutazione annuale e il percorso di crescita.',
    },
    todo: 'Numero di persone valutate.',
  },
];

/* --------------------------------------------------------------- writing */

export type WritingItem = { kind: L; title: L; year: string; href?: string; todo?: Todo };

export const writing: WritingItem[] = [
  {
    kind: { en: 'Podcast', it: 'Podcast' },
    title: { en: 'Quantyca podcast — YouTube & Spotify', it: 'Podcast Quantyca — YouTube e Spotify' },
    year: '—',
    todo: 'Link YouTube e Spotify, titolo reale dell’episodio, data.',
  },
  {
    kind: { en: 'Article', it: 'Articolo' },
    title: {
      en: "Govern your data: it's a tough job, but someone has to do it",
      it: "Govern your data: it's a tough job, but someone has to do it",
    },
    year: 'Medium',
    href: 'https://medium.com/quantyca/govern-your-data-its-a-tough-job-but-someone-has-to-do-it-8f4256d22b96',
  },
  {
    kind: { en: 'Course', it: 'Formazione' },
    title: {
      en: 'Path to Data Architect — Automation & Infrastructure',
      it: 'Path to Data Architect — Automation & Infrastructure',
    },
    year: '2025',
    href: 'https://github.com/kagedani/path-to-data-architect-ep-automation-and-infrastructure',
  },
  {
    kind: { en: 'Interview', it: 'Intervista' },
    title: { en: 'What a Data Engineer actually does', it: 'Che cosa fa davvero un Data Engineer' },
    year: 'Wanter',
    href: 'https://wanter.valored.it/it/professioni/data-engineer',
  },
  {
    kind: { en: 'Thesis', it: 'Tesi' },
    title: {
      en: 'A multi-sensor approach to people counting and flow estimation in Smart Campus',
      it: 'A multi-sensor approach to people counting and flow estimation in Smart Campus',
    },
    year: '2019',
    todo: 'Link al PDF o alla scheda POLITesi, se pubblica.',
  },
];

/* ------------------------------------------------------------ experience */

export type Job = { period: L; role: L; company: L; desc: L; todo?: Todo };

export const experience: Job[] = [
  {
    period: { en: 'July 2025 — now', it: 'Luglio 2025 — presente' },
    role: { en: 'Solutions Architect', it: 'Solutions Architect' },
    company: { en: 'Quantyca — Data@Core, Monza', it: 'Quantyca — Data@Core, Monza' },
    desc: {
      en: 'Architecture lead for Data Mesh adoption in Energy (100+ users on the Experience Plane): data product discovery, observability, control plane. Owner of the client’s data strategy on a 3–5 year horizon. Head of Quantyca’s international team.',
      it: 'Referente architetturale per l’adozione del Data Mesh in ambito Energy (oltre 100 utenti sull’Experience Plane): discovery dei data product, observability, control plane. Responsabile della data strategy del cliente su orizzonte 3–5 anni. Responsabile del team internazionale di Quantyca.',
    },
    todo: 'Verificare la data di inizio come responsabile del team internazionale — va separata dal ruolo di Solutions Architect se è successiva.',
  },
  {
    period: { en: 'March 2023 — June 2025', it: 'Marzo 2023 — Giugno 2025' },
    role: { en: 'Data Architect', it: 'Data Architect' },
    company: { en: 'Quantyca — Data@Core, Monza', it: 'Quantyca — Data@Core, Monza' },
    desc: {
      en: 'Technical reference for 19 developers across three clients (Appliances, Banking). Guidelines for a multi-supplier AWS platform, technical direction for CI/CD on AWS, and the founding and upkeep of an MLOps platform used by 100+ data scientists.',
      it: 'Referente tecnico per 19 sviluppatori su tre clienti (Appliances, Banking). Linee guida per una piattaforma AWS multi-fornitore, guida tecnica per la CI/CD su AWS, fondazione e manutenzione di una piattaforma MLOps usata da oltre 100 data scientist.',
    },
  },
  {
    period: { en: 'February 2022 — February 2023', it: 'Febbraio 2022 — Febbraio 2023' },
    role: { en: 'Senior Data Engineer & Team Leader', it: 'Senior Data Engineer e Team Leader' },
    company: { en: 'Quantyca — Data@Core', it: 'Quantyca — Data@Core' },
    desc: {
      en: 'Led a team of 7 across three Banking projects: founding an MLOps platform, building a web app (React + Spring Boot), and migrating a blackbox ML solution to open source. Plus a data lake on AWS in Sport.',
      it: 'Guida di un team di 7 persone su tre progetti in ambito Banking: fondazione della piattaforma MLOps, sviluppo di una web app (React + Spring Boot), migrazione di una soluzione ML blackbox verso open source. Più un datalake su AWS in ambito Sport.',
    },
  },
  {
    period: { en: 'July 2021 — January 2022', it: 'Luglio 2021 — Gennaio 2022' },
    role: { en: 'Data Engineer', it: 'Data Engineer' },
    company: { en: 'Quantyca — Data@Core', it: 'Quantyca — Data@Core' },
    desc: {
      en: 'Data governance and data catalog in Travel. ETL/ELT pipelines in Retail, offloading Oracle onto Vertica through Confluent Kafka.',
      it: 'Data governance e data catalog in ambito Travel. Pipeline ETL/ELT in ambito Retail, con off-loading di Oracle su Vertica tramite Confluent Kafka.',
    },
  },
  {
    period: { en: 'December 2019 — June 2021', it: 'Dicembre 2019 — Giugno 2021' },
    role: { en: 'Junior Data Engineer', it: 'Junior Data Engineer' },
    company: { en: 'Quantyca — Data@Core', it: 'Quantyca — Data@Core' },
    desc: {
      en: 'Full-stack development on a SaaS platform (Spring Boot + React).',
      it: 'Sviluppo fullstack su piattaforma SaaS (Spring Boot + React).',
    },
  },
  {
    period: { en: 'January 2019 — November 2019', it: 'Gennaio 2019 — Novembre 2019' },
    role: { en: 'Research Fellow', it: 'Assegnista di ricerca' },
    company: { en: 'IoTLab, DEIB — Politecnico di Milano', it: 'IoTLab, DEIB — Politecnico di Milano' },
    desc: {
      en: 'IoT research applied to Smart Campus.',
      it: 'Ricerca sull’IoT applicato agli Smart Campus.',
    },
  },
];

/* ----------------------------------------------------------------- about */

export const about: L[] = [
  {
    en: 'I’m a Solutions Architect with more than six years in data, all of them at Quantyca, where I went from Junior Data Engineer to my current role. I’ve worked on large-scale programmes in Energy, Banking, Retail, Appliances and Sport.',
    it: 'Sono un Solutions Architect con più di sei anni di esperienza nel mondo dei dati, tutti in Quantyca, dove sono passato da Junior Data Engineer al ruolo attuale. Ho lavorato su programmi di grande scala in ambito Energy, Banking, Retail, Appliances e Sport.',
  },
  {
    en: 'My work sits on Data Mesh, data strategy, MLOps and data governance: helping clients adopt modern architectures and set a direction on a 3–5 year horizon. I’ve led teams of up to 20 people in multi-supplier programmes, and today I head Quantyca’s international team.',
    it: 'Mi occupo di Data Mesh, data strategy, MLOps e data governance: supporto i clienti nell’adozione di architetture moderne e nella definizione di una direzione su orizzonti di 3–5 anni. Ho guidato team fino a 20 persone in contesti multi-fornitore, e oggi sono responsabile del team internazionale di Quantyca.',
  },
  {
    en: 'I hold a summa cum laude degree in Telecommunications Engineering from Politecnico di Milano, and I’m a Certified Kubernetes Administrator (CKA).',
    it: 'Ho una laurea con lode in Ingegneria delle Telecomunicazioni al Politecnico di Milano e sono Certified Kubernetes Administrator (CKA).',
  },
];

/* ---------------------------------------------------------------- skills */

/** No self-assigned levels. Recruiters and screening agents match on "Python", never on "Python, intermediate". */
export const skills: { group: L; items: string[] }[] = [
  {
    group: { en: 'Data architecture', it: 'Architettura dati' },
    items: ['Data Mesh', 'Data Products', 'Data Strategy', 'Data Governance', 'Data Catalog', 'OpenDataMesh', 'Blindata', 'Azure Purview'],
  },
  {
    group: { en: 'Cloud & infrastructure', it: 'Cloud e infrastruttura' },
    items: ['AWS', 'Azure', 'Kubernetes (CKA)', 'AKS', 'Docker', 'ADLS Gen2', 'AWS Glue', 'Athena', 'Step Functions'],
  },
  {
    group: { en: 'Streaming & processing', it: 'Streaming e processing' },
    items: ['Confluent Kafka', 'Apache Spark', 'Apache Iceberg', 'Starburst', 'Talend DI'],
  },
  {
    group: { en: 'ML & observability', it: 'ML e observability' },
    items: ['MLflow', 'JupyterHub', 'Great Expectations', 'OpenTelemetry', 'Grafana'],
  },
  {
    group: { en: 'Languages & platforms', it: 'Linguaggi e piattaforme' },
    items: ['Python', 'SQL', 'Java', 'Spring Boot', 'React', 'PostgreSQL', 'Oracle', 'Vertica'],
  },
];

/* ------------------------------------------------------------- interests */

export const interests: { name: L; body: L; todo?: Todo }[] = [
  {
    name: { en: 'Basketball', it: 'Basket' },
    body: {
      en: 'Nine years on court, from 11 to 19 — then one more season as an adult, cut short by covid.',
      it: 'Nove anni in campo, dagli 11 ai 19 — poi un’altra stagione da adulto, interrotta dal covid.',
    },
    todo: 'Verificare l’annata: il covid ha fermato i campionati nella 2019/20, non nella 2018/19.',
  },
  {
    name: { en: 'Inter', it: 'Inter' },
    body: {
      en: 'Inherited from my father, which is the only way anyone gets a football team.',
      it: 'Ereditata da mio padre, che è l’unico modo in cui si prende una squadra.',
    },
  },
  {
    name: { en: 'Manga', it: 'Manga' },
    body: {
      en: 'Tokyo Ghoul and One Piece, mostly. The handle you see everywhere — kagedani — comes from there.',
      it: 'Tokyo Ghoul e One Piece, soprattutto. L’handle che vedi ovunque — kagedani — nasce da lì.',
    },
  },
];

/* --------------------------------------------------------------- contact */

export const contactCopy: L = {
  en: 'Working on data architecture or data strategy? Want to argue about Data Mesh, MLOps or cloud? Write to me.',
  it: 'Stai lavorando su architetture dati o data strategy? Vuoi confrontarti su Data Mesh, MLOps o cloud? Scrivimi.',
};

export const metaDescription: L = {
  en: 'Daniele Uboldi — Solutions Architect at Quantyca. I design data platforms — Data Mesh, MLOps, cloud — for companies where hundreds of people depend on them.',
  it: 'Daniele Uboldi — Solutions Architect in Quantyca. Progetto piattaforme dati — Data Mesh, MLOps, cloud — per aziende dove centinaia di persone ci lavorano ogni giorno.',
};
