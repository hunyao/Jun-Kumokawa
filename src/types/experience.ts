import type { IncludeLocale } from './utils';

export interface Experience {
  readonly companyName: IncludeLocale<string>;
  readonly employmentType: EmploymentType;
  readonly employedAt: string;
  readonly leftAt: string;
  readonly homepage: string;
  readonly industry: string;
  readonly location: string;
  readonly role: IncludeLocale<string>;
  readonly summary: IncludeLocale<string>;
  readonly projects: Project[];
}

type EmploymentType = 'Permanent' | 'QAContract';

export interface Project {
  readonly name: IncludeLocale<string>;
  readonly size: Size;
  readonly industry: IncludeLocale<string>;
  readonly assignedAt: string;
  readonly leftAt: string;
  readonly scopes: Scope[];
  readonly responsibilities: IncludeLocale<string[]>;
  readonly achievements: IncludeLocale<string[]>;
  readonly techs: Techs;
  readonly role: IncludeLocale<string[]>;
  readonly summary: IncludeLocale<string>;
  readonly industryType: IncludeLocale<string>;
}

type Scope = 'dev' | 'HLD' | 'LLD' | 'ops' | 'qa' | 'specs';

interface Size {
  readonly overall: number;
  readonly team: number;
}

interface Techs {
  readonly languages: string[];
  readonly frameworks: string[];
  readonly libraries: string[];
  readonly databases: string[];
  readonly infrastructures: string[];
  readonly os: string[];
  readonly others: string[];
}
