"server only";

export async function getReviews() {
  const req = await fetch("http://o-complex.com:1337/reviews");
  const res = await req.json();

  return res;
}

export async function getProducts() {
  const req = await fetch(
    "http://o-complex.com:1337/products?page=1&page_size=6"
  );
  const res = await req.json();

  return res;
}
