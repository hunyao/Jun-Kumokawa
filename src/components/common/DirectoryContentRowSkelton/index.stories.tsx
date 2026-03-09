import type { Meta, StoryObj } from '@storybook/react-vite';
import { DirectoryContentRowSkelton } from '.';

const meta: Meta<typeof DirectoryContentRowSkelton> = {
  title: 'components/ui/DirectoryContentRowSkelton',
  component: DirectoryContentRowSkelton,
};

export default meta;
type Story = StoryObj<typeof DirectoryContentRowSkelton>;

export const Default: Story = {};
