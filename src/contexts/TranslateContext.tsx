import { i18n } from '@lingui/core';
import { createContext, type PropsWithChildren, useState } from 'react';
import type { i18nLang } from '#constants/index';

type Translate = {
  lang: i18nLang;
};

export const TranslateContext = createContext<Translate>({
  lang: i18n.locale as i18nLang,
});
export const SetTranslateContext = createContext<(value: Translate) => void>(
  () => {},
);

export const TranslateProvider = ({ children }: PropsWithChildren) => {
  const [toast, setTranslate] = useState<Translate>({
    lang: i18n.locale as i18nLang,
  });

  const _setTranslate = (_value: Translate) => {
    setTranslate(_value);
    i18n.activate(_value.lang);
    window.localStorage.setItem('lang', _value.lang);
  };
  return (
    <TranslateContext.Provider value={toast}>
      <SetTranslateContext.Provider value={_setTranslate}>
        {children}
      </SetTranslateContext.Provider>
    </TranslateContext.Provider>
  );
};
