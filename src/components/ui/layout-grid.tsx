"use client";
import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

type Card = {
  id: number;
  content: JSX.Element | React.ReactNode | string;
  className: string;
  thumbnail: string;
  title: string;
  price?: number | { small?: number; medium?: number; large?: number };
};

export const LayoutGrid = ({ cards }: { cards: Card[] }) => {
  const [selected, setSelected] = useState<Card | null>(null);
  const [lastSelected, setLastSelected] = useState<Card | null>(null);

  const handleClick = (card: Card) => {
    setLastSelected(selected);
    setSelected(card);
  };

  const handleOutsideClick = () => {
    setLastSelected(selected);
    setSelected(null);
  };

  return (
    <div className="w-full min-h-fit xl:w-3/4 lg:w-3/4 p-0 xl:p-10 lg:p-10 md:p-4 sm:p-0 grid grid-cols-1 md:grid-cols-3 max-w-7xl  gap-4 relative">
      {cards.map((card, i) => (
        <div key={i} className={cn(card.className, "w-fit h-fit")}>
          <motion.div
            onClick={() => handleClick(card)}
            className={cn(
              card.className,
              "relative overflow-hidden cursor-pointer",
              selected?.id === card.id
                ? "rounded-lg cursor-auto absolute inset-0 h-1/2 w-full md:w-1/2 m-auto z-50 flex justify-center items-center flex-wrap flex-col"
                : lastSelected?.id === card.id
                  ? "z-40 bg-white rounded-xl h-full w-full"
                  : "bg-white rounded-xl h-full w-full"
            )}
            layoutId={`card-${card.id}`}
          >
            {selected?.id === card.id && <SelectedCard selected={selected} />}
            <ImageComponent card={card} />
            {selected?.id !== card.id && (
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center  h-full w-full  bg-black bg-opacity-70"
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="flex flex-col items-center justify-center w-fit">
                  <h2 className="text-white text-2xl font-bold w-fit">
                    {card.title}
                  </h2>
                  <p className="text-white text-lg w-fit">
                    {typeof card.price === "number"
                      ? `$${card.price.toFixed(2)}`
                      : card.price
                        ? `Small: $${card.price.small?.toFixed(2) || ""} ${card.price.medium !== undefined ? `Medium: ${card.price.medium.toFixed(2)}` : ""} Large: $${card.price.large?.toFixed(2) || ""}`
                        : ""}
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      ))}
      <motion.div
        onClick={handleOutsideClick}
        className={cn(
          "absolute h-full w-full left-0 top-0 bg-black opacity-0 z-10",
          selected?.id ? "pointer-events-auto" : "pointer-events-none"
        )}
        animate={{ opacity: selected?.id ? 0.3 : 0 }}
      />
    </div>
  );
};

const ImageComponent = ({ card }: { card: Card }) => {
  return (
    <motion.img
      layoutId={`image-${card.id}-image`}
      src={card.thumbnail}
      height="500"
      width="500"
      className={cn(
        "object-cover object-top absolute inset-0 h-full w-full transition duration-200"
      )}
      alt="thumbnail"
    />
  );
};

const SelectedCard = ({ selected }: { selected: Card | null }) => {
  return (
    <div className="bg-transparent h-full w-full flex flex-col justify-end rounded-lg shadow-2xl relative z-[60]">
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        className="absolute inset-0 h-full w-full z-10"
      />
      <motion.div
        layoutId={`content-${selected?.id}`}
        initial={{
          opacity: 0,
          y: 100,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          y: 100,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className="relative z-[70]"
      >
        {selected?.content}
      </motion.div>
    </div>
  );
};
