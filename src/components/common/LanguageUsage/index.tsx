import { Trans } from '@lingui/react/macro';
import { useMemo } from 'react';
import { Await } from 'react-router';
import { SuspenseWithComponent } from '#components/index';
import { type CodingLanguage, LANGUAGE_COLORS } from '#constants/index';
import { ChildrenError } from '#features/errors';
import { CircleFillSvg } from '#icons/index';
import { octokit } from '#lib/index';
import { DetailBoxTitle } from '#ui/index';

const hashColor = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return `#${(hash & 0x00ffffff).toString(16).padStart(6, '0')}`;
};

const getLanguageColor = (lang: CodingLanguage): string =>
  LANGUAGE_COLORS[lang] ?? hashColor(lang);

export type LanguageItem = {
  lang: string;
  percent: number;
  color: string;
};

type LanguageUsageContentProps = {
  languages: LanguageItem[];
};

export const LanguageUsageContent = ({
  languages,
}: LanguageUsageContentProps) => (
  <div>
    <DetailBoxTitle>
      <Trans>Languages</Trans>
    </DetailBoxTitle>
    <div className='mb-3 flex h-2'>
      {languages.map(({ lang, percent, color }) => (
        <span
          key={lang}
          className='tooltip first:rounded-l-full last:rounded-r-full'
          data-tip={`${lang} ${percent.toFixed(1)}%`}
          style={{ width: `${percent}%`, minWidth: 4, background: color }}
        />
      ))}
    </div>
    <div className='flex flex-wrap gap-x-4 gap-y-2'>
      {languages.map(({ lang, percent, color }) => (
        <div key={lang} className='flex items-center gap-1 text-xs'>
          <CircleFillSvg className='h-2 w-2' style={{ fill: color }} />
          <span className='font-medium'>{lang}</span>
          <span className='text-base-content/50'>{percent.toFixed(1)}%</span>
        </div>
      ))}
    </div>
  </div>
);

type LanguageUsageProps = {
  owner: string;
  repo: string;
};

export const LanguageUsage = ({ owner, repo }: LanguageUsageProps) => {
  const promise = useMemo(
    () =>
      octokit.rest.repos.listLanguages({ owner, repo }).then(({ data }) => {
        const total = Object.values(data).reduce(
          (sum, bytes) => sum + bytes,
          0,
        );
        return Object.entries(data).map(([lang, bytes]) => ({
          lang,
          percent: (bytes / total) * 100,
          color: getLanguageColor(lang as CodingLanguage),
        }));
      }),
    [owner, repo],
  );

  return (
    <SuspenseWithComponent>
      <Await resolve={promise} errorElement={<ChildrenError />}>
        {(languages: LanguageItem[]) => (
          <LanguageUsageContent languages={languages} />
        )}
      </Await>
    </SuspenseWithComponent>
  );
};
