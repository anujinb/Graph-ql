import React, { createContext, useReducer } from 'react';

const initialState = {
  user: 'J',
};
//const initialContext = [{ ...initialState }, () => {}];

export const AuthContext = createContext('');

const firebaseReducer = (state: any, action: { type: any; payload: any }) => {
  switch (action.type) {
    case 'LOGGED_IN_USER':
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

//context provider

export const AuthProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(firebaseReducer, initialState);
  const value = { state, dispatch } as any;
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};
