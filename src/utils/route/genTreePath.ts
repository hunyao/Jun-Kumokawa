import { generatePath } from 'react-router';
import { Routes } from '#constants/index';

export const genTreePath = (owner: string, id: string) => {
  return generatePath(Routes.TREE, { owner, id });
};
