import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "@/components/navs/navBar";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { secretJwt } from "@/consts";
import { TCookieUser } from "@/types";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Chocolados1UP",
    default: "Chocolados1UP",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        <html lang="es">
          <body
            className={`${inter.className} bg-[var(--bg-100)] text-[var(--text-100)] lg:overflow-x-hidden`}
          >
            <NavBar user={validUser} />
            <div className="">{children}</div>
          </body>
        </html>
      );
    }
  }

  return (
    <html lang="es">
      <body
        className={`${inter.className} bg-[var(--bg-100)] text-[var(--text-100)] lg:overflow-x-hidden`}
      >
        <NavBar />
        <div className="">{children}</div>
      </body>
    </html>
  );
}
