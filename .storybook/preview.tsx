import type { Preview } from '@storybook/react-vite';
import '../src/index.css';
import { createBrowserRouter, RouterProvider } from 'react-router';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem' }}>
        <label className='flex cursor-pointer gap-2'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <title>hoge</title>
            <circle cx='12' cy='12' r='5' />
            <path d='M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4' />
          </svg>
          <input
            type='checkbox'
            value='synthwave'
            className='toggle theme-controller'
            onChange={(e) => {
              (window.document.children[0] as HTMLElement).dataset.theme = e
                .target.checked
                ? 'dark'
                : 'light';
            }}
          />
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <title>hoge</title>
            <path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z'></path>
          </svg>
        </label>
        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
        <RouterProvider
          router={createBrowserRouter([
            {
              path: '*',
              element: <Story />,
            },
          ])}
        />
      </div>
    ),
  ],
};

export default preview;
