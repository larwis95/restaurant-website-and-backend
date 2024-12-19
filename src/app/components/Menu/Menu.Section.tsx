"use client";
import { MenuContext } from "../Providers/Menu";
import { LayoutGrid } from "@/components/ui/layout-grid";
import MenuCard from "../Cards/Menu.Cards";
import { useContext } from "react";
import Section from "../Section";

const MenuSection = () => {
  const { menu } = useContext(MenuContext);
  const cardLayout = [
    "col-span-1 xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-3",
    "col-span-1 sm:col-span-1 xl:col-span-2 lg:col-span-2 md:col-span-3",
    "col-span-1 sm:col-span-1 xl:col-span-3 lg:col-span-3 md:col-span-3",
  ];
  return (
    <>
      {menu.map((category) => (
        <Section
          className="flex flex-row flex-wrap justify-start items-start w-full py-24 bg-slate-950 border border-border rounded-lg"
          id={category.name.toLowerCase()}
          key={category.name}
        >
          <div className="w-full h-screen flex flex-wrap-reverse xl:flex-nowrap lg:flex-nowrap md:flex-nowrap sm:flex-wrap-reverse flex-row justify-start items-center gap-5 p-4">
            <LayoutGrid
              cards={category.items.map((item, index) => {
                return {
                  id: index + 1,
                  content: <MenuCard item={item} />,
                  thumbnail: item.image,
                  className: cardLayout[index % 3],
                  title: item.name,
                  price: item.price,
                };
              })}
            />

            <div className="flex w-full xl:w-2/5 lg:w-2/5 md:w-2/5 sm:w-full flex-col justify-start items-start">
              <h2 className="text-2xl xl:text-4xl lg:text-4xl md:text-3xl sm:text-2xl text-wrap font-bold text-secondary p-4 w-fit">
                {category.name}
              </h2>
            </div>
          </div>
        </Section>
      ))}
    </>
  );
};

export default MenuSection;
