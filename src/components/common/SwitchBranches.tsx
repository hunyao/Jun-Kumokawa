import { CheckSvg, SearchSvg, XmarkSvg } from '@icons/index';
import type { Endpoints } from '@octokit/types';
import {
  GithubBranchDropdownButton,
  GithubTab,
  GithubTabItem,
} from '@ui/index';
import { filterByText } from '@utils/index';
import { type FC, type HTMLAttributes, useState } from 'react';

type SwitchBranchesProps = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  defaultBranch: string;
  branches: Endpoints['GET /repos/{owner}/{repo}/branches']['response']['data'];
  tags: Endpoints['GET /repos/{owner}/{repo}/tags']['response']['data'];
  value: string;
  onChange?: (_newBranch: string) => void;
};
export const SwitchBranches: FC<SwitchBranchesProps> = (props) => {
  const {
    defaultBranch,
    branches,
    tags,
    value,
    onChange = () => {},
    className,
    ...rest
  } = props;
  const [tab, setTab] = useState(1);

  const [searchingText, setSearchingText] = useState('');

  return (
    <div className={['dropdown', className].join(' ')} {...rest}>
      <GithubBranchDropdownButton
        tabIndex={0}
        role='button'
        className='!w-full'
      >
        {value}
      </GithubBranchDropdownButton>
      <div
        // biome-ignore lint/a11y/noNoninteractiveTabindex: Because they do same thing in an example on their website
        tabIndex={0}
        className='dropdown-content z-1 grid max-h-96 w-80 grid-cols-1 grid-rows-[min-content_min-content_minmax(0,1fr)] rounded-xl border-[1px] border-base-content/10 bg-base-300 shadow-sm'
      >
        <div className='flex items-center justify-between p-2'>
          <span className='font-bold text-sm'>Switch branches/tags</span>
          <XmarkSvg className='h-4 w-4 fill-current' />
        </div>
        <div className='border-base-content/10 border-b-[1px] p-2'>
          <label className='input rounded-lg'>
            <SearchSvg className='h-4 w-4 fill-current' />
            <input
              type='search'
              className='grow'
              placeholder='Find a branch...'
              value={searchingText}
              onChange={(e) => setSearchingText(e.target.value)}
            />
          </label>
        </div>
        <div className='grid grid-cols-1 grid-rows-[min-content_minmax(0,1fr)] pt-2'>
          <GithubTab $variant='lift'>
            <GithubTabItem $active={tab === 1} onClick={setTab.bind(null, 1)}>
              Branches
            </GithubTabItem>
            <GithubTabItem $active={tab === 2} onClick={setTab.bind(null, 2)}>
              Tags
            </GithubTabItem>
          </GithubTab>
          <ul className='overflow-y-auto'>
            {tab === 1 &&
              filterByText(branches, 'name', searchingText).map((branch) => (
                <li
                  key={branch.name}
                  className='flex items-center gap-1 rounded-lg p-2 text-sm hover:cursor-pointer hover:bg-base-content/10'
                  onClick={() => onChange(branch.name)}
                  aria-hidden='true'
                >
                  <CheckSvg
                    className={[
                      'h-4 w-4',
                      value === branch.name
                        ? 'fill-current'
                        : 'fill-transparent',
                    ].join(' ')}
                  />
                  <span className='flex-1 truncate'>{branch.name}</span>
                  {defaultBranch === branch.name && (
                    <span className='rounded-full border-[1px] border-base-content/10 px-1 text-xs'>
                      default
                    </span>
                  )}
                </li>
              ))}
            {tab === 2 &&
              filterByText(tags, 'name', searchingText).map((tag) => (
                <li
                  key={tag.name}
                  className='flex items-center gap-1 rounded-lg p-2 text-sm hover:cursor-pointer hover:bg-base-content/10'
                  onClick={() => onChange(tag.name)}
                  aria-hidden='true'
                >
                  <CheckSvg
                    className={[
                      'h-4 w-4',
                      value === tag.name ? 'fill-current' : 'fill-transparent',
                    ].join(' ')}
                  />
                  <span className='flex-1 truncate'>{tag.name}</span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
