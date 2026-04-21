import { RequestError } from 'octokit';
import { useMemo } from 'react';
import { Await, NavLink } from 'react-router';
import { SuspenseWithComponent } from '#components/index';
import { useGithub } from '#hooks/useGithub';
import { octokit } from '#lib/index';
import type { GetRepositoryListForAuthenticatedUserResponseType } from '#types/octokitApi';
import { GithubButton } from '#ui/GithubButton';
import { genRepositoryPath, requestRecursively } from '#utils/index';

type RepositoryWrapperProps = {
  onClick?: () => void;
};
export const RepositoryWrapper = (props: RepositoryWrapperProps) => {
  const { onClick = () => {} } = props;
  const promise = useMemo(
    () =>
      requestRecursively(octokit.rest.repos.listForAuthenticatedUser, {})
        .then((res) => res.map(({ data }) => data))
        .then((res) => res.flat())
        .catch((err) => {
          if (err instanceof RequestError && err.status === 401) {
            return [];
          }
          throw err;
        }),
    [],
  );

  const skeleton = (
    <div className='flex flex-col gap-2'>
      {Array.from({ length: 5 }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: reason
        <div key={i} className='flex items-center gap-2'>
          <div className='skeleton h-4 w-4 shrink-0 rounded-full bg-base-100' />
          <div className='skeleton h-3 w-full bg-base-100' />
        </div>
      ))}
    </div>
  );

  return (
    <SuspenseWithComponent fallback={skeleton}>
      <Await
        resolve={promise}
        errorElement={
          <div className='text-base-content/60'>
            failed to load your repositories
          </div>
        }
      >
        {(repositories) => (
          <Repository repositories={repositories} onClick={onClick} />
        )}
      </Await>
    </SuspenseWithComponent>
  );
};

type RepositoryProps = {
  repositories: GetRepositoryListForAuthenticatedUserResponseType;
  onClick?: () => void;
};
export const Repository = (props: RepositoryProps) => {
  const { repositories, onClick = () => {} } = props;
  const { isSignedIn, redirectToSignIn } = useGithub();
  return (
    <>
      {repositories.map((repository) => (
        <NavLink
          to={genRepositoryPath(repository.owner.login, repository.name)}
          key={repository.node_id}
        >
          {({ isPending }) => (
            // biome-ignore lint/a11y/useKeyWithClickEvents: reason
            // biome-ignore lint/a11y/noStaticElementInteractions: reason
            <div
              className='link-element flex cursor-pointer items-center gap-2'
              onClick={onClick}
            >
              <span
                className='loading loading-spinner loading-xs'
                hidden={!isPending}
              />
              <img
                src={repository.owner.avatar_url}
                className='h-4 w-4 rounded-full'
                alt={`${repository.owner.login} avatar`}
              />
              <span>
                {repository.owner.login} / {repository.name}
              </span>
            </div>
          )}
        </NavLink>
      ))}
      {isSignedIn && repositories.length === 0 && (
        <div className='mt-2 text-base-content/60 text-sm'>
          No repositories found.
        </div>
      )}
      {!isSignedIn && (
        <div className='mt-2 flex flex-col gap-2 text-base-content/60 text-sm'>
          <span>Sign in to view your repositories.</span>
          <GithubButton $variant='border' onClick={redirectToSignIn}>
            Sign in
          </GithubButton>
        </div>
      )}
    </>
  );
};
