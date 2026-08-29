import type { Lang } from '../config';

/** A bilingual string. English is authored first: it is the default language. */
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
   * The formal title survives where it belongs, the employment record in
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
   * The claim used to be "I make complicated data architectures usable": an
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
  { num: '20+', label: { en: 'People supported', it: 'Persone seguite' } },
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
    period: '2025 - now',
    summary: {
      en: 'Architecture lead for Data Mesh adoption at a European energy utility, with 100+ users on the Experience Plane: data product discovery, observability and control plane. Since 2026, three AI agents are also in production, querying the estate, drafting business ontology and proposing data quality controls over MCP.',
      it: 'Referente architetturale per l’adozione del Data Mesh in una utility energetica europea, con oltre 100 utenti sull’Experience Plane: discovery dei data product, observability e control plane. Dal 2026 anche tre agenti AI in produzione, che interrogano il patrimonio informativo, redigono l’ontologia di business e propongono controlli di data quality via MCP.',
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
    period: '2022 - 2025',
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
    period: '2022 - 2023',
    summary: {
      en: 'Four AI use cases were sealed inside a vendor’s black box: no explainability for risk or the regulator, no knowledge staying in-house. We rebuilt all four on an open, reproducible platform the bank owns: zero downtime, model performance in line with the vendor’s, and manual work now automated that the bank itself put at 45 FTE.',
      it: 'Quattro use case AI erano sigillati dentro la black box di un vendor: nessuna explainability verso risk e regolatore, nessuna competenza che restasse in casa. Li abbiamo ricostruiti tutti e quattro su una piattaforma aperta e riproducibile che la banca possiede: zero downtime, performance dei modelli in linea con quelle del vendor, e il lavoro manuale ora automatizzato quantificato dalla banca stessa in 45 FTE.',
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
      en: 'An AWS data platform built on CI/CD and infrastructure as code, with access centralised through Lake Formation. Several suppliers built on it, so standards had to be enforced by deployment gates rather than by review: development guidelines and a data quality framework, not attention.',
      it: 'Una piattaforma dati su AWS fondata su CI/CD e infrastructure as code, con accessi centralizzati tramite Lake Formation. A costruirci sopra erano più fornitori, quindi gli standard dovevano essere garantiti dai deployment gate invece che dalla review: linee guida di sviluppo e un framework di data quality, non l’attenzione di qualcuno.',
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
    role: { en: 'Data Strategy Assessment and Execution', it: 'Assessment ed execution della data strategy' },
    summary: {
      en: 'A US craft brewery is replacing its CRM with Dynamics 365, and asked for a data strategy assessment first. I proposed moving from point-to-point integrations to a Digital Integration Hub pattern, with Azure Event Hub as the backbone event bus and three read channels: direct, pulled via API, or pushed once reconciled.',
      it: 'Un birrificio artigianale statunitense sta sostituendo il proprio CRM con Dynamics 365, e ha chiesto prima un assessment di data strategy. Ho proposto di passare da integrazioni point-to-point a un pattern simile a un Digital Integration Hub, con Azure Event Hub come event bus centrale e tre canali di lettura: diretto, via API, o push dopo la riconciliazione.',
    },
    stack: ['Azure Event Hub', 'Azure Functions', 'Dynamics 365'],
    featured: false,
    ongoing: true,
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
    num: '23',
    head: { en: 'Career reviews', it: 'Valutazioni' },
    body: {
      en: 'People whose review and growth path I have prepared since 2022, ahead of their one-to-one. Seven cycles, ten people in the latest.',
      it: 'Persone di cui ho preparato valutazione e percorso di crescita dal 2022, in vista del loro 1:1. Sette cicli, dieci persone nell’ultimo.',
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
    num: '5',
    head: { en: 'Architects in training', it: 'Architetti in formazione' },
    body: {
      en: 'People Quantyca is building into data architects. I am one of the architects who designed the programme, a theory session and a hands-on one. For two years now I have also been one of the three architects who, alongside three delivery managers, run the internal training for junior staff.',
      it: 'Persone che Quantyca sta formando per il ruolo di data architect. Sono tra gli architetti che hanno progettato il percorso, una sessione teorica e una pratica. Da due anni sono anche uno dei tre architetti che, insieme a tre delivery manager, tengono la formazione interna delle figure junior.',
    },
  },
];

/**
 * One episode under the grid, on /about only. A number says how many people
 * went through a review; it cannot show one of them moving.
 */
export const leadershipStory: L = {
  en: 'One of them, because a number doesn’t show people. Someone who had spent years moving from project to project joined my team on the energy data mesh programme. Over the course of that programme they took on bigger and bigger pieces of it, until they stood in front of the promotion committee with a track record of their own: they came out a Senior Data Engineer.',
  it: 'Una di loro, perché un numero non racconta le persone. Una persona che per anni era passata di progetto in progetto è entrata nel mio team sul programma data mesh in ambito energia. Nel corso di quel programma ha preso in carico pezzi sempre più grandi, fino a presentarsi al comitato di promozione con un percorso costruito da sé: ne è uscita Senior Data Engineer.',
};

/* --------------------------------------------------------------- writing */

/**
 * A published artifact. `venue` and `year` are separate fields on purpose: the
 * old single `year: string` held '2023', 'Medium', 'Wanter' and a dash by turns,
 * so the column read as noise rather than as information.
 *
 * Titles are NOT translated: a citation reproduces what was published, so the
 * Italian talk title stays Italian on the English page. The `venue` carries the
 * signal for an international reader, and that one is written in English.
 *
 * Client names are allowed here and nowhere else: inside the citation of an
 * artifact that is already public, the name is the publisher's act, not ours.
 * See docs/redesign-plan.md, "Naming clienti".
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
  /** Exactly one item should carry this: it gets the block treatment on top. */
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
      en: 'With Giampiero Santesarti, BNL BNP Paribas. How a bank moves digital-channel data off the mainframe in real time, with change data capture into Confluent Kafka, without stopping the mainframe.',
      it: 'Con Giampiero Santesarti, BNL BNP Paribas. Come una banca porta fuori dal mainframe i dati dei canali digitali in tempo reale, con change data capture verso Confluent Kafka, senza fermare il mainframe.',
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
    venue: { en: 'Medium, Quantyca', it: 'Medium, Quantyca' },
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
    venue: { en: 'Wanter, a Valore D project', it: 'Wanter, progetto di Valore D' },
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
      en: 'With Andrea Ganassa, advisor Alessandro Redondi. A multi-sensor IoT device for people counting, 95-97% accurate, plus origin-destination flow estimation across a campus.',
      it: 'Con Andrea Ganassa, relatore Alessandro Redondi. Un dispositivo IoT multi-sensore per il conteggio delle persone, accurato al 95-97%, più la stima dei flussi origine-destinazione su un campus.',
    },
    href: 'https://hdl.handle.net/10589/144682',
  },
];

