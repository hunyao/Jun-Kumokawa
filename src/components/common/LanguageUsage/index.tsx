import { SuspenseWithComponent } from '@components/index';
import { CircleFillSvg } from '@icons/index';
import { octokit } from '@lib/index';
import { DetailBoxTitle } from '@ui/index';
import { useMemo } from 'react';
import { Await } from 'react-router';

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Java: '#b07219',
  'C#': '#178600',
  'C++': '#f34b7d',
  C: '#555555',
  PHP: '#4F5D95',
  Ruby: '#701516',
  Go: '#00ADD8',
  Rust: '#dea584',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Scala: '#c22d40',
  Shell: '#89e051',
  HTML: '#e34c26',
  CSS: '#563d7c',
  SCSS: '#c6538c',
  Vue: '#41b883',
  Svelte: '#ff3e00',
  Dart: '#00B4AB',
  R: '#198CE7',
  Lua: '#000080',
  Elixir: '#6e4a7e',
  Clojure: '#db5855',
  Haskell: '#5e5086',
  Dockerfile: '#384d54',
};

const hashColor = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return `#${(hash & 0x00ffffff).toString(16).padStart(6, '0')}`;
};

const getLanguageColor = (lang: string): string =>
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
    <DetailBoxTitle>Languages</DetailBoxTitle>
    <div className='mb-3 flex h-2 overflow-hidden rounded-full'>
      {languages.map(({ lang, percent, color }) => (
        <span
          key={lang}
          className='tooltip'
          data-tip={`${lang} ${percent.toFixed(1)}%`}
          style={{ width: `${percent}%`, background: color }}
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
          color: getLanguageColor(lang),
        }));
      }),
    [owner, repo],
  );

  return (
    <SuspenseWithComponent>
      <Await resolve={promise}>
        {(languages: LanguageItem[]) => (
          <LanguageUsageContent languages={languages} />
        )}
      </Await>
    </SuspenseWithComponent>
  );
};
