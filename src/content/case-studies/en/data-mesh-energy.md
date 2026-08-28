## Context

A large European energy group had already tried to adopt Data Mesh before we arrived. On paper the paradigm was in place: blueprints existed, a platform existed, guidelines existed. In practice none of it had ever left the central data team. Data Mesh had become an internal project, a toy for the people who built it, rather than a way the company worked.

So the job was not to introduce the paradigm. It was to make it survive contact with the rest of the organisation.

## The problem

Data Mesh is easy to draw and brutal to adopt, because it asks domain teams to take on responsibilities they never had: owning a data product, its quality, its contract, and the people who consume it. A central team can build every piece of machinery correctly and still end up the only user of it. That is exactly what had happened.

Which means the hard part was never the architecture. It was that **the cost of producing a data product was higher than the value a domain team could see in producing one.** Any decision that did not move that ratio was decoration.

We pushed on four fronts:

- **Platform as a product.** The platform stopped being an internal deliverable and started being run for its users: its own roadmap, and two distinct families of metric instead of one. Delivery metrics still count what the platform team shipped: components released, and so on. Adoption metrics count what everyone else managed to do with it: data products created, data products that actually have an owner, people on the catalog, business users who came back this month. The second family is the one that tells you whether the paradigm took, precisely because you cannot satisfy it by building things nobody uses.
- **Cheaper blueprints.** The existing data product blueprints were too expensive to instantiate. Slimming them down mattered more than adding capability to them.
- **Enablement as work.** Guidelines were written *with* the client rather than handed over, and then actively taught. Adoption was treated as a workstream, not as a side effect that would happen once the tooling was good enough.
- **Services, delivered not implemented.** A set of platform services reaches every data product through a sidecar, so a domain team gets observability, quality checks and registration without writing any of it.

## The decisions

### A control plane between the SaaS catalog and the adapters

The company already ran Blindata as a SaaS governance platform, and already ran GitLab, and would keep running both regardless of what we built. The quick path was to wire adapters straight onto Blindata, or to improvise around it where that did not fit.

We put a control plane in between instead. It owns the lifecycle of a data product (creation, deployment, versioning, decommissioning), which is precisely what a catalog does not do, and it is built on OpenDataMesh because that specification implements that lifecycle rather than approximating it. Underneath, adapters carry decisions out against whatever the company actually runs: GitLab today means an adapter driving release pipelines; if that becomes something else, the adapter changes and the control layer does not.

What this buys is essential platform capability that belongs to the company rather than to any of its vendors. What it costs is that nothing works on day one.

> **Trade-off:** the hard part was not building it, it was convincing the client to fund a layer that produced no visible result for months while the alternative produced something demonstrable almost immediately. We landed it by writing a roadmap that put the essential capabilities first and deliberately postponed the ones that need a level of data-driven maturity the organisation has not reached yet. Sequencing was the price of getting the architecture at all.

### Data quality is a subset of observability

Great Expectations produces the quality signal; OpenTelemetry carries it. Putting quality on the OTel channel matters because that channel already carries metrics, traces and logs, so distributed monitoring of data products becomes a platform capability rather than a per-product feature, and adding a new signal later needs no new plumbing.

> **Trade-off:** bending a pipeline designed for software telemetry to carry data semantics. We inherit OpenTelemetry's model whether or not it fits data quality perfectly, in exchange for one channel instead of two.

### Three agents on MCP, one of which writes

The information estate was already there (technical metadata, business terms, quality results) and almost nobody could get at it without knowing where to look. So we built three agents, each with its own perimeter, on top of MCP rather than on point-to-point integrations:

- the **first** answers questions about the estate, through Blindata's MCP server;
- the **second** works from that estate to help a user define domain ontology and business terms. It talks to the first over A2A and writes back through Blindata's MCP server;
- the **third** reads the estate, technical metadata and more, and proposes data quality controls to implement, using an MCP server over the Great Expectations wrapper we had already built as a module every data product reuses.

The second one is the interesting one, because an agent with write access to a governance catalog is how you get a glossary nobody trusts, and a glossary nobody trusts is worse than no glossary at all: once the definitions stop being reliable, people stop reading them, and the catalog dies quietly.

So the write path is fenced on three sides. The agent writes only when a user tells it to write. Everything it writes carries a `[GenAI]` prefix, so provenance is visible in the term itself without opening anything. Blindata's search still matches `customer` on a prefixed term, so the convention costs nothing at retrieval. And it writes into a test tenant: promoting a domain ontology to production goes through a service we built for exactly that step.

> **Trade-off:** none of that safety came free. The prefix convention, the tenant separation and the promotion service are three mechanisms to build and keep alive, and they exist only so that an agent is allowed to write at all. We chose to pay for the apparatus rather than restrict the agent to read-only, which would have been simpler and would have left the drafting work exactly where it already was.

A note on what this is *not*: the usual objection to human-in-the-loop is that review becomes a bottleneck. That assumes a central governance team approving everything. In a federated mesh the responsibility for drafting ontology sits with the domains, so review load distributes along with the work instead of piling up behind one team.

## What went wrong

The agent workstream was planned for September to December 2025. It ran from October 2025 to July 2026.

The cause was not the agents. The client's AI platform was itself still being set up, and on several of its services we were effectively the first users, which is a pleasant thing to say afterwards and an expensive thing to be at the time. The clearest example: there was no conversation management service, so we wrote one. There was also no established practice for testing an agent or for comparing candidate models against each other, so we had to propose both before we could evaluate anything we were building.

So a four-month build became a ten-month one, and roughly half of that time went into pieces of platform and method that were meant to already exist. The work was real and it is reusable, but it was not the work we had estimated, and being early on a platform is a schedule risk we now price differently.

## My role

Data Architect on the engagement, and for the past year strategic advisory on the client's data direction as well. The team grew from two people to five over the course of the programme.

The portfolio's annual objectives are mine to set, using a Lean Value Tree in the EDGE sense. So are the adoption metrics derived from them, and the monthly measurement against them. Owning both the target and the instrument that reads it is uncomfortable, and it is the reason the metrics are the boring countable kind rather than anything that needs interpreting.

Every technical decision described above was mine. The team took them into implementation, with one exception worth naming: the first applications shipped from templates I wrote at the start of the project, which is how the patterns propagated without needing to be re-explained to each new person.

## Outcome

Around eight months in, the Experience Plane passed 100 users. The number matters less than what those users can do with it.

Today, in one place, someone can search the company's data products, see which business concepts each one exposes through its output ports, check the measured quality of the data behind them, and request access. Before, each of those four things was a separate conversation with a separate team, when it was possible at all.

Separately, and much more recently: all three agents have been in production since July 2026. Asking the estate a question, drafting a domain ontology and proposing quality controls are now things a domain team does itself, rather than things it queues behind the central data team.
