import { octokit } from '@lib/index';
import type { Endpoints, RequestParameters } from '@octokit/types';
import { extractPageInfo } from './extractPageInfo';

/**
 * Returns length of all commits
 *
 * @function
 * @param {object} options Options for `listCommits`
 * @returns {Promise<number>} length of all commits
 */
export async function getAllCommitCounts(
  options: RequestParameters &
    Endpoints['GET /repos/{owner}/{repo}/commits']['parameters'],
): Promise<number> {
  const cacheKey = JSON.stringify(options);
  const cached = commitCountCache.get(cacheKey);
  const now = Date.now();
  if (cached && now - cached.cachedAt < COMMIT_COUNT_TTL_MS) {
    return cached.value;
  }
  try {
    const first = await octokit.rest.repos.listCommits({
      ...options,
      page: 1,
      per_page: 1,
    });
    const linkInfo = extractPageInfo(first.headers.link);
    if (linkInfo === undefined || linkInfo.last === undefined)
      return cacheAndReturn(cacheKey, first.data.length);
    return cacheAndReturn(cacheKey, Number(linkInfo.last));
  } catch (e) {
    const error = e as { status?: number };
    if (error.status === 409) return cacheAndReturn(cacheKey, 0);
    throw e;
  }
}

const COMMIT_COUNT_TTL_MS = (() => {
  const value = Number(import.meta.env.VITE_COMMIT_TTL_MS);
  return Number.isFinite(value) && value > 0 ? value : 5 * 60 * 1000;
})();
const commitCountCache = new Map<string, { value: number; cachedAt: number }>();
const cacheAndReturn = (key: string, value: number) => {
  commitCountCache.set(key, { value, cachedAt: Date.now() });
  return value;
};

// if (import.meta.vitest) {
//   // const listCommitsMock = vi.spyOn(octokit.rest.repos, 'listCommits');
//   const listCommitsMock = vi.fn();
//   vi.mock('@lib/index', () => ({
//     octokit: {
//       rest: {
//         repos: {
//           listCommites: listCommitsMock,
//         },
//       },
//     },
//   }));
//
//   beforeEach(() => {
//     listCommitsMock.mockRestore();
//   });
//   test('', async () => {
//     listCommitsMock
//       .mockResolvedValue({
//         url: '',
//         status: 200,
//         headers: {
//           link: '<https://api.example.com/issues?page=2>; rel="next", <https://api.example.com/issues?page=99>; rel="last", <https://api.example.com/issues?page=1>; rel="first"',
//         },
//         data: Array.from({ length: 100 }).map((_, k) => ({
//           url: '',
//           sha: '',
//           node_id: k.toString(),
//           html_url: '',
//           comments_url: '',
//           commit: {
//             url: '',
//             author: {},
//             committer: {},
//             message: '',
//             comment_count: 0,
//             tree: {
//               sha: '',
//               url: '',
//             },
//           },
//           author: null,
//           committer: null,
//           parents: [],
//         })),
//       })
//       .mockResolvedValue({
//         url: '',
//         status: 200,
//         headers: {
//           link: '<https://api.example.com/issues?page=98>; rel="prev", <https://api.example.com/issues?page=1>; rel="first"',
//         },
//         data: Array.from({ length: 100 }).map((_, k) => ({
//           url: '',
//           sha: '',
//           node_id: k.toString(),
//           html_url: '',
//           comments_url: '',
//           commit: {
//             url: '',
//             author: {},
//             committer: {},
//             message: '',
//             comment_count: 0,
//             tree: {
//               sha: '',
//               url: '',
//             },
//           },
//           author: null,
//           committer: null,
//           parents: [],
//         })),
//       });
//     expect(await getAllCommitCounts({ owner: 'owner', repo: 'repo' })).toEqual(
//       9900,
//     );
//   });
// }
