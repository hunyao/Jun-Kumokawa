import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Provider as RepositoryContextProvider } from '@contexts/RepositoryContext';
import { Provider as ToastContextProvider } from '@contexts/ToastContext';
import { RouterProvider } from 'react-router';
import router from './routes';
import '@lib/dayjs';

// biome-ignore lint/style/noNonNullAssertion: reason
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastContextProvider>
      <RepositoryContextProvider>
        <RouterProvider router={router} />
      </RepositoryContextProvider>
    </ToastContextProvider>
  </StrictMode>,
);
