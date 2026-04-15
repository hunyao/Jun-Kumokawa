import { Trans, useLingui } from '@lingui/react/macro';
import type { Endpoints } from '@octokit/types';
import DOMPurify from 'dompurify';
import hljs from 'highlight.js';
import { type CSSProperties, useMemo, useRef } from 'react';
import { Await } from 'react-router';
import { SuspenseWithComponent } from '#components/index';
import { ChildrenError } from '#features/errors';
import { CopyContentSvg, DownloadSvg } from '#icons/index';
import { octokit } from '#lib/index';
import type { unpackPromise } from '#types/utils';
import {
  b64ToUtf8,
  getContentType,
  numberFormat,
  numberFormatWithUnit,
} from '#utils/index';

type BlobViewContentWrapperProps = {
  owner: string;
  repo: string;
  path: string;
  branch: string;
};
export const BlobViewContentWrapper = (props: BlobViewContentWrapperProps) => {
  const { owner, repo, path, branch } = props;

  const promise = useMemo(async () => {
    const contentResponse = await octokit.rest.repos.getContent({
      owner,
      repo,
      path,
      ref: branch,
      headers: {
        Accept: 'application/vnd.github.object+json',
      },
    });
    const downloadUrl =
      !Array.isArray(contentResponse.data) &&
      contentResponse.data.type === 'file'
        ? contentResponse.data.download_url
        : null;
    if (!downloadUrl) {
      throw new Error('Failed to resolve download URL for the file');
    }
    const contentTypeResponse = await getContentType(downloadUrl);
    return { content: contentResponse, contentType: contentTypeResponse };
  }, [repo, path, owner, branch]);
  return (
    <SuspenseWithComponent>
      <Await resolve={promise} errorElement={<ChildrenError />}>
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
export const BlobViewContent = (props: BlobViewContentProps) => {
  const { content, contentType } = props;
  const copyContentButtonRef = useRef<HTMLButtonElement>(null);
  const { t } = useLingui();

  if (Array.isArray(content) || content.type !== 'file') return null;

  const filename = content.name;
  const _base64Decoded = b64ToUtf8(content.content);
  const allLines = _base64Decoded.split('\n');
  const lines = allLines.length;
  const loc = allLines.filter((line) => line !== '').length;
  const extension = filename.includes('.') ? filename.split('.').pop() : '';
  const language =
    extension && hljs.getLanguage(extension) !== undefined
      ? extension
      : 'plaintext';
  const showRawFallback =
    contentType.isBinary ||
    (content.content === '' && content.encoding === 'none');
  const maxLines = 2000;
  const isTruncated = lines > maxLines;
  const visibleLines = isTruncated ? allLines.slice(0, maxLines) : allLines;

  const copyContent = async () => {
    await navigator.clipboard.write([
      new ClipboardItem({
        'text/plain': new Blob([_base64Decoded], {
          type: 'text/plain',
        }),
      }),
    ]);
    if (copyContentButtonRef.current) {
      copyContentButtonRef.current.dataset.tip = t`Copied!`;
    }

    await new Promise((resolve) =>
      setTimeout(() => {
        if (copyContentButtonRef.current) {
          copyContentButtonRef.current.dataset.tip = t`Copy raw file`;
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
            <a
              href={content.download_url || ''}
              target='_blank'
              rel='noreferrer'
            >
              <span className='text-xs'>Raw</span>
            </a>
          </button>
          <button
            className='btn join-item tooltip bg-base-content/20'
            data-tip={t`Copy raw file`}
            type='button'
            onClick={copyContent}
            ref={copyContentButtonRef}
          >
            <CopyContentSvg className='h-4 w-4 fill-current' />
          </button>
          <button
            className='btn join-item tooltip tooltip-left bg-base-content/20'
            data-tip={t`Download raw file`}
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
        {showRawFallback && (
          <div className='text-center'>
            <a
              className='link link-primary'
              href={content.download_url || ''}
              target='_blank'
              rel='noreferrer'
            >
              <Trans>view raw</Trans>
            </a>
          </div>
        )}
        {contentType.isImage && (
          <img
            src={content.download_url || ''}
            alt={filename}
            className='mx-auto'
          />
        )}
        {contentType.isText &&
          content.encoding !== 'none' &&
          visibleLines.map((line, i) => (
            <pre
              // biome-ignore lint/suspicious/noArrayIndexKey: reason
              key={i}
              className='before:inline-block before:w-20 before:pr-4 before:text-right before:text-gray-500 before:content-[attr(data-num)]'
              data-num={i + 1}
              // biome-ignore lint/security/noDangerouslySetInnerHtml: has to be
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  hljs.highlight(line, {
                    language,
                  }).value,
                ),
              }}
            ></pre>
          ))}
        {isTruncated && (
          <div className='p-2 text-center text-base-content/60 text-sm'>
            <Trans>
              Showing first {numberFormat(maxLines)} lines. View raw for full
              file.
            </Trans>
          </div>
        )}
      </div>
    </div>
  );
};
