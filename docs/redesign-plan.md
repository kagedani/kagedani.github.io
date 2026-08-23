# Portfolio redesign — piano

> Esito della sessione di grilling del 2026-08-02. Questo file è la fonte di verità
> delle decisioni prese; se una decisione cambia, si aggiorna qui.

## Obiettivo

- **Primario — (c) autorità tecnica.** Pubblico: peer, community Data Mesh, organizzatori
  di conferenze, potenziali clienti. Azione attesa: "leggi quello che scrive", "invitalo a parlare".
- **Derivato — (b) opportunità inbound.** Recruiter e ruoli. Non richiede lavoro dedicato:
  è un effetto collaterale di (c) fatto bene.
- Esclusi: (a) biglietto da visita passivo, (d) acquisizione consulenziale in proprio
  (incompatibile con il rapporto di lavoro).

## Lingua

| | |
|---|---|
| Default | **Inglese** |
| Italiano | Via toggle, **solo sulle pagine statiche** |
| Blog | **Solo inglese** |
| CV | Versione EN da produrre a sito quasi pronto |

Razionale: asimmetria di accesso. Un lettore italiano non è ostacolato dall'inglese;
un peer internazionale è ostacolato dall'italiano. La lingua di default è una
dichiarazione di posizionamento, non una feature.

Il blog resta monolingua per non raddoppiare per sempre il costo di scrittura:
una traduzione mancante è peggio di una lingua sola.

## Stack tecnico

- **Astro**, output statico, deploy con GitHub Actions su GitHub Pages
  (sorgente Pages = "GitHub Actions", non un branch).
- **Anti-rot, obbligatorio:** lockfile committato, versione di Node fissata in CI,
  dependabot disattivato. Il sito si tocca 3 volte l'anno e la build deve reggere ferma
  per anni. Non si inseguono gli aggiornamenti.
- i18n con URL separati (`/en/`, `/it/`) e `hreflang` corretti. **Non** uno switch
  client-side in JavaScript.
- Nessun rilevamento automatico della lingua del browser (Pages non ha logica
  server-side, e comunque è una pratica che confonde utenti e crawler).
- `JSON-LD Person` con `knowsAbout` per il matching automatico di recruiter e agenti.

### Struttura

```
/            home — posizionamento, highlight, anteprime. Si legge in 40 secondi
/work        case study, ognuno con ancora linkabile
/writing     podcast, Medium, intervista, materiale didattico, tesi, report IoT
/about       bio estesa, Leadership & People, interessi
/blog        NASCOSTO finché non contiene almeno 2 pezzi
```

Il motore del blog esiste dalla Fase 2, ma la sezione non è raggiungibile né linkata
finché non ha contenuto. Una sezione "Blog" con un post di due anni fa fa più danno
del sito attuale.

## Design

Direzione: **(d) SaaS moderno fatto bene + (b) vocabolario tecnico**.

Vincoli verificabili — se ricompare una di queste, siamo tornati al punto di partenza:

- ❌ ombre morbide sotto le card → bordi netti da 1px
- ❌ `border-radius: 12px` ovunque → angoli quasi vivi
- ❌ blu `#2563eb` (il blu di default di Tailwind, colore ufficiale dei siti generici)
- ❌ card che si sollevano al passaggio del mouse

Da rispettare:

- **Doppia modalità.** Shell a card sugli indici (home, `/work`, `/writing`);
  impaginazione editoriale con colonna di testo stretta sulle pagine di contenuto lungo
  (case study, post, sezione leadership).
- Mono per date, stack e label. Palette desaturata. Griglia percepibile.
- **Dark mode che segue il sistema**, con toggle manuale. Entrambi i temi curati davvero,
  non uno l'inversione dell'altro.
- Icone monocrome e sobrie, **e corrette** — niente balena di Docker su Kubernetes.
- **Zero emoji.** In nessun punto del sito.
- Diagrammi solo **concettuali** (OpenDataMesh, Dehghani, letteratura pubblica).
  Mai architetture di cliente, nemmeno anonimizzate.

### Sistema visivo scelto (Fase 1, prototipo C)

Base **Editorial** (prototipo B), con nav e sezione Leadership presi da **Systems** (prototipo A).

