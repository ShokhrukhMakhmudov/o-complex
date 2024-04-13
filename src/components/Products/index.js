import React from "react";
import { getProducts } from "../Hooks/getData";
import ProductItem from "./ProductItem";

export default async function Products() {
  const { products: data } = await getProducts();
  return (
    <section>
      <div className="container grid grid-cols-1 gap-x-[35px] gap-y-[42px] lg:grid-cols-3 sm:grid-cols-2">
        {data && data?.map((item) => <ProductItem key={item.id} data={item} />)}
      </div>
    </section>
  );
}
