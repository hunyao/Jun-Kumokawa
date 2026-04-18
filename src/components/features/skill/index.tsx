import { useLingui } from '@lingui/react/macro';
import highcharts, { type Chart } from 'highcharts';
import { useEffect, useRef, useState } from 'react';
import { Await, type LoaderFunction, useLoaderData } from 'react-router';
import { SuspenseWithComponent } from '#components/index';
import { fetchSkillData, useSkill, useThemeController } from '#hooks/index';
import type { Skill } from '#types/skill';
import { Container, GithubNavMenu, GithubNavMenuItem } from '#ui/index';

const SkillPageSkeleton = () => (
  <Container className='grid grid-cols-4 gap-4 py-4'>
    <div className='row-span-3 space-y-1'>
      {[...Array(6)].map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: skeleton rows have no meaningful key
        <div key={i} className='skeleton h-9 w-full rounded-lg' />
      ))}
    </div>
    <div className='col-span-3'>
      <div className='skeleton my-2 h-8 w-40' />
      <div className='divider m-0' />
    </div>
    <div className='col-span-3 flex items-center justify-center'>
      <div className='skeleton h-64 w-64 rounded-full' />
    </div>
  </Container>
);

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

const skillDataPromise = fetchSkillData();
export type SkillPageLoaderResponse = [Skill[]];
export const getSKillPageLoader: LoaderFunction = () => {
  return {
    promise: Promise.all([skillDataPromise]),
  };
};
type SkillPageProps = {
  resolvedData: SkillPageLoaderResponse;
};
export const SkillPage = (props: SkillPageProps) => {
  const { resolvedData } = props;
  const [skills] = resolvedData;
  const mountRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<Chart | null>(null);
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

  const onChangeMenu = (i: number) => {
    setMenu(i);
    if (chartRef.current === null) return;
    chartRef.current.update(
      getChartOptions(
        getComputedStyle(document.documentElement)
          .getPropertyValue('--color-base-content')
          .trim(),
        coloredSkills[i],
      ),
    );
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: reason
  useEffect(() => {
    const func = () => {
      if (chartRef.current === null) return;
      chartRef.current.update(
        getChartOptions(
          getComputedStyle(document.documentElement)
            .getPropertyValue('--color-base-content')
            .trim(),
          skillGroup,
        ),
      );
    };
    addEventListener(func);

    return () => {
      removeEventListener(func);
    };
  }, [addEventListener, removeEventListener]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: reason
  useEffect(() => {
    if (!mountRef.current) return;
    if (!containerRef.current) return;
    if (!chartRef.current) return;

    chartRef.current.update(
      getChartOptions(
        getComputedStyle(document.documentElement)
          .getPropertyValue('--color-base-content')
          .trim(),
        skillGroup,
      ),
    );
  }, [skillGroup]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: reason
  useEffect(() => {
    if (!mountRef.current) return;

    if (!containerRef.current) {
      containerRef.current = document.createElement('div');
      mountRef.current.appendChild(containerRef.current);
    }

    const container = containerRef.current;

    const instance = highcharts.chart(
      container,
      getChartOptions(
        getComputedStyle(document.documentElement)
          .getPropertyValue('--color-base-content')
          .trim(),
        skillGroup,
      ),
      () => {},
    );

    chartRef.current = instance;

    return () => {
      instance.destroy();
      chartRef.current = null;
    };
  }, []);

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
