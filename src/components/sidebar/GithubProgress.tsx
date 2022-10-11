import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CircleIcon from '@mui/icons-material/Circle';
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import ProgressWrappr from '../ui/ProgressWrappr';

const GithubProgress = (props: any) => {
  const {
    list
  } = props;

  const TotalValues = React.useMemo(() => {
    return list.reduce((prev: any, current: any) => prev + current.value, 0)
  }, [
    list
  ])

  return (
    <>
      <Box className="github-progress">
        <ProgressWrappr>
          {list.map((item: any, index: any) => {
            return (
              <Tooltip
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 400 }}
                title={item.label + " " + item.value + "y"}
                placement="top-start"
                key={index}
              >
                <Box
                  component="span"
                  sx={{
                    background: item.color,
                    width: ((item.value / TotalValues) * 100) + "%"
                  }}
                />
              </Tooltip>
            )
          })}
        </ProgressWrappr>
        <Box
          component="ul"
          p={0}
          gap={1}
          display="flex"
          flexWrap="wrap"
        >
          {list.map((item: any, index: any) => {
            return (
              <Grid
                container
                item
                key={index}
                component="li"
                display="inline-flex"
                alignItems="center"
                flex={0}
                spacing={0.5}
                flexWrap="nowrap"
                sx={{
                  listStyle: 'none',
                  fontSize: 12,
                  whiteSpace: 'nowrap'
                }}
              >
                <Grid
                  item
                  component={CircleIcon}
                  sx={{
                    height: 12,
                    width: 12,
                    color: item.color,
                  }}
                />
                <Grid
                  item
                  component="span"
                >
                  {item.label}
                </Grid>
                <Grid
                  item
                  component="span"
                >
                  {item.value}y
                </Grid>
              </Grid>
            )
          })}
        </Box>
      </Box>
    </>
  )
}

export default GithubProgress;
