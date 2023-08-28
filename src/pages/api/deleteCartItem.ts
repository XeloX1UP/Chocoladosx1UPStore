import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import {
  convertCartToFront,
  deleteCartCookie,
  productList,
  secretJwt,
} from "@/consts";
import { TProductItem } from "@/types";
interface IDeleteCartItemProps extends NextApiRequest {
  query: {
    id: string;
  };
}
export default function handle(
  req: IDeleteCartItemProps,
  res: NextApiResponse
) {
  if (req.method != "DELETE")
    return res.status(203).json({ message: "Unauthorized", code: 3 });
  try {
    const productId = Number(req.query.id);
    const token = req.cookies["cart"];
    if (token)
      jwt.verify(token, secretJwt, (err, decodedToken) => {
        if (err) {
          return res.status(200).json({ message: "Token inválido" });
        } else {
          if (typeof decodedToken === "object") {
            const preList: TProductItem[] = Object.values(decodedToken);
            const dataList = convertCartToFront({ list: preList }).filter(
              (item) => item?.id != productId
            );
            const newCookie = dataList.map((item) => {
              return {
                productId: item?.id,
                cant: item?.cant,
              };
            });
            if (newCookie.length < 1) deleteCartCookie(res);
            const token = jwt.sign(JSON.stringify(newCookie), secretJwt);
            res.setHeader("Set-Cookie", `cart=${token}; HttpOnly; Path=/;`);
            return res
              .status(200)
              .json({ message: "Carrito válido", code: 1, data: dataList });
          }
        }
      });
  } catch (err) {
    console.log(err);
    return res.status(200).json({ message: "funcionando" });
  }
}
