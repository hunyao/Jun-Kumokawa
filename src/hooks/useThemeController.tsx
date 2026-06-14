import { useContext, useEffect, useState } from 'react';
import { ThemeControlContext } from '#contexts/index';
import { getDefaultThemeName } from '#utils/index';

type ThemeControlCallbackListener = (e: Event) => void;
let listeners: Array<ThemeControlCallbackListener> = [];

export const useThemeController = () => {
  const themeControlRef = useContext(ThemeControlContext);
  const [value, setValue] = useState(getDefaultThemeName() === 'dark');

  const addEventListener = (callback: ThemeControlCallbackListener) => {
    listeners.push(callback);
  };
  const removeEventListener = (callback: ThemeControlCallbackListener) => {
    listeners = listeners.filter((listener) => listener !== callback);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: reason
  useEffect(() => {
    if (
      themeControlRef?.current === undefined ||
      themeControlRef.current === null
    ) {
      return;
    }
    const func = (e: Event) => {
      if (e.target instanceof HTMLInputElement) {
        window.localStorage.setItem(
          'theme',
          e.target.checked ? 'dark' : 'light',
        );
        document.documentElement.setAttribute(
          'data-theme',
          e.target.checked ? 'dark' : 'light',
        );
        setValue(e.target.checked);
      }
      listeners.forEach((listener) => {
        listener(e);
      });
    };
    themeControlRef.current.addEventListener('change', func);

    return () => {
      if (
        themeControlRef?.current === undefined ||
        themeControlRef.current === null
      ) {
        return;
      }
      themeControlRef.current.removeEventListener('change', func);
    };
  }, []);

  return {
    themeControlRef,
    value,
    addEventListener,
    removeEventListener,
  };
};
