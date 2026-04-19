export const SwitchBranchesTabs = {
  BRANCH: 'BRANCH',
  TAG: 'TAG',
} as const;
export type SwitchBranchesTab = keyof typeof SwitchBranchesTabs;
