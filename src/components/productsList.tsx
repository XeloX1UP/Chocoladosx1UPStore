import { formatNumberToCLP, productList } from "@/consts";

export default function ProductList() {
  return (
    <div className="flex flex-wrap">
      {productList.map(
        ({ cant, category, description, id, image, name, price }) => {
          return (
            <div
              key={`card${category}${id}`}
              className={`flex items-center justify-center gap-4 w-full md:w-1/2 my-3 md:px-2`}
            >
              <div id="image" className="overflow-hidden rounded-full">
                <img
                  src={image}
                  alt={description}
                  className="w-[150px] h-[150px]"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div id="info" className="flex-1">
                <a className="font-bold text-[var(--primary-100)] mb-2 md:my-4">
                  {`${name} ${cant != 1 ? `- ${cant} unidades` : ""}`}
                </a>
                <p className="my-2 md:my-4">{formatNumberToCLP(price)}</p>
                <p className="my-2 md:my-4">{description}</p>
                <div className="flex justify-between gap-3 lg:gap-9 my-3 md:my-4">
                  <button className="rounded-md bg-[var(--primary-100)] text-[var(--bg-100)] hover:bg-[var(--primary-200)] font-bold transition-colors duration-500 flex-1 md:py-2 md:px-4">
                    Comprar
                  </button>
                  <button className="rounded-md bg-[var(--bg-300)] hover:bg-[var(--primary-200)] hover:text-[var(--bg-100)] hover:font-bold flex-1 transition-all duration-500">
                    Agregar al carro
                  </button>
                </div>
              </div>
            </div>
          );
        }
      )}
    </div>
  );
}
