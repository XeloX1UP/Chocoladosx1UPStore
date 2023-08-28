import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { secretJwt } from "@/consts";
import { logOut, onLoggedStatusChange } from "@/services/firebase/auth/app";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user_token = req.cookies["user"];
  if (!user_token) return res.json({ message: "Token no detectado" });
  const jwtUser = jwt.verify(user_token, secretJwt);
  if (typeof jwtUser != "string") {
    try {
      await logOut().then(() => {
        onLoggedStatusChange({
          handleLogout: () => {
            res.setHeader(
              "Set-Cookie",
              `user=; path=/; expires=${new Date()};`
            );
            res.json({
              message: "Sesion cerrada con exito",
              isValid: true,
            });
          },
        });
      });
    } catch (error) {
      res.json({ message: "Error al cerrar sesion" });
    }
  } else {
    res.json({ message: "Token de usuario corrupto" });
  }
}
