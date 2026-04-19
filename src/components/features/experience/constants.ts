export const ProjectTabs = {
  RESPONSEBILITY: 'RESPONSEBILITY',
  ACHIEVEMENT: 'ACHIEVEMENT',
  TECH: 'TECH',
  SCOPE: 'SCOPE',
} as const;
export type ProjectTab = keyof typeof ProjectTabs;
