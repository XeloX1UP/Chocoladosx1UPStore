import { createUser } from "@/services/firebase/auth/app";
import { INewUser, TCookieUser } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { secretJwt } from "@/consts";
import { writeData } from "@/services/firebase/realtimeDB/app";
const saveUserToDatabase = async (user: INewUser) => {
  const result = await createUser(user.email, user.password);
  if (result.errors) return { isValid: false };
  const userRecived = result.user["user"];
  const phoneNumber =
    Number(userRecived.phoneNumber) > 0
      ? Number(userRecived.phoneNumber)
      : user.phoneNumber;
  const dbUser: TCookieUser = {
    email: userRecived.email ?? user.email,
    name: userRecived.displayName ?? user.name,
    phoneNumber: phoneNumber,
    verified: userRecived.emailVerified,
  };
  writeData({
    object: dbUser,
    table: "users",
    id: userRecived.uid,
  });
  return { isValid: true, user: dbUser };
};

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "POST")
    return res.status(204).json({ message: "Unauthorized" });
  const newUser: INewUser = JSON.parse(req.body);
  const result = await saveUserToDatabase(newUser);
  if (result.isValid) {
    const token = jwt.sign(JSON.stringify(result.user), secretJwt);
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 24);
    res.setHeader(
      "Set-Cookie",
      `user=${token}; path=/; expires=${expirationDate}`
    );
    return res
      .status(200)
      .json({ message: "Usuario creado con éxito", code: 1 });
  } else {
    return res.status(200).json({ message: "Correo ya existe", code: 10 });
  }
}
