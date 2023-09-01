import Login from "@/components/login";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { secretJwt } from "@/consts";
import { TCookieUser } from "@/types";
import AccountAccordion from "@/components/accordion/account/accountAccordion";
export default async function AccountPage() {
  const cookieStore = cookies();
  const user_token = cookieStore.get("user")?.value;

  if (user_token) {
    const user = jwt.verify(user_token, secretJwt);
    if (typeof user != "string") {
      const validUser: TCookieUser = {
        email: user["email"],
        name: user["name"],
        phoneNumber: user["phoneNumber"],
        verified: user["verified"],
      };

      return (
        <div className="my-20">
          <AccountAccordion user={validUser} />
        </div>
      );
    }
  }

  return <Login />;
}
