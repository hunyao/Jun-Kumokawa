import { createBrowserRouter, Navigate, Outlet } from 'react-router';
import { SuspenseWithComponent } from '#components/index';
import { Routes } from '#constants/index';
import {
  AppErrorPage,
  ExperiencePageWrapper,
  getExperienceLoader,
  getMooPageLoader,
  getRepositoryPageLoader,
  getSKillPageLoader,
  getTreePageLoader,
  MooPageWrapper,
  RepositoryErrorPage,
  RepositoryPageWrapper,
  SkillPageWrapper,
  TreePageWrapper,
} from '#features/index';
import { MainLayout } from '#layouts/index';
import { OauthCallback } from '#middlewares/index';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <SuspenseWithComponent>
        <MainLayout>
          <Outlet />
        </MainLayout>
      </SuspenseWithComponent>
    ),
    errorElement: <AppErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to={Routes.HOME} replace />,
      },
      {
        path: Routes.REPOSITORY,
        element: <RepositoryPageWrapper />,
        loader: getRepositoryPageLoader,
        errorElement: <RepositoryErrorPage />,
      },
      {
        path: Routes.TREE,
        element: <TreePageWrapper />,
        loader: getTreePageLoader,
        errorElement: <RepositoryErrorPage />,
      },
      {
        path: Routes.EXPERIENCES,
        element: <ExperiencePageWrapper />,
        loader: getExperienceLoader,
        errorElement: <RepositoryErrorPage />,
      },
      {
        path: Routes.SKILLS,
        element: <SkillPageWrapper />,
        loader: getSKillPageLoader,
        errorElement: <RepositoryErrorPage />,
      },
      {
        path: Routes.MOO,
        element: <MooPageWrapper />,
        loader: getMooPageLoader,
        errorElement: <RepositoryErrorPage />,
      },
      {
        path: Routes.OAUTH_CALLBACK,
        element: <OauthCallback />,
        errorElement: <RepositoryErrorPage />,
      },
    ],
  },
]);

export default router;
