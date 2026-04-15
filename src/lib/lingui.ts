import { i18n } from '@lingui/core';
import { detect, fromNavigator, fromStorage } from '@lingui/detect-locale';
import { I18nProvider } from '@lingui/react';
import { langs } from '#constants/index';
import { messages as i18nEn } from '../locales/en';
import { messages as i18nJa } from '../locales/ja';

const DEFAULT_FALLBACK = 'en';
const getLanguage = (_langtag: string) => {
  const _language = _langtag.split('-')[0];
  const isSupported = langs.some(({ lang }) => lang === _language);
  return isSupported ? _language : DEFAULT_FALLBACK;
};

const langtag = detect(fromStorage('lang'), fromNavigator()) as string;
const language = getLanguage(langtag);

i18n.load('en', i18nEn);
i18n.load('ja', i18nJa);
i18n.activate(language);

export { I18nProvider, i18n, type langs };
