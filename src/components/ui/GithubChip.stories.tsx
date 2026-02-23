import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { GithubChip } from './GithubChip';

const meta = {
  title: 'components/UI/GithubChip',
  component: GithubChip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof GithubChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  parameters: {
    docs: {
      description: {
        story: 'GitHub-styled chip/tag component',
      },
    },
  },
  args: {
    children: 'TypeScript',
  },
  play: ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText('TypeScript')).toBeInTheDocument();
  },
};
