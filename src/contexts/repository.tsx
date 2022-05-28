import React from 'react';
import axios from 'axios';

export const repositoryContext = React.createContext<any>({});
export const { Provider, Consumer } = repositoryContext;

const initial = {
  branches: null,
  tags: null,
  commits: null,
  currentBranch: null
}
export function RepositoryProvider({ children }: any) {
  const [ state, dispatch ] = React.useState(initial);

  React.useEffect(() => {
    axios({
      method: "get",
      url: "/repository",
      baseURL: "/api"
    })
    .then(({ data }) => {
      dispatch(data);
    })
  }, [])

  return (
    <>
      <Provider value={{ state, dispatch }}>
        {children}
      </Provider>
    </>
  )
}
export {
  Consumer as RepositoryConsumer
}
export default RepositoryProvider;

// vim: sw=2:ai
