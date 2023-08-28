import { formatNumberToCLP, productList } from "@/consts";
import PickProductModal from "./pickProductModal";

export default function ProductList() {
  return (
    <div className="flex flex-wrap px-5 md:px-0 gap-10 md:gap-0">
      {productList.map(
        ({ cant, category, description, id, image, name, price }) => {
          return (
            <div
              key={`card${category}${id}`}
              className={`flex md:h-[300px] justify-center gap-4 w-full md:w-1/2 md:px-5`}
            >
              <div id="image" className="my-auto">
                <img
                  src={image}
                  alt={description}
                  className="w-[150px] h-[150px] rounded-full"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div id="info" className="flex-1 my-auto">
                <p className="font-bold md:font-extrabold text-[var(--primary-100)] text-2xl lg:mb-5">
                  {`${name} ${cant != 1 ? `- ${cant} unidades` : ""}`}
                </p>
                <p className="font-bold text-[var(--primary-200)] text-xl">
                  {formatNumberToCLP(price)}
                </p>
                <p className="lg:my-5">{description}</p>
                <div className="flex gap-3 lg:gap-9">
                  <PickProductModal
                    btnName="Comprar"
                    cant={cant}
                    className="rounded-md bg-gradient-to-tr from-[var(--primary-100)] to-[var(--primary-200)] text-[var(--bg-100)] hover:bg-[var(--primary-200)] font-bold transition-color duration-500 flex-1 md:py-2 md:px-4 py-1 px-2"
                    description={description}
                    image={image}
                    name={name}
                    price={price}
                    productId={id}
                    type="buy"
                  />
                  <PickProductModal
                    btnName="Agregar"
                    cant={cant}
                    className="rounded-md text-[var(--text-100)] bg-gradient-to-tr from-[var(--bg-200)] to-[var(--bg-300)] hover:from-[var(--primary-100)] hover:to-[var(--primary-200)] hover:text-[var(--bg-100)] md:py-2 md:px-4 font-bold flex-1 transition-all duration-500 py-1 px-2"
                    description={description}
                    image={image}
                    name={name}
                    price={price}
                    productId={id}
                    type="add"
                  />
                </div>
              </div>
            </div>
          );
        }
      )}
    </div>
  );
}
