import DOMPurify from 'dompurify';
import { useContext, useMemo, useState } from 'react';
import { Await } from 'react-router';
import { SuspenseWithComponent } from '#components/SuspenseWithComponent';
import { TranslateContext } from '#contexts/TranslateContext';
import { ChildrenError } from '#features/errors';
import { BookSvg } from '#icons/index';
import { md, octokit } from '#lib/index';
import { GithubTab, GithubTabItem } from '#ui/index';
import { b64ToUtf8 } from '#utils/index';
import styles from './index.module.scss';

type MarkdownFile = {
  name: string;
  path: string;
  content: string;
};

const isMarkdownFile = (name: string) => name.toLowerCase().endsWith('.md');
const directoryPathFromSearchPath = (path: string) => path.replace(/^\//, '');
const sortMarkdownFiles = (a: GroupFileByLocale, b: GroupFileByLocale) => {
  const getScore = (name: string) => {
    const lower = name.toLowerCase();
    if (lower === 'readme') return 0;
    return 1;
  };
  return getScore(a.name) - getScore(b.name);
};
type GroupFileByLocale = {
  name: string;
  files: Record<string, MarkdownFile>;
};
type GroupFilesByLocale = Array<GroupFileByLocale>;
const groupFilesByLocale = (files: MarkdownFile[]): GroupFilesByLocale => {
  return files
    .filter((file) => !file.name.includes('_'))
    .map((file) => {
      const fileNameWithoutExtension = file.name.replace(/.md$/, '');
      const relativeFiles = files
        .filter((_file) => _file.name.startsWith(fileNameWithoutExtension))
        .map((_file) => {
          const locale = _file.name.replace(/.md$/, '').split('_')[1] || 'en';
          return [locale, _file];
        });
      return {
        name: fileNameWithoutExtension,
        files: Object.fromEntries(relativeFiles),
      };
    });
};

type OverviewContentWrapperProps = {
  owner: string;
  repo: string;
  path: string;
  branch: string;
};
export const OverviewContentWrapper = (props: OverviewContentWrapperProps) => {
  const { owner, repo, path, branch } = props;
  const promise = useMemo(async (): Promise<GroupFilesByLocale> => {
    const { data: listData } = await octokit.rest.repos.getContent({
      owner,
      repo,
      path: directoryPathFromSearchPath(path),
      ref: branch,
    });
    if (!Array.isArray(listData)) return [];

    return groupFilesByLocale(
      await Promise.all(
        listData
          .filter(
            (content) =>
              content.type === 'file' && isMarkdownFile(content.name),
          )
          .map(async ({ name, path }) => {
            const { data: fileData } = await octokit.rest.repos.getContent({
              owner,
              repo,
              path,
              ref: branch,
            });

            return {
              name,
              path,
              content:
                !Array.isArray(fileData) && fileData.type === 'file'
                  ? fileData.content
                  : '',
            };
          }),
      ),
    ).sort(sortMarkdownFiles);
  }, [owner, repo, path, branch]);

  return (
    <SuspenseWithComponent>
      <Await resolve={promise} errorElement={<ChildrenError />}>
        {(contents) => {
          return <OverviewContent contents={contents} />;
        }}
      </Await>
    </SuspenseWithComponent>
  );
};
type OverviewContentProps = {
  contents: GroupFilesByLocale;
};
export const OverviewContent = (props: OverviewContentProps) => {
  const { contents } = props;
  const { lang } = useContext(TranslateContext);
  const [activeMarkdownPath, setActiveMarkdownPath] = useState<string>(
    contents.length === 0 ? '' : contents[0].name,
  );

  if (contents.length === 0) return null;

  const content = contents.find(
    (content) => content.name === activeMarkdownPath,
  );
  if (content === undefined) return null;

  let markdownContent: string;
  if (content.files[lang] === undefined) {
    markdownContent = content.files.en.content;
  } else {
    markdownContent = content.files[lang].content;
  }

  return (
    <div className='rounded-lg ring ring-base-content/20'>
      <div className='sticky top-0 rounded-lg border-base-content/20 border-b-[1px] bg-base-100 p-2 pb-0'>
        <GithubTab $variant='border'>
          {contents.map((file) => (
            <GithubTabItem
              key={file.name}
              $active={activeMarkdownPath === file.name}
              onClick={() => setActiveMarkdownPath(file.name)}
            >
              <BookSvg className='h-6 w-6 fill-current' />
              {file.name}
            </GithubTabItem>
          ))}
        </GithubTab>
      </div>
      {markdownContent !== '' && (
        <div
          className={styles.overview}
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Because it is just html of markdown
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(md.render(b64ToUtf8(markdownContent))),
          }}
        />
      )}
    </div>
  );
};
