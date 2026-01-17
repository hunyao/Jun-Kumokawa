import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { CopyContentButton } from '.';

const mockClipboard = {
  writeText: fn(() => Promise.resolve()),
};
Object.defineProperty(navigator, 'clipboard', {
  value: mockClipboard,
  writable: true,
});

const meta = {
  title: 'components/common/CopyContentButton',
  component: CopyContentButton,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {},
  tags: ['autodocs'],
} satisfies Meta<typeof CopyContentButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  parameters: {
    docs: {
      description: {
        story: 'CopyContentButton',
      },
    },
  },
  args: {
    content: 'Hello world!',
  },
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);

    const element = canvas.getByTestId('copy-content-button');
    expect(element).toBeInTheDocument();

    await step('click button', async () => {
      await userEvent.click(element);
    });
    await waitFor(async () => {
      await expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        args.content,
      );
    });
  },
};
