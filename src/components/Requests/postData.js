export async function postItem(data, setAlert) {
  setAlert({ type: "loader", payload: true });
  const req = await fetch("http://o-complex.com:1337/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const res = await req.json();
  console.log(res);

  if (res?.success) {
    setAlert({ type: "success", payload: true });
  } else {
    setAlert({ type: "error", payload: true, error: res?.error });
  }
}
