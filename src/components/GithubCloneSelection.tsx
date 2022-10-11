import React from 'react';
import Box from '@mui/material/Box';
import TabMenu from './TabMenu';
import { repositoryContext } from '../contexts/repository';
import GithubClipboardCopy from './GithubClipboardCopy';

const Menus = [
  {
    name: 'HTTPS',
    menuId: 0,
    icon: null,
    keyName: 'clone_url',
    subtitle: 'Use Git or checkout with SVN using the web URL.'
  },
  {
    name: 'SSH',
    menuId: 1,
    icon: null,
    keyName: 'ssh_url',
    subtitle: 'Use a password-protected SSH key.'
  },
  {
    name: 'Github CLI',
    menuId: 2,
    icon: null,
    keyName: 'git_url',
    subtitle: 'Work fast with our official CLI. Learn more.'
  }
]

const GithubCloneSelection = (props: any) => {
  const [ menuId, setMenuId ] = React.useState(0);
  const [ copyText, setCopyText ] = React.useState('');

  const {
    state: {
      repository
    }
  } = React.useContext(repositoryContext);

  React.useEffect(() => {
    if (repository[Menus[menuId].keyName] !== undefined) {
      setCopyText(repository[Menus[menuId].keyName]);
    }
  }, [
    repository,
    menuId
  ])

  return (
    <Box mt={1}>
      <TabMenu
        menus={Menus}
        value={menuId}
        onChange={(val: number) => setMenuId(val)}
      />
      <GithubClipboardCopy
        copyText={copyText}
      />
      <Box
        sx={{
          fontSize: 12,
          mt: 1,
          color: '#8b949e'
        }}
      >
        {Menus[menuId].subtitle}
      </Box>
    </Box>
  )
}

export default GithubCloneSelection;
