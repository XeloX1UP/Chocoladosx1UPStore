import { DOMAIN_APP } from "@/consts";
import { NextApiRequest, NextApiResponse } from "next";

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const host = req.headers.host;
  if (host != DOMAIN_APP) return res.json({ message: "Acceso restringido" });
  try {
    res.json({ message: "hola" });
  } catch (error) {
    console.log({ error });
  }
};
export default handle;
