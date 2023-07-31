import ProductList from "@/components/productsList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Store",
  description: "Tienda oficial de Chocolados",
};

export default function Store() {
  return (
    <div className="my-10">
      <ProductList />
    </div>
  );
}
