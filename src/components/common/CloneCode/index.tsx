import { Trans, useLingui } from '@lingui/react/macro';
import { type CSSProperties, type HTMLAttributes, useState } from 'react';
import { CopyContentButton } from '#components/index';
import { CodeSvg, FolderZipSvg, HelpSvg, TerminalSvg } from '#icons/index';
import type { GetRepositoryResponseType } from '#types/octokitApi';
import {
  GithubButton,
  GithubDropdownButton,
  GithubTab,
  GithubTabItem,
} from '#ui/index';
import { type CLONE_CODE_TAB, CLONE_CODE_TABS } from './constants';

type CloneCodeProps = HTMLAttributes<HTMLDivElement> & {
  repository: GetRepositoryResponseType;
  branch: string;
  owner: string;
  repo: string;
};
export const CloneCode = (props: CloneCodeProps) => {
  const { repository, branch, owner, repo, ...rest } = props;
  const [tab, setTab] = useState<CLONE_CODE_TAB>(CLONE_CODE_TABS.HTTPS);

  const { t } = useLingui();

  const getUrl = () => {
    switch (tab) {
      case CLONE_CODE_TABS.HTTPS:
        return repository.clone_url;
      case CLONE_CODE_TABS.SSH:
        return repository.ssh_url;
      case CLONE_CODE_TABS.GITHUB:
        return `gh repo clone ${repository.full_name}`;
    }
  };
  const getDescription = () => {
    switch (tab) {
      case CLONE_CODE_TABS.HTTPS:
        return t`Clone using the web URL.`;
      case CLONE_CODE_TABS.SSH:
        return t`Use a password-protected SSH key.`;
      case CLONE_CODE_TABS.GITHUB:
        return t`Work fast with our official CLI.`;
    }
  };

  const downloadURL = `https://github.com/${owner}/${repo}/archive/refs/heads/${branch}.zip`;

  return (
    <div className={['dropdown dropdown-end', rest.className].join(' ')}>
      <GithubDropdownButton
        style={{ '--github-button-bg': '#238636' } as CSSProperties}
        className='ml-auto text-white'
        tabIndex={0}
      >
        <CodeSvg className='h-4 w-4 fill-current' />
        <Trans context='clonecode'>Code</Trans>
      </GithubDropdownButton>
      <div
        // biome-ignore lint/a11y/noNoninteractiveTabindex: reason
        tabIndex={0}
        className='dropdown-content z-1 rounded-xl border-[1px] border-base-content/20 bg-base-300 p-2 shadow-sm'
      >
        <div className='border-base-content/20 border-b-[1px] p-2'>
          <div className='flex items-center gap-2'>
            <TerminalSvg className='h-4 w-4 fill-current' />
            <Trans>Clone</Trans>
            <div
              className='tooltip ml-auto'
              data-tip={t`Which remote URL should I use?`}
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
                $active={tab === CLONE_CODE_TABS.HTTPS}
                onClick={() => setTab(CLONE_CODE_TABS.HTTPS)}
              >
                HTTPS
              </GithubTabItem>
              <GithubTabItem
                $active={tab === CLONE_CODE_TABS.SSH}
                onClick={() => setTab(CLONE_CODE_TABS.SSH)}
              >
                SSH
              </GithubTabItem>
              <GithubTabItem
                $active={tab === CLONE_CODE_TABS.GITHUB}
                onClick={() => setTab(CLONE_CODE_TABS.GITHUB)}
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
          <a href={downloadURL} target='_blank' rel='noreferrer'>
            <GithubButton $variant='ghost' className='text-sm'>
              <FolderZipSvg className='h-4 w-4 fill-current' />
              <Trans>Download ZIP</Trans>
            </GithubButton>
          </a>
        </div>
      </div>
    </div>
  );
};
