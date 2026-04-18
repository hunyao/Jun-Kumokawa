import { ApiEndpoints } from '#constants/api';
import type { Experience } from '#types/experience';

export const fetchExperienceData = async (): Promise<Experience[]> => {
  return fetch(ApiEndpoints.EXPERIENCE).then((r) => r.json());
};
