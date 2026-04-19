import type { LoaderFunction } from 'react-router';
import { fetchSkillData } from '#hooks/index';
import type { Skill } from '#types/skill';

const skillDataPromise = fetchSkillData();
export type SkillPageLoaderResponse = [Skill[]];
export const getSKillPageLoader: LoaderFunction = () => {
  return {
    promise: Promise.all([skillDataPromise]),
  };
};
