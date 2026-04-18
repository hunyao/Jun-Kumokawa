import type { IncludeLocale } from './utils';

export interface Profile {
  readonly displayName: string;
  readonly name: IncludeLocale<Name>;
  readonly title: IncludeLocale<string>;
  readonly location: string;
  readonly linkedin: string;
  readonly github: string;
  readonly email: string;
  readonly tel: number[];
  readonly employment: boolean;
}

interface Name {
  readonly fullName: string;
  readonly firstName: string;
  readonly lastName: string;
}
