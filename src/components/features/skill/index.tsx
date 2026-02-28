import { useSkill } from '@hooks/index';
import { Container, GithubNavMenu, GithubNavMenuItem } from '@ui/index';
import highcharts, { type Chart } from 'highcharts';
import { useEffect, useRef, useState } from 'react';

export const SkillPage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [menu, setMenu] = useState(0);

  const { skillGroupNames, getSkillGroup } = useSkill();

  const skillGroup = getSkillGroup(menu);

  useEffect(() => {
    const container = document.createElement('div');
    let instance: Chart;
    if (ref.current) {
      instance = highcharts.chart(
        container,
        {
          chart: {
            type: 'pie',
            zooming: { type: 'xy' },
            height: '50%',
            backgroundColor: 'transparent',
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
                },
                {
                  enabled: true,
                  distance: -60,
                  style: {
                    fontSize: '1.2em',
                    textOutline: 'none',
                    opacity: 0.7,
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
      ref.current.appendChild(container);
    }

    return () => {
      if (instance) {
        instance.destroy();
      }
      if (ref.current) {
        ref.current.removeChild(container);
      }
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
      <div ref={ref} className='col-span-3' />
    </Container>
  );
};
