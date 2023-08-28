import { getUserUID } from "@/services/firebase/auth/app";
import { getFromDB } from "@/services/firebase/realtimeDB/app";
import { TCartItem, TPayHistory } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userUID = getUserUID();

  if (!userUID) return res.json({ message: "Usuario inválido" });
  const history = getFromDB<{
    [key: string]: {
      transaction_amount: number;
      cart: TCartItem[];
      payment_method_id: string;
      payment_type_id: string;
      id: string;
      status: string;
      date_approved: string;
      delivery_status: string;
    };
  }>({ route: "sales", id: userUID });
  if (history) {
    const list: TPayHistory[] = Object.values(history).map((historyItem) => {
      const out: TPayHistory = {
        amount: historyItem["transaction_amount"],
        cart: historyItem["cart"],
        method: historyItem["payment_method_id"],
        type: historyItem["payment_type_id"],
        id: historyItem["id"],
        status: historyItem["status"],
        date: historyItem["date_approved"],
        delivery_status: historyItem["delivery_status"],
      };
      return out;
    });
    return res.json({ message: "Historial cargado con éxito", list });
  } else {
    return res.json({ message: "Aun no realizas ninguna compra" });
  }
}
