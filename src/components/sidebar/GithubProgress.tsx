import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CircleIcon from '@mui/icons-material/Circle';
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import GithubProgressWrapper from '../ui/GithubProgressWrapper';
import GithubProgressChildren from '../ui/GithubProgressChildren';
import GithubProgressLabelWrapper from '../ui/GithubProgressLabelWrapper';
import GithubProgressLabelChildren from '../ui/GithubProgressLabelChildren';
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
      <Box
        className="github-progress"
        data-testid="github-progress"
      >
        <GithubProgressWrapper>
          {items.map((item, index) => {
            return (
              <Tooltip
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 400 }}
                title={item.label + " " + item.value + "y"}
                placement="top-start"
                key={index}
              >
                <GithubProgressChildren
                  sx={{
                    background: item.colorHex,
                    width: ((item.value / TotalValues) * 100) + "%",
                  }}
                  data-testid={"github-progress-children-" + index}
                />
              </Tooltip>
            )
          })}
        </GithubProgressWrapper>
        <GithubProgressLabelWrapper>
          {items.map((item, index) => {
            return (
              <GithubProgressLabelChildren
                key={index}
                data-testid={"github-progress-label-children-" + index}
              >
                <Grid
                  item
                  component={CircleIcon}
                  className="github-progress-label-children-symbol"
                  sx={{ color: item.colorHex }}
                  data-testid={"github-progress-label-children-icon-" + index}
                />
                <Grid
                  item
                  component="span"
                  data-testid={"github-progress-label-children-label-" + index}
                >
                  {item.label}
                </Grid>
                <Grid
                  item
                  component="span"
                  data-testid={"github-progress-label-children-value-" + index}
                >
                  {item.value}y
                </Grid>
              </GithubProgressLabelChildren>
            )
          })}
        </GithubProgressLabelWrapper>
      </Box>
    </>
  )
}

export default GithubProgress;
