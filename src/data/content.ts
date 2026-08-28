import type { Lang } from '../config';

/** A bilingual string. English is authored first — it is the default language. */
export type L = Record<Lang, string>;

export const pick = (l: L, lang: Lang) => l[lang];

/** Marks content still waiting on material from Daniele. Rendered visibly in dev. */
export type Todo = string | undefined;

/* ------------------------------------------------------------------ hero */

export const hero = {
  /**
   * "Data Architect", not the formal Quantyca title. Outside the company
   * "Solutions Architect" reads as a much broader pre-sales perimeter than the
   * actual one, so it is wrong in the only place it is read: the market.
   * The formal title survives where it belongs — the employment record in
   * `experience`, which is what a recruiter cross-checks against LinkedIn.
   */
  role: {
    en: 'Data Architect at',
    it: 'Data Architect in',
  } satisfies L,
  headline: {
    en: 'I design data',
    it: 'Progetto piattaforme',
  } satisfies L,
  headlineEm: {
    en: 'platforms',
    it: 'dati',
  } satisfies L,
  /**
   * The claim used to be "I make complicated data architectures usable" — an
   * unfalsifiable statement about one's effect on the world, and one that
   * implies everyone else does the complicating. The headline now says the job
   * and lets the case studies argue. Data Mesh / MLOps / cloud left the hero on
   * purpose: they still carry the keyword load from metaDescription, the JSON-LD
   * knowsAbout, the skills block and every project's stack.
   */
  lede: {
    en: "I'm Daniele. Almost seven years in data, three and a half of them drawing the architectures, and trying to keep the rain out.",
    it: 'Sono Daniele. Da quasi sette anni lavoro nel mondo dei dati, da tre e mezzo ne disegno le architetture, cercando di non farci piovere dentro.',
  } satisfies L,
  aside: {
    en: 'When I’m not doing that: basketball, Inter, a manga backlog I will never finish, and bread.',
    it: 'Quando non lo faccio: basket, Inter, una pila di manga che non finirò mai, e il pane.',
  } satisfies L,
};

/* ----------------------------------------------------------------- stats */

export const stats: { num: string; label: L }[] = [
  { num: '7+', label: { en: 'Years in data', it: 'Anni nei dati' } },
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
  /**
   * The sound the card makes when you hover it, in the manga skin: latin
   * plus katakana, the way a translated volume letters it. It is content,
   * not styling, so it lives here with the rest of the content.
   */
  sfx?: { latin: string; jp: string };
  todo?: Todo;
};

