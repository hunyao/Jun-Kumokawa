import { useContext, useEffect } from 'react';
import { ThemeControlContext } from '#contexts/index';

const isDarkMode = () => {
  if (!window.matchMedia) {
    return false;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

type ThemeControlCallbackListener = (e: Event) => void;
let listeners: Array<ThemeControlCallbackListener> = [];

export const useThemeController = () => {
  const themeControlRef = useContext(ThemeControlContext);
  const value = isDarkMode() ? 'light' : 'dark';

  const addEventListener = (callback: ThemeControlCallbackListener) => {
    listeners.push(callback);
  };
  const removeEventListener = (callback: ThemeControlCallbackListener) => {
    listeners = listeners.filter((listener) => listener !== callback);
  };

  useEffect(() => {
    if (
      themeControlRef?.current === undefined ||
      themeControlRef.current === null
    ) {
      return;
    }
    const func = (e: Event) => {
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
  }, [themeControlRef?.current]);

  return { themeControlRef, value, addEventListener, removeEventListener };
};
