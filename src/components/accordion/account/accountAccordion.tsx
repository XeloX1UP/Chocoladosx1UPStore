"use client";
import { TCookieUser, TError } from "@/types";
import AccordionX from "../accordion";
import { useState } from "react";
import AccordionContent from "../content/accordionContent";
import EditableInput from "../../editableInput";
import { validateName, validatePhoneNumber } from "@/validationsStrings";
import { useRouter } from "next/navigation";
import PurchaseHistory from "../../purshaseHistory";
import {
  emailVerification,
  getUserUID,
  logOut,
} from "@/services/firebase/auth/app";
import { writeData } from "@/services/firebase/realtimeDB/app";

export default function AccountAccordion({ user }: { user: TCookieUser }) {
  const [expandedPanel, setExpandedPanel] = useState<string | false>(false);
  const [currentData, setCurrentData] = useState(user);
  const [userChanged, setUserChanged] = useState(false);

  const router = useRouter();

  const handleChange = (panel: string) => (isExpanded: boolean) => {
    setExpandedPanel(isExpanded ? panel : false);
  };
  return (
    <div className="w-11/12 md:w-10/12 mx-auto">
      <AccordionX
        subtitle={user.name}
        plus={user.email}
        title="Cuenta"
        panel={1}
        expanded={expandedPanel === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionContent title="Nombre completo">
          <EditableInput
            type="text"
            value={currentData.name}
            onBlurHandle={(value: string) => {
              const error: TError = {};
              validateName(value, error);
              if (Object.keys(error).length > 0) {
                return alert("El formato del nombre es inválido");
              }
              setCurrentData((current) => {
                return { ...current, name: value };
              });
              setUserChanged(currentData.name != value);
            }}
          />
        </AccordionContent>
        <AccordionContent title="Correo electrónico">
          {currentData.email}
        </AccordionContent>
        <AccordionContent title="Número de teléfono">
          <EditableInput
            type="text"
            value={`${currentData.phoneNumber}`}
            onBlurHandle={(value: string) => {
              const error: TError = {};
              const newPhoneNumber = Number(value);
              validatePhoneNumber(Number(value), error);
              if (Object.keys(error).length > 0) {
                return alert("El formato del número de teléfono es inválido");
              }
              setCurrentData((current) => {
                return { ...current, phoneNumber: newPhoneNumber };
              });
              setUserChanged(currentData.phoneNumber != newPhoneNumber);
            }}
          />
        </AccordionContent>
        {userChanged ? (
          <AccordionContent title="¿Guardar cambios?">
            <button
              className="bg-gradient-to-tr from-green-700 to-green-500 py-1 px-3 rounded-md me-5"
              onClick={() => {
                const uid = `${getUserUID()}`;
                writeData({ object: currentData, table: "users", id: uid });
                setUserChanged(false);
              }}
            >
              Si
            </button>
            <button
              className="bg-gradient-to-tr from-red-700 to-red-500 py-1 px-3 rounded-md"
              onClick={() => {
                setCurrentData({ ...user });
                setUserChanged(false);
              }}
            >
              No
            </button>
          </AccordionContent>
        ) : null}
        <AccordionContent title="Salir de tu cuenta">
          <button
            className="bg-gradient-to-tr from-red-700 to-red-500 mx-auto py-1 px-2 rounded-md"
            onClick={async () => {
              await logOut(async () => {
                await fetch("/api/createUserCookie/delete", {
                  cache: "no-store",
                })
                  .then(async (response) => {
                    const data = await response.json();
                    console.log(data);

                    if (data["isDeleted"]) router.refresh();
                  })
                  .catch((error) => console.log(error));
              });
            }}
          >
            Cerrar sesión
          </button>
        </AccordionContent>
      </AccordionX>
      <AccordionX
        title="Historial de compras"
        subtitle={""}
        panel={2}
        expanded={expandedPanel === "panel2"}
        onChange={handleChange("panel2")}
      >
        <PurchaseHistory />
      </AccordionX>
      <AccordionX
        title="Seguridad"
        subtitle={"Estado de tu cuenta "}
        plus={currentData.verified ? "Verificada" : "Sin verificar"}
        panel={3}
        expanded={expandedPanel === "panel3"}
        onChange={handleChange("panel3")}
      >
        <div className="flex">
          {currentData.verified ? (
            <h1 className="w-fit mx-auto">Tu correo ya está verificado</h1>
          ) : (
            <button
              className="mx-auto text-[var(--primary-200)] italic hover:underline hover:cursor-pointer"
              onClick={async () => {
                emailVerification(async () => {
                  alert(`Correo enviado a ${currentData.email}`);
                  await logOut(async () => {
                    await fetch("/api/createUserCookie/delete", {
                      cache: "no-store",
                    })
                      .then(async (response) => {
                        const data = await response.json();
                        if (data["isDeleted"]) router.refresh();
                      })
                      .catch((err) => console.log(err));
                  });
                });
              }}
            >
              Verificación de correo electrónico
            </button>
          )}
        </div>
      </AccordionX>
    </div>
  );
}
