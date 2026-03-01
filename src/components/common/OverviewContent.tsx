import { BookSvg } from '@icons/index';
import { md, octokit } from '@lib/index';
import type { Endpoints } from '@octokit/types';
import { GithubTab, GithubTabItem } from '@ui/index';
import { b64ToUtf8 } from '@utils/index';
import DOMPurify from 'dompurify';
import { useEffect, useState } from 'react';
import styles from './OverviewContent.module.scss';

type RepositoryContentResponse =
  Endpoints['GET /repos/{owner}/{repo}/contents/{path}']['response']['data'];
type ReadmeFile = {
  name: string;
  path: string;
};

const isReadmeFile = (name: string) => /^README/i.test(name);
const directoryPathFromSearchPath = (path: string) => path.replace(/^\//, '');
const sortReadmeFiles = (a: ReadmeFile, b: ReadmeFile) => {
  const getScore = (name: string) => {
    const lower = name.toLowerCase();
    if (lower === 'readme.md') return 0;
    if (lower === 'readme') return 1;
    return 2;
  };
  const scoreDiff = getScore(a.name) - getScore(b.name);
  if (scoreDiff !== 0) return scoreDiff;
  return a.name.localeCompare(b.name);
};

type OverviewContentProps = {
  owner: string;
  repo: string;
  path: string;
  branch: string;
};
export const OverviewContent = (props: OverviewContentProps) => {
  const { owner, repo, path, branch } = props;
  const [contents, setContents] = useState<Record<string, RepositoryContentResponse>>({});
  const [readmeFiles, setReadmeFiles] = useState<Array<ReadmeFile>>([]);
  const [activeReadmePath, setActiveReadmePath] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasReadme, setHasReadme] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        setIsLoading(true);
        setHasReadme(null);
        setContents({});
        setReadmeFiles([]);
        setActiveReadmePath('');

        const { data } = await octokit.rest.repos.getContent({
          owner,
          repo,
          path: directoryPathFromSearchPath(path),
          ref: branch,
        });

        if (!Array.isArray(data)) {
          if (!cancelled) {
            setHasReadme(false);
          }
          return;
        }

        const files = data
          .filter((item) => item.type === 'file' && isReadmeFile(item.name))
          .map((item) => ({ name: item.name, path: item.path }))
          .sort(sortReadmeFiles);

        if (files.length === 0) {
          if (!cancelled) {
            setHasReadme(false);
          }
          return;
        }

        const entries = await Promise.all(
          files.map(async (file) => {
            const response = await octokit.rest.repos.getContent({
              owner,
              repo,
              path: file.path,
              ref: branch,
            });
            return [file.path, response.data] as const;
          }),
        );

        if (!cancelled) {
          setHasReadme(true);
          setReadmeFiles(files);
          setActiveReadmePath(files[0].path);
          setContents(Object.fromEntries(entries));
        }
      } catch {
        if (!cancelled) {
          setHasReadme(false);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [owner, repo, path, branch]);

  if (hasReadme === false) return null;
  const activeContent = contents[activeReadmePath];
  const activeFileContent =
    activeContent && !Array.isArray(activeContent) && activeContent.type === 'file'
      ? activeContent
      : undefined;
  if (!isLoading && !activeFileContent) {
    return null;
  }

  return (
    <div className='rounded-lg ring ring-base-content/20'>
      <div className='sticky top-0 rounded-lg border-base-content/20 border-b-[1px] bg-base-100 p-2 pb-0'>
        <GithubTab $variant='border'>
          {readmeFiles.map((file) => (
            <GithubTabItem
              key={file.path}
              $active={activeReadmePath === file.path}
              onClick={() => setActiveReadmePath(file.path)}
            >
              <BookSvg className='h-6 w-6 fill-current' />
              {file.name}
            </GithubTabItem>
          ))}
        </GithubTab>
      </div>
      {isLoading && (
        <div>
          <div className='skeleton h-4 w-full'></div>
          <div className='skeleton h-4 w-full'></div>
          <div className='skeleton h-4 w-full'></div>
          <div className='skeleton h-4 w-full'></div>
          <div className='skeleton h-4 w-full'></div>
        </div>
      )}
      {!isLoading && activeFileContent !== undefined && (
        <div
          className={styles.overview}
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Because it is just html of markdown
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
              md.render(b64ToUtf8(activeFileContent.content)),
            ),
          }}
        />
      )}
    </div>
  );
};
