import { useSkill } from '#hooks/index';
import { CircleFillSvg } from '#icons/index';
import { DetailBoxTitle } from '#ui/index';

export const SkillSidebarComponent = () => {
  const { coloredSkills } = useSkill();

  return coloredSkills.map((skill) => (
    <div key={skill.groupName}>
      <DetailBoxTitle>{skill.groupName}</DetailBoxTitle>
      <div className='mb-2 flex h-2 gap-0.5'>
        {skill.items.map((item) => (
          <span
            key={item.label}
            className='tooltip first:rounded-l-full last:rounded-r-full'
            data-tip={`${item.label} ${item.value}y`}
            style={{
              width: `${skill.totalValue > 0 ? (item.value / skill.totalValue) * 100 : 0}%`,
              minWidth: 4,
              background: item.colorHex,
            }}
          />
        ))}
      </div>
      <div className='flex flex-wrap gap-2'>
        {skill.items.map((item) => (
          <div key={item.label} className='flex items-center gap-2 text-xs'>
            <CircleFillSvg
              className='h-2 w-2'
              style={{ fill: item.colorHex }}
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
