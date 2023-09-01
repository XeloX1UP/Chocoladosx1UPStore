import { TCookieUser } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { secretJwt } from "@/consts";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.query;
  try {
    if (!user || user === "delete") {
      res.setHeader("Set-Cookie", `user=; path=/; expires=${new Date()};`);
      res.json({ isDeleted: true });
    } else {
      const user_cookie: TCookieUser = JSON.parse(`${user}`);
      if (!(Object.keys(user_cookie).length > 0))
        return res.json("Invalid user");
      const token = jwt.sign(`${user}`, secretJwt);
      const currentDate = new Date();
      const expireDate = new Date(
        currentDate.getTime() + 10 * 24 * 60 * 60 * 1000
      );
      res.setHeader(
        "Set-Cookie",
        `user=${token}; expires=${expireDate}; path=/;`
      );
      res.json({ isValid: true });
    }
  } catch (error) {
    res.json({ message: "Something's wrong" });
  }
}
