# Case study bodies

`<lang>/<project-slug>.md` — the slug must match a `slug` in `src/data/content.ts`.

Per-language folders, **not** `<slug>.<lang>.md`: Astro slugifies collection ids and
swallows the dot, so a dotted filename becomes the unusable id `my-projecten`.
No frontmatter: the card metadata (title, sector, role, period, stack) lives in
`content.ts`, this is the narrative only.

Section order is fixed, per `docs/redesign-plan.md`:

1. `## Context` — sector, scale, situation on arrival
2. `## The problem` — why it was *hard*, not what there was to do
3. `## The architecture` — optional, and only where a diagram earns it.
   Inline SVG using the `.dg-*` classes, never an image: it reads the CSS
   variables, so it works in both themes and its labels stay selectable.
4. `## The decisions` — `###` per decision, each closing with a
   `> **Trade-off** — …` blockquote. **A case study with no discussable
   decision and no admitted cost is a press release.**
5. `## What went wrong` — **mandatory.** A failure told precisely is worth more
   than three decisions told well: it is the part nobody can invent. It is also
   never volunteered — it has to be asked for, explicitly, every time.
6. `## My role` — team size, what you personally owned, and what was imposed
   on you. Stating the boundary reads as more senior, not less.
7. `## Outcome` — the number, and what people can now do

No word limit. The 400–600 target in the original plan died on contact with the
first two studies (926 and 1496 words) and pretending otherwise helps nobody.
Length follows the material: a study with two real decisions and one real
failure is finished, at whatever length that takes.

**Never name a client here.** Sector only, in your own prose, always. The one
place a client name is allowed on this site is inside a citation of an already
public artifact — a conference talk title, an article byline — on `/writing`,
where the name is the publisher's act and not ours. That exception does not
reach into these files. Revenue figures are out too, where the sector is small
enough that revenue plus geography identifies one company.
