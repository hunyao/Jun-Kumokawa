import { useContext } from 'react';
import { TranslateContext } from '#contexts/TranslateContext';
import { Profile as ProfileData } from '#data/index';
import type { Localized } from '#types/utils';

export const useProfile = () => {
  const { lang } = useContext(TranslateContext);

  const res: Localized<(typeof ProfileData)['profile']> = Object.fromEntries(
    Object.entries(ProfileData.profile).map(([_key, _content]) => {
      if (typeof _content === 'object' && 'en' in _content) {
        return [_key, _content[lang]];
      } else {
        return [_key, _content];
      }
    }),
  );

  return res;
};
