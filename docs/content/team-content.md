# Team — content brief & copy

**Goal:** Present the Center's governance structure honestly while **no leadership name is
HRC-confirmed** — role cards, a clear "why no names yet" note, and the university
affiliation.
**Primary CTA:** "Contact the Center" (CTA band) / "About Al-Ahgaff University" (affiliation).
**SEO title:** AR `الفريق والحوكمة — مركز بحوث حضرموت` · EN `Team & Governance — …`
**JSON-LD:** `CollectionPage` + `BreadcrumbList`.

## The honesty gate

`docs/research/02` §Leadership lists names (Bin-Dohry, Maknoon, Baharoon) — **all from the
client brief only, all 🔴**. So `src/lib/team.ts` is built so a name *cannot* leak:

- each record has `name?` + `confirmed: boolean`;
- the only accessor, `getTeamGroups()`, returns a view where `name` is `null` unless
  `confirmed === true`;
- the card renders `name ?? role`, and `role + "appointment announced soon"` when `name`
  is null;
- a unit test **and** an e2e test both assert the brief names never appear in the DOM.

Nothing is `confirmed` yet, so every card is in the pending state and a lead-in banner
explains it.

## Structure (`/team`)

Page header → breadcrumb → pending-note banner (shown while everything is pending) →
grouped sections → university affiliation block → CTA band.

### Groups (order fixed in `TEAM_GROUP_ORDER`)

| id | label (EN) | S5 entries |
|---|---|---|
| `board-of-trustees` | Board of Trustees | Chair, Board member (roles only) |
| `executive` | Executive leadership | Executive Director (role only) |
| `advisory` | Advisory network | — (hidden until populated) |
| `staff` | Staff | — (hidden until populated) |

Empty groups don't render.

## Fixed copy

`src/messages/{ar,en}.json` under `team.*`: group labels, role labels
(`roles.botChair` / `botMember` / `executiveDirector`), the `pending` string
("يُعلَن التعيين قريباً" / "Appointment announced soon"), the `pendingNote` banner, and the
affiliation block. All **ours** — institutional, neutral.

The About page's Governance section links here (`/team`).

## Flags → checklist

| Flag | Row |
|---|---|
| Chair, Board of Trustees — name + spelling | B1 |
| Executive Director — name + concurrent titles | B2 |
| Full Board member list (incl. the Kenya-based member) | B3 |
| Research staff / department heads to feature | B4 |
| University President reference + spelling | B5 |
| Advisory network — provide if desired | B6 |
