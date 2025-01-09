"use client";
import { MenuContext } from "../Providers/Menu";
import LayoutGrid from "./Menu.LayoutGrid";
import MenuCard from "../Cards/Menu.Cards";
import { useContext } from "react";
import Section from "../Section";

const MenuSection = () => {
  const { menu } = useContext(MenuContext);
  return (
    <>
      {menu.map((category) => (
        <Section
          className="flex flex-row flex-wrap justify-center items-center w-full py-24 bg-slate-950 border border-border rounded-lg"
          id={category.name.toLowerCase()}
          key={category.name}
        >
          <div className="w-full h-full flex flex-wrap-reverse">
            <LayoutGrid
              items={category.items.map((item, index) => {
                return {
                  id: index + 1,
                  content: <MenuCard item={item} />,
                  thumbnail: item.image,
                  className: "flex flex-col items-center justify-center",
                  title: item.name,
                  price: item.price,
                };
              })}
            />

            <div className="w-full h-fit flex flex-col justify-center items-center">
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
