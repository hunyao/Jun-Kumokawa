import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import C3 from 'c3';
import { styled } from '@mui/material/styles';

import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

import { skills, groupedSkills, groupList } from '../../data/Skills'

import GithubMenuButton from '../../components/GithubMenuButton'

const Chart = styled(React.forwardRef(({className, ...rest}: any, ref) => {
  return <div className={className + " c3-chart"} ref={ref} {...rest} />
}))`
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

const GithubNavMenu = styled(({className, ...rest}: any) => (
  <Paper component="nav" className={className + " github-nav-menu"} {...rest} />
))`
& {
  border-radius: 6px;
  padding: 1px;
}
& + & {
  margin-top: 8px;
}
`
const GithubNavMenuListItem = styled(({className, ...rest}: any) => (
  <ListItem disablePadding className={className + " github-nav-menu-list-item"} {...rest} />
))`
& {
  background: #0d1117;
  margin: 1px;
  width: calc(100% - 2px);
  color: #c9d1d9;
  line-height: 1.5;
}
& > .MuiListItemButton-root {
  line-height: 1.5;
  text-transform: capitalize;
}
&.selected {
  background: transparent;
}
&.selected:before {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 2px;
  content: "";
  background-color: #f78166;
}
`

const ChartComponent = (props: any) => {
  const ref = React.createRef<HTMLDivElement>();
  let chart = React.useRef<C3.ChartAPI>();
  const [ init, setInit ] = React.useState(true);
  const {
    rows: [
      labels,
      data
    ],
    colors,
    type,
    groupName,
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
                name
              }
            ] : any = d;
            return '<div style="background: gray; padding: 5px; color: white; border-radius: 6px;">' + value + ' years of experience for ' + name + '</div>'
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
    groupName,
    colors,
    type,
    data,
    init,
    labels
  ])

  return <Chart ref={ref} {...rest} />
}

const Skill = () => {
  const [ selectedMenu, setSelectedMenu ] = React.useState<string>("All Technologies");
  const [ selectedChartType, setSelectedCartType ] = React.useState<string>("bar");

  const selectedItems = React.useMemo(() => {
    if (selectedMenu === 'All Technologies') {
      return skills;
    } else {
      return groupedSkills[selectedMenu];
    }
  }, [
    selectedMenu
  ])

  return (
    <>
      <Grid
        container
        flexWrap="nowrap"
        gap={2}
        mt={2}
      >
        <Grid
          item
          xs={3}
        >
          <Box
            top={16}
          >
            <GithubNavMenu>
              <List disablePadding>
                <GithubNavMenuListItem
                  className={'All Technologies' === selectedMenu ? 'selected': ''}
                  onClick={() => setSelectedMenu('All Technologies')}
                >
                  <ListItemButton
                    component={Button}
                  >
                    All Technologies
                  </ListItemButton>
                </GithubNavMenuListItem>
                {groupList.map(([ groupName ], index) => (
                  <GithubNavMenuListItem
                    className={groupName === selectedMenu ? 'selected': ''}
                    onClick={() => setSelectedMenu(groupName)}
                    key={index}
                  >
                    <ListItemButton
                      component={Button}
                    >
                      {groupName}
                    </ListItemButton>
                  </GithubNavMenuListItem>
                ))}
              </List>
            </GithubNavMenu>
          </Box>
        </Grid>
        <Grid
          item
          container
          xs={9}
          flexDirection="column"
        >
          <Grid
            item
            container
            flex={0}
            sx={{
              borderBottom: '1px solid #21262d',
              lineHeight: 1.5
            }}
            pt={1}
            pb={1}
            m={0}
            mb={2}
          >
            <Grid
              item
              component="h2"
            >
              {selectedMenu}
            </Grid>
            <Grid
              item
              ml="auto"
            >
              <GithubMenuButton
                menuItems={[
                  {
                    value: "bar",
                    text: "Bar"
                  },
                  {
                    value: "pie",
                    text: "Pie"
                  },
                  {
                    value: "donut",
                    text: "Donut"
                  },
                ]}
                onChange={(selectedItem: any) => setSelectedCartType(selectedItem)}
                value={selectedChartType}
                subheader="Chart Type"
                buttonText={"Type: " + selectedChartType}
              />
            </Grid>
          </Grid>
          <ChartComponent
            groupName={selectedMenu}
            type={selectedChartType}
            rows={[
              selectedItems.map(skill => skill.label),
              selectedItems.map(skill => skill.value)
            ]}
            colors={
              Object.fromEntries(selectedItems.map(skill => ([ skill.label, skill.color ])))
            }
            sx={{
              flex: "auto"
            }}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default Skill;
