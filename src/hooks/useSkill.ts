import { useCallback, useContext, useMemo } from 'react';
import { ApiEndpoints } from '#constants/api';
import { TranslateContext } from '#contexts/index';
import type { Skill } from '#types/skill';
import { getColor } from '#utils/index';

export const fetchSkillData = async (): Promise<Skill[]> => {
  return fetch(ApiEndpoints.SKILL).then((r) => r.json());
};

/**
 * Provides processed skill data derived from the static `skills.json`.
 *
 * @returns An object containing:
 * - `skillGroupNames` – ordered list of skill group names
 * - `getSkillGroup` – returns the raw skill group at the given index
 * - `coloredSkills` – skill groups enriched with `totalValue` (sum of item values)
 *   and per-item `colorHex` derived from the group's `colorCode` via {@link getColor}
 */
export const useSkill = (skills: Skill[]) => {
  const { lang } = useContext(TranslateContext);

  const skillGroupNames = useMemo(
    () => (skills || []).map(({ groupName }) => groupName[lang]),
    [lang, skills],
  );

  /**
   * Returns the raw skill group at the given index.
   *
   * @param index - Index into the `skills` array
   */
  const getSkillGroup = useCallback(
    (index: number) => (skills || [])[index],
    [skills],
  );

  const coloredSkills = useMemo(
    () =>
      skills.map((skill) => {
        const totalValue = skill.items.reduce(
          (prev, current) => prev + current.value,
          0,
        );
        return {
          totalValue,
          items: skill.items.map((skillItem, index) => ({
            ...skillItem,
            colorHex: getColor(skill.colorCode, index + 1).hex(),
          })),
        };
      }),
    [skills],
  );

  return {
    skillGroupNames,
    getSkillGroup,
    coloredSkills,
  };
};
