import type { LoaderFunction } from 'react-router';
import { fetchExperienceData } from '#hooks/index';
import type { Experience } from '#types/experience';

const experienceDataPromise = fetchExperienceData();
export type ExperiencePageLoaderResponse = [Experience[]];
export const getExperienceLoader: LoaderFunction = () => {
  return {
    promise: Promise.all([experienceDataPromise]),
  };
};
