import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Provider as ToastContextProvider } from '@contexts/ToastContext';
import { RouterProvider } from 'react-router';
import router from './routes';
import '@lib/dayjs';

// biome-ignore lint/style/noNonNullAssertion: reason
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastContextProvider>
      <RouterProvider router={router} />
    </ToastContextProvider>
  </StrictMode>,
);
