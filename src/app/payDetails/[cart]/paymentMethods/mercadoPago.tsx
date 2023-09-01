"use client";
import TransitionsModal from "@/components/transitionModal";
import { MP_CREDENTIALS } from "@/consts";
import { getUserUID } from "@/services/firebase/auth/app";
import { writeData } from "@/services/firebase/realtimeDB/app";
import { parsePayMethodMP, parseStatusMP } from "@/services/myFunctions/parses";
import { TAddress, TCartItem, TMercadopagoApiResponse } from "@/types";
import { Payment } from "@mercadopago/sdk-react";
import { initMercadoPago } from "@mercadopago/sdk-react";
import { useState } from "react";
initMercadoPago(MP_CREDENTIALS.plublicKey, { locale: "es-CL" });

export default function MercadoPago({
  amount,
  preferenceId,
  handleResponse,
  cart,
  address,
}: {
  amount: number;
  preferenceId?: string;
  handleResponse?: (res: TMercadopagoApiResponse) => void;
  cart: TCartItem[];
  address: TAddress;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [payData, setPayData] = useState<any>();
  const defaultHandle = () => {};
  const initialization = {
    amount: amount,
    preferenceId: `${preferenceId ? preferenceId : ""}`,
  };

  const onSubmit = async ({ selectedPaymentMethod, formData }: any) => {
    // callback llamado al hacer clic en el botón enviar datos
    return await new Promise<void>((resolve, reject) => {
      fetch("/api/process_payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, cart: cart, address }),
      })
        .then((response) => response.json())
        .then((response) => {
          // recibir el resultado del pago
          resolve();
          handleResponse ? handleResponse(response) : defaultHandle();
          if (response["payData"]) {
            const userUID = `${getUserUID()}`;
            setPayData(() => response["payData"]);
            writeData({
              object: response["payData"],
              table: `sales/${userUID}`,
              id: response["payData"]["id"],
            });
            setIsOpen(true);
          }
        })
        .catch((error) => {
          // manejar la respuesta de error al intentar crear el pago

          reject();
        });
    });
  };
  const onError = async (error: any) => {
    // callback llamado para todos los casos de error de Brick
    console.log(error);
  };
  const onReady = async () => {
    /*
      Callback llamado cuando el Brick está listo.
      Aquí puede ocultar cargamentos de su sitio, por ejemplo.
    */
  };
  return (
    <div>
      {isOpen ? (
        <TransitionsModal
          name={"Ver detalles"}
          className="text-[var(--primary-200)]"
          isOpen={true}
          redirect="/store"
        >
          <div className="m-4">
            <h1 className="text-3xl font-bold mb-3 text-[var(--primary-100)]">
              Pago realizado con éxito
            </h1>
            <div>
              <h2>
                Número de transacción:{" "}
                <span className="text-[var(--primary-200)] italic font-bold">{`${payData["id"]}`}</span>
              </h2>
              <h2>
                Estado:{" "}
                <span className="text-[var(--primary-200)] italic font-bold">
                  {parseStatusMP({ value: `${payData["status"]}` })}
                </span>
              </h2>
              <h2>
                Fecha de pago:{" "}
                <span className="text-[var(--primary-200)] italic font-bold">{`${new Date(
                  payData["date_approved"]
                ).toLocaleDateString()}`}</span>
              </h2>
              <h2>
                Método de pago:{" "}
                <span className="text-[var(--primary-200)] italic font-bold">
                  {parsePayMethodMP({ value: `${payData["payment_type_id"]}` })}
                </span>
              </h2>
              <h2>
                Tarjeta:{" "}
                <span className="text-[var(--primary-200)] italic font-bold">{`${payData["payment_method_id"]}`}</span>
              </h2>
              <h2>
                Ultimos 4 digitos:{" "}
                <span className="text-[var(--primary-200)] italic font-bold">{`${payData["card"]["last_four_digits"]}`}</span>
              </h2>
              <h2>
                Correo:{" "}
                <span className="text-[var(--primary-200)] italic font-bold">{`${payData["payer"]["email"]}`}</span>
              </h2>
            </div>
            <p className="mt-4">
              Se ha enviado un correo a{" "}
              <span className="text-[var(--text-200)]">
                {payData["payer"]["email"]}
              </span>
            </p>
          </div>
        </TransitionsModal>
      ) : (
        <Payment
          initialization={initialization}
          customization={{
            paymentMethods: {
              creditCard: "all",
              debitCard: "all",
              mercadoPago: "all",
            },
          }}
          onSubmit={onSubmit}
          onError={onError}
        />
      )}
    </div>
  );
}
