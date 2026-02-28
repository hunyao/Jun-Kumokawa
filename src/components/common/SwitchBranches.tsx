import { CheckSvg, SearchSvg, XmarkSvg } from '@icons/index';
import type { Endpoints } from '@octokit/types';
import {
  GithubBranchDropdownButton,
  GithubTab,
  GithubTabItem,
} from '@ui/index';
import { filterByText } from '@utils/index';
import {
  type HTMLAttributes,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

type SwitchBranchesProps = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  defaultBranch: string;
  branches: Endpoints['GET /repos/{owner}/{repo}/branches']['response']['data'];
  tags: Endpoints['GET /repos/{owner}/{repo}/tags']['response']['data'];
  value: string;
  onChange?: (_newBranch: string) => void;
};
export const SwitchBranches = (props: SwitchBranchesProps) => {
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
  const [isOpen, setIsOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuStyle, setMenuStyle] = useState<{
    top: number;
    left: number;
  } | null>(null);

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
        {value}
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
              <span className='font-bold text-sm'>Switch branches/tags</span>
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
                  placeholder='Find a branch...'
                  value={searchingText}
                  onChange={(e) => setSearchingText(e.target.value)}
                />
              </label>
            </div>
            <div className='grid grid-cols-1 grid-rows-[min-content_minmax(0,1fr)] pt-2'>
              <GithubTab $variant='lift'>
                <GithubTabItem
                  $active={tab === 1}
                  onClick={setTab.bind(null, 1)}
                >
                  Branches
                </GithubTabItem>
                <GithubTabItem
                  $active={tab === 2}
                  onClick={setTab.bind(null, 2)}
                >
                  Tags
                </GithubTabItem>
              </GithubTab>
              <ul className='overflow-y-auto'>
                {tab === 1 &&
                  filterByText(branches, 'name', searchingText).map(
                    (branch) => (
                      <li key={branch.name} className='rounded-lg'>
                        <button
                          type='button'
                          className='flex w-full items-center gap-1 rounded-lg p-2 text-left text-sm hover:bg-base-content/10'
                          onClick={() => {
                            onChange(branch.name);
                            setIsOpen(false);
                          }}
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
                        </button>
                      </li>
                    ),
                  )}
                {tab === 2 &&
                  filterByText(tags, 'name', searchingText).map((tag) => (
                    <li key={tag.name} className='rounded-lg'>
                      <button
                        type='button'
                        className='flex w-full items-center gap-1 rounded-lg p-2 text-left text-sm hover:bg-base-content/10'
                        onClick={() => {
                          onChange(tag.name);
                          setIsOpen(false);
                        }}
                      >
                        <CheckSvg
                          className={[
                            'h-4 w-4',
                            value === tag.name
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
