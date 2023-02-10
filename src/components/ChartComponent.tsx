import React from 'react';
import C3 from 'c3';
import Chart from './ui/Chart'
import { SxProps } from '@mui/system'

interface ChartComponentProps {
  rows: C3.PrimitiveArray[],
  colors: { [key: string]: string }
  type: C3.ChartType,
  sx: SxProps
}
const ChartComponent: React.FC<ChartComponentProps> = (props) => {
  const ref = React.createRef<HTMLDivElement>();
  let chart = React.useRef<C3.ChartAPI>();
  const [ init, setInit ] = React.useState<boolean>(true);
  const {
    rows: [
      labels,
      data
    ],
    colors,
    type,
    ...rest
  } = props;

  React.useEffect(() => {
    if (ref && ref.current) {
      chart.current = C3.generate({
        bindto: ref.current,
        padding: {
          top: 10
        },
        data: {
          rows: [
            labels,
            data
          ],
          type: type,
          colors: colors
        },
        bar: {
          width: {
            ratio: 0.5
          }
        },
        tooltip: {
          show: true,
          grouped: false,
          contents(d, defaultTitleFormat, defaultValueFormat, color) {
            const [
              {
                value,
                id
              }
            ] = d;
            return '<div style="background: gray; padding: 5px; color: white; border-radius: 6px;">' + value + ' years of experience for ' + id + '</div>'
          },
        },
        axis: {
          y: {
            label: {
              text: 'Years of experience',
              position: 'outer-middle'
            }
          },
          x: {
            show: false
          }
        },
        grid: {
          y: {
            show: true
          }
        }
      });
      setInit(false);

      return () => {
        if (chart.current) {
          chart.current.destroy();
        }
      }
    }
  }, [])

  React.useEffect(() => {
    if (!init && chart.current) {
      chart.current.transform(type)
    }
  }, [
    type,
    init
  ])
  React.useEffect(() => {
    if (!init && chart.current) {
      chart.current.load({
        rows: [
          labels,
          data
        ],
        colors: colors,
        type: type,
        unload: [
          ...chart.current.data().map(item => item.id) as string[]
        ]
      })
    }
  }, [
    colors,
    type,
    data,
    init,
    labels
  ])

  return <Chart ref={ref} {...rest} />
}

export default ChartComponent;
