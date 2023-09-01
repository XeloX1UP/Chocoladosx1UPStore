import Login from "@/components/login";
import { TCookieUser, TProductItem } from "@/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { convertCartToFront, secretJwt } from "@/consts";
import BuyDetails from "@/components/buyDetails";
import { validatePhoneNumber } from "@/validationsStrings";
const validateUserCookie = (token: string): TCookieUser | undefined => {
  const userJwt = jwt.verify(token, secretJwt);
  if (typeof userJwt != "string") {
    const user: TCookieUser = {
      email: userJwt["email"],
      name: userJwt["name"],
      phoneNumber: userJwt["phoneNumber"],
      verified: userJwt["verified"],
    };
    return user;
  }
};
const getUser = () => {
  const cookieStore = cookies();
  const user = cookieStore.get("user")?.value;
  if (user) {
    return validateUserCookie(user);
  }
};
export default async function Page({ params }: { params: { cart: string } }) {
  const cart: TProductItem[] = JSON.parse(decodeURIComponent(params.cart));
  const list = convertCartToFront({ list: cart });
  const user = getUser();
  if (!user) return <Login />;
  if (user.phoneNumber === 0) {
    alert("Debes actualizar tu número de teléfono antes de poder comprar");
    redirect("/account");
  }
  if (list) return <BuyDetails list={list} />;
  return redirect("/store");
}
