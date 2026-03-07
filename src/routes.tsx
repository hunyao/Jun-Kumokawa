import { SuspenseWithComponent } from '@components/index';
import { Routes } from '@constants/index';
import {
  AppErrorPage,
  ExperiencePage,
  getRepositoryPageLoader,
  getTreePageLoader,
  MooPage,
  RepositoryErrorPage,
  RepositoryPageWrapper,
  SkillPage,
  TreePageWrapper,
} from '@features/index';
import { MainLayout } from '@layouts/index';
import { OauthCallback } from '@middlewares/index';
import { createBrowserRouter, Navigate, Outlet } from 'react-router';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <OauthCallback>
        <SuspenseWithComponent>
          <MainLayout>
            <Outlet />
          </MainLayout>
        </SuspenseWithComponent>
      </OauthCallback>
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
        Component: ExperiencePage,
      },
      {
        path: Routes.SKILLS,
        Component: SkillPage,
      },
      {
        path: Routes.MOO,
        Component: MooPage,
      },
    ],
  },
]);

export default router;
