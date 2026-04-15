import {
  createContext,
  type Dispatch,
  type PropsWithChildren,
  type SetStateAction,
  useState,
} from 'react';

type Toast = {
  type: 'success' | 'error';
  message: string;
};

export const ToastContext = createContext<Toast | null>(null);
export const SetToastContext = createContext<
  Dispatch<SetStateAction<Toast | null>>
>(() => {});

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toast, setToast] = useState<Toast | null>(null);
  return (
    <ToastContext.Provider value={toast}>
      <SetToastContext.Provider value={setToast}>
        {children}
      </SetToastContext.Provider>
    </ToastContext.Provider>
  );
};
