import { HistorySvg } from '@icons/index';
import type { components } from '@octokit/openapi-types';
import { GithubButton } from '@ui/index';
import { numberFormat } from '@utils/index';
import dayjs from 'dayjs';
import type { FC, HTMLAttributes } from 'react';

type LatestCommitProps = HTMLAttributes<HTMLDivElement> & {
  commit: components['schemas']['commit'];
  totalCommitCount: number;
};
export const LatestCommit: FC<LatestCommitProps> = (props) => {
  const { commit, totalCommitCount } = props;
  return (
    <div
      className={[
        'flex items-center gap-2 px-2 py-3 text-sm',
        props.className,
      ].join(' ')}
    >
      <img
        src={commit.author?.avatar_url}
        alt=''
        className='h-6 w-6 rounded-full'
      />
      <span className='font-bold'>{commit.author?.login}</span>
      <span>{commit.commit.message.split('\n')[0]}</span>
      <span className='ml-auto' title={commit.sha}>
        {commit.sha.slice(0, 7)}
      </span>
      <span title={dayjs(commit.commit.committer?.date).format('llll')}>
        {dayjs(commit.commit.committer?.date).fromNow()}
      </span>
      <GithubButton $variant='ghost' className='!gap-0.5'>
        <HistorySvg className='h-4 w-4 fill-current' />
        <span>{numberFormat(totalCommitCount)} commits</span>
      </GithubButton>
    </div>
  );
};
