"use client";

import { TCookieUser, TUserLogin } from "@/types";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  getUserUID,
  signInEmailAndPassword,
} from "@/services/firebase/auth/app";
import GoogleLoginButton from "./googleLoginButton";
import {
  getFromDB,
  getFromDBOneTime,
  writeData,
} from "@/services/firebase/realtimeDB/app";
export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  return (
    <>
      <form
        id="loginForm"
        className="w-min mx-auto bg-[var(--bg-200)] px-10 py-5 rounded-lg my-10 shadow-lg"
        onSubmit={(e) => e.preventDefault()}
      >
        <h3 className="my-3 text-xl">Inicia sesión</h3>
        <input
          type="text"
          placeholder="Correo..."
          className="my-3 rounded-sm py-1 px-2 bg-transparent shadow-black shadow-sm"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Contraseña..."
          className="my-3 rounded-sm py-1 px-2 bg-transparent shadow-black shadow-sm"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <div className="flex justify-end my-2">
          <button
            className="bg-[var(--primary-200)] rounded-md py-1 px-3 text-[var(--bg-100)] font-bold"
            onClick={async () => {
              await signInEmailAndPassword(
                { email, password },
                async (user) => {
                  const cookie_user = await getFromDBOneTime<TCookieUser>({
                    route: "users",
                    id: user.uid,
                  });

                  if (cookie_user) {
                    if (!cookie_user.verified && user.emailVerified) {
                      writeData({
                        object: { ...cookie_user, verified: true },
                        table: "users",
                        id: user.uid,
                      });
                      fetch(
                        `/api/createUserCookie/${encodeURIComponent(
                          JSON.stringify({ ...cookie_user, verified: true })
                        )}`
                      )
                        .then((data) => data.json())
                        .then((response) => {
                          if (response["isValid"]) router.refresh();
                        });
                    } else {
                      fetch(
                        `/api/createUserCookie/${encodeURIComponent(
                          JSON.stringify(cookie_user)
                        )}`
                      )
                        .then((data) => data.json())
                        .then((response) => {
                          if (response["isValid"]) router.refresh();
                        });
                    }
                  }
                }
              );
            }}
          >
            Iniciar sesión
          </button>
        </div>
      </form>
      <div className="w-fit mx-auto">{/* <GoogleLoginButton /> */}</div>
    </>
  );
}
