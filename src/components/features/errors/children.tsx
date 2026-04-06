import { useAsyncError } from 'react-router';

export const ChildrenError = () => {
  const error = useAsyncError();
  throw error;
};
