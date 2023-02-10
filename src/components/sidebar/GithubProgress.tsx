import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CircleIcon from '@mui/icons-material/Circle';
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import ProgressWrapper from '../ui/ProgressWrapper';
import ProgressChildren from '../ui/ProgressChildren';
import ProgressLabelWrapper from '../ui/ProgressLabelWrapper';
import ProgressLabelChildren from '../ui/ProgressLabelChildren';
import { PersonalDataContextItemSkill } from '../../contexts/personalData';

interface GithubProgressProps {
  items: PersonalDataContextItemSkill['items']
}
const GithubProgress: React.FC<GithubProgressProps> = (props) => {
  const {
    items
  } = props;

  const TotalValues = React.useMemo(() => {
    return items.reduce((prev, current) => prev + current.value, 0)
  }, [
    items
  ])

  return (
    <>
      <Box className="github-progress">
        <ProgressWrapper>
          {items.map((item, index) => {
            return (
              <Tooltip
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 400 }}
                title={item.label + " " + item.value + "y"}
                placement="top-start"
                key={index}
              >
                <ProgressChildren
                  sx={{
                    background: item.colorHex,
                    width: ((item.value / TotalValues) * 100) + "%",
                  }}
                />
              </Tooltip>
            )
          })}
        </ProgressWrapper>
        <ProgressLabelWrapper>
          {items.map((item, index) => {
            return (
              <ProgressLabelChildren key={index}>
                <Grid
                  item
                  component={CircleIcon}
                  className="github-progress-label-children-symbol"
                  sx={{ color: item.colorHex }}
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
              </ProgressLabelChildren>
            )
          })}
        </ProgressLabelWrapper>
      </Box>
    </>
  )
}

export default GithubProgress;
