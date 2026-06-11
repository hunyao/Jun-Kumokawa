import { useMemo } from 'react';
import { Await } from 'react-router';
import { SuspenseWithComponent } from '#components/index';
import { ChildrenError } from '#features/errors';
import { fetchSkillData, useSkill } from '#hooks/index';
import { CircleFillSvg } from '#icons/index';
import type { Skill } from '#types/skill';
import { DetailBoxTitle } from '#ui/index';

export const SkillSidebarWrapper = () => {
  const promise = useMemo(() => fetchSkillData(), []);
  return (
    <SuspenseWithComponent>
      <Await resolve={promise} errorElement={<ChildrenError />}>
        {(skills) => {
          return <SkillSidebarComponent skills={skills} />;
        }}
      </Await>
    </SuspenseWithComponent>
  );
};
type SkillSidebarComponentProps = {
  skills: Skill[];
};
export const SkillSidebarComponent = (props: SkillSidebarComponentProps) => {
  const { skills } = props;
  const { coloredSkills, skillGroupNames } = useSkill(skills);

  return coloredSkills.map((skill, i) => (
    <div key={skillGroupNames[i]}>
      <DetailBoxTitle>{skillGroupNames[i]}</DetailBoxTitle>
      <div className='mb-2 flex h-2 gap-0.5 overflow-hidden'>
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
