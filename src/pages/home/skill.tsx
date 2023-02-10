import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import { PersonalDataContext } from '../../contexts/personalData'
import GithubMenuButton from '../../components/GithubMenuButton'
import GithubNavMenu from '../../components/ui/GithubNavMenu'
import GithubNavMenuListItem from '../../components/ui/GithubNavMenuListItem'
import ChartComponent from '../../components/ChartComponent'
import C3 from 'c3';

const Skill = () => {
  const { skillGroupList, skillAllInOne } = React.useContext(PersonalDataContext);
  const [ selectedMenu, setSelectedMenu ] = React.useState<string>("All Technologies");
  const [ selectedChartType, setSelectedCartType ] = React.useState<C3.ChartType>("bar");

  const selectedItems = React.useMemo(() => {
    if (selectedMenu === 'All Technologies') {
      return skillAllInOne;
    } else {
      return skillAllInOne.filter(skill => skill.groupName === selectedMenu);
    }
  }, [
    selectedMenu,
    skillAllInOne,
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
                {skillGroupList.map(([ groupName ], index) => (
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
                onChange={(selectedItem) => setSelectedCartType(selectedItem)}
                value={selectedChartType}
                subheader="Chart Type"
                buttonText={"Type: " + selectedChartType}
              />
            </Grid>
          </Grid>
          <ChartComponent
            type={selectedChartType}
            rows={[
              selectedItems.map(skill => skill.label),
              selectedItems.map(skill => skill.value)
            ]}
            colors={
              Object.fromEntries(selectedItems.map(skill => ([ skill.label, skill.colorHex ])))
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
