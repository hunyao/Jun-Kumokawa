import { useLingui } from '@lingui/react/macro';
import { type HTMLAttributes, useState } from 'react';
import { CheckSvg, CopyContentSvg } from '#icons/index';

type CopyContentButtonProps = HTMLAttributes<HTMLDivElement> & {
  content: string;
};
export const CopyContentButton = ({
  content,
  ...rest
}: CopyContentButtonProps) => {
  const [isCopying, setIsCopying] = useState(false);
  const { t } = useLingui();

  const onClickHandler = async () => {
    if (isCopying) return;
    try {
      setIsCopying(true);
      await navigator.clipboard.writeText(content);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } finally {
      setIsCopying(false);
    }
  };
  return (
    <div className='tooltip' data-tip={t`Copy url to clipboard`} {...rest}>
      <button
        type='button'
        className='btn btn-sm btn-ghost btn-square'
        data-testid='copy-content-button'
        onClick={onClickHandler}
      >
        {isCopying && <CheckSvg className='h-4 w-4 fill-emerald-600' />}
        {!isCopying && <CopyContentSvg className='h-4 w-4 fill-current' />}
      </button>
    </div>
  );
};
