import { useContext } from 'react';
import { ApiEndpoints } from '#constants/api';
import { TranslateContext } from '#contexts/index';
import type { Profile } from '#types/profile';
import { pickWithLocale } from '#utils/index';

export const fetchProfileData = async (): Promise<Profile> => {
  return fetch(ApiEndpoints.PROFILE).then((r) => r.json());
};

export const useProfile = (profileData: Profile) => {
  const { lang } = useContext(TranslateContext);

  return {
    profile: pickWithLocale(profileData, lang),
  };
};
