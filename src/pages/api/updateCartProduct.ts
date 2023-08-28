import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import {
  convertCartToFront,
  editCartItemCantValue,
  getCartFromRequest,
  productList,
  secretJwt,
  writeCookie,
} from "@/consts";
import { TProductItem } from "@/types";
interface IHandleRequestProp extends NextApiRequest {
  query: {
    id?: string;
    value?: string;
  };
}

export default function handle(req: IHandleRequestProp, res: NextApiResponse) {
  const { id, value } = req.query;
  if (id && value && req.method === "PUT") {
    const cart: TProductItem[] | undefined = getCartFromRequest(req);
    if (cart) {
      const editedCart = editCartItemCantValue({
        newValue: Number(value),
        cart,
        productID: Number(id),
      });
      writeCookie({ name: "cart", item: editedCart, response: res });
      return res.status(200).json({
        message: "Objeto actualizado con éxito",
        code: 1,
        data: convertCartToFront({ list: editedCart }),
      });
    }

    return res.status(200).json({ message: "El carro no existe", code: 4 });
  } else {
    return res.status(200).json({ message: "Unauthorized", code: 5 });
  }
}
