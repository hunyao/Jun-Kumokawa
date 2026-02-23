import { BookSvg } from '@icons/index';
import { md, octokit } from '@lib/index';
import type { Endpoints } from '@octokit/types';
import { GithubTab, GithubTabItem } from '@ui/index';
import { b64ToUtf8 } from '@utils/index';
import DOMPurify from 'dompurify';
import { type FC, useEffect, useState } from 'react';
import styles from './OverviewContent.module.scss';

type OverviewContentProps = {
  owner: string;
  repo: string;
  path: string;
  branch: string;
};
export const OverviewContent: FC<OverviewContentProps> = (props) => {
  const { owner, repo, path, branch } = props;
  const [content, setContent] =
    useState<
      Endpoints['GET /repos/{owner}/{repo}/contents/{path}']['response']['data']
    >(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        setIsLoading(true);
        setContent(undefined);
        const { data } = await octokit.rest.repos.getContent({
          owner,
          repo,
          path: `${path}/README.md`,
          ref: branch,
        });
        if (!cancelled) setContent(data);
      } catch {
        if (!cancelled) setContent(undefined);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [owner, repo, path, branch]);

  if (Array.isArray(content)) return null;
  if (content?.type !== 'file') return null;

  return (
    <div className='rounded-lg ring ring-base-content/20'>
      <div className='sticky top-0 rounded-lg border-base-content/20 border-b-[1px] bg-base-100 p-2 pb-0'>
        <GithubTab $variant='border'>
          <GithubTabItem $active={true}>
            <BookSvg className='h-6 w-6 fill-current' />
            README
          </GithubTabItem>
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
      {!isLoading && content !== undefined && (
        <div
          className={styles.overview}
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Because it is just html of markdown
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(md.render(b64ToUtf8(content.content))),
          }}
        />
      )}
    </div>
  );
};
