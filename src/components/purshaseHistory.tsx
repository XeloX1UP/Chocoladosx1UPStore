"use client";

import { formatNumberToCLP } from "@/consts";
import AccordionContent from "./accordion/content/accordionContent";
import { useEffect, useState } from "react";
import { TPayHistory } from "@/types";
import { parsePayMethodMP, parseStatusMP } from "@/services/myFunctions/parses";

export default function PurchaseHistory() {
  const [currentHistory, setCurrentHistory] = useState<TPayHistory[]>();
  useEffect(() => {
    const getHistory = async () => {
      await fetch("/api/getHistory").then(async (data) => {
        const history = await data.json();
        if (history["list"]) {
          const list: TPayHistory[] = history.list;
          setCurrentHistory((current) =>
            list.sort((a, b) => {
              const dateA = new Date(a.date);
              const dateB = new Date(b.date);

              if (dateA < dateB) {
                return 1;
              }
              if (dateA > dateB) {
                return -1;
              }
              return 0;
            })
          );
        }
      });
    };
    getHistory();
  }, []);
  return (
    <>
      {currentHistory ? (
        currentHistory.map((item) => {
          return (
            <AccordionContent
              key={item.id}
              title={new Date(item.date).toLocaleDateString()}
            >
              <p>
                Id:{" "}
                <span className="text-[var(--primary-300)] font-bold">
                  {item.id}
                </span>
              </p>
              <p>
                Pagado:{" "}
                <span className="text-[var(--primary-300)] font-bold">
                  {formatNumberToCLP(item.amount)}
                </span>
              </p>
              <p>
                Método de pago:{" "}
                <span className="text-[var(--primary-300)] font-bold">
                  {parsePayMethodMP({ value: item.type })}
                </span>
              </p>
              <p>
                Tarjeta:{" "}
                <span className="text-[var(--primary-300)] font-bold">
                  {item.method}
                </span>
              </p>
              <p className="">
                Estado:{" "}
                <span className="text-[var(--primary-300)] font-bold">
                  {parseStatusMP({ value: item.status })}
                </span>
              </p>
              <p className="mb-5">
                Estado del envío:{" "}
                <span className="text-[var(--primary-200)] font-bold">
                  {item.delivery_status}
                </span>
              </p>
            </AccordionContent>
          );
        })
      ) : (
        <p className="text-center">Sin historial</p>
      )}
    </>
  );
}
