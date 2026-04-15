import { useContext } from 'react';
import { langs } from '#constants/index';
import { SetTranslateContext, TranslateContext } from '#contexts/index';
import { CheckSvg, KeyboardArrowDownSvg, TranslateSvg } from '#icons/index';
import { GithubButton } from '#ui/index';

export const TranslateMenu = () => {
  const { lang: currentLang } = useContext(TranslateContext);
  const setTranslate = useContext(SetTranslateContext);
  return (
    <div className='dropdown dropdown-end dropdown-hover'>
      <div
        className='flex items-center py-2'
        // biome-ignore lint/a11y/noNoninteractiveTabindex: reason
        tabIndex={0}
      >
        <TranslateSvg className='h-6 w-6 fill-current' />
        <KeyboardArrowDownSvg className='h-5 w-5 fill-current' />
      </div>
      <div
        // biome-ignore lint/a11y/noNoninteractiveTabindex: reason
        tabIndex={0}
        className='dropdown-content z-1 rounded-xl border-[1px] border-base-content/20 bg-base-100 p-2 shadow-sm'
      >
        {langs.map(({ lang, text }) => (
          <GithubButton
            key={lang}
            $variant='ghost'
            $fullWidth
            className='w-full whitespace-nowrap'
            onClick={() => currentLang !== lang && setTranslate({ lang })}
          >
            <CheckSvg
              className={[
                'h-4 w-4',
                currentLang === lang ? 'fill-current' : 'fill-transparent',
              ].join(' ')}
            />
            {text}
          </GithubButton>
        ))}
      </div>
    </div>
  );
};
