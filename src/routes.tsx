import { SuspenseWithComponent } from '@components/index';
import { Routes } from '@constants/index';
import {
  ExperiencePage,
  getRepositoryPageLoader,
  getTreePageLoader,
  RepositoryErrorPage,
  RepositoryPageWrapper,
  SkillPage,
  TreePageWrapper,
} from '@features/index';
import { MainLayout } from '@layouts/index';
import { OauthCallback } from '@middlewares/index';
import { createBrowserRouter, Outlet } from 'react-router';

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
    children: [
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
    ],
  },
]);

export default router;
