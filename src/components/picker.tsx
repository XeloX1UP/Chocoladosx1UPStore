"use client";
import { formatNumberToCLP } from "@/consts";
import { useRouter } from "next/navigation";
import { useState } from "react";
const setCartCookie = ({
  productId,
  cant,
}: {
  productId: number;
  cant: number;
}) => {};
export default function Picker({
  price,
  type,
  btnName,
  id,
}: {
  price: number;
  type: string;
  btnName: string;
  id: number;
}) {
  const [value, setValue] = useState(1);
  const router = useRouter();
  const handleClickAdd = async () => {
    try {
      const data = {
        productId: id,
        cant: value,
      };
      const result: { message: string; code: number } = await fetch(
        "/api/addToCart",
        {
          method: "POST",
          body: JSON.stringify(data),
          credentials: "include",
        }
      ).then((res) => res.json());
      if (result.code === 20 || result.code === 22 || result.code === 24) {
        alert(`Proucto agregado al carrito con éxito`);
        return;
      } else if (result.code === 4 || result.code === 5) {
        alert(result.message);
      }
    } catch (err) {
      // console.log({ err });
    }
  };
  const handleClickBuy = async () => {
    setCartCookie({ productId: id, cant: value });
    router.push(
      `/payDetails/${JSON.stringify([{ productId: id, cant: value }])}`
    );
  };
  return (
    <div>
      <h1 className="text-xl font-bold">¿Cuantos deseas llevar?</h1>
      <div className="flex justify-evenly items-center my-8">
        <button
          onClick={() =>
            setValue((curr) => {
              if (curr <= 1) return 1;
              return curr - 1;
            })
          }
          className="bg-red-500 rounded-md w-[50px] h-[50px]"
        >
          -
        </button>
        <p>{value}</p>
        <button
          onClick={() =>
            setValue((curr) => {
              if (curr >= 10) return 10;
              return curr + 1;
            })
          }
          className="bg-green-500 rounded-md w-[50px] h-[50px]"
        >
          +
        </button>
      </div>
      <p>
        Total: <span>{formatNumberToCLP(price * value)}</span>
      </p>
      <div className="flex justify-end">
        <button
          onClick={type === "add" ? handleClickAdd : handleClickBuy}
          className="bg-[var(--primary-100)] text-[var(--bg-100)] hover:bg-[var(--primary-200)] font-bold shadow-[var(--bg-200)] shadow-md py-1 px-3 rounded-md"
        >
          {btnName}
        </button>
      </div>
    </div>
  );
}
