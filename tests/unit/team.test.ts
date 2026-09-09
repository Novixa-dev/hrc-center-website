import { describe, expect, it } from 'vitest';

import {
  getTeamGroups,
  isTeamFullyPending,
  TEAM_GROUP_ORDER,
} from '@/lib/team';

describe('team model', () => {
  it('never exposes an unconfirmed name', () => {
    for (const group of getTeamGroups()) {
      for (const member of group.members) {
        // Nothing is HRC-confirmed yet, so every name must be null.
        expect(member.name).toBeNull();
      }
    }
  });

  it('does not leak the client-brief names anywhere in the model', () => {
    const serialized = JSON.stringify(getTeamGroups());
    for (const name of [
      'Maknoon',
      'Bin-Dohry',
      'Bin Dohry',
      'Baharoon',
      'مكنون',
      'بن دحري',
    ]) {
      expect(serialized).not.toContain(name);
    }
  });

  it('groups come back in the declared order', () => {
    const ids = getTeamGroups().map((g) => g.id);
    const expected = TEAM_GROUP_ORDER.filter((id) => ids.includes(id));
    expect(ids).toEqual(expected);
  });

  it('every member carries a role key for i18n', () => {
    for (const group of getTeamGroups()) {
      for (const member of group.members) {
        expect(member.roleKey).toBeTruthy();
      }
    }
  });

  it('isTeamFullyPending is true while nothing is confirmed', () => {
    expect(isTeamFullyPending()).toBe(true);
  });
});
