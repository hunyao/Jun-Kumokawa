import highcharts, { type Chart } from 'highcharts';
import { useEffect, useRef } from 'react';

export const useHighCharts = (options: Highcharts.Options) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<Chart | null>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: reason
  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;

    const instance = highcharts.chart(container, options, () => {});

    chartRef.current = instance;

    return () => {
      instance.destroy();
      chartRef.current = null;
    };
  }, []);

  return {
    mountRef,
    chartRef,
  };
};
