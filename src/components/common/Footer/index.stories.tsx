import type { Meta, StoryObj } from '@storybook/react-vite';
import { Footer } from '.';

const meta = {
  title: 'components/common/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {},
  tags: ['autodocs'],
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Footer',
      },
    },
  },
};
