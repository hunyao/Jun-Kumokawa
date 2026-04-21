import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, within } from 'storybook/test';
import { ENV } from '#constants/index';
import { SetToastContext, ToastContext } from '#contexts/index';
import { Header } from '.';

const meta = {
  title: 'components/common/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {},
  tags: ['autodocs'],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Header',
      },
    },
  },
  decorators: [
    (Story) => (
      <ToastContext.Provider value={null}>
        <SetToastContext.Provider value={fn()}>
          <Story />
        </SetToastContext.Provider>
      </ToastContext.Provider>
    ),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(ENV.REPOSITORY_OWNER)).toBeInTheDocument();
    expect(canvas.getByText(ENV.REPOSITORY_NAME)).toBeInTheDocument();
  },
};
