import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { productList, secretJwt } from "@/consts";
import { TProduct } from "@/types";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookie = req.cookies;
  if (!cookie["cart"])
    return res.status(200).json({ message: "Sin cookie disponible", code: 6 });

  const token = cookie["cart"];
  jwt.verify(token, secretJwt, (err, decodedToken) => {
    if (err) {
      return res.status(200).json({ message: "Carrito no válido", code: 7 });
    } else {
      if (typeof decodedToken === "object") {
        const dataList = Object.values(decodedToken).map((item) => {
          const product = productList.find(
            (product) => product.id === item["productId"]
          );
          if (product) {
            return {
              name: product.name,
              cant: item["cant"],
              price: product.price,
              image: product.image,
              id: product.id,
            };
          }

          return undefined;
        });
        return res
          .status(200)
          .json({ message: "Carrito válido", code: 1, data: dataList });
      }
    }
  });
}
