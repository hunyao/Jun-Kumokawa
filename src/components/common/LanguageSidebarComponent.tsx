import { Skill } from '@data/index';
import { CircleFillSvg } from '@icons/index';
import { DetailBoxTitle } from '@ui/index';
import Color from 'color';
import type { CSSProperties } from 'react';

const getColor = (code: Array<number>, level: number) => {
  const baseColor = Color.rgb(code);
  if (baseColor.isDark()) {
    return baseColor.lighten(0.1 * level);
  } else {
    return baseColor.darken(0.1 * level);
  }
};
const { skills } = Skill;
const addedColorHexSkills = skills.map((skill) => {
  return {
    ...skill,
    totalValue: skill.items.reduce((prev, current) => prev + current.value, 0),
    items: skill.items.map((skillItem, index) => {
      return {
        ...skillItem,
        colorHex: getColor(skill.colorCode, index).hex(),
      };
    }),
  };
});
export const LanguageSidebarComponent = () => {
  return addedColorHexSkills.map((skill) => (
    <div key={skill.groupName}>
      <DetailBoxTitle>{skill.groupName}</DetailBoxTitle>
      <div className='mb-2 flex h-2 gap-0.5'>
        {skill.items.map((item) => (
          <span
            key={item.label}
            className='tooltip first:rounded-l-full last:rounded-r-full'
            data-tip={`${item.label} ${item.value}y`}
            style={
              {
                width: `${(item.value / skill.totalValue) * 100}%`,
                background: item.colorHex,
              } as CSSProperties
            }
          ></span>
        ))}
      </div>
      <div className='flex flex-wrap gap-2'>
        {skill.items.map((item) => (
          <div key={item.label} className='flex items-center gap-2 text-xs'>
            <CircleFillSvg
              className='h-2 w-2'
              style={{ fill: item.colorHex } as CSSProperties}
            />
            <span>{item.label}</span>
            <span>{item.value}y</span>
          </div>
        ))}
      </div>
      <div className='divider' />
    </div>
  ));
};
