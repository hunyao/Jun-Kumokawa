import { Skill } from '@data/index';

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