- **Palette:** carta calda. Light `#faf8f4` / testo `#1b1815` / bordi `#e1dbd0`.
  Dark `#121110` / testo `#ece7df` / bordi `#2c2823`.
  **Accento terracotta** — light `#9a4522`, dark `#e28a5c`. (Deliberatamente non blu.)
- **Font:** `Newsreader` (serif, display e titoli), `Inter` (corpo),
  `IBM Plex Mono` (date, stack, label, kicker di sezione).
  Da caricare davvero — l'errore del sito attuale era dichiarare Inter e non caricarlo mai.
- **Nav:** quadrotto `DU` pieno, link mono uppercase con underline in accento all'hover,
  toggle `EN|IT` in un box con bordo, bottone tema quadrato.
- **Card:** bordo 1px, `border-radius: 2px`, hover = solo il bordo che passa in accento.
  Nessuna ombra, nessuna traslazione.
- **Leadership:** griglia 2×2 di celle a bordo condiviso, numero grande in accento,
  intestazione mono, più **una riga di voce in serif sopra** (le celle da sole
  non suonano come una persona).
- **Kicker di sezione:** mono uppercase in accento, seguito da una riga orizzontale.

File: `scratchpad/proto-c-merged.html` (fuori dal repo, throwaway).

## Contenuto

### Home — H1

Versione scelta (C): claim professionale in H1, nome nella seconda riga,
personalità in coda. Non "Hi, I'm Daniele": per un lettore internazionale il nome
non è un'informazione, ed è già nel logo, nel title e nell'URL.

**Revisione del 2026-08-23.** La struttura regge, il claim no. *"Rendo usabili le
architetture dati complesse"* è stato giudicato altezzoso dall'autore, e a ragione:
è un'affermazione non verificabile sul proprio effetto sul mondo, e "complesse"
implica che gli altri complicano e lui sistema. L'H1 dice ora il mestiere e basta
— *"Progetto piattaforme dati"* — e lascia argomentare i case study.

La battuta sta nella lede, non nel titolo: **il titolo imposta, la lede paga**, e
mettere in H1 la frase che comincia con "Sono Daniele" avrebbe riaperto proprio la
decisione che la versione C aveva chiuso. Testo vigente:

> Sono Daniele. Da quasi sette anni lavoro nel mondo dei dati, da tre e mezzo ne
> disegno le architetture, cercando di non farci piovere dentro.

`Data Mesh, MLOps, cloud` sono **usciti dall'hero** su richiesta dell'autore. Non è
una perdita di keyword: restano in `metaDescription`, nel `knowsAbout` del JSON-LD,
nel blocco skill e nello stack di ogni progetto.

Numeri allineati sulla timeline reale: dicembre 2019 → agosto 2026 sono 6 anni e 8
mesi, quindi "quasi sette"; da Data Architect (marzo 2023) sono 3 anni e 5 mesi,
quindi "tre e mezzo". La statistica in hero è passata da `6+` a `7+`, altrimenti si
contraddiceva con la lede nella stessa schermata.

### Nomenclatura del ruolo — deciso il 2026-08-23

Il sito si presenta come **Data Architect**, non come Solutions Architect. Fuori da
Quantyca "Solutions Architect" evoca un perimetro pre-sales molto più ampio di
quello reale, quindi è sbagliato nell'unico posto in cui viene letto: il mercato.

**Unica eccezione: `experience[0]`**, dove resta *Solutions Architect* perché quello
è il record di impiego e deve reggere il confronto con LinkedIn e con il CV. Un
lettore vede la qualifica aziendale nel percorso e la pratica reale nel
posizionamento — normale ai livelli senior, e verificabile.

### Frasi ritirate il 2026-08-23

Criterio: **niente giudizi su di sé, niente difese preventive, niente ammiccamenti.**

- `page.work.lede` — *"Cinque progetti che vale la pena raccontare. Nessun cliente è
  nominato…"*: il primo pezzo è un giudizio che spetta al lettore, il secondo ti
  difende da un'accusa che nessuno ha mosso. La chiave è stata **eliminata**, non
  riscritta: il titolo "Progetti" basta.
- `cta.allWriting` — *"Tutto quello che ho pubblicato"* per cinque item → *"Tutte le
  pubblicazioni"*.
