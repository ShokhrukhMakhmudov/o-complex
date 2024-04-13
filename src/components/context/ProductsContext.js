"use client";
import { createContext, useReducer, useState } from "react";

export const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [data, setData] = useState([]);

  return (
    <ProductsContext.Provider value={{ data, setData }}>
      {children}
    </ProductsContext.Provider>
  );
}
