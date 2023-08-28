"use client";
import { TCookieUser, TError } from "@/types";
import AccordionX from "../accordion";
import { useState } from "react";
import AccordionContent from "../content/accordionContent";
import EditableInput from "../../editableInput";
import { validateName, validatePhoneNumber } from "@/validationsStrings";
import { useRouter } from "next/navigation";
import PurchaseHistory from "../../purshaseHistory";

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
              onClick={() => {}}
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
              const result = await fetch("/api/logout").then((data) =>
                data.json()
              );
              if (result["isValid"]) {
                return router.refresh();
              }
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
      {/* <AccordionX
        title="Seguridad"
        subtitle={"Estado de tu cuenta "}
        plus={currentData.verified ? "Verificada" : "Sin verificar"}
        panel={3}
        expanded={expandedPanel === "panel3"}
        onChange={handleChange("panel3")}
      >
        <div className="flex">
          <button className="mx-auto text-[var(--primary-200)] italic hover:underline hover:cursor-pointer">
            Verificación de correo electrónico
          </button>
        </div>
      </AccordionX> */}
    </div>
  );
}
