"use client";
import {
  fetchEditCartProduct,
  formatNumberToCLP,
  getCartFetch,
} from "@/consts";
import { IcoDelete, IcoEdit } from "@/svgExports";
import { TCartItem } from "@/types";
import { useEffect, useState } from "react";
import TransitionsModal from "./transitionModal";
import EditCartProduct from "./editCartProduct";
import CartListDetails from "./cartListDetails";
import { useRouter } from "next/navigation";

export default function CartList() {
  const [data, setData] = useState<TCartItem[]>([]);
  const [newValue, setNewValue] = useState(0);
  useEffect(() => {
    const dataFetch = async () => {
      const response = await getCartFetch();
      if (response.code === 1 && response.data) {
        setData([...response.data]);
      }
    };
    dataFetch();
  }, []);
  const router = useRouter();
  return (
    <div>
      <div>
        {data.length > 0 ? (
          data.map(({ cant, name, price, image, id }, index, current) => {
            return (
              <div
                key={`item${name}Cant${cant}`}
                className="my-10 bg-[var(--bg-200)] py-2 md:py-4 shadow-md shadow-slate-800 rounded-md"
              >
                <div className="md:w-5/6 w-11/12 flex gap-5 mx-auto">
                  <div className="min-w-max">
                    <img
                      src={image}
                      className="w-[130px] h-[130px] object-cover rounded-full"
                    />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-[var(--primary-100)] font-bold">
                      {name}
                    </h1>
                    <p>Precio: {formatNumberToCLP(price)}</p>
                    <p>Cantidad: {cant}</p>
                    <p>
                      Total:{" "}
                      <span className="text-[var(--primary-200)]">
                        {formatNumberToCLP(price * cant)}
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={async () => {
                        const newData: {
                          message: string;
                          code: number;
                          data?: TCartItem[];
                        } = await fetch(`/api/deleteCartItem?id=${id}`, {
                          method: "DELETE",
                        }).then((data) => data.json());
                        if (newData.code === 1 && newData.data) {
                          setData(newData.data);
                        }
                      }}
                      className="text-red-600"
                    >
                      <IcoDelete />
                    </button>
                    <TransitionsModal name={<IcoEdit />}>
                      <EditCartProduct
                        cant={cant}
                        id={id}
                        handleSave={async (value) => {
                          const result: {
                            message: string;
                            code: number;
                            data?: TCartItem[];
                          } = await fetchEditCartProduct({ value, id });
                          if (result.data) setData(result.data);
                        }}
                      />
                    </TransitionsModal>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h3 className="m-16">Aún no tienes productos en tu carro</h3>
        )}
      </div>
      {data.length > 0 ? (
        <div className="my-32">
          <CartListDetails list={data} />
          <div className="flex justify-center">
            <button
              onClick={() =>
                router.push(
                  `/payDetails/${JSON.stringify(
                    data.map((item) => {
                      return {
                        productId: item.id,
                        cant: item.cant,
                      };
                    })
                  )}`
                )
              }
              className="mx-auto mt-10 bg-[var(--primary-100)] text-[var(--bg-100)] py-5 px-10 font-bold rounded-md shadow-black shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Continuar
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
