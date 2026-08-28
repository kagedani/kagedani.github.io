## Contesto

Un grande gruppo energetico europeo aveva già provato ad adottare il Data Mesh prima che arrivassimo. Sulla carta il paradigma c'era: esistevano le blueprint, esisteva la piattaforma, esistevano le linee guida. Nella pratica niente di tutto questo aveva mai lasciato il team dati centrale. Il Data Mesh era diventato un progetto interno, un giochino per chi l'aveva costruito, invece di un modo in cui l'azienda lavorava.

Il lavoro non era quindi introdurre il paradigma. Era farlo sopravvivere al contatto con il resto dell'organizzazione.

## Il problema

Il Data Mesh è facile da disegnare e feroce da adottare, perché chiede ai team di dominio di assumersi responsabilità che non avevano mai avuto: la proprietà di un data product, la sua qualità, il suo contratto, e le persone che lo consumano. Un team centrale può costruire ogni pezzo di macchina correttamente e ritrovarsi comunque l'unico a usarla. Ed è esattamente quello che era successo.

Il che significa che la parte difficile non è mai stata l'architettura. Era che **il costo di produrre un data product era più alto del valore che un team di dominio riusciva a vederci.** Ogni decisione che non spostava quel rapporto era decorazione.

Abbiamo lavorato su quattro fronti:

- **La piattaforma come prodotto.** La piattaforma ha smesso di essere un deliverable interno e ha iniziato a essere gestita per i suoi utenti: una roadmap propria, e due famiglie di metriche distinte invece di una. Le metriche di delivery continuano a contare quello che ha consegnato il team di piattaforma: componenti rilasciati e simili. Le metriche di adoption contano quello che sono riusciti a farci gli altri: data product creati, data product che hanno davvero un owner, persone sul catalogo, utenti di business tornati nell'ultimo mese. È la seconda famiglia a dirti se il paradigma ha attecchito, proprio perché non la soddisfi costruendo cose che nessuno usa.
- **Blueprint meno costose.** Le blueprint dei data product esistenti erano troppo costose da istanziare. Snellirle contava più che aggiungerci capability.
- **L'enablement come lavoro.** Le linee guida sono state scritte *con* il cliente invece di essere consegnate, e poi insegnate attivamente. L'adoption è stata trattata come un filone di lavoro, non come un effetto collaterale che sarebbe arrivato una volta che il tooling fosse stato abbastanza buono.
- **Servizi erogati, non implementati.** Un insieme di servizi di piattaforma raggiunge ogni data product attraverso un sidecar, così un team di dominio ottiene observability, controlli di qualità e registrazione senza scriverne una riga.

## Le decisioni

### Un control plane fra il catalogo SaaS e gli adapter

L'azienda usava già Blindata come piattaforma di governance in SaaS, usava già GitLab, e avrebbe continuato a usarli entrambi a prescindere da cosa costruivamo noi. La strada rapida era attaccare gli adapter direttamente a Blindata, o arrangiarsi con degli accrocchi dove non tornava.

In mezzo ci abbiamo messo un control plane. È lui a possedere il ciclo di vita di un data product (creazione, deploy, versionamento, dismissione), che è esattamente ciò che un catalogo non fa, ed è costruito su OpenDataMesh perché quella specifica quel ciclo di vita lo implementa invece di approssimarlo. Sotto, gli adapter attuano le decisioni contro il tooling che l'azienda usa davvero: oggi GitLab significa un adapter che guida le pipeline di rilascio; se domani diventa altro, cambia l'adapter e non il layer di controllo.

Quello che ci guadagni sono capability di piattaforma essenziali che appartengono all'azienda invece che a uno dei suoi fornitori. Quello che costa è che il primo giorno non funziona niente.

> **Trade-off:** la parte difficile non è stata costruirlo, è stata convincere il cliente a finanziare un layer che per mesi non produceva risultati visibili, mentre l'alternativa produceva qualcosa di dimostrabile quasi subito. L'abbiamo portata a terra scrivendo una roadmap che desse la precedenza alle capability essenziali e rimandasse deliberatamente quelle che richiedono un livello di maturità data-driven che l'organizzazione non ha ancora. Il sequenziamento è stato il prezzo per ottenere l'architettura.

### La data quality è un sottoinsieme dell'observability

Great Expectations produce il segnale di qualità; OpenTelemetry lo trasporta. Mettere la qualità sul canale OTel conta perché su quel canale passano già metriche, trace e log, così il monitoraggio distribuito dei data product diventa una capability di piattaforma invece di una feature per singolo prodotto, e aggiungere un segnale nuovo domani non richiede nuove tubature.

> **Trade-off:** piegare una pipeline pensata per la telemetria software a trasportare semantica di dato. Ereditiamo il modello di OpenTelemetry, che calzi o non calzi perfettamente sulla data quality, in cambio di un canale solo invece di due.

### Tre agenti su MCP, e uno che scrive

Il patrimonio informativo c'era già (metadato tecnico, termini di business, esiti di qualità) e quasi nessuno riusciva ad arrivarci senza sapere già dove guardare. Abbiamo quindi costruito tre agenti, ognuno con il suo perimetro, sopra MCP invece che su integrazioni punto a punto:

