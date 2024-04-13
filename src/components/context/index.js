"use client";
import { createContext, useReducer } from "react";

export const ProductsContext = createContext();
export const AlertContext = createContext();

function reducer(state, { type, payload }) {
  switch (type) {
    case "ADD_ITEM":
      return [...state, { ...payload, count: 1 }];
    case "INCREMENT":
      return [
        ...state.map((item) => {
          if (item.id === payload) {
            return {
              ...item,
              count: item.count + 1,
            };
          } else return item;
        }),
      ];
    case "DECREMENT":
      const [{ count }] = state.filter(({ id }) => id === payload);

      if (count === 1) {
        return [...state.filter(({ id }) => id !== payload)];
      }

      return [
        ...state.map((item) => {
          if (item.id === payload) {
            return {
              ...item,
              count: item.count - 1,
            };
          } else return item;
        }),
      ];

    case "DELETE_ITEM":
      return [...state.filter(({ id }) => id !== payload)];
  }
}

export function Provider({ children }) {
  const [store, dispatch] = useReducer(reducer, []);

  function addItem(item) {
    dispatch({ type: "ADD_ITEM", payload: item });
  }

  function deleteItem(itemId) {
    dispatch({ type: "DELETE_ITEM", payload: itemId });
  }

  function increment(itemId) {
    dispatch({ type: "INCREMENT", payload: itemId });
  }

  function decrement(itemId) {
    dispatch({ type: "DECREMENT", payload: itemId });
  }

  function checkItem(itemId) {
    return store.filter(({ id }) => id === itemId);
  }

  return (
    <ProductsContext.Provider
      value={{ store, addItem, deleteItem, increment, decrement, checkItem }}>
      {children}
    </ProductsContext.Provider>
  );
}

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