/* ------------------------------------------------------------ experience */

export type Job = {
  period: L;
  role: L;
  company: L;
  /** Omit for periods too old to be worth a writeup on the current portfolio. */
  desc?: L;
  /** First year of the period, for the "ls <year>-projects" hover on /about. */
  startYear: number;
  /** Project slugs this period produced, in the order they should list. Omit or
   *  leave empty when nothing on /work covers it yet — the hover says so honestly. */
  relatedProjects?: string[];
  todo?: Todo;
};

export const experience: Job[] = [
  {
    period: { en: 'July 2025 - now', it: 'Luglio 2025 - presente' },
    // The formal Quantyca title, kept verbatim here and only here: this is the
    // employment record, and it has to match LinkedIn and the CV. Everywhere
    // else the site says "Data Architect". See the note on hero.role.
    role: { en: 'Solutions Architect', it: 'Solutions Architect' },
    company: { en: 'Quantyca / Data@Core, Monza', it: 'Quantyca / Data@Core, Monza' },
    desc: {
      en: 'Architecture lead for Data Mesh adoption in Energy (100+ users on the Experience Plane): data product discovery, observability, control plane. Owner of the client’s data strategy on a 3-5 year horizon. In Insurance, data strategy advisor: the Lean Value Tree, the metrics of success it is measured against, and the federated governance body that keeps it moving.\n\nI coordinate two teams technically, ten developers between them, and designed the data quality frameworks and deployment gates that now guard their releases. A technical assessment on a US brewery client grew into an implementation project for an Event Hub-based data platform. On the side, I wrote three org-wide Claude-based automation skills for architecture diagrams, PR review and repository documentation, cutting diagram time by 70% and PR-review time by 50%. Since March 2026, also head of Quantyca’s international team, alongside the architecture work rather than in place of it.',
      it: 'Referente architetturale per l’adozione del Data Mesh in ambito Energy (oltre 100 utenti sull’Experience Plane): discovery dei data product, observability, control plane. Responsabile della data strategy del cliente su orizzonte 3-5 anni. In ambito Insurance, advisor di data strategy: il Lean Value Tree, le metriche di successo con cui si misura, e la Federated Governance Community che lo tiene in movimento.\n\nCoordino tecnicamente due team, dieci sviluppatori in tutto, e ho disegnato i framework di data quality e i deployment gate che ora sorvegliano i loro rilasci. Un assessment tecnico su un cliente USA del settore birrario è diventato un progetto di implementazione per una piattaforma dati basata su Event Hub. In parallelo, ho scritto tre skill di automazione Claude a livello aziendale per diagrammi di architettura, revisione delle PR e documentazione dei repository, tagliando i tempi dei diagrammi del 70% e quelli di revisione del 50%. Da marzo 2026 sono anche responsabile del team internazionale di Quantyca, in parallelo al lavoro architetturale e non al suo posto.',
    },
    startYear: 2025,
    relatedProjects: ['data-mesh-energy', 'brewery-us'],
  },
  {
    period: { en: 'March 2023 - June 2025', it: 'Marzo 2023 - Giugno 2025' },
    role: { en: 'Data Architect', it: 'Data Architect' },
    company: { en: 'Quantyca / Data@Core, Monza', it: 'Quantyca / Data@Core, Monza' },
    desc: {
      en: 'Technical reference for 19 developers across three clients (Appliances, Banking).\n\nIn Banking, architected and delivered a Data Hub for the Save & Invest domain on Medallion Architecture and Data Mesh principles, running on Kafka, Spark and Apache Iceberg, and kept an MLOps platform serving 100+ data scientists in shape (JupyterHub, Kubernetes, MLflow, GitLab, ELK) through hardening, upgrades and online model serving.\n\nIn Appliances, wrote the guidelines for a multi-supplier AWS platform, guided CI/CD onto AWS, and led an assessment to help the client define its data strategy. A set of dashboards I steered technically now reaches 40 business users, and I set up Lake Formation with TBAC on AWS for centralised access management.',
      it: 'Referente tecnico per 19 sviluppatori su tre clienti (Appliances, Banking).\n\nIn ambito Banking, ho progettato e realizzato un Data Hub per il dominio Save & Invest secondo i principi di Medallion Architecture e Data Mesh, su Kafka, Spark e Apache Iceberg, e ho mantenuto in salute una piattaforma MLOps usata da oltre 100 data scientist (JupyterHub, Kubernetes, MLflow, GitLab, ELK) tra hardening, upgrade e model serving online.\n\nIn ambito Appliances, ho scritto le linee guida per una piattaforma AWS multi-fornitore, guidato la CI/CD su AWS e condotto un assessment per aiutare il cliente a definire la propria data strategy. Un set di dashboard che ho seguito tecnicamente raggiunge oggi 40 utenti business, e ho impostato Lake Formation con TBAC su AWS per la gestione centralizzata degli accessi.',
    },
    startYear: 2023,
    relatedProjects: ['cicd-appliances', 'mlops-banking'],
  },
  {
    period: { en: 'February 2022 - February 2023', it: 'Febbraio 2022 - Febbraio 2023' },
    role: { en: 'Senior Data Engineer & Team Leader', it: 'Senior Data Engineer e Team Leader' },
    company: { en: 'Quantyca / Data@Core', it: 'Quantyca / Data@Core' },
    desc: {
      en: 'Led a team of 7 across three Banking projects: took over an MLOps platform serving 100+ data scientists and pushed it through HA hardening, a proper test environment and online model serving; built a web app (React + Spring Boot); and migrated a third-party blackbox ML solution (4 use cases) onto the bank’s own infrastructure, freeing up 45 FTEs for higher-value work.\n\nPlus a multi-supplier data lake on AWS (S3, Glue, Athena, Step Functions) in Sport.',
      it: 'Guida di un team di 7 persone su tre progetti in ambito Banking: presa in carico di una piattaforma MLOps usata da oltre 100 data scientist, portata avanti tra hardening HA, un vero ambiente di test e model serving online; sviluppo di una web app (React + Spring Boot); e migrazione di una soluzione ML blackbox di terze parti (4 casi d’uso) sull’infrastruttura della banca, liberando 45 FTE per attività a maggior valore.\n\nPiù un datalake multi-fornitore su AWS (S3, Glue, Athena, Step Functions) in ambito Sport.',
    },
    startYear: 2022,
    relatedProjects: ['mlops-banking', 'ml-blackbox-migration'],
  },
  {
    period: { en: 'July 2021 - January 2022', it: 'Luglio 2021 - Gennaio 2022' },
    role: { en: 'Data Engineer', it: 'Data Engineer' },
    company: { en: 'Quantyca / Data@Core', it: 'Quantyca / Data@Core' },
    desc: {
      en: 'Data governance and data catalog in Travel: set up the business glossary and an automatic data catalog population process.\n\nIn Retail, offloaded Oracle onto Vertica through Confluent Kafka as the data bus, building both Kafka Connect and custom producers/consumers, ETL/ELT pipelines on Talend DI, and a star-schema data warehouse model.',
      it: 'Data governance e data catalog in ambito Travel: impostazione del business glossary e di un processo di popolamento automatico del data catalog.\n\nIn ambito Retail, off-loading di Oracle su Vertica passando per Confluent Kafka come data bus, con producer e consumer sia via Kafka Connect sia custom, pipeline ETL/ELT su Talend DI e un modello di data warehouse a schema a stella.',
    },
    startYear: 2021,
  },
  {
    period: { en: 'December 2019 - June 2021', it: 'Dicembre 2019 - Giugno 2021' },
    role: { en: 'Junior Data Engineer', it: 'Junior Data Engineer' },
    company: { en: 'Quantyca / Data@Core', it: 'Quantyca / Data@Core' },
    desc: {
      en: 'Full-stack development (Spring Boot + React) on a SaaS data governance platform: business glossary, data catalog, and a prototype that populated it automatically.\n\nBefore that, ETL flows and data models in Retail, and a Python crawler that filled a data catalog in Online Travel.',
      it: 'Sviluppo fullstack (Spring Boot + React) su una piattaforma SaaS di data governance: business glossary, data catalog e un prototipo che lo popolava in automatico.\n\nPrima ancora, flussi ETL e data model in ambito Retail, e un crawler Python che popolava un data catalog in ambito Online Travel.',
    },
    startYear: 2019,
  },
  {
    period: { en: 'January 2019 - November 2019', it: 'Gennaio 2019 - Novembre 2019' },
    role: { en: 'Research Fellow', it: 'Assegnista di ricerca' },
    company: { en: 'IoTLab (DEIB), Politecnico di Milano', it: 'IoTLab (DEIB), Politecnico di Milano' },
    startYear: 2019,
  },
];

