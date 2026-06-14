import { isDarkMode } from './isDarkMode';

export const getDefaultThemeName = () => {
  const themeFromLocalStrage = window.localStorage.getItem('theme');
  if (themeFromLocalStrage === null) {
    return isDarkMode() ? 'dark' : 'light';
  }
  return themeFromLocalStrage;
};
