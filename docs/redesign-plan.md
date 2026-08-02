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

### `/work` — 3 approfonditi + 2 brevi

| Progetto | Formato |
|---|---|
| Data Mesh Platform — Energy | approfondito |
| MLOps Platform — Banking | approfondito |
| ML Blackbox Migration — Banking | approfondito |
| CI/CD Architecture — Haier Europe | breve |
| Brewery — cliente US | breve, **dichiarato ongoing** |

Tagliati: Data Hub Save & Invest, Datalake Sport (il più commodity dei cinque).

**Scheletro fisso** dei case study approfonditi, 400–600 parole:

1. **Contesto** — settore, scala, situazione di partenza
2. **Il problema** — perché era difficile, non solo cosa c'era da fare
3. **L'approccio** — le scelte architetturali e *perché quelle*.
   Deve contenere **almeno una decisione discutibile con il suo trade-off**.
   Senza, è un comunicato stampa.
4. **Il mio ruolo** — esplicito: dimensione del team, cosa possedevi personalmente.
   Dichiarare il perimetro fa sembrare più senior, non meno.
5. **Esito** — il numero
6. **Stack** — keyword, in mono

### Naming clienti

Regola: **si può nominare il cliente dove Quantyca lo nomina già pubblicamente**,
ma i numeri sensibili restano staccati dal nome.

Success Stories pubbliche su quantyca.it (verificato 2026-08-02): Haier Europe, Nexi,
Rinascente, BNL, Autostrade per l'Italia, Arcese, Selex, Diasorin, A2A.

→ **Azione:** conversazione con marketing/comunicazione Quantyca su quali clienti
citare e con quale granularità. È l'intervento a più alto ritorno dell'intero progetto
e non costa una riga di codice.

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
- [ ] "Luglio 2025 – presente": serve la data di inizio come responsabile del team
      internazionale, che va separata se è successiva al ruolo di Solutions Architect
- [ ] Stagione di basket: 2018/19 o 2019/20? (il covid ha fermato i campionati nella 2019/20)
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

## Aperto

1. **Nesso dei 45 FTE.** L'automazione sarebbe avvenuta comunque, o è stata *abilitata*
   dalla migrazione a open source (scala, costo di licenza, customizzabilità)?
   Da questo dipende se il claim regge o va riformulato. È il numero più forte
   e anche il più fragile: nudo, un lettore scettico lo sconta a zero.
   Formulazione da tenere: "riallocati su attività a maggior valore" — mai nulla
   che somigli a posti tagliati.
2. **Email**: `daniele.uboldi.job@gmail.com` funziona ma il `.job` dice
   "sto cercando lavoro", nota stonata per il posizionamento (c).
3. **Dominio**: rimandato. Si valuta dopo il lancio.

## Materiale da procurare

- [ ] 3 case study approfonditi: contesto, problema, **decisione + trade-off**, ruolo, esito
- [ ] 2 case study brevi: Haier CI/CD, Brewery US
- [ ] Numeri leadership: colloqui condotti, persone seguite, architetti cresciuti,
      persone valutate
- [ ] L'episodio di promozione specifico
- [ ] Link podcast Quantyca (YouTube + Spotify)
- [ ] CV, a sito quasi pronto → poi tradotto e caricato in EN

## Fasi

**Fase 1 — due prototipi visuali.** Prima di scrivere Astro: due home navigabili nella
direzione d+b, per scegliere guardando invece che leggendo. Solo sistema visivo.

**Fase 2 — scheletro Astro.** Struttura, i18n, temi, deploy funzionante, contenuto
attuale migrato e ripulito. **Da qui il sito è già meglio di adesso**, anche senza
il materiale nuovo. Pensata apposta perché il progetto non resti in cantiere in attesa
dei numeri.

**Fase 3 — contenuto nuovo**, man mano che arriva.

**Fase 4 — blog.** Motore pronto dalla Fase 2, si accende con due pezzi dentro.
