import { Octokit } from 'octokit';
import { getSha1Digest } from '#utils/index';

const cache = new Map<string, Response>();
export const OCTOKIT_UNAUTHORIZED_EVENT = 'octokit:unauthorized';
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
          return (cache.get(sha1) as Response).clone();
        }
      }
      const res = await fetch(resource, { ...options, headers });
      if (res.status === 401 && token) {
        window.localStorage.removeItem('github-access-token');
        clearOctokitCache();
        window.dispatchEvent(new CustomEvent(OCTOKIT_UNAUTHORIZED_EVENT));
      }
      if (resource.method === 'GET' && res.ok) {
        cache.set(sha1, res.clone());
      }
      return res;
    },
  },
});
