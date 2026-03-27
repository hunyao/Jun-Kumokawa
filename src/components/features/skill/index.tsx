import highcharts, { type Chart } from 'highcharts';
import { useEffect, useRef, useState } from 'react';
import { useSkill } from '#hooks/index';
import { Container, GithubNavMenu, GithubNavMenuItem } from '#ui/index';

export const SkillPage = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [menu, setMenu] = useState(0);

  const { skillGroupNames, coloredSkills } = useSkill();
  const skillGroup = coloredSkills[menu];

  useEffect(() => {
    if (!mountRef.current) return;

    if (!containerRef.current) {
      containerRef.current = document.createElement('div');
      mountRef.current.appendChild(containerRef.current);
    }

    const container = containerRef.current;
    const textColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--color-base-content')
      .trim();

    const instance: Chart = highcharts.chart(
      container,
      {
        chart: {
          type: 'pie',
          zooming: { type: 'xy' },
          height: '50%',
          backgroundColor: 'transparent',
          style: { color: textColor },
        },
        title: {
          text: undefined,
        },
        tooltip: {
          valueSuffix: 'y',
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: [
              {
                enabled: true,
                distance: 30,
                style: { color: textColor, textOutline: 'none' },
              },
              {
                enabled: true,
                distance: -60,
                style: {
                  fontSize: '1.2em',
                  textOutline: 'none',
                  opacity: 0.7,
                  color: textColor,
                },
                filter: {
                  operator: '>',
                  property: 'percentage',
                  value: 10,
                },
              },
            ],
          },
        },
        series: [
          {
            type: 'pie',
            name: 'Experience',
            data: skillGroup.items.map((item) => ({
              name: item.label,
              y: item.value,
            })),
          },
        ],
      },
      () => {},
    );

    return () => {
      instance.destroy();
    };
  }, [skillGroup]);

  return (
    <Container className='grid grid-cols-4 gap-4 py-4'>
      <div className='row-span-3'>
        <GithubNavMenu>
          <ul>
            {skillGroupNames.map((skillGroupName, i) => (
              <GithubNavMenuItem
                key={skillGroupName}
                $active={i === menu}
                onClick={() => setMenu(i)}
              >
                {skillGroupName}
              </GithubNavMenuItem>
            ))}
          </ul>
        </GithubNavMenu>
      </div>
      <div className='col-span-3 font-bold text-2xl'>
        {skillGroup.groupName}
      </div>
      <div className='divider col-span-3 m-0' />
      <div ref={mountRef} className='col-span-3' />
    </Container>
  );
};
