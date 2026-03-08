import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';
import { LanguageUsageContent } from '.';

const meta = {
  title: 'components/common/LanguageUsage',
  component: LanguageUsageContent,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LanguageUsageContent>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockLanguages = [
  { lang: 'TypeScript', percent: 68.4, color: '#3178c6' },
  { lang: 'CSS', percent: 15.2, color: '#563d7c' },
  { lang: 'JavaScript', percent: 10.1, color: '#f1e05a' },
  { lang: 'HTML', percent: 4.8, color: '#e34c26' },
  { lang: 'Shell', percent: 1.5, color: '#89e051' },
];

export const Primary: Story = {
  args: {
    languages: mockLanguages,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText('Languages')).toBeInTheDocument();
    for (const { lang } of mockLanguages) {
      expect(canvas.getByText(lang)).toBeInTheDocument();
    }
  },
};
