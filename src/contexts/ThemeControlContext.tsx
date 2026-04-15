import {
  createContext,
  type PropsWithChildren,
  type RefObject,
  useRef,
} from 'react';

type ThemeControl = RefObject<HTMLInputElement | null> | undefined;
export const ThemeControlContext = createContext<ThemeControl>(undefined);

export const ThemeControlProvider = ({ children }: PropsWithChildren) => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <ThemeControlContext.Provider value={ref}>
      {children}
    </ThemeControlContext.Provider>
  );
};
