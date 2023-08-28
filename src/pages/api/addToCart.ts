import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import {
  addProductToCart,
  createCartCookieWhitProduct,
  deleteCartCookie,
  secretJwt,
} from "@/consts";
import { TProductItem } from "@/types";
interface IHandleProps extends NextApiRequest {}

export default async function handle(req: IHandleProps, res: NextApiResponse) {
  if (req.method != "POST")
    return res.status(204).json({ message: "Metodo no permitido", code: 4 });
  const { cant, productId }: { cant: number; productId: number } = JSON.parse(
    req.body
  );
  if (!cant || !productId)
    return res
      .status(205)
      .json({ message: "Cuerpo de la consulta inválida", code: 5 });
  const cookies = req.cookies;
  const userCookies = cookies["user"];
  const cartCookies = cookies["cart"];

  if (cartCookies) {
    jwt.verify(cartCookies, secretJwt, (err, decodedToken) => {
      if (err) {
        deleteCartCookie(res);
        createCartCookieWhitProduct({ productId, cant, res });
        return res
          .status(200)
          .json({ message: "Agregado con éxito", code: 24 });
      } else {
        addProductToCart({
          productId,
          cant,
          res,
          decodedToken: JSON.stringify(decodedToken),
        });
        return res
          .status(200)
          .json({ message: "Agregado con éxito", code: 22 });
      }
    });
  } else {
    createCartCookieWhitProduct({ productId, cant, res });

    res.status(200).json({ message: "Agregado con éxito", code: 20 });
  }
}
