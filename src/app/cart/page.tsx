import CartList from "@/components/cartList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Carrito",
  description: "Carrito oficial de Chocolados",
};
export default function CartPage() {
  return (
    <div>
      <CartList />
    </div>
  );
}
