"server only";

export async function getReviews() {
  const req = await fetch("http://o-complex.com:1337/reviews");
  const res = await req.json();

  return res;
}
