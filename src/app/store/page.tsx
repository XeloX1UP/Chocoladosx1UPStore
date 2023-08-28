import ProductList from "@/components/productsList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Store",
  description: "Tienda oficial de Chocolados",
};

export default function Store() {
  return (
    <div className="my-14">
      <h1 className="text-center font-bold italic md:text-6xl text-3xl mb-10">
        ChocoladosX1UP
      </h1>
      <div className="w-fit mx-auto text-[var(--primary-200)] italic bg-[var(--bg-200)] py-2 px-4 my-8">
        <p>
          Por el momento, la cantidad máxima por producto es de 10 unidades.
        </p>
        <p>
          Estamos trabajando para quitar esa limitación lo más pronto posible
        </p>
      </div>
      <ProductList />
    </div>
  );
}