- Descrizione dell'articolo Medium — via la chiusa *"Scritto sei anni e un ruolo fa"*,
  ammiccante. L'anno in colonna dice già la stessa cosa senza strizzare l'occhio.

### `/work` — 3 approfonditi + 2 brevi

| Progetto | Formato |
|---|---|
| Data Mesh Platform — Energy | approfondito |
| MLOps Platform — Banking | approfondito |
| ML Blackbox Migration — Banking | approfondito |
| CI/CD Architecture — Appliances | breve |
| Brewery — cliente US | breve, **dichiarato ongoing** |

Tagliati: Data Hub Save & Invest, Datalake Sport (il più commodity dei cinque).

**Scheletro fisso** dei case study approfonditi, 400–600 parole:

1. **Contesto** — settore, scala, situazione di partenza
2. **Il problema** — perché era difficile, non solo cosa c'era da fare
3. **L'approccio / le decisioni** — le scelte architetturali e *perché quelle*.
   Ogni decisione chiude con il suo **trade-off** in blockquote.
   Senza un costo ammesso, è un comunicato stampa.
4. **Cosa è andato male** — aggiunta dopo il case study ML Blackbox, dove si è
   rivelata la sezione migliore della pagina. Un guasto raccontato con precisione
   vale più di tre decisioni raccontate bene: dimostra che c'eri davvero.
   Da chiedere sempre, esplicitamente, perché non viene offerto spontaneamente.
5. **Il mio ruolo** — esplicito: dimensione del team, cosa possedevi personalmente,
   **e cosa ti è stato imposto**. Dichiarare il perimetro fa sembrare più senior, non meno.
6. **Esito** — il numero, e cosa le persone riescono a fare che prima non potevano
7. **Stack** — keyword, in mono

### Naming clienti — regola vigente dal 2026-08-12

**Il nome di un cliente può comparire solo dentro la citazione di un artefatto
già pubblico. Mai nella prosa scritta da noi.**

Criterio meccanico, così non richiede giudizio caso per caso: *se il nome è già
stampato nel titolo di qualcosa che esiste online, lo si riporta; se lo stai
scrivendo tu per la prima volta, no.*

- **Ammesso** — `/writing`: titolo di un talk, byline di un articolo, titolo di
  un episodio. Il nome è un atto di chi ha pubblicato, non nostro, e riprodurlo
  fedelmente è il punto della citazione.
- **Vietato** — case study, home, about: tutta la narrativa. Lì il settore è il
  massimo del dettaglio. Quello che Quantyca pubblica è un titolo e un abstract,
  non che il progetto è andato storto in due punti.

Storia della regola, perché non venga rifatta la stessa giravolta una terza volta:

| Data | Regola | Esito |
|---|---|---|
| iniziale | "citabile dove Quantyca lo cita già" | ritirata |
| 2026-08-04 | "nessun nome, mai" | superata |
| 2026-08-12 | solo dentro citazioni di artefatti pubblici | **vigente** |

Il caso che ha forzato il cambio: il talk *"Mainframe offloading e stream
processing a supporto dei canali digitali di BNL"* — Confluent Data in Motion,
Milano, 26 ottobre 2023 — co-presentato con Giampiero Santesarti di BNL BNP
Paribas. La distinzione che regge: una Success Story è marketing di Quantyca
*su* un cliente; un talk co-presentato è una pubblicazione congiunta *con* il
cliente, di cui l'autore è accreditato. Citare un proprio talk è bibliografia.
E un talk che non puoi né nominare né linkare non prova niente.

Costo accettato consapevolmente: il talk lega pubblicamente il nome dell'autore
a un cliente banking, mentre due case study "Banking" restano anonimi. Un
lettore informato fa il collegamento. L'anonimizzazione era già sottile; questa
la assottiglia ancora.

Il fatturato come sostituto del nome — pratica usata altrove in Quantyca — **non
si usa sui settori piccoli**: per l'Energy italiano, settore più geografia più
ordine di grandezza del fatturato identificano una sola azienda, quindi il
fatturato annulla l'anonimizzazione invece di preservarla.


### `/writing` — ridisegnata il 2026-08-12

Il modello dati era il problema, non l'impaginazione: `year: string` conteneva a
turno `'2023'`, `'Medium'`, `'Wanter'` e `'—'`, quindi la colonna si leggeva come
rumore. Spezzato in **`venue` + `year`**, più una **riga di descrizione** per item —
senza, qualunque forma resta magra.

