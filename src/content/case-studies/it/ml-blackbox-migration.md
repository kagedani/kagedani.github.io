## Contesto

Una grande banca retail gestiva quattro use case AI su una piattaforma proprietaria di vendor: triage automatico e bozze di risposta per i ticket di supporto in ingresso, classificazione e smistamento di email ad alto volume, gestione assistita e controlli sulle richieste di bonifico, ed estrazione da documenti non strutturati.

La piattaforma produceva risultati. Non è mai stato quello il problema.

## Il problema

Tutto ciò che la piattaforma imparava restava dentro di lei. Modelli, dati e logica erano sigillati in un sistema chiuso, che non è un problema ma quattro insieme:

- **Nessuna via d'uscita.** Andarsene significava ricostruire da zero, quindi la banca non aveva alcuna leva in nessuna conversazione con il vendor.
- **Nessuna explainability.** Le decisioni non erano ispezionabili né giustificabili verso risk, verso audit o verso il regolatore — in una banca, su un flusso che tocca i bonifici.
- **Un costo che scalava con l'utilizzo, non con il valore.** La licenza era per use case e cresceva con l'uso, il che significa che automatizzare *più* lavoro peggiorava l'economia. Il tetto era commerciale, non tecnico.
- **Nessun accumulo.** Ogni modifica passava dal vendor, quindi le persone della banca non diventavano più brave nel tempo.

Sono gli ultimi due, in coppia, a spiegare perché il progetto esisteva. La banca aveva già individuato una grande quantità di lavoro manuale che quei modelli potevano assorbire — l'ha quantificata in **45 FTE sui quattro use case** — e la struttura di licenza rendeva non conveniente andarselo a prendere. Quel costo andava quindi affrontato in ogni caso. La sola domanda aperta era se affrontarlo comprasse anche la proprietà.

## L'architettura

<figure class="diagram">
<svg viewBox="0 0 760 366" role="img" aria-label="Architettura a livelli: sistemi sorgente della banca, un layer centrale di integrazione e autenticazione, un ambiente AI con le applicazioni dei quattro canali più database condiviso e model registry, su una fondazione Kubernetes.">
  <defs>
    <marker id="dgArrowIt" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="5" markerHeight="5" orient="auto">
      <path d="M0 1l4 3-4 3" class="dg-head" />
    </marker>
  </defs>

  <text class="dg-l" x="112" y="41">SOURCE SYSTEMS</text>
  <rect class="dg-box" x="130" y="20" width="147" height="34" />
  <text class="dg-t" x="203" y="41">Service desk</text>
  <rect class="dg-box" x="287" y="20" width="147" height="34" />
  <text class="dg-t" x="360" y="41">Mail</text>
  <rect class="dg-box" x="444" y="20" width="147" height="34" />
  <text class="dg-t" x="517" y="41">Payments</text>
  <rect class="dg-box" x="601" y="20" width="147" height="34" />
  <text class="dg-t" x="674" y="41">Documents</text>

  <path class="dg-arrow" d="M439 58 V84" marker-end="url(#dgArrowIt)" />

  <text class="dg-l" x="112" y="116">INTEGRATION</text>
  <rect class="dg-box-a" x="130" y="92" width="618" height="44" />
  <text class="dg-t2" x="145" y="118">Single secure entry point — every request authenticated and authorized here</text>
  <text class="dg-p" x="655" y="118">AUTHN · AUTHZ</text>

  <path class="dg-arrow" d="M439 140 V162" marker-end="url(#dgArrowIt)" />

  <text class="dg-l" x="112" y="228">AI ENVIRONMENT</text>
  <rect class="dg-band" x="130" y="168" width="618" height="118" />
  <text class="dg-s" x="144" y="186">APPLICATION &amp; WORKFLOW</text>
  <rect class="dg-box" x="142" y="192" width="142" height="30" />
  <text class="dg-t" x="213" y="211">Tickets</text>
  <rect class="dg-box" x="292" y="192" width="142" height="30" />
  <text class="dg-t" x="363" y="211">Mail</text>
  <rect class="dg-box" x="442" y="192" width="142" height="30" />
  <text class="dg-t" x="513" y="211">Payments</text>
  <rect class="dg-box" x="592" y="192" width="142" height="30" />
  <text class="dg-t" x="663" y="211">Documents</text>
  <text class="dg-s" x="144" y="242">DATA LAYER &amp; MODEL REGISTRY</text>
  <rect class="dg-box" x="142" y="248" width="293" height="30" />
  <text class="dg-t" x="288" y="267">SQL Server — shared data</text>
  <rect class="dg-box" x="443" y="248" width="291" height="30" />
  <text class="dg-t" x="588" y="267">MLflow — tracking &amp; versioned models</text>

  <text class="dg-l" x="112" y="327">FOUNDATION</text>
  <rect class="dg-band" x="130" y="296" width="618" height="58" />
  <rect class="dg-box" x="142" y="308" width="192" height="34" />
  <text class="dg-t" x="238" y="329">Kubernetes</text>
  <rect class="dg-box" x="342" y="308" width="192" height="34" />
  <text class="dg-t" x="438" y="329">GitLab CI/CD</text>
  <rect class="dg-box" x="542" y="308" width="192" height="34" />
  <text class="dg-t" x="638" y="329">Jupyter</text>
</svg>
<figcaption>Costruita una volta e specializzata per modello: i quattro use case differiscono negli input e in quasi nient'altro.</figcaption>
</figure>

End to end, sui canali ticketing ed email, in circa quindici secondi:

