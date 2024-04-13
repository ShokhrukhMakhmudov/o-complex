"use client";
import { createContext, useEffect, useReducer } from "react";

export const CartContext = createContext();

function reducer(state, { type, payload }) {
  switch (type) {
    case "ADD_STORE":
      return payload;
    case "ADD_ITEM":
      const newData = [...state, { ...payload, count: 1 }];
      localStorage.setItem("store", JSON.stringify(newData));
      return newData;
    case "INCREMENT":
      const incData = [
        ...state.map((item) => {
          if (item.id === payload) {
            return {
              ...item,
              count: item.count + 1,
            };
          } else return item;
        }),
      ];
      localStorage.setItem("store", JSON.stringify(incData));
      return incData;
    case "DECREMENT":
      let decData;
      const [{ count }] = state.filter(({ id }) => id === payload);

      if (count === 1) {
        decData = [...state.filter(({ id }) => id !== payload)];
      } else {
        decData = [
          ...state.map((item) => {
            if (item.id === payload) {
              return {
                ...item,
                count: item.count - 1,
              };
            } else return item;
          }),
        ];
      }
      localStorage.setItem("store", JSON.stringify(decData));
      return decData;

    case "DELETE_ITEM":
      const delData = [...state.filter(({ id }) => id !== payload)];

      localStorage.setItem("store", JSON.stringify(delData));
      return delData;
  }
}

export function CartProvider({ children }) {
  const [store, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("store"))) {
      dispatch({
        type: "ADD_STORE",
        payload: JSON.parse(localStorage.getItem("store")),
      });
    }
  }, []);

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
    <CartContext.Provider
      value={{ store, addItem, deleteItem, increment, decrement, checkItem }}>
      {children}
    </CartContext.Provider>
  );
}