Forma: **un item `featured` in blocco bordato in cima, gli altri come righe
arricchite su tre righe.** Non una griglia di card (che darebbe lo stesso peso a un
talk Confluent e a una tesi da studente) e non la lista piatta a una riga di prima
(niente da leggere, quindi niente peso). Sei item non hanno bisogno di
raggruppamento: un'intestazione "Talks" con sotto un elemento solo annuncia che di
talk ce n'è uno. Si raggruppa a 12–15 item, ed è un lavoro da dieci minuti perché
è tutto data-driven. Quale item è in evidenza sta **nel dato**, non nel layout.

La home resta compatta (classi `.wc-*`): è un'anteprima da 40 secondi, i titoli
bastano.

| # | Tipo | Venue · Anno |
|---|---|---|
| 1 ★ | Talk — Mainframe offloading… di BNL | Confluent Data in Motion · Milano · 2023 |
| 2 | Podcast — Data Quality: tra IA ed Errori Reali | Quantyca · 2 dic 2025 · YouTube + Spotify |
| 3 | Article — Govern your data… | Medium · 2020 |
| 4 | Interview — video sul mestiere di Data Engineer | Wanter (Valore D) |
| 5 | Thesis — A multi-sensor approach… | Politecnico di Milano · 2018 |

Decisioni sui singoli item:

- **I titoli non si traducono.** Una citazione riproduce ciò che è stato
  pubblicato, quindi il titolo italiano del talk resta italiano anche in EN. È la
  `venue` a portare il segnale per il lettore internazionale, e quella è in inglese.
  Conseguenza: l'intervista Wanter, che era tradotta, è stata riportata all'originale.
- **Medium 2020 resta, con l'anno in chiaro.** Scritto da Junior Data Engineer:
  l'anno visibile lo fa leggere come traiettoria invece che come roba vecchia
  spacciata per attuale.
- **Wanter**: la pagina è una scheda-professione generica e **non nomina l'autore**;
  il contenuto è il video dell'intervista. La descrizione deve dire che è un video,
  altrimenti chi clicca non capisce cosa dovrebbe guardare.
- **Tesi**: co-autore **Andrea Ganassa** accreditato (POLITesi riporta entrambi),
  relatore Alessandro Redondi, anno **2018** — non 2019 come diceva il sito.
  Full text ad accesso riservato: la scheda POLITesi non dà il PDF ma dà la prova.
- **Path to Data Architect: tagliato.** Repository destinato a Quantyca.

### `/about` — Leadership & People

Non "soft skills": la parola delegittima il contenuto prima che venga letto.
È un track record, e si fa credere con numeri e specificità.

Ordine: **prima le cose rare** — condurre i colloqui tecnici di assunzione,
far crescere altri architetti, guidare il team internazionale.
Poi il mentoring junior, che dichiarano tutti.

Forma: 3–4 blocchi in prosa breve, ognuno con un numero dentro. Non bullet, non card.
Più una riga sola in home.

### Tech skills

- **Restano** come superficie keyword densa (recruiter e agenti matchano su "Python",
  mai su "Python intermedio").
- **I livelli "Avanzato / Intermedio" spariscono.** Non aggiungono un solo match
  e costano in percezione: nessun altro si dà un voto basso da solo.
- Lo stack è ripetuto **anche su ogni progetto**: ogni keyword compare due volte,
  una nuda per il match automatico, una attaccata a una prova per l'essere umano.

### Interessi

Salvati, ma su `/about` e **specifici**. Materiale: basket giocato 9 anni dagli 11 ai 19
più il ritorno da adulto, Inter di padre in figlio, Tokyo Ghoul e One Piece.
"Film di ogni genere" non torna.

**2026-08-23** — aggiunti **cucina e pane**, che è il migliore dei cinque: concreto,
artigianale, con tempi lunghi e un processo che restituisce un verdetto. Sta accanto
al mestiere senza bisogno di forzare il parallelo.

**I film restano fuori**, richiesti e poi ritirati dall'autore nella stessa sessione:
senza un aggancio specifico — un genere, un regista, un'abitudine — è l'unica voce
che potrebbe aver scritto chiunque, ed è esattamente ciò che la regola vieta.

