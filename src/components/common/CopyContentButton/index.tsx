import { CheckSvg, CopyContentSvg } from '@icons/index';
import { type FC, type HTMLAttributes, useTransition } from 'react';

type CopyContentButtonProps = HTMLAttributes<HTMLDivElement> & {
  content: string;
};
export const CopyContentButton: FC<CopyContentButtonProps> = ({
  content,
  ...rest
}) => {
  const [isPending, startTransition] = useTransition();

  const onClickHandler = () => {
    console.log('called');
    startTransition(async () => {
      await navigator.clipboard.writeText(content);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });
  };
  return (
    <div className='tooltip' data-tip='Copy url to clipboard' {...rest}>
      <button
        type='button'
        className='btn btn-sm btn-ghost btn-square'
        data-testid='copy-content-button'
        onClick={() => isPending || onClickHandler()}
      >
        {isPending && <CheckSvg className='h-4 w-4 fill-emerald-600' />}
        {!isPending && <CopyContentSvg className='h-4 w-4 fill-current' />}
      </button>
    </div>
  );
};
