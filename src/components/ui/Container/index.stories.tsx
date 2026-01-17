import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Container as Container$1 } from '.';

const meta = {
  title: 'components/UI/Container',
  component: function Container(args) {
    return <Container$1 {...args} />;
  },
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    children: {
      description: '',
      table: {
        defaultValue: {
          summary: 'undefined',
        },
        type: {
          summary: 'ReactNode',
        },
      },
    },
  },
  decorators: [
    (Story) => (
      <div className='h-full w-full'>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof Container$1>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The container centers your content horizontally. It's the most basic layout element.",
      },
    },
  },
  args: {
    children: <div style={{ background: '#cfe8fc', height: '100vh' }} />,
  },
  play: ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const element = canvas.getByTestId('container');
    expect(element).toBeInTheDocument();
  },
};
