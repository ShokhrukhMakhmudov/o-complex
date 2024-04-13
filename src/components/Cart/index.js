"use client";
import React, { useContext } from "react";
import CartForm from "./Form";
import { ProductsContext } from "../context";

export default function Cart() {
  const { store } = useContext(ProductsContext);
  return (
    <section className="mb-10">
      <div className="container flex justify-center">
        <div className="bg-[#D9D9D9] p-3 rounded-2xl w-full max-w-[700px] flex flex-col gap-4">
          <h3 className="text-2xl md:text-4xl">Добавленные товары</h3>
          <ul className="flex flex-col gap-3">
            {store &&
              store.map(({ id, title, count, price }) => (
                <li key={id} className="flex items-center  justify-between">
                  <p className="min-w-1/3 break-words">{title.slice(0, 15)}</p>
                  <p>x{count}</p>
                  <p className="min-w-1/3">{price * count}₽</p>
                </li>
              ))}
          </ul>
          <CartForm />
        </div>
      </div>
    </section>
  );
}
