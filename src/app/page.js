import Alert from "@/components/Alert";
import Cart from "@/components/Cart";
import Header from "@/components/Header";
import Products from "@/components/Products";
import Reviews from "@/components/Reviews";
import { CartProvider } from "@/components/context/CartContext";
import { AlertProvider } from "@/components/context/AlertContext";
import { ProductsProvider } from "@/components/context/ProductsContext";

export default function Home() {
  return (
    <>
      <AlertProvider>
        <Header />
        <main>
          <Reviews />
          <CartProvider>
            <Cart />
            <ProductsProvider>
              <Products />
            </ProductsProvider>
          </CartProvider>
          <Alert />
        </main>
      </AlertProvider>
    </>
  );
}
