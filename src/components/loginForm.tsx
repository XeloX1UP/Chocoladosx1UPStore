"use client";

import { TUserLogin } from "@/types";
import { useState } from "react";
import { useRouter } from "next/navigation";
import GoogleLoginButton from "./googleLoginButton";
const fetchLogin = async (user: TUserLogin) => {
  return await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify(user),
  }).then((data) => data.json());
};
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
              const userLoginData = { email, password };
              const result: { message: string; code: number } =
                await fetchLogin(userLoginData);
              if (result.code === 1) {
                router.refresh();
              } else {
                alert(result.message);
              }
            }}
          >
            Iniciar sesión
          </button>
        </div>
      </form>
      <div className="w-fit mx-auto">
        <GoogleLoginButton />
      </div>
    </>
  );
}
