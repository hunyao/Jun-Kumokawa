import { getSha1Digest } from '@utils/index';
import { Octokit } from 'octokit';

// biome-ignore lint/suspicious/noExplicitAny: reason
const cache = new Map<string, any>();
export const clearOctokitCache = () => {
  cache.clear();
};
export const octokit = new Octokit({
  auth: window.localStorage.getItem('github-access-token') || undefined,
  request: {
    fetch: async (resource: Request, options: RequestInit) => {
      const token = window.localStorage.getItem('github-access-token');
      const headers = new Headers(options.headers);
      if (token && !headers.has('authorization')) {
        headers.set('authorization', `token ${token}`);
      }

      let sha1: string = '';
      if (resource.method === 'GET') {
        sha1 = await getSha1Digest(resource.url);
        if (cache.has(sha1)) {
          return cache.get(sha1).clone();
        }
      }
      const res = await fetch(resource, { ...options, headers });
      if (resource.method === 'GET') {
        cache.set(sha1, res.clone());
      }
      return res;
    },
  },
});
