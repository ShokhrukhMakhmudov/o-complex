"use client";
import { createContext, useReducer } from "react";

export const AlertContext = createContext();

// Alert

function reducerAlert(state, { type, payload, error }) {
  return { type, show: payload, error };
}

export function AlertProvider({ children }) {
  const [status, dispatch] = useReducer(reducerAlert, {
    show: false,
    type: "loader",
  });

  function setAlert({ type = "loader", payload, error = "" }) {
    dispatch({ type, payload, error });
  }
  return (
    <AlertContext.Provider value={{ status, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
}
