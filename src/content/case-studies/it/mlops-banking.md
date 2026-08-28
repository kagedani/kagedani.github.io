## Contesto

Una banca retail aveva una piattaforma di data science per oltre cento data scientist: Kubernetes, JupyterHub, MLflow, GitLab ed ELK, su hardware proprio. Notebook, job schedulati, modelli, e l'ambiente in cui tutto questo viveva.

La piattaforma funzionava. Quello che nessuno sul progetto aveva era la ricetta. Era stata installata anni prima e di *come* non era rimasto scritto niente. Nessun runbook, nessuna traccia del perché un componente fosse configurato in quel modo.

## Il problema

Una piattaforma senza documentazione non è una piattaforma con del debito arretrato. È una piattaforma dove ogni modifica comincia con dell'archeologia.

Ogni ticket e ogni evolutiva si aprivano allo stesso modo: ricostruire come fosse stata installata la cosa, prima di poterla toccare senza rischi. Giorni di analisi per rispondere a domande a cui un runbook risponde in un paragrafo. Intanto il debito si accumulava in chiaro: GitLab indietro di quattro major, nessun ambiente di test, e il traffico interno alla piattaforma ancora non cifrato. HTTPS su tutta la piattaforma è stato progettato perché l'ha segnalato il team di sicurezza della banca, non perché ci siamo arrivati prima noi.

E la domanda che contava di più non aveva mai avuto una risposta scritta: **cosa significa operare in produzione senza interrompere il lavoro delle persone**, quando quel lavoro è una sessione interattiva che resta viva per giorni? Un data scientist non fa ripartire il notebook perché tu devi aggiornare un nodo. Senza una risposta a quella domanda non c'era nemmeno una procedura: c'erano abitudini.

## Le decisioni

### Ricostruire la ricetta, dentro due mesi

Prima di qualunque altra cosa, stabilire come ciascuno strumento fosse stato davvero installato e configurato. Non documentazione per il gusto di farla: senza, nessun aggiornamento era pianificabile e nessun guasto diagnosticabile.

Il lavoro è stato messo in timebox a due mesi, perché una piattaforma che serve cento persone non può stare ferma mentre in tre leggiamo file di configurazione. Il timebox ha tenuto, e alla scadenza non era rimasto niente di importante da capire.

### Un cluster fra i dati e le applicazioni: non una mia scelta

La linea guida della banca era che le applicazioni aziendali non dovessero entrare nell'ambiente dove stanno i dati. Così in mezzo c'è un secondo ambiente che li disaccoppia: Kubernetes suo, GitLab suo, costruito e gestito per quello.

È una linea guida sensata, ed è arrivata dall'alto invece che essere scelta. È anche una seconda piattaforma da tenere viva.

> **Trade-off:** isolamento fra i dati e tutto ciò che li consuma, pagato con un secondo ambiente che porta con sé la stessa disciplina di patching, monitoraggio e aggiornamento del primo, sulle stesse tre persone.

### Definire cosa vuol dire "senza interrompere il lavoro"

Il meccanismo esisteva già: si mette una label su un nodo e JupyterHub smette di far nascere pod lì sopra. Quello che mancava era tutto il resto: verificare chi ci sta già girando prima di agire, e isolare un nodo quando è scarico invece che quando fa comodo a te.

È una modifica di procedura piccola ed è la decisione più importante di questa pagina, perché trasforma una piattaforma che puoi toccare solo con timore in una che puoi manutenere di proposito.

> **Trade-off:** affidabilità per chi usa la piattaforma, comprata con una manutenzione più lenta. Ogni intervento aspetta una finestra invece di prendersela, e un arretrato di quattro major si chiude più adagio per questo.

### Servizi centrali su repository aperti

I data scientist riscrivevano le stesse funzioni all'infinito: anonimizzare un dataset, e una dozzina di varianti sul tema. Ho scritto i primi servizi e lo scheletro da cui sono nati tutti gli altri, su repository che chiunque sulla piattaforma poteva leggere, usare e su cui poteva proporre modifiche. Alla fine erano nove.

Il modello di contribuzione pesa quanto i servizi. Una libreria condivisa che può modificare solo chi l'ha scritta diventa un collo di bottiglia; una che può modificare chiunque senza revisione diventa un problema poco dopo.

