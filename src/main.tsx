import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import {
  ThemeControlProvider,
  ToastProvider,
  TranslateProvider,
} from '#contexts/index';
import router from './routes';
import '#lib/dayjs';
import { I18nProvider, i18n } from '#lib/lingui';

// biome-ignore lint/style/noNonNullAssertion: reason
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider i18n={i18n}>
      <ToastProvider>
        <TranslateProvider>
          <ThemeControlProvider>
            <RouterProvider router={router} />
          </ThemeControlProvider>
        </TranslateProvider>
      </ToastProvider>
    </I18nProvider>
  </StrictMode>,
);
