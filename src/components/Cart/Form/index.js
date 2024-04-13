"use client";
import { CartContext } from "@/components/context/CartContext";
import { AlertContext } from "@/components/context/AlertContext";
import { postItem } from "@/components/Requests/postData";
import React, { useState, useContext, useEffect } from "react";
export default function CartForm() {
  const { store } = useContext(CartContext);
  const { setAlert } = useContext(AlertContext);
  const [phone, setPhone] = useState("+7(___) ___ __-__");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (
      phone
        .slice(1)
        .replaceAll("(", "")
        .replaceAll(")", "")
        .replaceAll(" ", "")
        .replaceAll("-", "")
        .replaceAll("_", "") === "7"
    ) {
      return setPhone(localStorage.getItem("phone"));
    }
    localStorage.setItem("phone", phone);
  }, [phone]);

  function inputPhone(e) {
    console.log(e?.nativeEvent?.data);
    const inputItem = e?.nativeEvent?.data;

    if (inputItem === null) {
      // удаление последней цифры
      if (phone.slice(-1) !== "_") {
        return setPhone((prev) => prev.slice(0, -1) + "_");
      }

      let index = phone.indexOf("_");

      // останавливаем чтобы не удалить код (+7)
      if (index === 3) {
        return;
      }

      // перемешаем индекс чтобы пропустить скобки или пустые поля ("(", ")"," ", "-")
      while (
        index > 1 &&
        (phone[index - 1] === "-" ||
          phone[index - 1] === " " ||
          phone[index - 1] === ")" ||
          phone[index - 1] === "(")
      ) {
        index -= 1;
      }
      return setPhone(
        (prev) => prev.slice(0, index - 1) + "_" + prev.slice(index)
      );
    }
    if (!isNaN(+inputItem) && inputItem !== " ") {
      setPhone((prev) => prev.replace("_", inputItem));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (phone.slice(-1) === "_") {
      setError(true);
      return setTimeout(() => {
        setError(false);
      }, 3000);
    }

    console.log({
      phone: phone
        .slice(1)
        .replaceAll("(", "")
        .replaceAll(")", "")
        .replaceAll(" ", "")
        .replaceAll("-", ""),
      cart: store.map(({ id, count }) => ({ id, quantity: count })),
    });
    return postItem(
      {
        phone: phone
          .slice(1)
          .replaceAll("(", "")
          .replaceAll(")", "")
          .replaceAll(" ", "")
          .replaceAll("-", ""),
        cart: store.map(({ id, count }) => ({ id, quantity: count })),
      },
      setAlert
    );
  }

  return (
    <form className="flex gap-2 flex-col sm:flex-row" onSubmit={handleSubmit}>
      <label
        className="h-auto flex items-center bg-[#222] text-white py-2 px-1 rounded-2xl text-2xl md:text-3xl"
        style={
          error
            ? {
                border: "2px solid red",
                color: "red",
                flexDirection: "column",
                padding: "8px 1px",
              }
            : {}
        }>
        <input
          className="w-full sm:w-auto max-w-[400px] border-none px-2 outline-none bg-[inherit] "
          type="tel"
          inputMode="numeric"
          value={phone}
          onChange={inputPhone}
          maxLength={18}
        />
        {error && (
          <p className="text-sm md:text-lg">Номер введён не полностью!</p>
        )}
      </label>

      <button
        className="w-full bg-[#222] rounded-2xl py-3 px-4 text-white text-2xl md:text-4xl"
        type="submit">
        заказать
      </button>
    </form>
  );
}