Nota: `kagedani` = *kage* + *Dani*. L'interesse per manga e Giappone è già nel brand
da anni; il sito lo rende coerente invece che casuale.

### Contatti

- **Form eliminato.** Era rotto da marzo (`YOUR_FORM_ID` mai sostituito) e con questo
  pubblico non porta contatti: dipendenza esterna, superficie di spam, questione GDPR,
  una cosa in più che si rompe in silenzio.
- Email in chiaro (`mailto:`), LinkedIn, **GitHub** — oggi completamente assente.

## Correzioni al contenuto esistente

- [x] "5+ anni di esperienza" → **6+** (la timeline parte a dicembre 2019; 7 con la ricerca)
- [x] Logo `daniele.dev` → quadrotto `DU` + nome. Il dominio non esiste
- [x] Footer con `2026` hardcoded → anno calcolato al build
- [x] `og:image` puntava a `assets/og-cover.png` inesistente → tag rimosso e
      `twitter:card` declassata a `summary`, così la condivisione non è più rotta
- [x] Font dichiarato e mai caricato → Newsreader + Inter + IBM Plex Mono caricati davvero
- [x] Commento `<!-- Sostituisci gli href con i link reali -->` → sparito con il vecchio file
- [x] Icona Kubernetes = balena di Docker → nessuna icona di tecnologia, solo tipografia
- [x] Form di contatto rotto → eliminato; email, LinkedIn e GitHub al suo posto
- [x] Team internazionale: **da marzo 2026**, in parallelo al ruolo di Solutions
      Architect e non al suo posto — quindi non va scorporato in una riga di esperienza
- [x] Stagione di basket: **2019/20**, quella interrotta dal covid
- [x] Lede di `/work` che stampava ancora la regola ritirata sui nomi clienti
- [x] Intervista Wanter: **13 aprile 2022**
- [ ] Immagine OG 1200×630 da produrre

## Stato — Fase 2 completata

Astro 7.1.6, build verde, 8 pagine statiche (`/`, `/work/`, `/writing/`, `/about/`
e i quattro equivalenti sotto `/it/`). Blog gated: zero rotte generate, zero link in nav.

- `src/config.ts` — `BLOG_ENABLED`, dati di contatto, costanti del sito
- `src/data/content.ts` — **tutti** i testi, bilingui, in un solo file
- `src/i18n/ui.ts` — stringhe di interfaccia e helper di routing per lingua
- `src/components/pages/*.astro` — un componente per pagina, parametrico su `lang`,
  così IT ed EN non possono divergere per struttura: divergono solo per testo
- `src/components/Todo.astro` — i buchi di contenuto sono visibili in `npm run dev`
  e invisibili in produzione (`PUBLIC_SHOW_TODOS=1` per forzarli in build)

Comandi: `npm run dev` · `npm run build` · `npm run preview`.

**Da fare a mano una volta sola:** su GitHub, Settings → Pages → Source = "GitHub Actions".

## Risolto il 2026-08-04

- **Nesso dei 45 FTE — chiarito, e il claim è più forte di come era scritto.**
  Il costo di licenza del prodotto ML proprietario rendeva l'automazione non
  sostenibile: quel costo andava affrontato comunque. La migrazione a open source
  ha rimosso il tetto economico e ha reso praticabile automatizzare le attività.
  Quindi *non* "la migrazione ha automatizzato il lavoro" ma "la migrazione ha reso
  economicamente possibile l'automazione". Catena causale verificabile.
  Formulazione da tenere: "riallocati su attività a maggior valore" — mai nulla
  che somigli a posti tagliati.
- **Email**: si tiene `daniele.uboldi.job@gmail.com` nonostante il `.job`.
- **Nomi clienti**: nessuno, mai. Vedi sopra.

## Aperto

- **Dominio**: rimandato. Si valuta dopo il lancio.
- **Immagine OG** 1200×630 da produrre.

## Diagrammi — vincolo aggiornato

Il divieto iniziale ("nessun diagramma di architettura") **resta per il materiale di
cliente**, ma non copre i diagrammi che l'autore ha già prodotto e portato all'esterno
in forma anonima. Il primo diagramma del sito nasce dal deck
`2026-daniele-uboldi-aws-sa-use-case.pptx`, fatto per una selezione AWS: topologia
generica, nessun nome, nessun dato.

