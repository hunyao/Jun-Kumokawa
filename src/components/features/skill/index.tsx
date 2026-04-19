import { useLingui } from '@lingui/react/macro';
import { useEffect, useState } from 'react';
import { Await, useLoaderData } from 'react-router';
import { SuspenseWithComponent } from '#components/index';
import { useSkill, useThemeController } from '#hooks/index';
import { Container, GithubNavMenu, GithubNavMenuItem } from '#ui/index';
import { useHighCharts } from './hooks/useHighCharts';
import type { SkillPageLoaderResponse } from './loader';
import { SkillPageSkeleton } from './skeleton';

const getCssVariableValue = (prop: string) => {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(prop)
    .trim();
};
const getColorBaseContentValue = () => {
  return getCssVariableValue('--color-base-content');
};

export const SkillPageWrapper = () => {
  const { promise } = useLoaderData();
  return (
    <SuspenseWithComponent fallback={<SkillPageSkeleton />}>
      <Await resolve={promise}>
        {(resolved) => <SkillPage resolvedData={resolved} />}
      </Await>
    </SuspenseWithComponent>
  );
};

type SkillPageProps = {
  resolvedData: SkillPageLoaderResponse;
};
export const SkillPage = (props: SkillPageProps) => {
  const { resolvedData } = props;
  const [skills] = resolvedData;
  const [menu, setMenu] = useState(0);

  const { t } = useLingui();

  const { skillGroupNames, coloredSkills } = useSkill(skills);
  const skillGroup = coloredSkills[menu];

  const { addEventListener, removeEventListener } = useThemeController();

  const getChartOptions = (textColor: string, _skillGroup: typeof skillGroup) =>
    ({
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
        valueSuffix: t`y`,
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
          name: t`Experience`,
          data: _skillGroup.items.map((item) => ({
            name: item.label,
            y: item.value,
          })),
        },
      ],
    }) as const as Highcharts.Options;

  const { mountRef, chartRef } = useHighCharts(
    getChartOptions(getColorBaseContentValue(), skillGroup),
  );

  const onChangeMenu = (i: number) => {
    setMenu(i);
    if (chartRef.current === null) return;
    chartRef.current.update(
      getChartOptions(getColorBaseContentValue(), coloredSkills[i]),
    );
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: reason
  useEffect(() => {
    const func = () => {
      if (chartRef.current === null) return;
      chartRef.current.update(
        getChartOptions(getColorBaseContentValue(), skillGroup),
      );
    };
    addEventListener(func);

    return () => {
      removeEventListener(func);
    };
  }, [addEventListener, removeEventListener]);

  return (
    <Container className='grid grid-cols-4 gap-4 py-4'>
      <div className='row-span-3'>
        <GithubNavMenu>
          <ul>
            {skillGroupNames.map((skillGroupName, i) => (
              <GithubNavMenuItem
                key={skillGroupName}
                $active={i === menu}
                onClick={() => onChangeMenu(i)}
              >
                {skillGroupName}
              </GithubNavMenuItem>
            ))}
          </ul>
        </GithubNavMenu>
      </div>
      <div className='col-span-3'>
        <div className='my-2 font-bold text-2xl'>{skillGroupNames[menu]}</div>
        <div className='divider m-0' />
      </div>
      <div ref={mountRef} className='col-span-3' />
    </Container>
  );
};

export { getSKillPageLoader } from './loader';
