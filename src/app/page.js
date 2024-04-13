import Alert from "@/components/Alert";
import Cart from "@/components/Cart";
import Header from "@/components/Header";
import Products from "@/components/Products";
import Reviews from "@/components/Reviews";
import { AlertProvider, Provider } from "@/components/context";

export default function Home() {
  return (
    <>
      <AlertProvider>
        <Header />
        <main>
          <Reviews />
          <Provider>
            <Cart />
            <Products />
          </Provider>
          <Alert />
        </main>
      </AlertProvider>
    </>
  );
}
