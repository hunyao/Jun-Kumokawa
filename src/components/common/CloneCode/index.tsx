import { CodeSvg, FolderZipSvg, HelpSvg, TerminalSvg } from '@icons/index';
import {
  GithubButton,
  GithubDropdownButton,
  GithubTab,
  GithubTabItem,
} from '@ui/index';
import { type CSSProperties, type HTMLAttributes, useState } from 'react';
import { CopyContentButton } from '@components/index';

type CLONE_CODE_TAB_HTTPS = 'https';
type CLONE_CODE_TAB_SSH = 'ssh';
type CLONE_CODE_TAB_GITHUB = 'github';
type CLONE_CODE_TAB =
  | CLONE_CODE_TAB_HTTPS
  | CLONE_CODE_TAB_SSH
  | CLONE_CODE_TAB_GITHUB;
type CloneCodeProps = HTMLAttributes<HTMLDivElement> & {
  https_url: string;
  ssh_url: string;
  github_url: string;
  branch: string;
  owner: string;
  repo: string;
};
export const CloneCode = (props: CloneCodeProps) => {
  const { https_url, ssh_url, github_url, branch, owner, repo, ...rest } =
    props;
  const [tab, setTab] = useState<CLONE_CODE_TAB>('https');

  const getUrl = () => {
    switch (tab) {
      case 'https':
        return https_url;
      case 'ssh':
        return ssh_url;
      case 'github':
        return github_url;
    }
  };
  const getDescription = () => {
    switch (tab) {
      case 'https':
        return 'Clone using the web URL.';
      case 'ssh':
        return 'Use a password-protected SSH key.';
      case 'github':
        return 'Work fast with our official CLI.';
    }
  };

  return (
    <div className={['dropdown dropdown-end', rest.className].join(' ')}>
      <GithubDropdownButton
        style={{ '--github-button-bg': '#238636' } as CSSProperties}
        className='ml-auto'
        tabIndex={0}
      >
        <CodeSvg className='h-4 w-4 fill-current' />
        Code
      </GithubDropdownButton>
      <div
        // biome-ignore lint/a11y/noNoninteractiveTabindex: reason
        tabIndex={0}
        className='dropdown-content z-1 rounded-xl border-[1px] border-base-content/20 bg-base-300 p-2 shadow-sm'
      >
        <div className='border-base-content/20 border-b-[1px] p-2'>
          <div className='flex items-center gap-2'>
            <TerminalSvg className='h-4 w-4 fill-current' />
            Clone
            <div
              className='tooltip ml-auto'
              data-tip='Which remote URL should I use?'
            >
              <a
                href='https://docs.github.com/articles/which-remote-url-should-i-use'
                target='_blank'
                rel='noreferrer'
              >
                <HelpSvg className='h-4 w-4 fill-current hover:fill-info' />
              </a>
            </div>
          </div>
          <div className='p-2'>
            <GithubTab $variant='border'>
              <GithubTabItem
                $active={tab === 'https'}
                onClick={setTab.bind(null, 'https')}
              >
                HTTPS
              </GithubTabItem>
              <GithubTabItem
                $active={tab === 'ssh'}
                onClick={setTab.bind(null, 'ssh')}
              >
                SSH
              </GithubTabItem>
              <GithubTabItem
                $active={tab === 'github'}
                onClick={setTab.bind(null, 'github')}
              >
                Github CLI
              </GithubTabItem>
            </GithubTab>
            <div className='flex items-center py-2'>
              <label className='input w-full rounded-lg'>
                <input
                  type='text'
                  className='w-72 grow'
                  readOnly
                  value={getUrl()}
                />
                <CopyContentButton content={getUrl()} />
              </label>
            </div>
            <div className='text-sm'>{getDescription()}</div>
          </div>
        </div>
        <div className='p-2'>
          <a
            href={`https://github.com/${owner}/${repo}/archive/refs/heads/${branch}.zip`}
            target='_blank'
            rel='noreferrer'
          >
            <GithubButton $variant='ghost' className='text-sm'>
              <FolderZipSvg className='h-4 w-4 fill-current' />
              Download ZIP
            </GithubButton>
          </a>
        </div>
      </div>
    </div>
  );
};
