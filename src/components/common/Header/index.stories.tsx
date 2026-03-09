import { SetToastContext, ToastContext } from '@contexts/index';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, within } from 'storybook/test';
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
    expect(canvas.getByText('hunyao')).toBeInTheDocument();
    expect(canvas.getByText('Jun-Kumokawa')).toBeInTheDocument();
  },
};
