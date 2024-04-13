import React from "react";
import Image from "next/image";
import AddItem from "./AddItem";

export default function ProductItem({ data }) {
  const { id, image_url, title, description, price } = data;
  return (
    <div
      key={id}
      className="min-w-[300px] flex flex-col p-2.5 rounded-2xl bg-[#D9D9D9]">
      <Image
        src={image_url}
        alt="product"
        width={280}
        height={390}
        style={{
          width: "100%",
          height: "auto",
          borderRadius: "15px",
        }}
      />
      <h2 className="text-center text-2xl md:text-4xl py-2 break-words">
        {title}
      </h2>
      <p className="text-xl md:text-2xl flex-grow-[1] break-words">
        {description}
      </p>
      <p className="text-center text-2xl md:text-4xl py-2 mb-5">
        цена: {price}₽
      </p>
      <AddItem item={data} />
    </div>
  );
}
