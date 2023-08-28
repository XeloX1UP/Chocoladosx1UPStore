"use client";

import { TCarrousellProps } from "@/types";
import { useEffect, useState } from "react";
import styles from "./carrousell.module.css";

export default function Carrousell({
  carrousellItems,
}: {
  carrousellItems: TCarrousellProps[];
}) {
  const [items, setItems] = useState(carrousellItems);
  const [currentItem, setCurrentItem] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  useEffect(() => {
    setIsMoving(() => false);
    const setNextItem = async () => {
      setIsMoving(() => true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      const currIndex = currentItem;
      const listLenght = items.length;
      if (listLenght === 1) return;
      if (currIndex < listLenght - 1) {
        setCurrentItem((current) => current + 1);
      }
      if (currIndex === listLenght - 1) {
        setCurrentItem(() => 0);
      }
    };
    setTimeout(async () => {
      await setNextItem();
    }, 10000);
  }, [currentItem]);
  return (
    <div className="relative">
      {items.length > 0 ? (
        <>
          <div
            className={`w-full h-screen bg-red-400 bg-cover bg-center shadow-black shadow-md transition-opacity duration-500 ease-in-out transform ${
              isMoving ? "opacity-0" : ""
            }`}
            key={items[currentItem].text}
            style={{ backgroundImage: `url(${items[currentItem].image.src})` }}
          ></div>
          <div
            className="w-11/12 lg:w-3/4 custom-filter-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-500/70 py-10 px-3 md:py-5 md:px-1 lg:px-16 lg:py-20 rounded-xl"
            key={items[currentItem].title}
          >
            <h3
              className={`text-5xl md:text-3xl lg:text-5xl text-center font-extrabold px-4 text-[var(--primary-300)] italic transition-all duration-500 ease-in-out transform ${
                isMoving ? "translate-x-full opacity-0" : ""
              }`}
            >
              {items[currentItem].title}
            </h3>
            <p
              className={`text-3xl md:text-xl lg:text-3xl indent-6 mt-12 md:mt-6 lg:mt-20 text-[var(--text-100)] font-bold px-3 transition-all duration-500 ease-in-out transform ${
                isMoving ? "-translate-x-full opacity-0" : ""
              }`}
            >
              {items[currentItem].text}
            </p>
          </div>
        </>
      ) : null}
    </div>
  );
}
