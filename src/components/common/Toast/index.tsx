import { use } from 'react';
import { SetToastContext, ToastContext } from '#contexts/index';
import { XmarkSvg } from '#icons/index';

export const Toast = () => {
  const data = use(ToastContext);
  const setToast = use(SetToastContext);

  if (data === null) {
    return null;
  }

  let backgroundColorClass: string;
  let borderColorClass: string;
  let fillColor: string;

  switch (data.type) {
    case 'success':
      backgroundColorClass = 'bg-success/10';
      borderColorClass = 'border-success/50';
      fillColor = 'fill-success hover:fill-success/50';
      break;
    case 'error':
      backgroundColorClass = 'bg-error/10';
      borderColorClass = 'border-error/50';
      fillColor = 'fill-error hover:fill-error/50';
  }
  return (
    <div
      data-testid='toast'
      className={[
        'flex items-center justify-between border-y-[1px] p-4',
        backgroundColorClass,
        borderColorClass,
      ].join(' ')}
    >
      {data.message}
      <XmarkSvg
        data-testid='toast-close'
        className={['h-4 w-4 cursor-pointer', fillColor].join(' ')}
        onClick={() => setToast(null)}
      />
    </div>
  );
};
