import { octokit } from '#lib/index';
import { requestRecursively } from '#utils/index';

export const useRepository = () => {
  // const repositoryRef = useRef<
  //   Endpoints['GET /repos/{owner}/{repo}']['response'] | null
  // >(null);
  const initialize = (owner: string, repo: string) => {
    const repository = octokit.rest.repos.get({
      owner,
      repo,
    });
    const branches = requestRecursively(octokit.rest.repos.listBranches, {
      owner,
      repo,
    })
      .then((items) => items.map((item) => item.data))
      .then((items) => items.flat());
    const tags = requestRecursively(octokit.rest.repos.listTags, {
      owner,
      repo,
    })
      .then((items) => items.map((item) => item.data))
      .then((items) => items.flat());

    return Promise.all([repository, branches, tags]);
  };

  return {
    initialize,
  };
};
