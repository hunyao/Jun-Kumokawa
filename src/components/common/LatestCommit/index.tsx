import type { components } from '@octokit/openapi-types';
import dayjs from 'dayjs';
import type { HTMLAttributes } from 'react';
import { HistorySvg } from '#icons/index';
import { GithubButton } from '#ui/index';
import { numberFormat } from '#utils/index';

type LatestCommitProps = HTMLAttributes<HTMLDivElement> & {
  commit: components['schemas']['commit'];
  totalCommitCount: number;
};
export const LatestCommit = (props: LatestCommitProps) => {
  const { commit, totalCommitCount } = props;
  const authorName =
    commit.author?.login ||
    commit.commit.author?.name ||
    commit.commit.committer?.name ||
    'Unknown';
  const authorAvatar =
    commit.author?.avatar_url || 'https://github.com/github.png?size=48';
  const commitDate = commit.commit.committer?.date;
  return (
    <div
      className={[
        'flex items-center gap-2 px-2 py-3 text-sm',
        props.className,
      ].join(' ')}
    >
      <img
        src={authorAvatar}
        alt={`${authorName} avatar`}
        className='h-6 w-6 rounded-full'
      />
      <span className='font-bold'>{authorName}</span>
      <span>{commit.commit.message.split('\n')[0]}</span>
      <span className='ml-auto' title={commit.sha}>
        {commit.sha.slice(0, 7)}
      </span>
      <span title={commitDate ? dayjs(commitDate).format('llll') : ''}>
        {commitDate ? dayjs(commitDate).fromNow() : '-'}
      </span>
      <GithubButton $variant='ghost' className='!gap-0.5'>
        <HistorySvg className='h-4 w-4 fill-current' />
        <span>{numberFormat(totalCommitCount)} commits</span>
      </GithubButton>
    </div>
  );
};
