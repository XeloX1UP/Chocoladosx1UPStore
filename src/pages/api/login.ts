import { TCookieUser, TUserLogin } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { secretJwt } from "@/consts";
import {
  onLoggedStatusChange,
  signInEmailAndPassword,
} from "@/services/firebase/auth/app";
import { getFromDB } from "@/services/firebase/realtimeDB/app";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "POST") return res.json({ message: "Unauthorized" });
  const user: TUserLogin = JSON.parse(req.body);
  try {
    await signInEmailAndPassword(user);
    onLoggedStatusChange({
      handleLogin: ({ user }) => {
        const dbResult = getFromDB<TCookieUser>({
          route: "users",
          id: user.uid,
        });

        if (dbResult) {
          const userCookie: TCookieUser = {
            ...dbResult,
          };
          const token = jwt.sign(JSON.stringify(userCookie), secretJwt);
          const expirationDate = new Date();
          expirationDate.setHours(expirationDate.getHours() + 24);
          res.setHeader(
            "Set-Cookie",
            `user=${token}; path=/; expires=${expirationDate};`
          );
          return res
            .status(200)
            .json({ message: "Logeado con éxito", code: 1 });
        } else {
          return res
            .status(200)
            .json({ message: "Usuario no existe en la base de datos" });
        }
      },
    });
  } catch (error) {
    return res
      .status(200)
      .json({ message: "Usuario no existe en el servidor" });
  }
}
