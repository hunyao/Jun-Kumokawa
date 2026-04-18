import { generatePath } from 'react-router';
import { Routes } from '#constants/index';

export const genRepositoryPath = (owner: string, id: string) => {
  return generatePath(Routes.REPOSITORY, { owner, id });
};