Realizzazione: **SVG inline nel Markdown**, non un'immagine. Legge le variabili CSS,
quindi funziona in chiaro e in scuro, e le etichette sono testo selezionabile e
indicizzabile. Le classi sono `.dg-*` in `global.css`.

Le etichette dei diagrammi restano **in inglese anche nella versione italiana**: sono
in gran parte nomi propri di tecnologie, e un diagramma tecnico in inglese su una pagina
italiana è la norma. Conseguenza: l'SVG è duplicato identico nei due file Markdown —
se lo modifichi, modificalo in due posti.

## Case study scritti

| Progetto | EN | IT | Diagramma | Cosa è andato male |
|---|---|---|---|---|
| Data Mesh / Energy | ✅ | ✅ | — | ✅ |
| ML Blackbox / Banking | ✅ | ✅ | ✅ | ✅ |
| MLOps / Banking | — | — | — | — |
| CI/CD Appliances (breve) | — | — | — | n/a |
| Brewery US (breve) | — | — | — | n/a |

Lo **scheletro reale è a 7 sezioni**, non 5: `Context`, `The problem`,
`The architecture` (opzionale, solo dove un diagramma se lo merita),
`The decisions`, `What went wrong` (obbligatoria), `My role`, `Outcome`.
Il **vincolo delle 400–600 parole è ritirato**: i primi due case study stanno a
926 e 1496 parole e fingere il contrario non aiuta nessuno. La lunghezza segue il
materiale. Il README in `src/content/case-studies/` è la versione operativa di
questa regola e va tenuto allineato.

Sul ML Blackbox il titolo è stato cambiato in **"From black box to shared knowledge"**
(dal deck) e la gerarchia della storia ribaltata: proprietà ed explainability in
apertura, i 45 FTE come conseguenza economica e **attribuiti alla banca**, che è
chi ha fornito il numero. Un claim di risparmio invita allo scetticismo; "la banca
oggi possiede e può spiegare i suoi modelli" è verificabile e raro.

## Coda di revisione Data Mesh — chiusa il 2026-08-12

I quattro trade-off dedotti sono stati sottoposti all'autore chiedendogli quali
**ricordasse di aver pesato**, non quali gli sembrassero veri. Esito:

| Trade-off dedotto | Esito |
|---|---|
| Control plane vs convenzioni | **riformulato** — era un uomo di paglia |
| OpenDataMesh vs vendor con supporto | **tagliato** |
| Adapter come assicurazione sulla portabilità | **tagliato** |
| OTel per la data quality | **confermato**, resta invariato |

La correzione sul control plane è la più importante: l'alternativa reale non era
"convenzioni e code review" (inventata per avere un contrasto) ma **implementare
gli adapter direttamente contro Blindata, o fare accrocchi**. Il control plane si
interpone fra la piattaforma SaaS e il layer di adapter, e mette a terra capability
di lifecycle essenziali e agnostiche agli strumenti già in casa (GitLab). Le due
decisioni 1 e 3 erano quindi la stessa decisione spezzata in due per fare volume:
riunite. OpenDataMesh resta come *implementazione* dentro quella decisione, senza
più il trade-off inventato su community e assunzioni.

Il trade-off vero è **politico, non tecnico**: convincere il cliente a finanziare un
layer che per mesi non produceva risultati visibili. Risolto con una roadmap che dà
precedenza alle capability essenziali e rimanda quelle che richiedono una maturità
data-driven che l'organizzazione non ha ancora.

### Materiale nuovo emerso — il filone agenti

Non era sul sito da nessuna parte, ed è il contenuto più forte che ci sia.

- **Tre agenti su MCP**, in produzione da luglio 2026. (1) interrogazione del
  patrimonio informativo via MCP server di Blindata; (2) supporto alla definizione
  di ontologia e termini di business, in A2A col primo, con scrittura via MCP;
  (3) proposta di controlli di data quality, su un MCP server sopra il wrapper di
  Great Expectations riutilizzabile da tutti i data product.
- **Scrittura recintata su tre lati**: comando esplicito dell'utente, prefisso
  `[GenAI]` su ogni concetto (convenzione voluta — la ricerca di Blindata trova
  `customer` anche col prefisso), tenant di test più un servizio dedicato per
  promuovere un'ontologia di dominio in produzione.
