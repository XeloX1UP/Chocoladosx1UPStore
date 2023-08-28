import { GOOGLE_MAPS_API_KEY } from "@/consts";
import { ResponseGoogleMapsApi } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const address = req.query["address"];
  const id = req.query["id"];

  if (!address) return res.json({ error: "Dirección inválida" });
  if (typeof address != "string")
    return res.json({ error: "Dirección inválida" });
  const result: ResponseGoogleMapsApi = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${GOOGLE_MAPS_API_KEY}`
  ).then((data) => data.json());
  if (result.status != "OK")
    return res.json({ error: "Dirección no encontrada" });
  // const place_id = result.results[0].place_id;
  // const realAddress = await fetch(
  //   `https://maps.googleapis.com/maps/api/geocode/json?place_id=${place_id}&key=${GOOGLE_MAPS_API_KEY}`
  // ).then((data) => data.json());

  res.json({ isValid: true });
}
