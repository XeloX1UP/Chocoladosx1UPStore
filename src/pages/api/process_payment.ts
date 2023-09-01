import {
  EMAIL_SENDGRID,
  MP_CREDENTIALS,
  formatNumberToCLP,
  getSubTotal,
  secretJwt,
} from "@/consts";
import { TAddress, TCartItem, TMercadopagoResponseStatus } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { sendEmail } from "@/sendGrid";
import { getUserUID } from "@/services/firebase/auth/app";
import { writeData } from "@/services/firebase/realtimeDB/app";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let isApproved = false;
  if (req.method != "POST")
    return res.status(401).json({ message: "Metodo no autorizado" });
  var mercadopago = require("mercadopago");

  mercadopago.configurations.setAccessToken(MP_CREDENTIALS.secretToken);
  const body: {
    token: string;
    issuer_id: string;
    payment_method_id: string;
    transaction_amount: number;
    installments: number;
    payer: { email: string; identification: { type: string; number: string } };
    cart: TCartItem[];
    address: TAddress;
  } = req.body;
  const payment_data = {
    token: body.token,
    issuer_id: body.issuer_id,
    payment_method_id: body.payment_method_id,
    transaction_amount: body.transaction_amount,
    installments: body.installments,
    payer: {
      email: body.payer.email,
      identification: {
        type: body.payer.identification.type,
        number: body.payer.identification.number,
      },
    },
  };
  const address = body.address;
  const cart = body.cart;
  const user_token = req.cookies["user"];
  if (!user_token)
    return res.json({ message: "Usuario no encontrado", code: 7 });
  const user = jwt.verify(user_token, secretJwt);
  if (typeof user != "string") {
    await mercadopago.payment.create(payment_data).then(function (data: any) {
      if (data["body"]) {
        isApproved = data["body"]["status"] === "approved";
        const payData = {
          id: data["body"]["id"],
          date_approved: data["body"]["date_approved"],
          payment_method_id: data["body"]["payment_method_id"],
          payment_type_id: data["body"]["payment_type_id"],
          payer: data["body"]["payer"],
          status: data["body"]["status"],
          card: data["body"]["card"],
          cart: cart,
          transaction_amount: data["body"]["transaction_amount"],
          delivery_status: isApproved
            ? "Preparando envío"
            : "Pendiente de pago",
          address,
        };

        const htmlCart = cart.map((item) => {
          return `<li>
          <p>Producto: <span>${item.name}</span></p>
          <p>Cantidad: <span>${item.cant}</span></p>
          <p>Precio unitario: <span>${formatNumberToCLP(item.price)}</span></p>
          <p>Total: <span>${formatNumberToCLP(
            item.price * item.cant
          )}</span></p>
          </li>`;
        });

        sendEmail({
          emailTo: `${payData.payer["email"]}`,
          fromEmail: EMAIL_SENDGRID,
          message: `<h1>Pago realizado con éxito</h1><p>Ultimos 4 digitos de tarjeta: ${
            payData.card["last_four_digits"]
          }</p><p>Tipo de tarjeta: ${
            payData.payment_type_id
          }</p><ol>${htmlCart.join(
            ""
          )}</ol><h2>Monto pagado <span>${formatNumberToCLP(
            payData.transaction_amount
          )}</span> (${formatNumberToCLP(
            payData.transaction_amount - getSubTotal({ list: cart })
          )} de delivery)</h2>`,
          subject: `Pago aprobado ID: ${payData.id}`,
          type: "html",
        });
        sendEmail({
          emailTo: "monk.da15@gmail.com",
          fromEmail: EMAIL_SENDGRID,
          message: `<h1>Te han realizado un pago</h1><p>Ultimos 4 digitos de tarjeta: ${
            payData.card["last_four_digits"]
          }</p><p>Tipo de tarjeta: ${
            payData.payment_type_id
          }</p><ol>${htmlCart.join(
            ""
          )}</ol><h2>Monto pagado <span>${formatNumberToCLP(
            payData.transaction_amount
          )}</span> (${formatNumberToCLP(
            payData.transaction_amount - getSubTotal({ list: cart })
          )} de delivery)</h2><br/><h2>Dirección de envío: <strong>${`${payData.address.street} ${payData.address.numeration}, ${payData.address.deliveryLocation}`}</strong></h2>`,
          subject: `Pago aprobado ID: ${payData.id}`,
          type: "html",
        });
        res.setHeader("Set-Cookie", `cart=; expires=${new Date()}; path=/;`);
        return res.status(200).json({
          message: "Pago realizado",
          code: 1,
          payData,
        });
      }
    });
  }

  if (!isApproved) return res.status(200).json({ message: "error", code: 7 });
}
