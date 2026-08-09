## Contesto

Un grande gruppo energetico europeo aveva già provato ad adottare il Data Mesh prima che arrivassimo. Sulla carta il paradigma c'era: esistevano le blueprint, esisteva la piattaforma, esistevano le linee guida. Nella pratica niente di tutto questo aveva mai lasciato il team dati centrale. Il Data Mesh era diventato un progetto interno — un giochino per chi l'aveva costruito — invece di un modo in cui l'azienda lavorava.

Il lavoro non era quindi introdurre il paradigma. Era farlo sopravvivere al contatto con il resto dell'organizzazione.

## Il problema

Il Data Mesh è facile da disegnare e feroce da adottare, perché chiede ai team di dominio di assumersi responsabilità che non avevano mai avuto: la proprietà di un data product, la sua qualità, il suo contratto, e le persone che lo consumano. Un team centrale può costruire ogni pezzo di macchina correttamente e ritrovarsi comunque l'unico a usarla. Ed è esattamente quello che era successo.

Il che significa che la parte difficile non è mai stata l'architettura. Era che **il costo di produrre un data product era più alto del valore che un team di dominio riusciva a vederci.** Ogni decisione che non spostava quel rapporto era decorazione.

Abbiamo lavorato su quattro fronti:

- **La piattaforma come prodotto.** La piattaforma ha smesso di essere un deliverable interno e ha iniziato a essere gestita per i suoi utenti — con una roadmap propria, una nozione propria di adoption, e un successo misurato sull'output degli altri team invece che sul proprio.
- **Blueprint meno costose.** Le blueprint dei data product esistenti erano troppo costose da istanziare. Snellirle contava più che aggiungerci capability.
- **L'enablement come lavoro.** Le linee guida sono state scritte *con* il cliente invece di essere consegnate, e poi insegnate attivamente. L'adoption è stata trattata come un filone di lavoro, non come un effetto collaterale che sarebbe arrivato una volta che il tooling fosse stato abbastanza buono.
- **Servizi erogati, non implementati.** Un insieme di servizi di piattaforma raggiunge ogni data product attraverso un sidecar, così un team di dominio ottiene observability, controlli di qualità e registrazione senza scriverne una riga.

## Le decisioni

### Un control plane, non delle convenzioni

Governare i data product per convenzione e code review è l'opzione che sembra economica. L'abbiamo scartata. L'effort scala linearmente con il numero di prodotti, la conformità è di fatto non verificabile, e ogni nuovo guardrail che aggiungi è un altro pezzo di un control plane che stai costruendo per sbaglio — male, e senza mai ammetterlo. Meglio costruirne uno di proposito.

> **Trade-off** — un control plane vero è un investimento iniziale che il primo giorno non produce nulla, mentre le convenzioni producono immediatamente l'apparenza della governance. Abbiamo speso credibilità iniziale su infrastruttura il cui valore diventa visibile solo quando i data product da governare sono abbastanza.

### Un layer di orchestrazione che il catalogo non poteva dare

Azure Purview e Blindata fanno bene quello che fanno, ma nessuno dei due copre il *ciclo di vita* di un data product — creazione, deploy, versionamento, dismissione. Quella capability doveva arrivare da qualche parte. OpenDataMesh implementa esattamente questo, quindi il control plane è stato costruito su di lui invece di essere strappato a forza da un catalogo che non era mai stato pensato per farlo.

> **Trade-off** — scommettere il cuore della piattaforma su una specifica aperta emergente invece che su un vendor con un contratto di supporto. Community più piccola, meno persone da assumere che la conoscono già, e una roadmap che non controlliamo.

### Control plane disaccoppiato dall'utility plane

Il layer di controllo decide cosa deve accadere. Gli adapter lo attuano contro il tooling che l'azienda usa davvero. Oggi c'è GitLab e quindi c'è un adapter che guida le pipeline di rilascio; se domani diventa GitHub, il layer di controllo non cambia — cambia l'adapter. Nessuna logica di controllo è accoppiata a un vendor, e nessun codice custom è scritto contro una tecnologia che sopravvivrà alla decisione di adottarla.

> **Trade-off** — un livello di indirezione, e un adapter per capability da costruire e mantenere in vita. Quel costo l'abbiamo pagato in anticipo per una portabilità che potrebbe non essere mai esercitata. È un'assicurazione, e le assicurazioni sembrano convenienti solo a posteriori.

### La data quality è un sottoinsieme dell'observability

Great Expectations produce il segnale di qualità; OpenTelemetry lo trasporta. Mettere la qualità sul canale OTel conta perché su quel canale passano già metriche, trace e log — così il monitoraggio distribuito dei data product diventa una capability di piattaforma invece di una feature per singolo prodotto, e aggiungere un segnale nuovo domani non richiede nuove tubature.

> **Trade-off** — piegare una pipeline pensata per la telemetria software a trasportare semantica di dato. Ereditiamo il modello di OpenTelemetry, che calzi o non calzi perfettamente sulla data quality, in cambio di un canale solo invece di due.

## Il mio ruolo

Data Architect sul progetto, e da un anno anche advisory strategica sulla direzione dati del cliente. Il team è passato da due persone a cinque nel corso del programma.

Ogni decisione tecnica descritta qui sopra è stata mia. Il team le ha portate in implementazione — con un'eccezione che vale la pena nominare: le prime applicazioni sono nate da template che ho scritto all'inizio del progetto, ed è così che i pattern si sono propagati senza dover essere rispiegati a ogni persona nuova.

## Esito

Circa otto mesi dopo l'avvio, l'Experience Plane ha superato i 100 utenti. Il numero conta meno di cosa quegli utenti riescono a farci.

Oggi, in un unico posto, una persona può cercare i data product aziendali, vedere quali concetti di business ciascuno espone attraverso le sue output port, verificare la qualità misurata dei dati che ci stanno dietro, e fare richiesta di accesso. Prima ognuna di queste quattro cose era una conversazione separata con un team separato — quando era possibile.