1. un evento viene generato nel sistema sorgente della banca
2. un listener lo intercetta; il payload viene normalizzato e validato
3. il chiamante viene autenticato e autorizzato al layer centrale di integrazione
4. la richiesta entra nell'ambiente AI e viene persistita
5. il servizio AI raccoglie il lavoro pendente a brevi intervalli ed esegue il modello
6. il risultato viene riscritto e restituito attraverso lo stesso layer di integrazione

## Le decisioni

### Ricostruire i modelli invece di cambiare vendor

Passare a un altro vendor avrebbe risolto il costo di licenza e nient'altro: stessa scatola sigillata, logo nuovo. Ricostruire era l'unica opzione che affrontava explainability e proprietà nello stesso momento.

> **Trade-off** — stai scommettendo di riuscire a pareggiare un sistema che già funziona, senza alcun merito riconosciuto se ci riesci. La parità è invisibile; si nota solo se resti sotto. È l'opzione più rischiosa sul tavolo e l'unica che qui valeva la pena prendere.

### Batch inference, non invocazione event-driven

Il servizio AI interroga il lavoro pendente a brevi intervalli invece di essere invocato per evento. Più semplice da gestire, più semplice da ragionare in caso di guasto, e banalmente resiliente all'indisponibilità momentanea di un servizio a valle.

> **Trade-off** — si rinuncia alla latenza sotto il secondo. Era permesso: quindici secondi end to end stanno largamente dentro quello che serve a un ticket di supporto o a una mail in ingresso, quindi abbiamo speso latenza che non ci serviva per comprare semplicità operativa che ci serviva.

### Un unico punto di ingresso autenticato — non una mia scelta

Ogni richiesta viene autenticata e autorizzata a un layer centrale prima di raggiungere l'ambiente AI. Fa bene alla governance e dà ad audit un solo posto dove guardare.

È anche, per costruzione, un collo di bottiglia e un single point of failure. Su questo sono esplicito: la forma è arrivata dal team di security della banca come requisito, non da me. Su questo progetto avevo le mani legate su diverse scelte infrastrutturali, e questa era una di quelle.

> **Trade-off** — controllo centralizzato in cambio di uno strozzamento. Vale la pena dirlo onestamente invece di presentarlo come una vittoria di design, perché non era una mia moneta da spendere.

### Kubernetes, perché la banca ne aveva già uno

Il requisito era un'infrastruttura portabile e cloud-agnostic, e la banca gestiva già un cluster Kubernetes seguito da Quantyca. Ereditare una piattaforma che un team sapeva già far funzionare contava più di qualsiasi confronto fra orchestratori.

> **Trade-off** — nessun servizio ML gestito, quindi l'onere operativo resta in casa per sempre. Portabilità e un cluster già in piedi in cambio della proprietà delle tubature.

## Cosa è andato male

### Un antimalware Windows su un cluster RedHat

I server arrivavano dal cliente: RedHat, come da specifica — con installato sopra un agente antimalware per Windows. Rompeva il cluster Kubernetes in fase di setup, e poi rompeva a intermittenza la comunicazione fra i pod.

Diagnosticarlo ha richiesto molto tempo, perché nel sintomo non c'era niente che puntasse verso la causa. E poi andava *dimostrato*: l'ho riprodotto dal vivo, in riunione, perché un'affermazione che tira in causa il tooling di sicurezza imposto da un altro team non viene accettata sulla parola.

La lezione si generalizza. Su un'infrastruttura che non controlli, la baseline di sicurezza è parte dell'architettura, che qualcuno te lo dica o no — e il momento per scoprirlo non è durante il setup del cluster.

### Lo staffing, e un piano risequenziato attorno al costo di licenza

Lo staffing ha funzionato bene su due dei quattro use case e decisamente meno bene sugli altri due. Le opzioni erano far slittare tutti e quattro insieme oppure risequenziare.

Abbiamo risequenziato: i due use case sani anticipati, gli altri due posticipati. Non è stata una scelta di calendario neutra — rilasciarne due in anticipo ha iniziato a ritirare il costo di licenza prima, e quel risparmio ha in parte pagato il ritardo sul resto. È il tipo di decisione che sembra ovvia solo dopo aver accettato che un piano di delivery è uno strumento finanziario tanto quanto una scaletta.

## Il mio ruolo

Data Architect e guida tecnica. Team di delivery di sei persone: un project manager, io, e quattro data engineer e data scientist, su tre filoni — DevOps per gli ambienti, Kubernetes, CI/CD e networking sicuro; software engineering per le applicazioni listener e di workflow attorno a ciascun use case; data science per i modelli.

Ho tenuto l'architettura e ogni decisione tecnica qui sopra, negoziato quelle imposte, e fatto il lavoro di diagnosi quando l'infrastruttura si è messa di traverso.

## Esito

**Quattro use case su quattro migrati, zero downtime.** Ognuno commutato in modo indipendente: la nuova implementazione andava live qualche giorno prima della data ufficiale di rilascio e girava in shadowing contro il vero flusso end to end, così ogni switch è stato una decisione e non un salto nel vuoto.

Le performance dei modelli sono risultate in linea con quelle del vendor. Era quello il traguardo — l'obiettivo non era mai costruire modelli migliori, era possedere quelli che già funzionavano. Ed è quello che la proprietà ha comprato dopo, la parte da sottolineare: con la pipeline di training in casa e ispezionabile, la banca ha poi migliorato le performance da sola, dopo che noi eravamo usciti. Prima non era una cosa difficile da fare: era strutturalmente impossibile.

Ed è cambiata la risposta ad audit. Oggi la banca può arrivare ai log, alle regole, alle performance misurate e all'output del modello dietro qualunque decisione il sistema prenda. Su un flusso che tocca i bonifici, non è un optional.
