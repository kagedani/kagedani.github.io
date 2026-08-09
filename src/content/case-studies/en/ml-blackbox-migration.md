## Context

A major retail bank ran four AI use cases on a proprietary vendor platform: auto-triage and drafted replies for inbound support tickets, classification and routing of high-volume email, assisted handling and checks on wire-transfer requests, and extraction from unstructured documents.

The platform produced results. That was never the problem.

## The problem

Everything the platform learned stayed inside it. Models, data and logic were sealed in a closed system, which is not one problem but four at once:

- **No exit.** Leaving meant rebuilding from scratch, so the bank had no leverage in any conversation with the vendor.
- **No explainability.** Decisions could not be inspected or justified to risk, to audit, or to the regulator — in a bank, on a workflow that touches wire transfers.
- **Cost that scaled with usage, not with value.** Licensing was per use case and grew as the bank used it more, which means automating *more* work made the economics worse. The ceiling was commercial, not technical.
- **No accumulation.** Every change routed through the vendor, so the bank's own people got no better at this over time.

The last two are the pair that explains why the project existed. The bank had already identified a large body of manual work these models could absorb — it put the figure at **45 FTE across the four use cases** — and the licence structure made capturing it uneconomical. So the cost had to be solved either way. The only open question was whether solving it would also buy ownership.

## The architecture

<figure class="diagram">
<svg viewBox="0 0 760 366" role="img" aria-label="Layered architecture: bank source systems, a central integration and authentication layer, an AI environment holding four channel applications plus a shared database and model registry, on a Kubernetes platform foundation.">
  <defs>
    <marker id="dgArrow" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="5" markerHeight="5" orient="auto">
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

  <path class="dg-arrow" d="M439 58 V84" marker-end="url(#dgArrow)" />

  <text class="dg-l" x="112" y="116">INTEGRATION</text>
  <rect class="dg-box-a" x="130" y="92" width="618" height="44" />
  <text class="dg-t2" x="145" y="118">Single secure entry point — every request authenticated and authorized here</text>
  <text class="dg-p" x="655" y="118">AUTHN · AUTHZ</text>

  <path class="dg-arrow" d="M439 140 V162" marker-end="url(#dgArrow)" />

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
<figcaption>Built once, specialised per model: the four use cases differ in their inputs and in almost nothing else.</figcaption>
</figure>

End to end, on the ticketing and email channels, in about fifteen seconds:

1. an event is raised in the bank's source system
2. a listener captures it; the payload is normalised and validated
3. the caller is authenticated and authorized at the central integration layer
4. the request enters the AI environment and is persisted
5. the AI service picks up pending work at short intervals and runs the model
6. the result is written back and returned through the same integration layer

## The decisions

### Rebuild the models rather than change vendor

Moving to a different vendor would have solved the licence cost and nothing else — same sealed box, new logo. Rebuilding was the only option that addressed explainability and ownership at the same time.

> **Trade-off** — you are betting you can match a system that already works, with none of the credit for doing so. Parity is invisible; only a shortfall gets noticed. It is the highest-risk option on the table and the only one worth taking here.

### Batch inference, not event-driven invocation

The AI service polls for pending work at short intervals rather than being invoked per event. Simpler to operate, simpler to reason about under failure, and trivially resilient to a downstream service being briefly unavailable.

> **Trade-off** — gives up sub-second latency. That was affordable: fifteen seconds end to end is well inside what a support ticket or an inbound email needs, so we spent latency we did not need to buy operational simplicity we did.

### A single authenticated entry point — not my call

Every request is authenticated and authorized at one central layer before it reaches the AI environment. It is good for governance and it gives audit a single place to look.

It is also, by construction, a bottleneck and a single point of failure. I should be straight about this one: the shape came from the bank's security team as a requirement, not from me. On this project my hands were tied on several infrastructure choices, and this was one of them.

> **Trade-off** — centralised control in exchange for a chokepoint. Worth naming honestly rather than presented as a design win, because it was not mine to trade.

### Kubernetes, because the bank already had one

The requirement was portable, cloud-agnostic infrastructure, and the bank already ran a Kubernetes cluster that Quantyca managed. Inheriting a platform that an in-house team already knew how to run mattered more than any comparison between orchestrators.

> **Trade-off** — no managed ML service, so the operational burden stays in-house forever. Portability and a running cluster in exchange for owning the plumbing.

## What went wrong

### A Windows antimalware on a RedHat cluster

The servers came from the client: RedHat, as specified — with a Windows antimalware agent installed on them. It broke the Kubernetes cluster during setup, and then intermittently broke pod-to-pod communication.

Diagnosing it took a long time, because nothing in the symptom pointed anywhere near the cause. And then it had to be *proved*: I reproduced it live, in a meeting, because a claim that implicates another team's mandated security tooling does not get accepted on assertion.

The lesson generalises. On infrastructure you do not control, the security baseline is part of the architecture whether anyone tells you about it or not — and the time to discover it is not during cluster setup.

### Staffing, and a plan resequenced around licence cost

Staffing worked well on two of the four use cases and considerably less well on the other two. The options were to let all four slip together or to resequence.

We resequenced: the two healthy use cases were brought forward, the other two pushed back. That was not a neutral scheduling choice — releasing two of them early started retiring licence cost sooner, and that saving partly paid for the delay on the rest. It is the kind of decision that only looks obvious once you accept that a delivery plan is a financial instrument as much as a schedule.

## My role

Data Architect and technical lead. Delivery team of six: a project manager, me, and four data engineers and scientists, across three workstreams — DevOps for the environments, Kubernetes, CI/CD and secure networking; software engineering for the listener and workflow applications around each use case; data science for the models themselves.

I owned the architecture and every technical decision above, negotiated the ones that were imposed, and did the diagnosis work when the infrastructure fought back.

## Outcome

**Four out of four use cases migrated, zero downtime.** Each switched independently: the new implementation went live a few days ahead of its official release date and ran in shadow against the real end-to-end flow first, so every cutover was a decision rather than a leap.

Model performance came out in line with the vendor's. That was the bar — the point was never to build better models, it was to own the ones that already worked. What ownership then bought is the part worth underlining: with the training pipeline in-house and inspectable, the bank went on to improve performance itself, after we left. Before, that was not a hard thing to do; it was a structurally impossible one.

And the audit answer changed. Today the bank can reach the logs, the rules, the measured performance and the model output behind any decision the system makes. On a workflow that touches wire transfers, that is not a nice-to-have.
