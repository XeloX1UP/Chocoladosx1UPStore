"use client";
import { INewUser, TError } from "@/types";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  validateEmail,
  validateName,
  validatePassword,
  validatePhoneNumber,
  validateRePassword,
} from "@/validationsStrings";

const validateNewUser = ({ user }: { user: INewUser }) => {
  const error: TError = {};
  validateName(user.name, error);
  validateEmail(user.email, error);
  validatePhoneNumber(user.phoneNumber, error);
  validatePassword(user.password, error);
  validateRePassword(user.rePassword, user.password, error);
  if (Object.keys(error).length > 0) return { error };
  return { user };
};
const fetchNewUser = async (data: INewUser) => {
  const result = await fetch("/api/newUser", {
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((data) => data.json())
    .catch((err) => console.log(err));
  return result;
};
export default function CreateAccount() {
  const router = useRouter();
  const [data, setData] = useState<INewUser>({
    email: "",
    password: "",
    name: "",
    rePassword: "",
    phoneNumber: 0,
  });
  const [errors, setErrors] = useState<TError>({});
  const handleClick = async () => {
    const validUser = validateNewUser({ user: data });
    if (validUser.error) {
      setErrors(validUser.error);
      return;
    }
    setErrors({});
    setData(validUser.user);
    const response: { message: string; code: number } = await fetchNewUser(
      data
    );

    if (response.code && response.code === 1) {
      //continuar la compra
      location.reload();
    } else {
      alert(response.message);
    }
  };
  return (
    <form
      className="w-min mx-auto my-10 rounded-md py-5 px-10 shadow-black shadow-lg bg-[var(--bg-200)]"
      onSubmit={(e) => e.preventDefault()}
      id="newUserForm"
    >
      <h3 className="my-3 text-xl">Regístrate</h3>
      <input
        type="text"
        placeholder="Nombre completo..."
        className="my-3 rounded-sm py-1 px-2 bg-transparent shadow-black shadow-sm"
        onChange={(e) => {
          setData({ ...data, name: e.target.value });
        }}
      />
      <p className="text-sm text-red-400 mt-[-10px]">
        {errors["name"]?.message}
      </p>
      <input
        type="text"
        placeholder="Correo..."
        className="my-3 rounded-sm py-1 px-2 bg-transparent shadow-black shadow-sm"
        onChange={(e) => {
          setData({ ...data, email: e.target.value });
        }}
      />
      <p className="text-sm text-red-400 mt-[-10px]">
        {errors["email"]?.message}
      </p>
      <input
        type="text"
        placeholder="Teléfono..."
        className="my-3 rounded-sm py-1 px-2 bg-transparent shadow-black shadow-sm"
        onChange={(e) => {
          setData({ ...data, phoneNumber: Number(e.target.value) });
        }}
      />
      <p className="text-sm text-red-400 mt-[-10px]">
        {errors["phoneNumber"]?.message}
      </p>
      <input
        type="password"
        placeholder="Contraseña..."
        className="my-3 rounded-sm py-1 px-2 bg-transparent shadow-black shadow-sm"
        onChange={(e) => {
          setData({ ...data, password: e.target.value });
        }}
      />
      <p className="text-sm text-red-400 mt-[-10px]">
        {errors["password"]?.message}
      </p>
      <input
        type="password"
        placeholder="Repita contraseña..."
        className="my-3 rounded-sm py-1 px-2 bg-transparent shadow-black shadow-sm"
        onChange={(e) => {
          setData({ ...data, rePassword: e.target.value });
        }}
      />
      <p className="text-sm text-red-400 mt-[-10px]">
        {errors["rePassword"]?.message}
      </p>
      <div className="flex justify-end my-2">
        <button
          onClick={handleClick}
          className="bg-[var(--primary-200)] rounded-md py-1 px-3 text-[var(--bg-100)] font-bold"
        >
          Registrarse
        </button>
      </div>
    </form>
  );
}
