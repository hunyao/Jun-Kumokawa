import { NavLink, useSearchParams } from 'react-router';
import { GithubBreadcrumb, GithubBreadcrumbs } from '#ui/index';
import { genTreePath, overrideSearchParams } from '#utils/index';

type BreadcrumbsProps = {
  path: string;
  owner: string;
  repo: string;
  endWithSlash: boolean;
};
export const Breadcrumbs = (props: BreadcrumbsProps) => {
  const { path, owner, repo, endWithSlash } = props;
  const [searchParams] = useSearchParams();

  const pathItems =
    path.length === 0
      ? []
      : path
          .replace(/^\//, '')
          .split('/')
          .map((pathName, i, self) => {
            return {
              pathName,
              path: self.slice(0, i + 1).join('/'),
            };
          });

  return (
    <nav>
      <GithubBreadcrumbs $endWithSlash={endWithSlash}>
        <GithubBreadcrumb>
          <NavLink
            to={{
              pathname: genTreePath(owner, repo),
              search: overrideSearchParams(searchParams, {
                path: '',
                mode: 'tree',
              }).toString(),
            }}
            className='link link-primary link-hover'
          >
            {repo}
          </NavLink>
        </GithubBreadcrumb>
        {pathItems.map(({ pathName, path }, _i, _self) => (
          <GithubBreadcrumb key={path}>
            {_self.length - 1 !== _i && (
              <NavLink
                to={{
                  pathname: genTreePath(owner, repo),
                  search: overrideSearchParams(searchParams, {
                    path,
                    mode: 'tree',
                  }).toString(),
                }}
                className='link link-primary link-hover'
              >
                {pathName}
              </NavLink>
            )}
            {_self.length - 1 === _i && (
              <span className='font-bold'>{pathName}</span>
            )}
          </GithubBreadcrumb>
        ))}
      </GithubBreadcrumbs>
    </nav>
  );
};
