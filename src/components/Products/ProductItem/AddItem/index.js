"use client";

import React, { useContext } from "react";
import { ProductsContext } from "@/components/context";

export default function AddItem({ item }) {
  const { store, addItem, deleteItem, increment, decrement, checkItem } =
    useContext(ProductsContext);

  const [data] = checkItem(item.id);

  return (
    <div className="w-full flex items-center gap-2 text-2xl md:text-4xl text-white text-center">
      {data ? (
        <>
          <button
            className="w-full bg-[#222] rounded-2xl p-3"
            onClick={() => decrement(item.id)}>
            -
          </button>
          <p className="w-full bg-[#222] rounded-2xl py-3 px-5">
            {data?.count}
          </p>
          <button
            className="w-full bg-[#222] rounded-2xl p-3"
            onClick={() => increment(item.id)}>
            +
          </button>
        </>
      ) : (
        <button
          className="w-full bg-[#222] rounded-2xl py-3"
          onClick={() => addItem(item)}>
          купить
        </button>
      )}
    </div>
  );
}
