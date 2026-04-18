import { Trans, useLingui } from '@lingui/react/macro';
import {
  type CSSProperties,
  type HTMLAttributes,
  useDeferredValue,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router';
import { FileSvg, SearchSvg } from '#icons/index';
import { octokit } from '#lib/index';
import { genTreePath } from '#utils/index';

type TreeItem = {
  path: string;
  type?: string;
};

type GoToFileProps = HTMLAttributes<HTMLDivElement> & {
  owner: string;
  repo: string;
  branch: string;
};

export const GoToFile = (props: GoToFileProps) => {
  const { owner, repo, branch, className, ...rest } = props;
  const navigate = useNavigate();
  const anchorRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [menuStyle, setMenuStyle] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const [searchingText, setSearchingText] = useState('');
  const deferredSearchingText = useDeferredValue(searchingText);
  const [files, setFiles] = useState<Array<TreeItem>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const { t } = useLingui();

  useLayoutEffect(() => {
    if (!isOpen || !anchorRef.current) return;
    const rect = anchorRef.current.getBoundingClientRect();
    setMenuStyle({
      top: rect.bottom,
      left: rect.left,
    });
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || files.length > 0) return;
    let cancelled = false;
    const load = async () => {
      try {
        setIsLoading(true);
        setHasError(false);
        const { data } = await octokit.rest.git.getTree({
          owner,
          repo,
          tree_sha: branch,
          recursive: '1',
        });
        if (!cancelled) {
          setFiles(
            data.tree.filter((item) => item.path && item.type === 'blob'),
          );
        }
      } catch {
        if (!cancelled) {
          setHasError(true);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [isOpen, files.length, owner, repo, branch]);

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

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 't' || event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }

      const target = event.target;
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement ||
        (target instanceof HTMLElement && target.isContentEditable)
      ) {
        return;
      }

      event.preventDefault();
      inputRef.current?.focus();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const normalizedQuery = deferredSearchingText.toLowerCase();
  const filteredFiles = files
    .filter((item) => item.path)
    .filter((item) => {
      return normalizedQuery === ''
        ? true
        : item.path?.toLowerCase().includes(normalizedQuery);
    })
    .slice(0, 50);

  useEffect(() => {
    if (searchingText === '') {
      setIsOpen(false);
      setHighlightedIndex(0);
      return;
    }
    setIsOpen(true);
  }, [searchingText]);

  const moveToFile = (path: string) => {
    navigate({
      pathname: genTreePath(owner, repo),
      search: new URLSearchParams({
        branch,
        path,
        mode: 'blob',
      }).toString(),
    });
    setIsOpen(false);
    setSearchingText('');
  };

  const blurInput = () => {
    inputRef.current?.blur();
  };

  return (
    <div className={className} ref={anchorRef} {...rest}>
      <label className='input min-w-72 rounded-lg'>
        <SearchSvg className='h-4 w-4 fill-current' />
        <input
          ref={inputRef}
          type='search'
          className='grow'
          placeholder={t`Go to file`}
          value={searchingText}
          onChange={(e) => {
            setSearchingText(e.target.value);
            setHighlightedIndex(0);
          }}
          onKeyDown={(event) => {
            if (!isOpen || filteredFiles.length === 0) {
              if (event.key === 'Escape') {
                setSearchingText('');
                setIsOpen(false);
                blurInput();
              }
              return;
            }

            if (event.key === 'ArrowDown') {
              event.preventDefault();
              setHighlightedIndex((prev) =>
                prev + 1 < filteredFiles.length ? prev + 1 : 0,
              );
            }

            if (event.key === 'ArrowUp') {
              event.preventDefault();
              setHighlightedIndex((prev) =>
                prev - 1 >= 0 ? prev - 1 : filteredFiles.length - 1,
              );
            }

            if (event.key === 'Enter') {
              event.preventDefault();
              const selected = filteredFiles[highlightedIndex];
              if (selected?.path) {
                moveToFile(selected.path);
              }
            }

            if (event.key === 'Escape') {
              setIsOpen(false);
              blurInput();
            }
          }}
        />
        <span className='kbd'>t</span>
      </label>
      {isOpen &&
        menuStyle &&
        createPortal(
          <div
            ref={menuRef}
            className='z-50 max-h-96 w-[32rem] overflow-y-auto rounded-xl border-[1px] border-base-content/10 bg-base-300 shadow-sm'
            style={
              {
                position: 'fixed',
                top: menuStyle.top,
                left: menuStyle.left,
              } as CSSProperties
            }
          >
            <ul className='p-2'>
              {isLoading && (
                <li className='p-2 text-base-content/60 text-sm'>
                  <Trans>Loading files...</Trans>
                </li>
              )}
              {hasError && !isLoading && (
                <li className='p-2 text-error text-sm'>
                  <Trans>Failed to load files.</Trans>
                </li>
              )}
              {!isLoading &&
                !hasError &&
                filteredFiles.map((item) => (
                  <li key={item.path} className='rounded-lg'>
                    <button
                      type='button'
                      className={[
                        'flex w-full items-center gap-2 rounded-lg p-2 text-left text-sm hover:bg-base-content/10',
                        filteredFiles[highlightedIndex]?.path === item.path
                          ? 'bg-base-content/10'
                          : '',
                      ].join(' ')}
                      onClick={() => {
                        if (!item.path) return;
                        moveToFile(item.path);
                      }}
                      onMouseEnter={() =>
                        setHighlightedIndex(filteredFiles.indexOf(item))
                      }
                    >
                      <FileSvg className='h-4 w-4 fill-current' />
                      <span className='truncate'>{item.path}</span>
                    </button>
                  </li>
                ))}
              {!isLoading && !hasError && filteredFiles.length === 0 && (
                <li className='p-2 text-base-content/60 text-sm'>
                  <Trans>No files found.</Trans>
                </li>
              )}
            </ul>
          </div>,
          document.body,
        )}
    </div>
  );
};
