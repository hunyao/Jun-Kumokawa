import React from 'react';
import Box from '@mui/material/Box';
import GithubClipboardCopyBase from './ui/GithubClipboardBase'
import CopyIcon from '../assets/svgs/svg-copy';
import CheckIcon from '@mui/icons-material/Check';
import SvgIcon from '@mui/material/SvgIcon';

const GithubClipboardCopy = (props: any) => {
  const {
    copyText
  } = props;

  const defaultIcon = React.useMemo(() => {
    return <SvgIcon viewBox="0 0 16 16" component={CopyIcon} />
  }, [])
  const afterClickedIcon = React.useMemo(() => {
    return <SvgIcon component={CheckIcon} sx={{color: '#238636'}} />
  }, [])

  const [ clicked, setClicked ] = React.useState(false);
  const [ icon, setIcon ] = React.useState(defaultIcon);

  const onClickInput = (e: any) => {
    e.target.select();
  }

  const onClickButton = () => {
    navigator.clipboard.writeText(copyText)
    setClicked(true);
  }

  React.useEffect(() => {
    if (clicked) {
      setIcon(afterClickedIcon);
      setTimeout(() => {
        setIcon(defaultIcon)
        setClicked(false)
      }, 3000)
    }
  }, [
    clicked,
    afterClickedIcon,
    defaultIcon
  ])

  return (
    <Box py={1}>
      <GithubClipboardCopyBase
        inputBaseProps={{
          value: copyText,
          onClick: onClickInput
        }}
        buttonProps={{
          onClick: onClickButton,
          children: icon
        }}
      />
    </Box>
  )
}

export default GithubClipboardCopy;
