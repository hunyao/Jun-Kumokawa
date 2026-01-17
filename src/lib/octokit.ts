import { getSha1Digest } from '@utils/index';
import { Octokit } from 'octokit';

// biome-ignore lint/suspicious/noExplicitAny: reason
const cache = new Map<string, any>();
export const octokit = new Octokit({
  auth: window.localStorage.getItem('github-access-token') || undefined,
  request: {
    fetch: async (resource: Request, options: RequestInit) => {
      let sha1: string = '';
      if (resource.method === 'GET') {
        sha1 = await getSha1Digest(resource.url);
        if (cache.has(sha1)) {
          return cache.get(sha1);
        }
      }
      const res = await fetch(resource, options);
      if (resource.method === 'GET') {
        cache.set(sha1, res);
      }
      return res;
    },
  },
});
