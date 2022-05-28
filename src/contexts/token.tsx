import React from 'react';
import { useSearchParams } from 'react-router-dom';

export const tokenContext = React.createContext<any>({});
export const { Provider, Consumer } = tokenContext;

const initial = {
  access_token: localStorage.getItem('access_token') || "",
  scope: localStorage.getItem('scope') || "",
  token_type: localStorage.getItem('token_type') || ""
}
export function TokenProvider({ children }: any) {
  const [ state, dispatch ] = React.useState(initial);
  const [ searchParams ] = useSearchParams();
  const params = Object.fromEntries(searchParams.entries())

  React.useEffect(() => {
    let obj = state;
    if (params.access_token) {
      localStorage.setItem('access_token', params.access_token as string);
      obj.access_token = params.access_token;
    }
    if (params.scope) {
      localStorage.setItem('scope', params.scope as string);
      obj.scope = params.scope;
    }
    if (params.token_type) {
      localStorage.setItem('token_type', params.token_type as string);
      obj.token_type = params.token_type;
    }
    dispatch({
      ...obj
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
  Consumer as TokenConsumer
}
export default TokenProvider;

// vim: sw=2:ai
