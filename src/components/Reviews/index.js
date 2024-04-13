import React from "react";
import { getReviews } from "../Hooks/getData";

export default async function Reviews() {
  const data = await getReviews();

  return (
    <section className="mb-10">
      <div className="container grid grid-cols-1 sm:grid-cols-reviews gap-8 justify-center">
        {data &&
          data.map(({ text }, ind) => {
            return (
              <div
                key={ind}
                className="bg-[#D9D9D9] py-[20px] px-[27px] max-w-[468px] rounded-2xl"
                dangerouslySetInnerHTML={{ __html: text }}></div>
            );
          })}
      </div>
    </section>
  );
}
