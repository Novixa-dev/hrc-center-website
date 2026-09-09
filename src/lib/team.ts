/**
 * Team & governance model.
 *
 * The Center is a real institution and we have **no HRC-confirmed names** yet
 * (docs/research/02 §Leadership — every name there is from the client brief only
 * and marked 🔴). So the model is deliberately built so an unconfirmed name can
 * never reach the DOM: records carry `name` + `confirmed`, and the only exported
 * accessor — `getTeamGroups()` — maps each record to a view where `name` is
 * `string | null` and is `null` unless `confirmed === true`. The card component
 * renders the role + "appointment announced soon" whenever `name` is `null`.
 *
 * When HRC confirms a person, set their `name` and flip `confirmed: true`.
 */

export type TeamGroupId =
  'board-of-trustees' | 'executive' | 'advisory' | 'staff';

export const TEAM_GROUP_ORDER: readonly TeamGroupId[] = [
  'board-of-trustees',
  'executive',
  'advisory',
  'staff',
];

type TeamMemberRecord = {
  /** Stable key for React + tests. */
  id: string;
  group: TeamGroupId;
  /** Role title message key: `team.roles.<roleKey>`. */
  roleKey: string;
  /** Confirmed full name. Ignored entirely unless `confirmed` is true. */
  name?: string;
  /** HRC has confirmed this person for this role. */
  confirmed: boolean;
  order: number;
};

/**
 * Structural roles only. Names stay empty + `confirmed: false` until HRC
 * confirms them (checklist B1–B5).
 */
const RECORDS: readonly TeamMemberRecord[] = [
  {
    id: 'bot-chair',
    group: 'board-of-trustees',
    roleKey: 'botChair',
    confirmed: false,
    order: 0,
  },
  {
    id: 'bot-member',
    group: 'board-of-trustees',
    roleKey: 'botMember',
    confirmed: false,
    order: 1,
  },
  {
    id: 'executive-director',
    group: 'executive',
    roleKey: 'executiveDirector',
    confirmed: false,
    order: 0,
  },
];

export type TeamMemberView = {
  id: string;
  roleKey: string;
  /** `null` unless HRC-confirmed — the card then shows the pending state. */
  name: string | null;
};

export type TeamGroupView = {
  id: TeamGroupId;
  members: TeamMemberView[];
};

/**
 * The team, grouped and ordered. An unconfirmed record surfaces with
 * `name: null` — there is no code path that exposes an unconfirmed name.
 */
export function getTeamGroups(): TeamGroupView[] {
  return TEAM_GROUP_ORDER.map((id) => ({
    id,
    members: RECORDS.filter((r) => r.group === id)
      .slice()
      .sort((a, b) => a.order - b.order)
      .map((r): TeamMemberView => ({
        id: r.id,
        roleKey: r.roleKey,
        name: r.confirmed && r.name ? r.name : null,
      })),
  })).filter((g) => g.members.length > 0);
}

/** True while no team member has been confirmed — the page shows a lead-in note. */
export function isTeamFullyPending(): boolean {
  return getTeamGroups().every((g) => g.members.every((m) => m.name === null));
}
