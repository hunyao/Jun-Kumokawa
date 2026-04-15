import { useCallback, useContext, useMemo } from 'react';
import { TranslateContext } from '#contexts/TranslateContext';
import { Skill } from '#data/index';
import { getColor } from '#utils/index';

const { skills } = Skill;

/**
 * Provides processed skill data derived from the static `skills.json`.
 *
 * @returns An object containing:
 * - `skillGroupNames` – ordered list of skill group names
 * - `getSkillGroup` – returns the raw skill group at the given index
 * - `coloredSkills` – skill groups enriched with `totalValue` (sum of item values)
 *   and per-item `colorHex` derived from the group's `colorCode` via {@link getColor}
 */
export const useSkill = () => {
  const { lang } = useContext(TranslateContext);

  const skillGroupNames = useMemo(
    () => skills.map(({ groupName }) => groupName[lang]),
    [lang],
  );

  /**
   * Returns the raw skill group at the given index.
   *
   * @param index - Index into the `skills` array
   */
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
          groupName: skill.groupName[lang],
          totalValue,
          items: skill.items.map((skillItem, index) => ({
            ...skillItem,
            colorHex: getColor(skill.colorCode, index + 1).hex(),
          })),
        };
      }),
    [lang],
  );

  return {
    skillGroupNames,
    getSkillGroup,
    coloredSkills,
  };
};
