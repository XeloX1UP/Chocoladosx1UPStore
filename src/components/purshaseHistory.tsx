"use client";

import { formatNumberToCLP } from "@/consts";
import AccordionContent from "./accordion/content/accordionContent";
import { useEffect, useState } from "react";
import { TPayHistory } from "@/types";
import { parsePayMethodMP, parseStatusMP } from "@/services/myFunctions/parses";
import { getUserUID } from "@/services/firebase/auth/app";
import { getFromDBOneTime } from "@/services/firebase/realtimeDB/app";
import { orderHistoryByDate } from "@/services/myFunctions/arrays";

export default function PurchaseHistory() {
  const [currentHistory, setCurrentHistory] = useState<TPayHistory[]>();
  useEffect(() => {
    const getHistory = async () => {
      const userUID = getUserUID();
      if (!userUID) return;
      const data = await getFromDBOneTime<{ [key: string]: TPayHistory }>({
        route: "sales",
        id: userUID,
      });
      if (data) {
        setCurrentHistory(() =>
          orderHistoryByDate({ type: "desc", history: Object.values(data) })
        );
      }
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
              title={new Date(item.date_approved).toLocaleDateString()}
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
                  {formatNumberToCLP(item.transaction_amount)}
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
                  {item.payment_method_id}
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
