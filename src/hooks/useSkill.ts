import { Skill } from '@data/index';
import { getColor } from '@utils/getColor';
import { useCallback, useMemo } from 'react';

const { skills } = Skill;

export const useSkill = () => {
  const skillGroupNames = useMemo(
    () => skills.map(({ groupName }) => groupName),
    [],
  );
  const getSkillGroup = useCallback((index: number) => skills[index], []);

  const coloredSkills = useMemo(
    () =>
      skills.map((skill) => {
        const totalValue = skill.items.reduce(
          (prev, current) => prev + current.value,
          0,
        );
        return {
          ...skill,
          totalValue,
          items: skill.items.map((skillItem, index) => ({
            ...skillItem,
            colorHex: getColor(skill.colorCode, index + 1).hex(),
          })),
        };
      }),
    [],
  );

  return {
    skillGroupNames,
    getSkillGroup,
    coloredSkills,
  };
};
