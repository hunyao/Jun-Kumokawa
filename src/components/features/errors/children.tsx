import { RequestError } from 'octokit';
import { useAsyncError } from 'react-router';
import { GithubApiRateLimitError } from '#errors/index';

const isRateLimitError = (err: unknown): boolean => {
  return (
    err instanceof RequestError &&
    err.response !== undefined &&
    'status' in err.response &&
    (err.response.status === 403 || err.response.status === 429) &&
    err.response.headers['x-ratelimit-remaining'] === '0'
  );
};
export const ChildrenError = () => {
  const error = useAsyncError();
  if (
    isRateLimitError(error) &&
    error instanceof RequestError &&
    error.response !== undefined
  ) {
    throw new GithubApiRateLimitError(
      error.response.status,
      Number(error.response.headers['x-ratelimit-reset']),
    );
  } else {
    throw error;
  }
};