export const projects: Project[] = [
  {
    slug: 'data-mesh-energy',
    sfx: { latin: 'Go', jp: 'ゴゴゴ' },
    title: { en: 'Data Mesh Platform', it: 'Piattaforma Data Mesh' },
    sector: { en: 'Energy', it: 'Energy' },
    role: { en: 'Architecture lead', it: 'Referente architetturale' },
    period: '2025 — now',
    summary: {
      en: 'Architecture lead for Data Mesh adoption at a European energy utility, with 100+ users on the Experience Plane. Data product discovery, observability and control plane — and, since 2026, three AI agents in production that query the information estate, draft business ontology and propose data quality controls over MCP.',
      it: 'Referente architetturale per l’adozione del Data Mesh in una utility energetica europea, con oltre 100 utenti sull’Experience Plane. Discovery dei data product, observability e control plane — e, dal 2026, tre agenti AI in produzione che interrogano il patrimonio informativo, redigono l’ontologia di business e propongono controlli di data quality via MCP.',
    },
    stack: ['Azure', 'ADLS Gen2', 'AKS', 'PostgreSQL', 'OpenDataMesh', 'Azure Purview', 'Blindata', 'Great Expectations', 'OpenTelemetry', 'Grafana', 'MCP', 'A2A'],
    featured: true,
  },
  {
    slug: 'mlops-banking',
    sfx: { latin: 'Zuun', jp: 'ズーン' },
    title: { en: 'MLOps Platform', it: 'Piattaforma MLOps' },
    sector: { en: 'Banking', it: 'Banking' },
    role: { en: 'Platform architect', it: 'Architetto di piattaforma' },
    period: '2022 — 2025',
    summary: {
      en: 'Took over a data science platform serving 100+ data scientists and made it survivable: HTTPS everywhere, a test environment that did not exist, four major versions of unpatched GitLab, high-availability hardening and online model serving.',
      it: 'Presa in carico di una piattaforma di data science usata da oltre 100 data scientist e resa sostenibile: HTTPS ovunque, un ambiente di test che non c’era, quattro major di GitLab non aggiornate, hardening in alta disponibilità e model serving online.',
    },
    stack: ['Kubernetes', 'JupyterHub', 'MLflow', 'GitLab', 'ELK', 'Docker', 'Flask', 'Python'],
    featured: true,
  },
  {
    slug: 'ml-blackbox-migration',
    sfx: { latin: 'Pan', jp: 'パン' },
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
    sfx: { latin: 'Ka', jp: 'カッ' },
    title: { en: 'CI/CD Architecture', it: 'Architettura CI/CD' },
    sector: { en: 'Appliances', it: 'Appliances' },
    role: { en: 'DevOps architecture', it: 'Architettura DevOps' },
    summary: {
      en: 'An AWS data platform founded on CI/CD and infrastructure as code, with access centralised through Lake Formation and tag-based access control. The interesting constraint was that several suppliers build on it: you cannot code-review everyone, so the standards have to be enforced by something other than attention. Development guidelines went out to every supplier, and a data quality framework closed the loop with deployment gates — a release does not pass unless it meets the requirements, naming standards included. I was the technical reference across the workstreams, on integration patterns for legacy offloading and data modelling.',
      it: 'Una piattaforma dati su AWS fondata su CI/CD e infrastructure as code, con gli accessi centralizzati tramite Lake Formation e controllo basato su tag. Il vincolo interessante è che a costruirci sopra sono più fornitori: non puoi fare la review del codice di tutti, quindi gli standard vanno fatti rispettare da qualcosa che non sia l’attenzione. Le linee guida di sviluppo sono andate a ogni fornitore del cliente, e un framework di data quality ha chiuso il cerchio con dei deployment gate — un rilascio non passa se non soddisfa i requisiti, nomenclatura compresa. Ero il riferimento tecnico sui filoni progettuali, sui pattern di integrazione per l’off-loading da sistemi legacy e sulla modellazione dei dati.',
    },
    stack: [
      'AWS', 'CloudFormation', 'AWS CDK', 'CodeCommit', 'CodeBuild', 'CodePipeline',
      'Lake Formation', 'IAM', 'S3', 'Glue', 'Athena', 'Lambda', 'Step Functions', 'Redshift',
    ],
    featured: false,
  },
  {
    slug: 'brewery-us',
    sfx: { latin: 'Fuwa', jp: 'フワ' },
    title: { en: 'Brewery platform', it: 'Piattaforma brewery' },
    sector: { en: 'Beverage, US', it: 'Beverage, USA' },
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
    num: '30',
    head: { en: 'Technical hiring', it: 'Colloqui tecnici' },
    body: {
      en: "Technical interviews I have run for Quantyca's data roles since July 2024. About half of the candidates do not pass. Deciding who comes in shapes what the company can take on two years later.",
      it: 'Colloqui tecnici che ho condotto per i profili data di Quantyca da luglio 2024. Circa metà dei candidati non passa. Decidere chi entra determina cosa l’azienda potrà prendersi in carico due anni dopo.',
    },
  },
  {
    num: '5',
    head: { en: 'Architects in training', it: 'Architetti in formazione' },
    body: {
      en: 'People Quantyca is building into data architects. I am one of the architects who designed the programme — a theory session and a hands-on one — and, for two years now, one of the three architects who, alongside three delivery managers, run the internal training for junior staff.',
      it: 'Persone che Quantyca sta formando per il ruolo di data architect. Sono tra gli architetti che hanno progettato il percorso — una sessione teorica e una pratica — e da due anni uno dei tre architetti che, insieme a tre delivery manager, tengono la formazione interna delle figure junior.',
    },
  },
  {
    num: '20',
    head: { en: 'Point of reference', it: 'Punto di riferimento' },
    body: {
      en: 'People who had me as their point of reference at the same time, at the busiest, spread across concurrent multi-supplier programmes. Today it is eight, across two clients.',
      it: 'Persone che nello stesso periodo hanno avuto me come punto di riferimento, nel momento di massimo carico, distribuite su progetti multi-fornitore in parallelo. Oggi sono otto, su due clienti.',
    },
  },
  {
    num: '23',
    head: { en: 'Career reviews', it: 'Valutazioni' },
    body: {
      en: 'People whose review and growth path I have prepared since 2022, ahead of their one-to-one — seven cycles, ten of them in the latest one.',
      it: 'Persone di cui ho preparato valutazione e percorso di crescita dal 2022, in vista del loro 1:1 — sette cicli, dieci persone nell’ultimo.',
    },
  },
];

