import type { Localized } from '#types/utils';

export const pickWithLocale = <T extends object>(
  data: T,
  lang: string,
): Localized<T> => {
  return Object.fromEntries(
    Object.entries(data).map(([_key, _content]) => {
      if (
        typeof _content === 'object' &&
        _content !== null &&
        'en' in _content
      ) {
        return [_key, _content[lang as keyof typeof _content]];
      } else {
        return [_key, _content];
      }
    }),
  ) as Localized<T>;
};
