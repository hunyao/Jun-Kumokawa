import { CopyContentSvg, DownloadSvg } from '@icons/index';
import { octokit } from '@lib/index';
import type { Endpoints } from '@octokit/types';
import {
  b64ToUtf8,
  getContentType,
  numberFormat,
  numberFormatWithUnit,
} from '@utils/index';
import hljs from 'highlight.js';
import { type CSSProperties, type FC, useRef } from 'react';
import { Await, NavLink } from 'react-router';
import type { unpackPromise } from 'src/types';
import { SuspenseWithComponent } from './SuspenseWithComponent';

type BlobViewContentWrapperProps = {
  owner: string;
  repo: string;
  path: string;
  branch: string;
};
export const BlobViewContentWrapper: FC<BlobViewContentWrapperProps> = (
  props,
) => {
  const { owner, repo, path, branch } = props;

  const promise = async () => {
    const contentResponse = await octokit.rest.repos.getContent({
      owner,
      repo,
      path,
      ref: branch,
      headers: {
        Accept: 'application/vnd.github.object+json',
      },
    });
    const contentTypeResponse = await getContentType(
      (contentResponse.data as any).download_url as string,
    );
    return { content: contentResponse, contentType: contentTypeResponse };
  };
  return (
    <SuspenseWithComponent>
      <Await resolve={promise()} errorElement={<div></div>}>
        {({ content, contentType }) => (
          <BlobViewContent
            path={path}
            content={content.data}
            contentType={contentType}
          />
        )}
      </Await>
    </SuspenseWithComponent>
  );
};
type BlobViewContentProps = {
  content: Endpoints['GET /repos/{owner}/{repo}/contents/{path}']['response']['data'];
  contentType: unpackPromise<ReturnType<typeof getContentType>>;
  path: string;
};
export const BlobViewContent: FC<BlobViewContentProps> = (props) => {
  const { content, contentType } = props;
  const copyContentButtonRef = useRef<HTMLButtonElement>(null);

  if (Array.isArray(content) || content.type !== 'file') return null;

  const filename = content.name;
  const _base64Decoded = b64ToUtf8(content.content);
  const lines = _base64Decoded.split('\n').length;
  const loc = _base64Decoded.split('\n').filter((line) => line !== '').length;
  const extension = filename.includes('.') ? filename.split('.')[1] : filename;

  const copyContent = async () => {
    await navigator.clipboard.write([
      new ClipboardItem({
        'text/plain': new Blob([_base64Decoded], {
          type: 'text/plain',
        }),
      }),
    ]);
    if (copyContentButtonRef.current) {
      copyContentButtonRef.current.dataset.tip = 'Copied!';
    }

    await new Promise((resolve) =>
      setTimeout(() => {
        if (copyContentButtonRef.current) {
          copyContentButtonRef.current.dataset.tip = 'Copy raw file';
        }
        resolve(0);
      }, 1000),
    );
  };

  return (
    <div className='w-full rounded-lg ring ring-base-content/20'>
      <div className='sticky top-0 flex items-center rounded-lg border-base-content/20 border-b-[1px] bg-base-100 p-2 text-sm'>
        <div className='flex gap-2 text-gray-500'>
          <span hidden={!contentType.isText}>{numberFormat(lines)} lines</span>

          <span hidden={!contentType.isText}>({numberFormat(loc)} loc)</span>
          <span>{numberFormatWithUnit(content.size, 'byte')}</span>
        </div>
        <div className='join ml-auto inline-flex items-center'>
          <button
            className='btn join-item bg-base-content/20'
            style={{ '--radius-field': '0.5rem' } as CSSProperties}
            type='button'
          >
            <a href={content.download_url || ''} target='_blank'>
              <span className='text-xs'>Raw</span>
            </a>
          </button>
          <button
            className='btn join-item tooltip bg-base-content/20'
            data-tip='Copy raw file'
            type='button'
            onClick={copyContent}
            ref={copyContentButtonRef}
          >
            <CopyContentSvg className='h-4 w-4 fill-current' />
          </button>
          <button
            className='btn join-item tooltip tooltip-left bg-base-content/20'
            data-tip='Download raw file'
            style={{ '--radius-field': '0.5rem' } as CSSProperties}
            type='button'
          >
            <a
              href={`data:${contentType.mimeType};base64,${content.content}`}
              download={filename}
            >
              <DownloadSvg className='h-4 w-4 fill-current' />
            </a>
          </button>
        </div>
      </div>
      <div className='overflow-x-auto'>
        {contentType.isBinary ||
          (content.content === '' && content.encoding === 'none' && (
            <div className='text-center'>
              <NavLink
                className='link link-primary'
                to={content.download_url || ''}
              >
                viw raw
              </NavLink>
            </div>
          ))}
        {contentType.isImage && (
          <img src={content.download_url || ''} alt='' className='mx-auto' />
        )}
        {contentType.isText &&
          content.encoding !== 'none' &&
          _base64Decoded.split('\n').map((line, i) => (
            <pre
              // biome-ignore lint/suspicious/noArrayIndexKey: reason
              key={i}
              className='before:inline-block before:w-20 before:pr-4 before:text-right before:text-gray-500 before:content-[attr(data-num)]'
              data-num={i + 1}
              // biome-ignore lint/security/noDangerouslySetInnerHtml: has to be
              dangerouslySetInnerHTML={{
                __html: hljs.highlight(line, {
                  language:
                    hljs.getLanguage(extension) === undefined
                      ? 'plaintext'
                      : extension,
                }).value,
              }}
            ></pre>
          ))}
      </div>
    </div>
  );
};
