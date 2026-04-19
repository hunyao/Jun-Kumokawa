export const CLONE_CODE_TABS = {
  HTTPS: 'HTTPS',
  SSH: 'SSH',
  GITHUB: 'GITHUB',
} as const;
export type CLONE_CODE_TAB = keyof typeof CLONE_CODE_TABS;
