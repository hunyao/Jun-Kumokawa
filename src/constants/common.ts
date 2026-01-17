/**
 * Defining routing
 */
export const Routes = {
  HOME: '/repo/hunyao/Jun-Kumokawa',
  MYTREE: '/tree/hunyao/Jun-Kumokawa',
  TREE: '/tree/:owner/:id',
  REPOSITORY: '/repo/:owner/:id',
  EXPERIENCES: '/experiences',
  SKILLS: '/skills',
  MOO: '/moo',
} as const;
export type Route = keyof typeof Routes;
