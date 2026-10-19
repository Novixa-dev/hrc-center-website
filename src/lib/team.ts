import type { Locale } from '@/i18n/routing';

/**
 * Team & governance model.
 *
 * The Center is a real institution, so a name may only reach the DOM when it is
 * **publicly sourced**: the University itself names the person in that role in an
 * official news item (docs/research/02 §Refresh 2026-10). Records carry `name`,
 * `confirmed` and `source`; the only exported accessor — `getTeamGroups()` —
 * maps each record to a view where `name` is `null` unless `confirmed === true`
 * AND a source exists. The card then renders the role + "appointment announced
 * soon". Sourced is not the same as HRC sign-off — see the content-review
 * checklist (B1–B6).
 */

export type TeamGroupId =
  'board-of-trustees' | 'executive' | 'advisory' | 'staff';

export const TEAM_GROUP_ORDER: readonly TeamGroupId[] = [
  'board-of-trustees',
  'executive',
  'advisory',
  'staff',
];

type Localized = Record<Locale, string>;

type TeamSource = { name: Localized; url: string };

type TeamMemberRecord = {
  /** Stable key for React + tests. */
  id: string;
  group: TeamGroupId;
  /** Role title message key: `team.roles.<roleKey>`. */
  roleKey: string;
  /** A concurrent title, message key `team.roles.<alsoRoleKey>`. */
  alsoRoleKey?: string;
  /** Full name as published, per locale. Ignored unless `confirmed` + `source`. */
  name?: Localized;
  /** The role is publicly sourced (official University news). */
  confirmed: boolean;
  /** Where the University names this person in this role. */
  source?: TeamSource;
  order: number;
};

const ARBITRATION_OFFICE_NEWS: TeamSource = {
  name: {
    ar: 'خبر جامعة الأحقاف، 10 أكتوبر 2026',
    en: 'Al-Ahgaff University news, 10 Oct 2026',
  },
  url: 'https://ahgaff.edu/centers/1/articles/%D9%85%D8%B1%D9%83%D8%B2-%D8%A8%D8%AD%D9%88%D8%AB-%D8%AD%D8%B6%D8%B1%D9%85%D9%88%D8%AA-%D8%A8%D8%AC%D8%A7%D9%85%D8%B9%D8%A9-%D8%A7%D9%84%D8%A3%D8%AD%D9%82%D8%A7%D9%81-%D9%8A%D8%AF%D8%B4%D9%86-%D8%A7%D9%84%D9%85%D9%83%D8%AA%D8%A8-%D8%A7%D9%84%D8%AF%D9%88%D9%84%D9%8A-%D9%84%D9%84%D8%AA%D8%AD%D9%83%D9%8A%D9%85-%D9%88%D8%AA%D8%B3%D9%88%D9%8A%D8%A9-%D8%A7%D9%84%D9%85%D9%86%D8%A7%D8%B2%D8%B9%D8%A7%D8%AA-%D8%A8%D8%A7%D9%84%D9%85%D9%83%D9%84%D8%A7/',
};

const RECORDS: readonly TeamMemberRecord[] = [
  {
    id: 'bot-chair',
    group: 'board-of-trustees',
    roleKey: 'botChair',
    name: {
      ar: 'الأستاذ محمد مبارك بن دهري',
      en: 'Mohammed Mubarak bin Dohry',
    },
    confirmed: true,
    source: ARBITRATION_OFFICE_NEWS,
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
    alsoRoleKey: 'universityVicePresident',
    name: { ar: 'البروفيسور صادق عمر مكنون', en: 'Prof. Sadiq Omar Maknoon' },
    confirmed: true,
    source: ARBITRATION_OFFICE_NEWS,
    order: 0,
  },
  {
    id: 'training-director',
    group: 'executive',
    roleKey: 'trainingDirector',
    name: { ar: 'الدكتور محمد سالم البوري', en: 'Dr. Mohammed Salem Al-Bouri' },
    confirmed: true,
    source: ARBITRATION_OFFICE_NEWS,
    order: 1,
  },
  {
    id: 'arbitration-office-head',
    group: 'executive',
    roleKey: 'arbitrationOfficeHead',
    name: {
      ar: 'المستشار الدكتور هاشم علوي مقيبل',
      en: 'Counsellor Dr. Hashem Alawi Muqaibel',
    },
    confirmed: true,
    source: ARBITRATION_OFFICE_NEWS,
    order: 2,
  },
];

export type TeamMemberView = {
  id: string;
  roleKey: string;
  alsoRoleKey: string | null;
  /** `null` unless confirmed AND sourced — the card then shows the pending state. */
  name: string | null;
  source: { name: string; url: string } | null;
};

export type TeamGroupView = {
  id: TeamGroupId;
  members: TeamMemberView[];
};

/**
 * The team, grouped and ordered, in one locale. An unconfirmed or unsourced
 * record surfaces with `name: null` — there is no code path that exposes it.
 */
export function getTeamGroups(locale: Locale): TeamGroupView[] {
  return TEAM_GROUP_ORDER.map((id) => ({
    id,
    members: RECORDS.filter((r) => r.group === id)
      .slice()
      .sort((a, b) => a.order - b.order)
      .map((r): TeamMemberView => {
        const published = r.confirmed && r.name && r.source;
        return {
          id: r.id,
          roleKey: r.roleKey,
          alsoRoleKey: published ? (r.alsoRoleKey ?? null) : null,
          name: published ? r.name![locale] : null,
          source: published
            ? { name: r.source!.name[locale], url: r.source!.url }
            : null,
        };
      }),
  })).filter((g) => g.members.length > 0);
}

/** True while no team member is published — the page shows a lead-in note. */
export function isTeamFullyPending(locale: Locale): boolean {
  return getTeamGroups(locale).every((g) =>
    g.members.every((m) => m.name === null),
  );
}
