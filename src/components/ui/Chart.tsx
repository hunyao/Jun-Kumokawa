import React from 'react';
import { styled } from '@mui/material/styles';

interface ChartUIProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}
const Chart = styled(React.forwardRef<HTMLDivElement, ChartUIProps>(({className, ...rest}, ref) => (
  <div
    className={className + " c3-chart"}
    ref={ref}
    data-testid="c3-chart"
    {...rest}
  />
)))`
& {
  .c3-axis > .domain {
    fill: transparent
  }
  .c3-axis > .tick {
    fill: #8b949e;
  }
  .c3-axis > .c3-axis-y-label,
  .c3-axis > .c3-axis-x-label,
  .c3-chart > .c3-chart-arcs > .c3-chart-arc > .c3-gauge-value {
    fill: #8b949e;
  }
  .c3-ygrids > .c3-ygrid {
    stroke: #30363d;
  }
  .c3-legend-item > text {
    fill: #8b949e;
  }
  .c3-legend-item.c3-legend-item-hidden > * {
    opacity: 0.3;
  }
}
`

export default Chart;
