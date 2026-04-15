import type { Meta, StoryObj } from '@storybook/react-vite';
import * as icons from './index';

const RenderIconsComponent = () => {
  const list = Object.entries(icons).map(([name, Icon]) => (
    <div key={name} className='flex flex-col items-center gap-2'>
      <Icon className='h-20 w-20 fill-current' />
      <div>{name}</div>
    </div>
  ));
  return <div className='grid grid-cols-10 gap-4 p-4'>{list}</div>;
};

const meta = {
  title: 'components/icons',
  component: RenderIconsComponent,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof RenderIconsComponent>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Primary: Story = {};
