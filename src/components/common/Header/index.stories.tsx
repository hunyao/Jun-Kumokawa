import type { Meta, StoryObj } from '@storybook/react-vite';
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
};
