import React from 'react';
import Box from '@mui/material/Box';
import TabMenu from './TabMenu';
import { repositoryContext } from '../contexts/repository';
import GithubClipboardCopy from './GithubClipboardCopy';

type GithubCloneMenu = {
  name: 'HTTPS' | 'SSH' | 'Github CLI',
  menuId: number,
  keyName: 'clone_url' | 'ssh_url' | 'git_url',
  subtitle: string
}
const Menus: Array<GithubCloneMenu> = [
  {
    name: 'HTTPS',
    menuId: 0,
    keyName: 'clone_url',
    subtitle: 'Use Git or checkout with SVN using the web URL.'
  },
  {
    name: 'SSH',
    menuId: 1,
    keyName: 'ssh_url',
    subtitle: 'Use a password-protected SSH key.'
  },
  {
    name: 'Github CLI',
    menuId: 2,
    keyName: 'git_url',
    subtitle: 'Work fast with our official CLI. Learn more.'
  }
]

const GithubCloneSelection = () => {
  const [ menuId, setMenuId ] = React.useState<number>(0);
  const [ copyText, setCopyText ] = React.useState<string>('');

  const {
    state: {
      repository
    }
  } = React.useContext(repositoryContext);

  React.useEffect(() => {
    if (repository === null) return;
    if (repository[Menus[menuId].keyName] !== undefined) {
      setCopyText(repository[Menus[menuId].keyName]);
    }
  }, [
    repository,
    menuId
  ])

  return (
    <Box
      mt={1}
      data-testid="github-clone-selection"
    >
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
