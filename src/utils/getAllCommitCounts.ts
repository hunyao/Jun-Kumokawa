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
  const first = await octokit.rest.repos.listCommits({
    ...options,
    page: 1,
    per_page: 100,
  });
  const linkInfo = extractPageInfo(first.headers.link);
  if (linkInfo === undefined || linkInfo.last === undefined)
    return first.data.length;
  const last = await octokit.rest.repos.listCommits({
    ...options,
    page: Number(linkInfo.last),
    per_page: 100,
  });

  return (Number(linkInfo.last) - 1) * 100 + last.data.length;
}

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
