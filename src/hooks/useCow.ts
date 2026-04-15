import { useContext } from 'react';
import { TranslateContext } from '#contexts/TranslateContext';
import { CowMessages as messages } from '#data/index';

type useCowType = [string];
export const useCow = (level: string): useCowType => {
  const { lang } = useContext(TranslateContext);

  let i: number;
  if (level === '' || !/^v+$/.test(level)) {
    i = 0;
  } else {
    i =
      level.length < messages[lang].length
        ? level.length
        : messages[lang].length - 1;
  }
  return [messages[lang][i]];
};