/* ----------------------------------------------------------------- about */

export const about: L[] = [
  {
    en: 'I’m a Data Architect with almost seven years in data, all of them at Quantyca, where I went from Junior Data Engineer to my current role. I’ve worked on large-scale programmes in Energy, Banking, Retail, Appliances and Sport.',
    it: 'Sono un Data Architect con quasi sette anni di esperienza nel mondo dei dati, tutti in Quantyca, dove sono passato da Junior Data Engineer al ruolo attuale. Ho lavorato su programmi di grande scala in ambito Energy, Banking, Retail, Appliances e Sport.',
  },
  {
    en: 'My work sits on Data Mesh, data strategy, MLOps and data governance: helping clients adopt modern architectures and set a direction on a 3-5 year horizon. I’ve been the point of reference for as many as 20 people at once in multi-supplier programmes, and today I head Quantyca’s international team.',
    it: 'Mi occupo di Data Mesh, data strategy, MLOps e data governance: supporto i clienti nell’adozione di architetture moderne e nella definizione di una direzione su orizzonti di 3-5 anni. Sono stato il punto di riferimento di fino a 20 persone contemporaneamente in contesti multi-fornitore, e oggi sono responsabile del team internazionale di Quantyca.',
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
      en: 'Nine years on court, from 11 to 19, then one more season as an adult in 2019/20, which covid ended early.',
      it: 'Nove anni in campo, dagli 11 ai 19, poi un’altra stagione da adulto, la 2019/20, chiusa in anticipo dal covid.',
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
      en: 'Cooking in general, bread in particular. Long proofs, few variables, and a result that tells you plainly whether you got the process right, which is more feedback than most architectures give you.',
      it: 'La cucina in generale, il pane in particolare. Lievitazioni lunghe, poche variabili, e un risultato che ti dice senza girarci intorno se il processo era giusto, che è più di quanto ti restituisca la maggior parte delle architetture.',
    },
  },
  {
    name: { en: 'Manga', it: 'Manga' },
    body: {
      en: 'Tokyo Ghoul and One Piece, mostly. The handle you see everywhere, kagedani, comes from there.',
      it: 'Tokyo Ghoul e One Piece, soprattutto. L’handle che vedi ovunque, kagedani, nasce da lì.',
    },
  },
];

/* --------------------------------------------------------------- contact */

export const contactCopy: L = {
  en: 'Working on data architecture or data strategy? Want to argue about Data Mesh, MLOps or cloud? Write to me.',
  it: 'Stai lavorando su architetture dati o data strategy? Vuoi confrontarti su Data Mesh, MLOps o cloud? Scrivimi.',
};

export const metaDescription: L = {
  en: 'Daniele Uboldi, Data Architect at Quantyca. I design data platforms (Data Mesh, MLOps, cloud) for companies where hundreds of people depend on them.',
  it: 'Daniele Uboldi, Data Architect in Quantyca. Progetto piattaforme dati (Data Mesh, MLOps, cloud) per aziende dove centinaia di persone ci lavorano ogni giorno.',
};
