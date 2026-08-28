# Blog posts

One Markdown file per post. Frontmatter:

```yaml
---
title: 'How we built a control plane for data products'
description: 'One paragraph. Shows up in search results and on the index.'
pubDate: 2026-09-01
tags: ['data mesh', 'architecture']
draft: false
---
```

English only — see `docs/redesign-plan.md`.

**The blog produces no routes and no nav link until `BLOG_ENABLED` is `true`
in `src/config.ts`.** Flip it once there are at least two real posts in here.
A blog whose latest post is two years old is worse than no blog.

`README.md` is excluded from the collection glob in `src/content.config.ts`;
every other `.md` in here is treated as a post and must satisfy the schema.
