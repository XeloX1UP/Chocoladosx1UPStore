import logo from "@/images/logoNav.png";
import imgProduct1 from "@/images/product-1.jpg";
import imgProduct2 from "@/images/product-2.jpg";
import imgProduct3 from "@/images/product-3.jpg";
import imgProduct4 from "@/images/product-4.jpg";
import imgProduct5 from "@/images/product-5.jpg";
import imgProduct6 from "@/images/product-6.jpg";
import imgProduct7 from "@/images/product-7.jpg";
import {
  TProductItem,
  TProduct,
  TValidateCookieParams,
  TCartItem,
} from "./types";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export const storeLogo = {
  image: logo.src,
  desc: "Logo de Chocolados1UP",
};

export const productList: TProduct[] = [
  {
    id: 1,
    name: "Bombón de coco rallado",
    price: 1500,
    description:
      "Ricos bombones de chocolate blanco o negro, rellenos de coco rallado.",
    cant: 6,
    category: "chocolats",
    image: imgProduct1.src,
  },
  {
    id: 2,
    name: "Crema, mora y frutilla 350cc",
    price: 2000,
    description: "Helado de crema, moras y frutillas en trozos.",
    cant: 1,
    category: "icecreams",
    image: imgProduct2.src,
  },
  {
    id: 3,
    name: "Crema, coco rallado y chocolate 350cc",
    price: 2500,
    description: "Helado de crema y coco rallado, con cubierta de chocolate. ",
    cant: 1,
    category: "icecreams",
    image: imgProduct3.src,
  },
  {
    id: 4,
    name: "Alfajores rellenos con manjar",
    price: 1000,
    description: "Alfajores bañados en chocolate rellenos con manjar.",
    cant: 1,
    category: "chocolats",
    image: imgProduct4.src,
  },
  {
    id: 5,
    name: "Torta piña y crema - 10 personas",
    price: 15000,
    description: "Torta para 10 personas piña, manjar y crema.",
    cant: 1,
    category: "chocolats",
    image: imgProduct5.src,
  },
  {
    id: 6,
    name: "Alfajores con mantequilla de maní",
    price: 1000,
    description:
      "Alfajores rellenos de mantequilla de maní y manjar, cubiertos de chocolate.",
    cant: 1,
    category: "icecreams",
    image: imgProduct6.src,
  },
  {
    id: 7,
    name: "Katarinas de cacao",
    price: 1500,
    description: "Calugas de cacao caseras bañadas con chispas de colores.",
    cant: 6,
    category: "chocolats",
    image: imgProduct7.src,
  },
];

export function formatNumberToCLP(number: number): string {
  // Formatear el número a formato de moneda chilena (CLP)
  const formattedNumber = number.toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
  });

  // Devolver el resultado formateado
  return formattedNumber;
}
export const getCartFetch = async () => {
  const result: { message: string; code: number; data?: TCartItem[] } =
    await fetch("/api/getCart", {
      method: "GET",
    }).then((data) => data.json());
  return result;
};
export const secretJwt = `${process.env.JWT_SECRET}`;

export const createCartCookieWhitProduct = ({
  productId,
  cant,
  res,
}: {
  productId: number;
  cant: number;
  res: NextApiResponse;
}) => {
  const token = jwt.sign(JSON.stringify([{ productId, cant }]), secretJwt);
  res.setHeader("set-cookie", `cart=${token}; HttpOnly; Path=/;`);
};
export const deleteCartCookie = (res: NextApiResponse) => {
  res.setHeader(
    "Set-Cookie",
    "cart=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
  );
};
export const addProductToCart = ({
  productId,
  cant,
  res,
  decodedToken,
}: {
  productId: number;
  cant: number;
  res: NextApiResponse;
  decodedToken: string;
}) => {
  const actualCookie: TProductItem[] = JSON.parse(decodedToken);
  actualCookie.push({ productId, cant });
  const newCookie = groupByProductId(actualCookie).map((item) => {
    return { ...item, cant: item.cant > 9 ? 10 : item.cant };
  });
  const token = jwt.sign(JSON.stringify(newCookie), secretJwt);
  deleteCartCookie(res);
  res.setHeader("Set-Cookie", `cart=${token}; HttpOnly; Path=/`);
};
export const groupByProductId = (list: TProductItem[]) => {
  const groupedProducts: { [key: string]: number } = {};

  list.forEach((item) => {
    const { productId, cant } = item;
    if (groupedProducts[productId]) {
      groupedProducts[productId] += cant;
    } else {
      groupedProducts[productId] = cant;
    }
  });
  const result: TProductItem[] = Object.keys(groupedProducts).map(
    (productId) => ({
      productId: Number(productId),
      cant: groupedProducts[Number(productId)],
    })
  );
  return result;
};

export const fetchEditCartProduct = async ({
  value,
  id,
}: {
  value: number;
  id: number;
}) => {
  const result = await fetch(`/api/updateCartProduct?id=${id}&value=${value}`, {
    method: "PUT",
  }).then((data) => data.json());
  return result;
};

interface IHandleRequestProp extends NextApiRequest {
  query: {
    id?: string;
    value?: string;
  };
}
export const getCartFromRequest = (req: IHandleRequestProp) => {
  const cart = req.cookies["cart"];
  if (!cart) return undefined;
  const verifiedToken = jwt.verify(cart, secretJwt);
  if (typeof verifiedToken != "string") return Object.values(verifiedToken);
  return undefined;
};
export const editCartItemCantValue = ({
  newValue,
  productID,
  cart,
}: {
  newValue: number;
  productID: number;
  cart: TProductItem[];
}) => {
  return cart.map((cartItem) => {
    if (cartItem["productId"] == productID) {
      return { productId: cartItem["productId"], cant: Number(newValue) };
    }
    return cartItem;
  });
};
export const writeCookie = ({
  name,
  item,
  response,
}: {
  name: string;
  item: TProductItem[];
  response: NextApiResponse;
}) => {
  const token = jwt.sign(JSON.stringify(item), secretJwt);
  response.setHeader("Set-Cookie", `${name}=${token}; HttpOnly; Path=/;`);
};
export const convertCartToFront = ({ list }: { list: TProductItem[] }) => {
  return list.map((item) => {
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
    return {
      name: "",
      cant: 0,
      price: 0,
      image: "",
      id: 0,
    };
  });
};
export const getSubTotal = ({ list }: { list: TCartItem[] }) => {
  let subtotal = 0;
  list.forEach(({ price, cant }) => {
    subtotal += price * cant;
  });
  return subtotal;
};
export const locationsList = {
  Algarrobo: ["Localidad A", "Localidad B", "Localidad C"],
  "El Quisco": ["Localidad X", "Localidad Y", "Localidad Z"],
  "El Tabo": ["Localidad 1", "Localidad 2"],
  Cartagena: ["Localidad P", "Localidad Q", "Localidad R"],
  "San Antonio": ["Localidad M", "Localidad N"],
  Barrancas: ["Localidad G", "Localidad H"],
  Llolleo: ["Localidad K", "Localidad L"],
};

export const MP_CREDENTIALS = {
  plublicKey: "APP_USR-fcc3cc0f-6c03-4390-a8a0-8d5e321378ee",
  secretToken: `${process.env.MP_SECRET_TOKEN}`,
};
export const GOOGLE_MAPS_API_KEY = `${process.env.GOOGLE_MAPS_KEY}`;
export const EMAIL_SENDGRID = `${process.env.EMAIL_SENDGRID}`;
