export type unpackPromise<T> = T extends Promise<infer R> ? R : T;
export type unpackArray<T> = T extends Array<infer R> ? R : T;
export type StrictString<T, K extends keyof T> = {
  [P in keyof T]: P extends K ? string : T[P];
};
export type Localized<T> = {
  [K in keyof T]: T[K] extends { en: unknown; ja: unknown } ? T[K]['en'] : T[K];
};
export type IncludeLocale<T> = {
  readonly en: T;
  readonly ja: T;
};
