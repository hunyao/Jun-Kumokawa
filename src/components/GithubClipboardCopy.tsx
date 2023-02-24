import React from 'react';
import Box from '@mui/material/Box';
import GithubClipboardCopyBase from './ui/GithubClipboardCopyBase'
import CopyIcon from '../assets/svgs/svg-copy';
import CheckIcon from '@mui/icons-material/Check';
import SvgIcon from '@mui/material/SvgIcon';

interface GithubClipboardCopyProps {
  copyText: string
}
const GithubClipboardCopy: React.FC<GithubClipboardCopyProps> = (props) => {
  const {
    copyText
  } = props;

  const defaultIcon = React.useMemo(() => {
    return <SvgIcon viewBox="0 0 16 16" component={CopyIcon} />
  }, [])
  const afterClickedIcon = React.useMemo(() => {
    return <SvgIcon component={CheckIcon} sx={{color: '#238636'}} />
  }, [])

  const [ clicked, setClicked ] = React.useState<boolean>(false);
  const [ icon, setIcon ] = React.useState<React.ReactElement>(defaultIcon);

  const onClickInput = (e: React.MouseEvent<HTMLInputElement>) => {
    (e.target as HTMLInputElement).select()
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
    <Box
      py={1}
      data-testid="github-clipboard-copy"
    >
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
