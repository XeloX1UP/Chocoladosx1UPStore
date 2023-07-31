import logo from "@/images/logoNav.png";
import imgProduct1 from "@/images/product-1.jpg";
import imgProduct3 from "@/images/product-3.jpg";
import imgProduct2 from "@/images/product-2.jpg";

export const storeLogo = {
  image: logo.src,
  desc: "Logo de Chocolados1UP",
};

export const productList = [
  {
    id: 1,
    name: "Bombón de coco rallado",
    price: 1500,
    description:
      "Ricos bombones de chocolate blanco o negro, rellenos de coco rallado.",
    cant: 6,
    category: "chocolate",
    image: imgProduct1.src,
  },
  {
    id: 2,
    name: "Crema, mora y frutilla 350cc",
    price: 2000,
    description: "Helado de crema, moras y frutillas en trozos.",
    cant: 1,
    category: "helado",
    image: imgProduct2.src,
  },
  {
    id: 3,
    name: "Crema, coco rallado y chocolate 350cc",
    price: 2500,
    description: "Helado de crema y coco rallado, con cubierta de chocolate. ",
    cant: 1,
    category: "helado",
    image: imgProduct3.src,
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
