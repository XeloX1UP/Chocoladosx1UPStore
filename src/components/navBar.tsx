"use client";
import { storeLogo } from "@/consts";
import { IcoHome, IcoShoppingCart, IcoStore } from "@/svgExports";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
const links = [
  {
    href: "/",
    name: "Inicio",
    icon: <IcoHome />,
  },
  {
    href: "/store",
    name: "Tienda",
    icon: <IcoStore />,
  },
  {
    href: "/cart",
    name: "Carrito",
    icon: <IcoShoppingCart />,
  },
];
export default function NavBar() {
  const [activeLink, setActiveLink] = useState("Inicio");
  const pathName = usePathname();

  return (
    <div className="md:flex md:justify-between md:px-4 md:items-center">
      <div id="logo" className="my-3">
        <img
          className={`mx-auto`}
          width={70}
          height={70}
          src={storeLogo.image}
          alt={storeLogo.desc}
        />
      </div>
      <nav>
        <ul className="flex justify-around">
          {links.map(({ href, name, icon }) => {
            const isActive = pathName.split("/")[1] === href.split("/")[1];

            return (
              <li key={`${href}nav`}>
                <Link
                  href={href}
                  className={`flex gap-1 p-3 hover:text-[var(--primary-100)] ${
                    isActive ? "text-[var(--accent-100)]" : ""
                  }`}
                >
                  {name}
                  {icon}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
