import { formatNumberToCLP, getSubTotal } from "@/consts";
import { TCartItem } from "@/types";

export default function CartListDetails({ list }: { list: TCartItem[] }) {
  return (
    <section className="bg-[var(--bg-300)] shadow-md rounded-md py-3 px-6">
      <div className="flex text-xl mb-3">
        <h4 className="flex-1 text-[var(--primary-100)] font-bold text-sm md:text-2xl">
          Producto
        </h4>
        <p className="flex-1 text-[var(--primary-100)] font-bold text-sm md:text-2xl">
          Cantidad
        </p>
        <p className="flex-1 text-[var(--primary-100)] font-bold text-sm md:text-2xl">
          Valor
        </p>
        <p className="flex-1 text-[var(--primary-100)] font-bold text-sm md:text-2xl">
          Total
        </p>
      </div>
      {list.map(({ cant, id, image, name, price }) => {
        return (
          <div className="flex my-2" key={`detailedItem${id}`}>
            <h4 className="flex-1">{name}</h4>
            <p className="flex-1 text-center">{cant}</p>
            <p className="flex-1 text-center">{formatNumberToCLP(price)}</p>
            <p className="flex-1 text-center">
              {formatNumberToCLP(price * cant)}
            </p>
          </div>
        );
      })}
      <hr className="my-4" />
      <div className="flex text-xl mt-5">
        <h4 className="flex-1 text-sm md:text-2xl font-bold text-[var(--primary-100)]">
          Sub total:
        </h4>
        <p className="flex-1"></p>
        <p className="flex-1"></p>
        <p className="flex-1 text-[var(--text-100)] italic font-bold">
          {formatNumberToCLP(getSubTotal({ list }))}
        </p>
      </div>
    </section>
  );
}
