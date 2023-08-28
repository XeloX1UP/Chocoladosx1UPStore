"use client";
import Picker from "./picker";
import TransitionsModal from "./transitionModal";

export default function PickProductModal({
  cant,
  image,
  description,
  price,
  name,
  btnName,
  className,
  productId,
  type,
}: {
  cant: number;
  image: string;
  description: string;
  price: number;
  name: string;
  btnName: string;
  className: string;
  productId: number;
  type: "add" | "buy";
}) {
  return (
    <TransitionsModal name={btnName} className={className}>
      <div className="flex flex-col">
        <h2 className="font-bold text-[var(--primary-100)] mb-2 md:my-4">{`${name} ${
          cant != 1 ? `- ${cant} unidades` : ""
        }`}</h2>
        <div className="overflow-hidden rounded-full self-center my-4">
          <img
            src={image}
            alt={description}
            className="w-[150px] h-[150px]"
            style={{ objectFit: "cover" }}
          />
        </div>
        <Picker price={price} btnName={btnName} type={type} id={productId} />
      </div>
    </TransitionsModal>
  );
}
