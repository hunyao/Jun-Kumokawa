import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import { SetToastContext, ToastContext } from '#contexts/index';
import { Toast } from '.';

const meta = {
  title: 'components/common/Toast',
  component: Toast,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockSetToast = fn();

export const Success: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Success toast with close button interaction',
      },
    },
  },
  decorators: [
    (Story) => (
      <ToastContext.Provider
        value={{ type: 'success', message: 'Operation successful!' }}
      >
        <SetToastContext.Provider value={mockSetToast}>
          <Story />
        </SetToastContext.Provider>
      </ToastContext.Provider>
    ),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toast = canvas.getByTestId('toast');
    expect(toast).toBeInTheDocument();
    expect(canvas.getByText('Operation successful!')).toBeInTheDocument();

    await userEvent.click(canvas.getByTestId('toast-close'));
    await waitFor(() => {
      expect(mockSetToast).toHaveBeenCalledWith(null);
    });
  },
};

export const ErrorToast: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Error toast',
      },
    },
  },
  decorators: [
    (Story) => (
      <ToastContext.Provider
        value={{ type: 'error', message: 'Something went wrong!' }}
      >
        <SetToastContext.Provider value={fn()}>
          <Story />
        </SetToastContext.Provider>
      </ToastContext.Provider>
    ),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByTestId('toast')).toBeInTheDocument();
    expect(canvas.getByText('Something went wrong!')).toBeInTheDocument();
  },
};
