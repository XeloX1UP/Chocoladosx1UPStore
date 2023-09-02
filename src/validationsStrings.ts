import { TError } from "./types";

export const validateName = (value: string, error: TError) => {
  const regEx = /^[a-zA-Zá-úÁ-Ú]+(\s[a-zA-Zá-úÁ-Ú]+)+$/;
  if (!regEx.test(value)) error["name"] = { message: "El nombre es inválido" };
};
export const validateEmail = (value: string, error: TError) => {
  const regEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!regEx.test(value)) error["email"] = { message: "El correo es inválido" };
};
export const validatePhoneNumber = (value: number, error: TError) => {
  const regEx = /^[0-9]{9}$/;
  if (!regEx.test(`${value}`))
    error["phoneNumber"] = { message: "El número de teléfono es inválido" };
};
export const validatePassword = (value: string, error: TError) => {
  const regEx = /^(?=.*[A-Z])(?=.*\d).+$/;
  if (!regEx.test(value))
    error["password"] = {
      message:
        "La contraseña debe ser alfanumérica y contener al menos una mayúscula",
    };
};
export const validateRePassword = (
  value: string,
  reValue: string,
  error: TError
) => {
  if (value != reValue)
    error["rePassword"] = { message: "Las contraseñas no coinciden" };
};