/**
 * One episode under the grid, on /about only. A number says how many people
 * went through a review; it cannot show one of them moving.
 */
export const leadershipStory: L = {
  en: 'One of them, because a count cannot show this. Someone who had moved from project to project for years joined my team on the energy data mesh programme. Over the engagement they took on more and more of it, until they went in front of the promotion committee on a record of their own and came out a Senior Data Engineer.',
  it: 'Una di loro, perché un numero non lo mostra. Una persona che per anni era passata di progetto in progetto è arrivata nel mio team sul programma data mesh in ambito energia. Nel corso del progetto se n’è presa pezzi sempre più grandi, fino a presentarsi al comitato di promozione con un percorso suo e uscirne Senior Data Engineer.',
};

/* --------------------------------------------------------------- writing */

/**
 * A published artifact. `venue` and `year` are separate fields on purpose: the
 * old single `year: string` held '2023', 'Medium', 'Wanter' and '—' by turns,
 * so the column read as noise rather than as information.
 *
 * Titles are NOT translated — a citation reproduces what was published, so the
 * Italian talk title stays Italian on the English page. The `venue` carries the
 * signal for an international reader, and that one is written in English.
 *
 * Client names are allowed here and nowhere else: inside the citation of an
 * artifact that is already public, the name is the publisher's act, not ours.
 * See docs/redesign-plan.md — "Naming clienti".
 */
export type WritingItem = {
  kind: L;
  title: L;
  /** Where it was published. Omitted when the year alone says enough. */
  venue?: L;
  year: string;
  /** One line. Without it the row is three fields and no substance. */
  description: L;
  href?: string;
  /** Extra platforms, rendered after the row. The podcast lives in two places. */
  links?: { label: string; href: string }[];
  /** Exactly one item should carry this — it gets the block treatment on top. */
  featured?: boolean;
  todo?: Todo;
};

export const writing: WritingItem[] = [
  {
    kind: { en: 'Talk', it: 'Talk' },
    title: {
      en: 'Mainframe offloading e stream processing a supporto dei canali digitali di BNL',
      it: 'Mainframe offloading e stream processing a supporto dei canali digitali di BNL',
    },
    venue: {
      en: 'Confluent Data in Motion · Milan',
      it: 'Confluent Data in Motion · Milano',
    },
    year: '2023',
    description: {
      en: 'With Giampiero Santesarti, BNL BNP Paribas. How a bank moves digital-channel data off the mainframe in real time — change data capture into Confluent Kafka — without stopping the mainframe.',
      it: 'Con Giampiero Santesarti, BNL BNP Paribas. Come una banca porta fuori dal mainframe i dati dei canali digitali in tempo reale — change data capture verso Confluent Kafka — senza fermare il mainframe.',
    },
    href: 'https://www.quantyca.it/event/quantyca-at-data-in-motion-2023/',
    featured: true,
  },
  {
    kind: { en: 'Podcast', it: 'Podcast' },
    title: {
      en: 'Data Quality: tra Intelligenza Artificiale ed Errori Reali',
      it: 'Data Quality: tra Intelligenza Artificiale ed Errori Reali',
    },
    venue: { en: 'Quantyca', it: 'Quantyca' },
    year: '2025',
    description: {
      en: 'What breaks when data quality meets machine learning, and why the errors that matter are rarely the ones the model reports.',
      it: 'Cosa si rompe quando la data quality incontra il machine learning, e perché gli errori che contano raramente sono quelli che il modello segnala.',
    },
    href: 'https://www.youtube.com/watch?v=P8KBWfO05U4&list=PLySTv8bXDGW73UOatnq6fDMczI-wg9sVL&index=8',
    links: [
      { label: 'Spotify', href: 'https://open.spotify.com/episode/6zJdfuZI4EHXnGXXq10mWd' },
    ],
  },
  {
    kind: { en: 'Article', it: 'Articolo' },
    title: {
      en: "Govern your data: it's a tough job, but someone has to do it",
      it: "Govern your data: it's a tough job, but someone has to do it",
    },
    venue: { en: 'Medium — Quantyca', it: 'Medium — Quantyca' },
    year: '2020',
    description: {
      en: 'Where data governance actually starts: business glossary, data catalog, and a prototype that populates the catalog automatically.',
      it: 'Da dove comincia davvero la data governance: business glossary, data catalog, e un prototipo che popola il catalogo in automatico.',
    },
    href: 'https://medium.com/quantyca/govern-your-data-its-a-tough-job-but-someone-has-to-do-it-8f4256d22b96',
  },
  {
    kind: { en: 'Interview', it: 'Intervista' },
    title: {
      en: 'What a Data Engineer actually does',
      it: 'Che cosa fa davvero un Data Engineer',
    },
    venue: { en: 'Wanter — a Valore D project', it: 'Wanter — progetto di Valore D' },
    year: '2022',
    description: {
      en: 'Video interview on the Data Engineer profession, for a career-guidance platform aimed at people choosing what to study.',
      it: 'Intervista video sul mestiere di Data Engineer, per una piattaforma di orientamento rivolta a chi deve scegliere cosa studiare.',
    },
    href: 'https://wanter.valored.it/it/professioni/data-engineer',
  },
  {
    kind: { en: 'Thesis', it: 'Tesi' },
    title: {
      en: 'A multi-sensor approach to people counting and flow estimation in smart campus',
      it: 'A multi-sensor approach to people counting and flow estimation in smart campus',
    },
    venue: { en: 'Politecnico di Milano', it: 'Politecnico di Milano' },
    year: '2018',
    description: {
      en: 'With Andrea Ganassa, advisor Alessandro Redondi. A multi-sensor IoT device for people counting, 95–97% accurate, plus origin–destination flow estimation across a campus.',
      it: 'Con Andrea Ganassa, relatore Alessandro Redondi. Un dispositivo IoT multi-sensore per il conteggio delle persone, accurato al 95–97%, più la stima dei flussi origine–destinazione su un campus.',
    },
    href: 'https://hdl.handle.net/10589/144682',
  },
];

