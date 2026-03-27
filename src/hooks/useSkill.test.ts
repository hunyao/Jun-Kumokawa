import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Skill } from '#data/index';
import { getColor } from '#utils/getColor';
import { useSkill } from './useSkill';

const { skills } = Skill;

describe('useSkill', () => {
  describe('skillGroupNames', () => {
    it('スキルデータのグループ名を順番通りに返す', () => {
      const { result } = renderHook(() => useSkill());
      expect(result.current.skillGroupNames).toEqual(
        skills.map(({ groupName }) => groupName),
      );
    });
  });

  describe('getSkillGroup', () => {
    it('指定したインデックスの生スキルグループを返す', () => {
      const { result } = renderHook(() => useSkill());
      skills.forEach((skill, i) => {
        expect(result.current.getSkillGroup(i)).toEqual(skill);
      });
    });
  });

  describe('coloredSkills', () => {
    it('スキルデータと同じ件数を返す', () => {
      const { result } = renderHook(() => useSkill());
      expect(result.current.coloredSkills).toHaveLength(skills.length);
    });

    it('各グループの totalValue がアイテムの value の合計と一致する', () => {
      const { result } = renderHook(() => useSkill());
      result.current.coloredSkills.forEach((group, i) => {
        const expected = skills[i].items.reduce(
          (sum, item) => sum + item.value,
          0,
        );
        expect(group.totalValue).toBe(expected);
      });
    });

    it('各アイテムに getColor で算出した colorHex が付与されている', () => {
      const { result } = renderHook(() => useSkill());
      result.current.coloredSkills.forEach((group, gi) => {
        group.items.forEach((item, ii) => {
          const expected = getColor(skills[gi].colorCode, ii + 1).hex();
          expect(item.colorHex).toBe(expected);
        });
      });
    });

    it('元の skills データを変更しない', () => {
      const originalItems = skills.map((s) => s.items.map((i) => ({ ...i })));
      renderHook(() => useSkill());
      skills.forEach((skill, si) => {
        skill.items.forEach((item, ii) => {
          expect(item).toEqual(originalItems[si][ii]);
        });
      });
    });
  });
});
