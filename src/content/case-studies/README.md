# Case study bodies

`<lang>/<project-slug>.md` — the slug must match a `slug` in `src/data/content.ts`.

Per-language folders, **not** `<slug>.<lang>.md`: Astro slugifies collection ids and
swallows the dot, so a dotted filename becomes the unusable id `my-projecten`.
No frontmatter: the card metadata (title, sector, role, period, stack) lives in
`content.ts`, this is the narrative only.

Section order is fixed, per `docs/redesign-plan.md`:

1. `## Context` — sector, scale, situation on arrival
2. `## The problem` — why it was *hard*, not what there was to do
3. `## The decisions` — `###` per decision, each closing with a
   `> **Trade-off** — …` blockquote. **A case study with no discussable
   decision and no admitted cost is a press release.**
4. `## My role` — team size, what you personally owned
5. `## Outcome` — the number, and what people can now do

**Never name a client.** Sector only. Revenue figures are also out where the
sector is small enough that revenue plus geography identifies one company.
