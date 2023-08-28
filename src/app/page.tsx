import bg1 from "@/images/bgs/chocolate_frutilla.png";
import img1 from "@/images/product-1.jpg";
import img2 from "@/images/product-2.jpg";
import img3 from "@/images/product-3.jpg";
import img4 from "@/images/product-4.jpg";
import img5 from "@/images/product-5.jpg";
import img6 from "@/images/product-6.jpg";
import img7 from "@/images/product-7.jpg";
import styles from "./landing.module.css";
import Link from "next/link";
import Carrousell from "@/components/carrousell/carrousell";
import { TCarrousellProps } from "@/types";
const carrousellItems: TCarrousellProps[] = [
  {
    image: img1,
    text: "Delicados bombones de coco rallado, sumergidos en el más suave y tentador chocolate. Un bocado celestial que une la frescura del coco con la riqueza del cacao. ¡Déjate llevar por esta exquisita combinación!",
    title: "Bombones de coco rallado, bañados en chocolate",
  },
  {
    image: img2,
    text: "Sumérgete en un torbellino de sabores con nuestros helados de mora y frutillas, envueltos en una nube de suave crema. Cada cucharada es un viaje refrescante a un jardín de frutas. ¡Disfruta de la frescura en cada bocado!",
    title: "Helados de mora, frutillas y crema",
  },
  {
    image: img3,
    text: "Disfruta de la cremosidad con un giro tropical. Nuestros helados de crema se entrelazan con el sabor jugoso del coco rallado, creando una experiencia suave y exótica. Una delicia doblemente irresistible.",
    title: "Helados de crema y coco rallado",
  },
  {
    image: img4,
    text: "Tradición y decadencia se encuentran en cada mordisco. Nuestros alfajores clásicos, bañados en un manto de chocolate seductor, te llevan en un viaje a los sabores atemporales. Un placer que nunca pasa de moda.",
    title: "Alfajores tradicionales bañados en chocolate",
  },
  {
    image: img5,
    text: "Celebra los contrastes con nuestra torta de piña, manjar y crema chantilly. Lo dulce y lo fresco se unen en armonía, creando capas de felicidad en cada porción. Un festín para los sentidos.",
    title: "Torta de piña, manjar y crema chantilly",
  },
  {
    image: img6,
    text: "Irresistibles alfajores rellenos, cubiertos de un abrazo de chocolate. Cada mordida es un encuentro entre la suavidad de nuestro relleno especial y la intensidad del cacao. Una experiencia que te dejará anhelando más.",
    title: "Alfajores rellenos cubiertos de chocolate",
  },
  {
    image: img7,
    text: "Explosión de diversión para los amantes del cacao. Nuestras katarinas de cacao, vestidas con chispas de colores, son una fiesta visual y un regalo para el paladar. Un toque de alegría en cada bocado.",
    title: "Katarinas de cacao bañadas en chispas de colores",
  },
];

export default function Home() {
  return (
    <div className="absolute top-0 -z-10 ">
      <section
        id="panel1"
        className="w-screen h-screen bg-cover bg-center flex flex-col gap-40 md:gap-14 lg:gap-40 justify-center items-center relative"
        style={{ backgroundImage: `url(${bg1.src})` }}
      >
        <div className="flex flex-col items-center">
          <h1 className="text-2xl mb-5">
            <span className="text-4xl font-extrabold">Chocolados </span>X
            <span
              className={`text-4xl font-extrabold ${styles["pulsating-text"]}`}
            >
              {" "}
              1UP
            </span>
          </h1>
          <p className="text-3xl italic">
            <span className="text-amber-900 font-bold">Chocolatería</span> y{" "}
            <span className="text-teal-600 font-bold">heladería</span>
          </p>
        </div>
        <div>
          <Link
            href="/store"
            className="bg-gradient-to-tr from-[var(--primary-100)] text-2xl font-bold to-[var(--primary-200)] py-5 px-8 rounded-full text-[var(--bg-100)] lg:py-7 lg:px-16"
          >
            Ingresa
          </Link>
        </div>
        <div className={`absolute bottom-10  ${styles["bottonLink"]}`}>
          <Link
            href={"/#acerca"}
            className="flex flex-col items-center text-lg"
          >
            Quienes somos
            <p className="absolute -bottom-5 text-xl">v</p>
            <p className="absolute -bottom-8 text-xl">v</p>
          </Link>
        </div>
      </section>
      <section
        id="acerca"
        className="w-screen h-screen flex flex-col justify-center items-center gap-6 md:flex-row my-40 md:px-10 bg-gray-500/30 px-4 "
      >
        <div className="md:flex-1 md:flex md:justify-center md:items-center">
          <img
            src={img1.src}
            alt="Prestigios Caseros"
            className="w-[178px] h-[250px] lg:w-[278px] lg:h-[500px] object-cover object-center rounded-lg shadow-black shadow-lg"
          />
        </div>
        <div className="px-4 md:w-3/4 lg:flex-1 lg:border-2 lg:border-[var(--primary-300)] lg:p-10 lg:rounded-lg lg:pe-0 lg:me-10">
          <h1 className="mb-4 text-3xl font-bold md:text-xl text-[var(--primary-100)] lg:text-4xl">
            Acerca de nosotros
          </h1>
          <p className="text-lg md:text-base lg:text-xl mb-1 indent-8 lg:pe-20">
            Somos un apasionado emprendimiento familiar que comenzó su dulce
            travesía hace aproximadamente 7 meses. Desde entonces, hemos estado
            endulzando los corazones de todos con nuestro producto estrella: los
            irresistibles bombones de coco rallado y leche condensada,
            cuidadosamente elaboradas y cubiertas con el exquisito abrazo de
            chocolate blanco y negro.
          </p>
          <p className="text-lg md:text-base indent-8 lg:pe-20 lg:my-5 italic">
            Te invitamos a seguir nuestra aventura a través de nuestro Instagram{" "}
            <Link
              href={
                "https://instagram.com/chocolados1up?utm_source=qr&igshid=MzNlNGNkZWQ4Mg%3D%3D"
              }
              className="italic font-semibold text-[var(--primary-200)] hover:underline"
              target="_blank"
            >
              @Chocoladosx1UP
            </Link>
            , donde compartimos momentos detrás de escena, novedades y el amor
            que ponemos en cada creación. Gracias por ser parte de nuestra
            historia dulce y por permitirnos endulzar tus momentos especiales.
          </p>
        </div>
      </section>
      <section id="productos" className="w-screen min-h-screen my-40">
        <Carrousell carrousellItems={carrousellItems} />
      </section>
    </div>
  );
}
