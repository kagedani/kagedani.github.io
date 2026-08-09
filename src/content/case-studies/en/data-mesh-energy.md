## Context

A large European energy group had already tried to adopt Data Mesh before we arrived. On paper the paradigm was in place: blueprints existed, a platform existed, guidelines existed. In practice none of it had ever left the central data team. Data Mesh had become an internal project — a toy for the people who built it — rather than a way the company worked.

So the job was not to introduce the paradigm. It was to make it survive contact with the rest of the organisation.

## The problem

Data Mesh is easy to draw and brutal to adopt, because it asks domain teams to take on responsibilities they never had: owning a data product, its quality, its contract, and the people who consume it. A central team can build every piece of machinery correctly and still end up the only user of it. That is exactly what had happened.

Which means the hard part was never the architecture. It was that **the cost of producing a data product was higher than the value a domain team could see in producing one.** Any decision that did not move that ratio was decoration.

We pushed on four fronts:

- **Platform as a product.** The platform stopped being an internal deliverable and started being run for its users — its own roadmap, its own notion of adoption, its own success measured in other teams' output rather than its own.
- **Cheaper blueprints.** The existing data product blueprints were too expensive to instantiate. Slimming them down mattered more than adding capability to them.
- **Enablement as work.** Guidelines were written *with* the client rather than handed over, and then actively taught. Adoption was treated as a workstream, not as a side effect that would happen once the tooling was good enough.
- **Services, delivered not implemented.** A set of platform services reaches every data product through a sidecar, so a domain team gets observability, quality checks and registration without writing any of it.

## The decisions

### A control plane, not conventions

Governing data products through convention and code review is the option that looks cheap. We rejected it. The effort scales linearly with the number of products, compliance is unverifiable in practice, and each new guardrail you bolt on is another piece of a control plane you are building by accident — badly, and without ever admitting it. Better to build one on purpose.

> **Trade-off** — a real control plane is an upfront investment that produces nothing on day one, while conventions produce the appearance of governance immediately. We spent early credibility on infrastructure whose value only becomes visible once there are enough data products to govern.

### An orchestration layer the catalog could not provide

Azure Purview and Blindata are good at what they do, but neither covers the *lifecycle* of a data product — creation, deployment, versioning, decommissioning. That capability had to come from somewhere. OpenDataMesh implements precisely it, so the control plane was built on it rather than stretched out of a catalog that was never meant to do the job.

> **Trade-off** — betting the core of the platform on an emerging open specification rather than a vendor with a support contract. Smaller community, fewer people to hire who already know it, and a roadmap we do not control.

### Control plane decoupled from utility plane

The control layer decides what should happen. Adapters carry it out against whatever tooling the company actually runs. GitLab today means an adapter that drives release pipelines; if it becomes GitHub tomorrow, the control layer does not change — the adapter does. No control logic is coupled to a vendor, and no custom code is written against a technology that will outlive the decision to use it.

> **Trade-off** — a layer of indirection, and one adapter per capability to build and keep alive. We paid that cost upfront for portability that may never be exercised. It is insurance, and insurance is only obviously worth it in hindsight.

### Data quality is a subset of observability

Great Expectations produces the quality signal; OpenTelemetry carries it. Putting quality on the OTel channel matters because that channel already carries metrics, traces and logs — so distributed monitoring of data products becomes a platform capability rather than a per-product feature, and adding a new signal later needs no new plumbing.

> **Trade-off** — bending a pipeline designed for software telemetry to carry data semantics. We inherit OpenTelemetry's model whether or not it fits data quality perfectly, in exchange for one channel instead of two.

## My role

Data Architect on the engagement, and for the past year strategic advisory on the client's data direction as well. The team grew from two people to five over the course of the programme.

Every technical decision described above was mine. The team took them into implementation — with one exception worth naming: the first applications shipped from templates I wrote at the start of the project, which is how the patterns propagated without needing to be re-explained to each new person.

## Outcome

Around eight months in, the Experience Plane passed 100 users. The number matters less than what those users can do with it.

Today, in one place, someone can search the company's data products, see which business concepts each one exposes through its output ports, check the measured quality of the data behind them, and request access. Before, each of those four things was a separate conversation with a separate team — when it was possible at all.
