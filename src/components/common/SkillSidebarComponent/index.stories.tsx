import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { Skill } from '#data/index';
import { SkillSidebarComponent } from '.';

const { skills } = Skill;

const meta = {
  title: 'components/common/SkillSidebarComponent',
  component: SkillSidebarComponent,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SkillSidebarComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Renders all skill groups with color bars and item labels',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 全グループ名が表示されている
    for (const skill of skills) {
      expect(canvas.getByText(skill.groupName.en)).toBeInTheDocument();
    }

    // 最初のグループの各アイテムのラベルと年数が表示されている
    const firstGroup = skills[0];
    for (const item of firstGroup.items) {
      expect(canvas.getByText(item.label)).toBeInTheDocument();
      expect(canvas.getAllByText(`${item.value}y`)[0]).toBeInTheDocument();
    }

    // カラーバーのスパンに data-tip が設定されている
    const firstItem = firstGroup.items[0];
    const tooltip = canvasElement.querySelector(
      `[data-tip="${firstItem.label} ${firstItem.value}y"]`,
    );
    expect(tooltip).toBeInTheDocument();
  },
};