- il **primo** risponde a domande sul patrimonio informativo, dialogando con l'MCP server di Blindata;
- il **secondo** parte da quel patrimonio per supportare l'utente nella definizione dell'ontologia di dominio e dei termini di business. Dialoga in A2A con il primo e scrive attraverso l'MCP server di Blindata;
- il **terzo** legge il patrimonio, il metadato tecnico e non solo, e propone controlli di data quality da implementare, usando un MCP server sopra il wrapper di Great Expectations che avevamo già costruito come modulo riutilizzabile da tutti i data product.

Quello interessante è il secondo, perché un agente con permessi di scrittura su un catalogo di governance è il modo più diretto per ritrovarsi un glossario di cui nessuno si fida, e un glossario di cui nessuno si fida è peggio di nessun glossario: quando le definizioni smettono di essere attendibili le persone smettono di leggerle, e il catalogo muore in silenzio.

Per questo il percorso di scrittura è recintato su tre lati. L'agente scrive solo se è l'utente a dirgli di scrivere. Tutto ciò che scrive porta un prefisso `[GenAI]`, così la provenienza è visibile nel termine stesso senza aprire nulla. La ricerca di Blindata continua a trovare `customer` anche su un termine prefissato, quindi la convenzione non costa niente in fase di retrieval. E scrive su un tenant di test: per promuovere un'ontologia di dominio in produzione si passa da un servizio che abbiamo costruito apposta per quel passaggio.

> **Trade-off:** niente di tutta questa sicurezza è arrivato gratis. La convenzione sul prefisso, la separazione dei tenant e il servizio di promozione sono tre meccanismi da costruire e tenere in vita, ed esistono soltanto perché a un agente sia concesso di scrivere. Abbiamo scelto di pagare l'apparato invece di limitare l'agente alla sola lettura, che sarebbe stato più semplice e avrebbe lasciato il lavoro di stesura esattamente dov'era già.

Una precisazione su cosa questo *non* è: l'obiezione classica allo human-in-the-loop è che la revisione diventa un collo di bottiglia. Ma quell'obiezione presuppone un team di governance centrale che approva tutto. In un mesh federato la responsabilità di redigere l'ontologia sta nei domini, quindi il carico di revisione si distribuisce insieme al lavoro invece di accumularsi dietro a un team solo.

## Cosa è andato male

Il filone sugli agenti era pianificato da settembre a dicembre 2025. È andato da ottobre 2025 a luglio 2026.

La causa non sono stati gli agenti. La piattaforma AI del cliente era a sua volta ancora in fase di setup, e su diversi dei suoi servizi siamo stati di fatto i primi utilizzatori, che è una cosa piacevole da raccontare dopo e costosa da essere sul momento. L'esempio più netto: non esisteva un servizio di conversation management, e ce lo siamo scritto. Non esisteva nemmeno una pratica consolidata per testare un agente o per comparare fra loro i modelli candidati, quindi abbiamo dovuto proporre entrambe prima di poter valutare qualunque cosa stessimo costruendo.

Così una costruzione da quattro mesi ne è durata dieci, e circa metà di quel tempo è andata in pezzi di piattaforma e di metodo che avrebbero dovuto esserci già. Il lavoro è reale ed è riutilizzabile, ma non era il lavoro che avevamo stimato, ed essere presti su una piattaforma è un rischio di pianificazione che oggi prezziamo diversamente.

## Il mio ruolo

Data Architect sul progetto, e da un anno anche advisory strategica sulla direzione dati del cliente. Il team è passato da due persone a cinque nel corso del programma.

Gli obiettivi annuali del portfolio li definisco io, con un Lean Value Tree secondo la metodologia EDGE. Con loro le metriche di adoption che ne discendono e la misurazione mensile. Possedere insieme il bersaglio e lo strumento che lo legge è scomodo, ed è il motivo per cui le metriche sono del tipo noioso e contabile invece che di quelle da interpretare.

Ogni decisione tecnica descritta qui sopra è stata mia. Il team le ha portate in implementazione, con un'eccezione che vale la pena nominare: le prime applicazioni sono nate da template che ho scritto all'inizio del progetto, ed è così che i pattern si sono propagati senza dover essere rispiegati a ogni persona nuova.

## Esito

Circa otto mesi dopo l'avvio, l'Experience Plane ha superato i 100 utenti. Il numero conta meno di cosa quegli utenti riescono a farci.

Oggi, in un unico posto, una persona può cercare i data product aziendali, vedere quali concetti di business ciascuno espone attraverso le sue output port, verificare la qualità misurata dei dati che ci stanno dietro, e fare richiesta di accesso. Prima ognuna di queste quattro cose era una conversazione separata con un team separato, quando era possibile.

A parte, e molto più di recente: i tre agenti sono in produzione da luglio 2026. Interrogare il patrimonio informativo, redigere un'ontologia di dominio e proporre controlli di qualità sono oggi cose che un team di dominio fa da sé, invece di metterle in coda dietro al team dati centrale.
