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

/**
 * Defining languages
 */
export const langs = [
  {
    lang: 'en',
    text: '🌏 English',
  },
  {
    lang: 'ja',
    text: '🇯🇵 日本語',
  },
] as const;

export type i18nLang = (typeof langs)[number]['lang'];

export const LANGUAGE_COLORS = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Java: '#b07219',
  'C#': '#178600',
  'C++': '#f34b7d',
  C: '#555555',
  PHP: '#4F5D95',
  Ruby: '#701516',
  Go: '#00ADD8',
  Rust: '#dea584',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Scala: '#c22d40',
  Shell: '#89e051',
  HTML: '#e34c26',
  CSS: '#563d7c',
  SCSS: '#c6538c',
  Vue: '#41b883',
  Svelte: '#ff3e00',
  Dart: '#00B4AB',
  R: '#198CE7',
  Lua: '#000080',
  Elixir: '#6e4a7e',
  Clojure: '#db5855',
  Haskell: '#5e5086',
  Dockerfile: '#384d54',
} as const;

export type CodingLanguage = keyof typeof LANGUAGE_COLORS;

export const PROJECT_SCOPES = [
  {
    en: 'specs',
    ja: '要件定義',
  },
  {
    en: 'HLD',
    ja: '基本設計',
  },
  {
    en: 'LLD',
    ja: '詳細設計',
  },
  {
    en: 'dev',
    ja: '開発',
  },
  {
    en: 'qa',
    ja: 'テスト',
  },
  {
    en: 'ops',
    ja: '運用保守',
  },
] as const;

export const CONTRACT_TYPES = {
  QAContract: {
    en: 'Quasi-Assignment Contract',
    ja: '準委任契約',
  },
  WorkContract: {
    en: 'Work Contract',
    ja: '請負契約',
  },
  Permanent: {
    en: 'Permanent',
    ja: '正社員',
  },
} as const;
export type CONTRACT_TYPE = keyof typeof CONTRACT_TYPES;
