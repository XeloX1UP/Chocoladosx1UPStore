"use client";
import { storeLogo } from "@/consts";
import { IcoHome, IcoShoppingCart, IcoStore } from "@/svgExports";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AccountButton from "../buttons/accountButton";
import { TCookieUser } from "@/types";
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
export default function NavBar({ user }: { user?: TCookieUser }) {
  const pathName = usePathname();

  return (
    <div className="md:flex md:justify-evenly md:items-center">
      <div id="logo" className="my-3">
        <img
          className={`mx-auto`}
          width={70}
          height={70}
          src={storeLogo.image}
          alt={storeLogo.desc}
        />
      </div>
      <nav className="">
        <ul className="flex justify-around">
          {links.map(({ href, name, icon }) => {
            const isActive = pathName?.split("/")[1] === href.split("/")[1];

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
      <div className="">
        <AccountButton user={user} key={user ? "userActive" : "userInactive"} />
      </div>
    </div>
  );
}
