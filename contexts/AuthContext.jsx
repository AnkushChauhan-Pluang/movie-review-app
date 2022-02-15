import { createContext, useContext, useReducer } from 'react';

const initialState = {
  token: null,
  user: null,
};

const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return {
        ...state,
        token: action.token,
        user: action.user,
      };
    case 'LOGOUT':
      return {
        ...state,
        token: null,
        user: null,
      };
  }
};

export const AuthContextProvider = ({ children }) => {
  const [loginState, loginDispatch] = useReducer(AuthReducer, initialState);

  return (
    <AuthContext.Provider value={{ loginState, loginDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
