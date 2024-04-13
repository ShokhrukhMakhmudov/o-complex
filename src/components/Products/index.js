"use client";
import React, { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../context/ProductsContext";
import ProductItem from "./ProductItem";

export default function Products() {
  const { data, setData } = useContext(ProductsContext);

  const [currPage, setCurrPage] = useState(1);

  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const onScroll = (e) => {
      setScrollTop(e.target.documentElement.scrollTop);
    };
    if (
      Math.round(scrollTop + document.documentElement.clientHeight) ===
      Math.round(document.documentElement.scrollHeight)
    ) {
      setCurrPage((prev) => prev + 1);
    }
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);

  useEffect(() => {
    const fetchData = async () => {
      const req = await fetch(
        `http://o-complex.com:1337/products?page=${currPage}&page_size=6`
      );
      const res = await req.json();

      if (currPage === 1) {
        return setData([...res?.products]);
      }

      return setData((prev) => [...prev, ...res?.products]);
    };

    fetchData();
  }, [currPage]);

  return (
    <section>
      <div className="container grid grid-cols-1 gap-x-[35px] gap-y-[42px] lg:grid-cols-3 sm:grid-cols-2">
        {data.length ? (
          data?.map((item) => <ProductItem key={item.id} data={item} />)
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </section>
  );
}
