import { BookSvg } from '@icons/index';
import { md, octokit } from '@lib/index';
import type { Endpoints } from '@octokit/types';
import { GithubTab, GithubTabItem } from '@ui/index';
import { b64ToUtf8 } from '@utils/index';
import { type FC, useEffect, useRef, useTransition } from 'react';
import styles from './OverviewContent.module.scss';

type OverviewContentProps = {
  owner: string;
  repo: string;
  path: string;
};
export const OverviewContent: FC<OverviewContentProps> = (props) => {
  const { owner, repo, path } = props;
  const content =
    useRef<
      Endpoints['GET /repos/{owner}/{repo}/contents/{path}']['response']['data']
    >(undefined);
  const [isPending, startTransition] = useTransition();

  // biome-ignore lint/correctness/useExhaustiveDependencies: reason
  useEffect(() => {
    startTransition(async () => {
      try {
        const { data } = await octokit.rest.repos.getContent({
          owner,
          repo,
          path: `${path}/README.md`,
        });
        content.current = data;
      } catch {}
    });
  }, []);

  if (Array.isArray(content.current)) return null;
  if (content.current?.type !== 'file') return null;

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
      {isPending && (
        <div>
          <div className='skeleton h-4 w-full'></div>
          <div className='skeleton h-4 w-full'></div>
          <div className='skeleton h-4 w-full'></div>
          <div className='skeleton h-4 w-full'></div>
          <div className='skeleton h-4 w-full'></div>
        </div>
      )}
      {!isPending && content.current !== undefined && (
        <div
          className={styles.overview}
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Because it is just html of markdown
          dangerouslySetInnerHTML={{
            __html: md.render(b64ToUtf8(content.current.content)),
          }}
        />
      )}
    </div>
  );
};
