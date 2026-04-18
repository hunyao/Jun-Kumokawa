import { Trans, useLingui } from '@lingui/react/macro';
import type { Endpoints } from '@octokit/types';
import {
  type HTMLAttributes,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { useLocation, useNavigate, useSearchParams } from 'react-router';
import { useSortBranch } from '#hooks/index';
import { CheckSvg, SearchSvg, XmarkSvg } from '#icons/index';
import {
  GithubBranchDropdownButton,
  GithubTab,
  GithubTabItem,
} from '#ui/index';
import { filterByText, overrideSearchParams } from '#utils/index';

const TAB_BRANCH = 1;
const TAB_TAG = 2;
type SwitchBranchesProps = HTMLAttributes<HTMLDivElement> & {
  defaultBranch: string;
  branches: Endpoints['GET /repos/{owner}/{repo}/branches']['response']['data'];
  tags: Endpoints['GET /repos/{owner}/{repo}/tags']['response']['data'];
  value: string;
};
export const SwitchBranches = (props: SwitchBranchesProps) => {
  const { defaultBranch, branches, tags, value, className, ...rest } = props;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [tab, setTab] = useState(TAB_BRANCH);
  const sortedBranches = useSortBranch(branches, defaultBranch);

  const { t } = useLingui();

  const [searchingText, setSearchingText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuStyle, setMenuStyle] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const getRefName = () => {
    const ref = [...branches, ...tags].find(
      (item) => item.commit.sha === value,
    );
    return ref === undefined ? '' : ref.name;
  };

  const onChangeBranch = (
    type: 'branch' | 'tag',
    _branch: string,
    _sha: string,
  ) => {
    navigate(
      `${location.pathname}?${overrideSearchParams(searchParams, {
        ref: `${type[0]}/${_branch}`,
        sha: _sha,
      }).toString()}`,
    );
  };

  useLayoutEffect(() => {
    if (!isOpen || !anchorRef.current) return;
    const rect = anchorRef.current.getBoundingClientRect();
    setMenuStyle({
      top: rect.bottom,
      left: rect.left,
    });
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        anchorRef.current?.contains(target) ||
        menuRef.current?.contains(target)
      ) {
        return;
      }
      setIsOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    const onReposition = () => {
      if (!anchorRef.current) return;
      const rect = anchorRef.current.getBoundingClientRect();
      setMenuStyle({
        top: rect.bottom,
        left: rect.left,
      });
    };
    window.addEventListener('scroll', onReposition, true);
    window.addEventListener('resize', onReposition);
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('scroll', onReposition, true);
      window.removeEventListener('resize', onReposition);
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  return (
    <div className={className} ref={anchorRef} {...rest}>
      <GithubBranchDropdownButton
        type='button'
        className='!w-full'
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {getRefName()}
      </GithubBranchDropdownButton>
      {isOpen &&
        menuStyle &&
        createPortal(
          <div
            ref={menuRef}
            className='z-50 grid max-h-96 w-80 grid-cols-1 grid-rows-[min-content_min-content_minmax(0,1fr)] rounded-xl border-[1px] border-base-content/10 bg-base-300 shadow-sm'
            style={{
              position: 'fixed',
              top: menuStyle.top,
              left: menuStyle.left,
            }}
          >
            <div className='flex items-center justify-between p-2'>
              <span className='font-bold text-sm'>
                <Trans>Switch branches/tags</Trans>
              </span>
              <button
                type='button'
                className='p-1'
                onClick={() => setIsOpen(false)}
                aria-label='Close branch selector'
              >
                <XmarkSvg className='h-4 w-4 fill-current' />
              </button>
            </div>
            <div className='border-base-content/10 border-b-[1px] p-2'>
              <label className='input rounded-lg'>
                <SearchSvg className='h-4 w-4 fill-current' />
                <input
                  type='search'
                  className='grow'
                  placeholder={t`Find a branch...`}
                  value={searchingText}
                  onChange={(e) => setSearchingText(e.target.value)}
                />
              </label>
            </div>
            <div className='grid grid-cols-1 grid-rows-[min-content_minmax(0,1fr)] pt-2'>
              <GithubTab $variant='lift'>
                <GithubTabItem
                  $active={tab === TAB_BRANCH}
                  onClick={setTab.bind(null, TAB_BRANCH)}
                >
                  <Trans>Branches</Trans>
                </GithubTabItem>
                <GithubTabItem
                  $active={tab === TAB_TAG}
                  onClick={setTab.bind(null, TAB_TAG)}
                >
                  <Trans>Tags</Trans>
                </GithubTabItem>
              </GithubTab>
              <ul className='overflow-y-auto px-2'>
                {tab === TAB_BRANCH &&
                  filterByText(sortedBranches, 'name', searchingText).map(
                    (branch) => (
                      <li key={branch.name} className='my-2 rounded-lg'>
                        <button
                          type='button'
                          className='flex w-full items-center gap-1 rounded-lg p-2 text-left text-sm hover:bg-base-content/10'
                          onClick={() => {
                            onChangeBranch(
                              'branch',
                              branch.name,
                              branch.commit.sha,
                            );
                            setIsOpen(false);
                          }}
                        >
                          <CheckSvg
                            className={[
                              'h-4 w-4',
                              value === branch.commit.sha
                                ? 'fill-current'
                                : 'fill-transparent',
                            ].join(' ')}
                          />
                          <span className='flex-1 truncate'>{branch.name}</span>
                          {defaultBranch === branch.name && (
                            <span className='rounded-full border-[1px] border-base-content/10 px-1 text-xs'>
                              <Trans>default</Trans>
                            </span>
                          )}
                        </button>
                      </li>
                    ),
                  )}
                {tab === TAB_TAG &&
                  filterByText(tags, 'name', searchingText).map((tag) => (
                    <li key={tag.name} className='my-2 rounded-lg'>
                      <button
                        type='button'
                        className='flex w-full items-center gap-1 rounded-lg p-2 text-left text-sm hover:bg-base-content/10'
                        onClick={() => {
                          onChangeBranch('tag', tag.name, tag.commit.sha);
                          setIsOpen(false);
                        }}
                      >
                        <CheckSvg
                          className={[
                            'h-4 w-4',
                            value === tag.commit.sha
                              ? 'fill-current'
                              : 'fill-transparent',
                          ].join(' ')}
                        />
                        <span className='flex-1 truncate'>{tag.name}</span>
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
};