- **Niente collo di bottiglia**: l'obiezione classica allo human-in-the-loop
  presuppone un team di governance centrale. In un mesh federato la stesura
  dell'ontologia è responsabilità dei domini, quindi la revisione si distribuisce
  insieme al lavoro.
- **Cosa è andato male**: pianificato set–dic 2025, realizzato ott 2025–lug 2026.
  La piattaforma AI del cliente era in setup e su diversi servizi il team è stato
  di fatto il primo utilizzatore: **il conversation management se lo sono scritto**,
  e hanno dovuto proporre la metodologia di test degli agenti e di comparazione dei
  modelli. Circa metà del tempo è andata in pezzi di piattaforma e di metodo che
  avrebbero dovuto esserci già.

Decisione: **resta dentro il case study Data Mesh**, niente card autonoma. Il post
sul blog su MCP/A2A per la data governance è stato valutato e **rimandato** — il
blog è gated a due pezzi e non ha senso accenderlo per uno.

### Le due frasi interpretative — chiuse il 2026-08-12

- *"Il costo di produrre un data product era più alto del valore che un team di
  dominio riusciva a vederci"* — **confermata dall'autore**, resta invariata.
- *"Successo misurato sull'output degli altri team invece che sul proprio"* —
  **era una semplificazione sbagliata**, creava una contrapposizione che non esiste.
  La realtà: convivono **due famiglie di metriche**. Quelle di delivery pure
  (es. numero di componenti di piattaforma rilasciati) e quelle di **adoption**
  (numero di data product, data product **con owner**, utenti su Blindata, accessi
  nell'ultimo mese da parte di utenti di business). Misurate **mensilmente**.

  Fatto emerso e non ancora presente da nessuna parte: **obiettivi annuali del
  portfolio, definizione delle metriche e misurazione sono tutti a carico
  dell'autore**, con approccio **Lean Value Tree (metodologia EDGE)**. È lavoro di
  livello portfolio, più raro delle decisioni tecniche che la pagina racconta, ed è
  stato aggiunto alla sezione `My role` e alle skill.

### Trappola tecnica da non ripetere

I case study stanno in `src/content/case-studies/<lang>/<slug>.md`, una cartella per
lingua. **Mai** `<slug>.<lang>.md`: Astro slugifica gli id e si mangia il punto,
l'id diventa `data-mesh-energyen` e le rotte non vengono generate — silenziosamente.

## Materiale da procurare

- [x] Link podcast Quantyca (YouTube + Spotify) — episodio 8, 2 dicembre 2025
- [ ] **Case study MLOps / Banking** — il buco più grosso rimasto. Nota: la
      piattaforma **non è stata fondata da lui** (il CV dice "maintained and
      evolved"), e il testo della card è già stato riscritto di conseguenza
- [ ] 2 case study brevi: CI/CD Appliances, Brewery US
- [ ] Numeri leadership: colloqui condotti, persone seguite, architetti cresciuti,
      persone valutate
- [ ] L'episodio di promozione specifico
- [ ] CV, a sito quasi pronto → poi tradotto e caricato in EN

Da chiedere sempre, su ogni case study: **cosa è andato male.** Non viene mai
offerto spontaneamente, e sul Data Mesh la risposta ha sostituito tre trade-off
dedotti con un guasto datato. Vale la pena insistere anche quando la prima
risposta è generica: "abbiamo avuto difficoltà nell'adozione" non è utilizzabile,
"il conversation management ce lo siamo scritto noi" lo è.

## Fasi

**Fase 1 — due prototipi visuali.** Prima di scrivere Astro: due home navigabili nella
direzione d+b, per scegliere guardando invece che leggendo. Solo sistema visivo.

**Fase 2 — scheletro Astro.** Struttura, i18n, temi, deploy funzionante, contenuto
attuale migrato e ripulito. **Da qui il sito è già meglio di adesso**, anche senza
il materiale nuovo. Pensata apposta perché il progetto non resti in cantiere in attesa
dei numeri.

**Fase 3 — contenuto nuovo**, man mano che arriva.

**Fase 4 — blog.** Motore pronto dalla Fase 2, si accende con due pezzi dentro.
