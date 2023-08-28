import Login from "@/components/login";
import { TProductItem } from "@/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { convertCartToFront, secretJwt } from "@/consts";
import BuyDetails from "@/components/buyDetails";
const validateUserCookie = async (token: string) => {
  const errors: { [key: string]: string } = {};
  jwt.verify(token, secretJwt, (err, decoded) => {
    if (err) {
      errors["invalidToken"] = "Algo salió mal";
    } else {
    }
  });
  if (Object.keys(errors).length > 0) {
    return false;
  }
  return true;
};
const getUser = async () => {
  const cookieStore = cookies();
  const user = cookieStore.get("user")?.value;
  if (user) {
    return await validateUserCookie(user);
  }
};
export default async function Page({ params }: { params: { cart: string } }) {
  const cart: TProductItem[] = JSON.parse(decodeURIComponent(params.cart));
  const list = convertCartToFront({ list: cart });
  const user = await getUser();
  if (!user) return <Login />;
  if (list) return <BuyDetails list={list} />;
  return redirect("/store");
}
