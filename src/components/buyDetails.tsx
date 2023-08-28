"use client";
import { TCartItem } from "@/types";
import CartListDetails from "./cartListDetails";
import LocationSelect from "./locationSelect";
import { useState } from "react";
import { formatNumberToCLP, getSubTotal } from "@/consts";
import { useRouter } from "next/navigation";
import TransitionsModal from "./transitionModal";
import MercadoPago from "@/app/payDetails/[cart]/paymentMethods/mercadoPago";
const payMethods = [
  {
    name: "Pagar con MercadoPago",
    className:
      "inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105",
  },
];
const validateDeliveryDetails = async ({
  numeration,
  street,
  location,
}: {
  numeration: number;
  street: string;
  location: string;
}) => {
  const address = `${street} ${numeration}, ${location}`;
  const result = await fetch(
    `/api/findLocation?address=${encodeURIComponent(address)}`
  ).then((data) => data.json());
  if (result["error"]) return false;
  return true;
};
export default function BuyDetails({ list }: { list: TCartItem[] }) {
  const [deliveryCost, setDeliveryCost] = useState<number>(0);
  const [street, setStreet] = useState<string | undefined>();
  const [deliveryLocation, setDeliveryLocation] = useState<
    string | undefined
  >();
  const [numeration, setNumeration] = useState<number | undefined>();
  const [isValid, setIsValid] = useState(false);
  const subTotal = getSubTotal({ list });
  const router = useRouter();
  if (!(subTotal > 0)) router.push("/store");
  const onBlurHandle = async () => {
    if (
      street &&
      street != "" &&
      deliveryLocation &&
      deliveryLocation != "" &&
      numeration &&
      numeration > 0
    ) {
      setIsValid(
        await validateDeliveryDetails({
          numeration,
          street,
          location: deliveryLocation,
        })
      );
    } else {
      setIsValid(false);
    }
  };
  const handleLocationChange = (location: string) => {
    switch (location) {
      case "Algarrobo":
        setDeliveryCost(5000);
        break;
      case "El Quisco":
        setDeliveryCost(4000);
        break;
      case "El Tabo":
        setDeliveryCost(3000);
        break;
      case "Cartagena":
        setDeliveryCost(2000);
        break;
      case "San Antonio":
        setDeliveryCost(3000);
        break;
      case "Barrancas":
        setDeliveryCost(4000);
        break;
      case "Llolleo":
        setDeliveryCost(5000);
        break;
      default:
        setDeliveryCost(0);
        break;
    }
    setDeliveryLocation(location);
  };
  const handleStreetChange = (street: string) => {
    setStreet(street);
  };
  const handleNumerationChange = (numeration: number) => {
    setNumeration(numeration);
  };

  return (
    <section>
      <div className="w-11/12 mx-auto my-10">
        <CartListDetails list={list} />
        <LocationSelect
          onSelectChange={handleLocationChange}
          onNumerationChange={handleNumerationChange}
          onStreetChange={handleStreetChange}
          onBlurHandle={onBlurHandle}
        />
        {isValid ? (
          <div
            key={"validDiv"}
            className="bg-[var(--bg-300)] rounded py-3 px-6 flex flex-wrap"
          >
            <div className="flex-1 text-xl">
              <p className="text-[var(--primary-100)] my-3">
                Costo de envío:{" "}
                <span className="text-[var(--text-100)]">
                  {formatNumberToCLP(deliveryCost)}
                </span>
              </p>
              <p className="text-[var(--primary-100)] my-3">
                Subtotal productos:{" "}
                <span className="text-[var(--text-100)]">
                  {formatNumberToCLP(subTotal)}
                </span>
              </p>
              <hr />
              <p className="text-[var(--primary-100)] my-3">
                Total:{" "}
                <span className="text-[var(--text-100)] italic font-bold">
                  {formatNumberToCLP(subTotal + deliveryCost)}
                </span>
              </p>
            </div>
            <div className="flex-1 flex flex-col justify-center items-center">
              <h3 className="text-xl font-bold mb-3">Formas de pago</h3>
              {payMethods.map(({ name, className }) => {
                return (
                  <TransitionsModal
                    name={name}
                    className={`${className} my-4`}
                    key={`${name}methodkey`}
                  >
                    <div className="overflow-auto max-h-[calc(100vh-150px)] p-4 flex justify-center">
                      <MercadoPago
                        amount={subTotal + deliveryCost}
                        cart={list}
                        address={{
                          deliveryLocation: deliveryLocation
                            ? deliveryLocation
                            : "",
                          numeration: numeration ? numeration : 0,
                          street: street ? street : "",
                        }}
                      />
                    </div>
                  </TransitionsModal>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
