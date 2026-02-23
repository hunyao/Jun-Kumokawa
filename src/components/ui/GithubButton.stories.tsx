import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import {
  GithubBranchDropdownButton,
  GithubButton,
  GithubDropdownButton,
} from './GithubButton';

const meta = {
  title: 'components/UI/GithubButton',
  component: GithubButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof GithubButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Border: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Border variant with solid 1px border',
      },
    },
  },
  args: {
    $variant: 'border',
    children: 'Border button',
  },
  play: ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: 'Border button' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('github-button');
  },
};

export const Ghost: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Ghost variant without border',
      },
    },
  },
  args: {
    $variant: 'ghost',
    children: 'Ghost button',
  },
  play: ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole('button', { name: 'Ghost button' })).toBeInTheDocument();
  },
};

export const Dropdown: StoryObj = {
  parameters: {
    docs: {
      description: {
        story: 'Dropdown button with caret icon',
      },
    },
  },
  render: () => <GithubDropdownButton>Dropdown</GithubDropdownButton>,
  play: ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole('button')).toBeInTheDocument();
    expect(canvas.getByText('Dropdown')).toBeInTheDocument();
  },
};

export const BranchDropdown: StoryObj = {
  parameters: {
    docs: {
      description: {
        story: 'Branch dropdown button with branch icon and caret',
      },
    },
  },
  render: () => <GithubBranchDropdownButton>main</GithubBranchDropdownButton>,
  play: ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole('button')).toBeInTheDocument();
    expect(canvas.getByText('main')).toBeInTheDocument();
  },
};
