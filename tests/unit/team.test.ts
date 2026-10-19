import { describe, expect, it } from 'vitest';

import {
  getTeamGroups,
  isTeamFullyPending,
  TEAM_GROUP_ORDER,
} from '@/lib/team';
import { locales } from '@/i18n/routing';

describe('team model', () => {
  it('only publishes a name together with its source', () => {
    for (const locale of locales) {
      for (const group of getTeamGroups(locale)) {
        for (const member of group.members) {
          if (member.name === null) {
            expect(member.source).toBeNull();
            expect(member.alsoRoleKey).toBeNull();
          } else {
            expect(member.source?.url).toMatch(/^https:\/\//);
            expect(member.source?.name).toBeTruthy();
          }
        }
      }
    }
  });

  it('keeps unsourced roles pending (the board member)', () => {
    const member = getTeamGroups('ar')
      .flatMap((g) => g.members)
      .find((m) => m.id === 'bot-member');
    expect(member?.name).toBeNull();
  });

  it('localizes published names', () => {
    const find = (locale: 'ar' | 'en') =>
      getTeamGroups(locale)
        .flatMap((g) => g.members)
        .find((m) => m.id === 'executive-director');
    expect(find('ar')?.name).toContain('مكنون');
    expect(find('en')?.name).toContain('Maknoon');
  });

  it('groups come back in the declared order', () => {
    const ids = getTeamGroups('en').map((g) => g.id);
    const expected = TEAM_GROUP_ORDER.filter((id) => ids.includes(id));
    expect(ids).toEqual(expected);
  });

  it('every member carries a role key for i18n', () => {
    for (const group of getTeamGroups('en')) {
      for (const member of group.members) {
        expect(member.roleKey).toBeTruthy();
      }
    }
  });

  it('is no longer fully pending once a sourced name exists', () => {
    expect(isTeamFullyPending('ar')).toBe(false);
  });
});