/* ------------------------------------------------------------ experience */

export type Job = { period: L; role: L; company: L; desc: L; todo?: Todo };

export const experience: Job[] = [
  {
    period: { en: 'July 2025 — now', it: 'Luglio 2025 — presente' },
    // The formal Quantyca title, kept verbatim here and only here: this is the
    // employment record, and it has to match LinkedIn and the CV. Everywhere
    // else the site says "Data Architect" — see the note on hero.role.
    role: { en: 'Solutions Architect', it: 'Solutions Architect' },
    company: { en: 'Quantyca — Data@Core, Monza', it: 'Quantyca — Data@Core, Monza' },
    desc: {
      en: 'Architecture lead for Data Mesh adoption in Energy (100+ users on the Experience Plane): data product discovery, observability, control plane. Owner of the client’s data strategy on a 3–5 year horizon. In Insurance, data strategy advisor: the Lean Value Tree, the metrics of success it is measured against, and the federated governance body that keeps it moving — plus technical coordination of two teams, ten developers between them. Since March 2026, also head of Quantyca’s international team, alongside the architecture work rather than in place of it.',
      it: 'Referente architetturale per l’adozione del Data Mesh in ambito Energy (oltre 100 utenti sull’Experience Plane): discovery dei data product, observability, control plane. Responsabile della data strategy del cliente su orizzonte 3–5 anni. In ambito Insurance, advisor di data strategy: il Lean Value Tree, le metriche di successo con cui si misura, e la Federated Governance Community che lo tiene in movimento — più il coordinamento tecnico di due team, dieci sviluppatori in tutto. Da marzo 2026 anche responsabile del team internazionale di Quantyca, in parallelo al lavoro architetturale e non al suo posto.',
    },
  },
  {
    period: { en: 'March 2023 — June 2025', it: 'Marzo 2023 — Giugno 2025' },
    role: { en: 'Data Architect', it: 'Data Architect' },
    company: { en: 'Quantyca — Data@Core, Monza', it: 'Quantyca — Data@Core, Monza' },
    desc: {
      en: 'Technical reference for 19 developers across three clients (Appliances, Banking). Guidelines for a multi-supplier AWS platform, technical direction for CI/CD on AWS, and the upkeep and evolution of an MLOps platform used by 100+ data scientists.',
      it: 'Referente tecnico per 19 sviluppatori su tre clienti (Appliances, Banking). Linee guida per una piattaforma AWS multi-fornitore, guida tecnica per la CI/CD su AWS, manutenzione ed evoluzione di una piattaforma MLOps usata da oltre 100 data scientist.',
    },
  },
  {
    period: { en: 'February 2022 — February 2023', it: 'Febbraio 2022 — Febbraio 2023' },
    role: { en: 'Senior Data Engineer & Team Leader', it: 'Senior Data Engineer e Team Leader' },
    company: { en: 'Quantyca — Data@Core', it: 'Quantyca — Data@Core' },
    desc: {
      en: 'Led a team of 7 across three Banking projects: taking over an MLOps platform used by 100+ data scientists, building a web app (React + Spring Boot), and migrating a blackbox ML solution to open source. Plus a data lake on AWS in Sport.',
      it: 'Guida di un team di 7 persone su tre progetti in ambito Banking: presa in carico di una piattaforma MLOps usata da oltre 100 data scientist, sviluppo di una web app (React + Spring Boot), migrazione di una soluzione ML blackbox verso open source. Più un datalake su AWS in ambito Sport.',
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
      en: 'Full-stack development on a SaaS data governance platform (Spring Boot + React). Before that, ETL flows and data models in Retail, and a Python crawler that filled a data catalog in Online Travel.',
      it: 'Sviluppo fullstack su una piattaforma SaaS di data governance (Spring Boot + React). Prima ancora, flussi ETL e data model in ambito Retail, e un crawler Python che popolava un data catalog in ambito Online Travel.',
    },
  },
  {
    period: { en: 'January 2019 — November 2019', it: 'Gennaio 2019 — Novembre 2019' },
    role: { en: 'Research Fellow', it: 'Assegnista di ricerca' },
    company: { en: 'IoTLab, DEIB — Politecnico di Milano', it: 'IoTLab, DEIB — Politecnico di Milano' },
    desc: {
      en: 'Applied IoT research at the DEIB lab, on industrial and consumer devices.',
      it: 'Ricerca applicata sull’IoT al laboratorio DEIB, su dispositivi industriali e di consumo.',
    },
  },
];