> **Trade-off:** ogni servizio nato da quello scheletro è passato dalla mia revisione. È quello che costa tenere coerente una base di codice condivisa, e il costo non cala man mano che la base cresce.

### I modelli come endpoint, sopra MLflow

Un'evolutiva che ho proposto io: uno scheletro applicativo che espone un modello addestrato come endpoint HTTP. Flask, sopra MLflow, così che un modello più recente possa essere promosso e sostituito senza downtime.

Il framework non è il punto. Il punto è che un modello smette di essere un artefatto dentro il notebook di qualcuno e diventa qualcosa che un'applicazione aziendale può chiamare ottenendo in risposta una predizione, che è esattamente ciò che il cluster di disaccoppiamento esisteva per rendere sicuro.

> **Trade-off:** un layer di serving nostro da mantenere. In cambio calza esattamente sui vincoli dell'on-premise, e si appoggia a MLflow per la parte davvero difficile: sapere quale modello è vivo, e sostituirlo senza che nessuno se ne accorga.

### Hardening per la disponibilità, senza che nessuno lo chiedesse

Questa non l'ha chiesta nessuno. Gli utenti continuavano ad arrivare e le applicazioni a essere rilasciate, il cluster era on-premise con un numero finito di nodi, e alcuni carichi giravano con una QoS Kubernetes bassa: i primi a essere sfrattati, e con la necessità di tornare su in fretta da un'altra parte quando succedeva. Rendere la piattaforma altamente disponibile è stata un'iniziativa nostra, presa prima che il problema di risorse arrivasse invece che dopo.

## Cosa è andato male

### Il disservizio eravamo noi

Manutenzione ordinaria: isolare un nodo, aggiornare quello che ci gira sopra, rimetterlo dentro. Abbiamo messo la label sul nodo perché JupyterHub non ci facesse nascere nuovi pod. Su quel nodo c'erano già due data scientist che stavano lavorando.

Sono arrivati due ticket, uno da ciascuno dei due, entrambi a segnalare che la piattaforma era rotta. La piattaforma stava benissimo. L'unica cosa che non andava eravamo noi, e stabilirlo è costato al team la stessa analisi che sarebbe costata un incidente vero.

La lezione non riguarda Kubernetes. Dal posto in cui sta l'utente, una manutenzione non annunciata è indistinguibile da un guasto, e il conto lo paga la squadra che l'ha causata, esattamente in quel tempo di analisi che il lavoro doveva far risparmiare. Ogni regola della terza decisione qui sopra esiste per via di quel giorno.

## Il mio ruolo

Tre persone, per una piattaforma con oltre cento utenti: io e una figura junior all'inizio, due da un certo punto in avanti, ed è rimasta così.

La progettazione era mia, tutta. Quello che ho costruito con le mie mani: l'ambiente di disaccoppiamento, il suo cluster Kubernetes e il suo GitLab; i primi servizi centrali e lo scheletro da cui sono nati tutti i successivi; e la revisione del codice su tutti quanti. Ho coordinato e supportato l'installazione dell'ambiente di test, e coordinato e supervisionato ogni aggiornamento di versione sulla piattaforma.

Quello che non era mio: il disaccoppiamento. Quello è arrivato come linea guida dalla banca.

## Esito

| | All'arrivo | 2025 |
|---|---|---|
| Versioni degli strumenti | indietro, GitLab di quattro major | tutte alla versione corretta |
| Servizi centrali | nessuno | 9 |
| Applicazioni in produzione | meno di 5 | oltre 30 |
| Traffico | non cifrato | HTTPS su tutta la piattaforma |
| Un ticket | giorni di analisi | meno di un'ora |

Se dovesse restarne uno solo, resterebbe quello delle applicazioni: oltre trenta in produzione, divise fra batch (notebook schedulati) e servizi online long running. È la differenza fra una piattaforma su cui la gente sperimenta e una piattaforma su cui la banca gira.

La riga dei ticket è lo stesso fatto raccontato dall'altro capo. L'archeologia è finita, perché a quel punto qualcuno aveva scritto come funzionava la piattaforma.
