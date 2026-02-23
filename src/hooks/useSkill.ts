import { Skill } from '@data/index';
import { expect, test } from 'vitest';

const { skills } = Skill;
export const useSkill = () => {
  const groupNames = skills.map(({ groupName }) => groupName);
  const getSkillGroup = (index: number) => {
    return skills[index];
  };

  return {
    skillGroupNames: groupNames,
    getSkillGroup,
  };
};

if (import.meta.vitest) {
  test('skillGroupNames returns all group names from skills data', () => {
    const { skillGroupNames } = useSkill();
    expect(skillGroupNames).toEqual(skills.map(({ groupName }) => groupName));
    expect(skillGroupNames.length).toBeGreaterThan(0);
  });

  test('getSkillGroup returns the correct group by index', () => {
    const { getSkillGroup } = useSkill();
    expect(getSkillGroup(0)).toEqual(skills[0]);
    expect(getSkillGroup(1)).toEqual(skills[1]);
  });
}
