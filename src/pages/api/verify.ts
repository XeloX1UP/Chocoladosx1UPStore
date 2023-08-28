import { NextApiRequest, NextApiResponse } from "next";
interface IHandleProps extends NextApiRequest {
  query: {
    token: string;
    type: "user";
  };
}
export default function handle(req: IHandleProps, res: NextApiResponse) {
  if (req.method != "GET")
    return res.status(203).json({ message: "Unauthorized" });
  const type = req.query.type;
  const token = req.query.token;
  switch (type) {
    case "user":
      console.log(token);
      return res.json({ message: "funcionando" });
    default:
      return res.status(203).json({ message: "Tipo no válido" });
  }
}
