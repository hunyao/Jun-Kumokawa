import {
  createContext,
  type Dispatch,
  type FC,
  type PropsWithChildren,
  type SetStateAction,
  useState,
} from 'react';

type Repository = {
  type: 'success' | 'error';
  message: string;
};

export const RepositoryContext = createContext<Repository | null>(null);
export const SetRepositoryContext = createContext<
  Dispatch<SetStateAction<Repository | null>>
>(() => {});

export const Provider: FC<PropsWithChildren> = ({ children }) => {
  const [repository, setRepository] = useState<Repository | null>(null);
  return (
    <RepositoryContext.Provider value={repository}>
      <SetRepositoryContext.Provider value={setRepository}>
        {children}
      </SetRepositoryContext.Provider>
    </RepositoryContext.Provider>
  );
};