/* ----------------------------------------------------------------- about */

export const about: L[] = [
  {
    en: 'I’m a Data Architect with almost seven years in data, all of them at Quantyca, where I went from Junior Data Engineer to my current role. I’ve worked on large-scale programmes in Energy, Banking, Retail, Appliances and Sport.',
    it: 'Sono un Data Architect con quasi sette anni di esperienza nel mondo dei dati, tutti in Quantyca, dove sono passato da Junior Data Engineer al ruolo attuale. Ho lavorato su programmi di grande scala in ambito Energy, Banking, Retail, Appliances e Sport.',
  },
  {
    en: 'My work sits on Data Mesh, data strategy, MLOps and data governance: helping clients adopt modern architectures and set a direction on a 3–5 year horizon. I’ve been the point of reference for as many as 20 people at once in multi-supplier programmes, and today I head Quantyca’s international team.',
    it: 'Mi occupo di Data Mesh, data strategy, MLOps e data governance: supporto i clienti nell’adozione di architetture moderne e nella definizione di una direzione su orizzonti di 3–5 anni. Sono stato il punto di riferimento di fino a 20 persone contemporaneamente in contesti multi-fornitore, e oggi sono responsabile del team internazionale di Quantyca.',
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
    items: ['Data Mesh', 'Data Products', 'Data Strategy', 'Data Governance', 'Data Catalog', 'OpenDataMesh', 'Blindata', 'Azure Purview', 'Lean Value Tree', 'EDGE'],
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
      en: 'Nine years on court, from 11 to 19 — then one more season as an adult, in 2019/20, which covid ended early.',
      it: 'Nove anni in campo, dagli 11 ai 19 — poi un’altra stagione da adulto, la 2019/20, chiusa in anticipo dal covid.',
    },
  },
  {
    name: { en: 'Inter', it: 'Inter' },
    body: {
      en: 'Inherited from my father, which is the only way anyone gets a football team.',
      it: 'Ereditata da mio padre, che è l’unico modo in cui si prende una squadra.',
    },
  },
  {
    name: { en: 'Bread', it: 'Il pane' },
    body: {
      en: 'Cooking in general, bread in particular. Long proofs, few variables, and a result that tells you plainly whether you got the process right — which is more feedback than most architectures give you.',
      it: 'La cucina in generale, il pane in particolare. Lievitazioni lunghe, poche variabili, e un risultato che ti dice senza girarci intorno se il processo era giusto — che è più di quanto ti restituisca la maggior parte delle architetture.',
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
  en: 'Daniele Uboldi — Data Architect at Quantyca. I design data platforms — Data Mesh, MLOps, cloud — for companies where hundreds of people depend on them.',
  it: 'Daniele Uboldi — Data Architect in Quantyca. Progetto piattaforme dati — Data Mesh, MLOps, cloud — per aziende dove centinaia di persone ci lavorano ogni giorno.',
};
