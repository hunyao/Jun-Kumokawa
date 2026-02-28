import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { GithubTab, GithubTabItem } from './GithubTab';

const meta = {
  title: 'components/UI/GithubTab',
  component: GithubTab,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof GithubTab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Border: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Border variant with bottom underline for active tab',
      },
    },
  },
  args: {
    $variant: 'border',
  },
  render: (props) => (
    <GithubTab $variant={props.$variant}>
      <GithubTabItem $active>Code</GithubTabItem>
      <GithubTabItem>Issues</GithubTabItem>
      <GithubTabItem>Pull requests</GithubTabItem>
    </GithubTab>
  ),
  play: ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText('Code')).toBeInTheDocument();
    expect(canvas.getByText('Issues')).toBeInTheDocument();
    expect(canvas.getByText('Pull requests')).toBeInTheDocument();
    expect(canvas.getByText('Code').closest('li')).toHaveClass('active');
  },
};

export const Lift: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Lift variant where active tab appears raised',
      },
    },
  },
  args: {
    $variant: 'lift',
  },
  render: (props) => (
    <GithubTab $variant={props.$variant}>
      <GithubTabItem $active>Overview</GithubTabItem>
      <GithubTabItem>Repositories</GithubTabItem>
    </GithubTab>
  ),
  play: ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText('Overview')).toBeInTheDocument();
    expect(canvas.getByText('Repositories')).toBeInTheDocument();
  },
};
