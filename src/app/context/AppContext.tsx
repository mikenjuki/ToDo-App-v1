"use client";

import { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

export interface AppState {
  theme: string;
  updateTheme: (theme: string) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initialState: AppState = {
    theme: "light",
    updateTheme: (theme: string) => {},
  };

  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Define your action creators
  const updateTheme = (theme: string) => {
    dispatch({ type: "UPDATE_THEME", payload: theme });
  };

  const contextValue: AppState = {
    theme: state.theme,
    updateTheme,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export { AppContext, AppProvider };
