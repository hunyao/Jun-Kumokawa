import { useCallback, useContext } from 'react';
import { ApiEndpoints } from '#constants/api';
import { TranslateContext } from '#contexts/TranslateContext';
import type { Cow } from '#types/cow';

export const fetchCowData = async (): Promise<Cow> => {
  return fetch(ApiEndpoints.COW).then((r) => r.json());
};

export const useCow = (cowData: Cow) => {
  const { lang } = useContext(TranslateContext);

  // biome-ignore lint/correctness/useExhaustiveDependencies: reason
  const getMessage = useCallback(
    (level: string) => {
      let i: number;
      if (level === '' || !/^v+$/.test(level)) {
        i = 0;
      } else {
        i =
          level.length < cowData[lang].length
            ? level.length
            : cowData[lang].length - 1;
      }
      return cowData[lang][i];
    },
    [lang],
  );
  return {
    getMessage,
  };
};
