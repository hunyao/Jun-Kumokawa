import type { IncludeLocale } from './utils';

export interface Skill {
  readonly groupName: IncludeLocale<string>;
  readonly colorCode: number[];
  readonly items: Item[];
}

interface Item {
  readonly label: string;
  readonly value: number;
}
