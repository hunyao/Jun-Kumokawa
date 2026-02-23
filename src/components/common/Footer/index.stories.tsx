import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(
      canvas.getByText('This Jun-Kumokawa has Super Cow Powers.'),
    ).toBeInTheDocument();
    expect(canvas.getByText('© 2022 Jun Kumokawa.')).toBeInTheDocument();
    expect(canvas.getByRole('link', { name: 'THE PAGE' })).toBeInTheDocument();
  },
};
