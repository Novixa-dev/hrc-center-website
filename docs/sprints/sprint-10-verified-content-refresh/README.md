# Sprint 10 — Verified content refresh (post-launch)

**Goal:** Bring the live site up to date with everything the Center has published since
launch research (2026-09-09), using only facts verified against an official or
third-party source — and make the sourcing visible to readers.

**Depends on:** live site (`hrc.novixa.dev`, S-deploy), research refresh 2026-10-19
(`docs/research/02-hadramout-research-center.md` §Refresh 2026-10).
**Blocks:** nothing; HRC confirmation items stay open in the content-review checklist.

## Scope

- A `source` field on every collection (news, publications, conferences) rendered as a
  "Source" link on detail pages — editorial transparency for a research institution.
- News archive rebuilt from the Center's official news feed (ahgaff.edu/centers/1/articles),
  each item dated and linked to its source. Unverifiable legacy items removed.
- Journal: ISSN (online) 3106-9053 (ISSN register), semi-annual + peer-reviewed (official
  news), issues 1–3 with official PDF links where they exist; second book added.
- Second International Scientific Conference marked as held (27 Dec 2025, online) with
  its real title (League of Islamic Universities + official news).
- Team: leadership names that the University itself publishes in official news, each
  with its source.
- Services: the International Office for Arbitration & Dispute Resolution (Oct 2026).
- About: verified milestones timeline + verified partners.

## Rules

- No fact without a source URL in `docs/research/02` §Refresh 2026-10.
- Where official sources conflict (e.g. a news date vs. the date inside the text), use the
  publication date and say "published on".
- Names are published only where an official University news item states the role.
