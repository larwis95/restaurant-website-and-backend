"use client";

import { MenuResponse } from "@/app/libs/api.types";
import { useState, useContext, createContext } from "react";

export const MenuContext = createContext<{
  menu: MenuResponse[];
  setMenu: React.Dispatch<React.SetStateAction<MenuResponse[]>>;
}>({
  menu: [],
  setMenu: () => {},
});

const MenuProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [menu, setMenu] = useState<MenuResponse[]>([]);
  return (
    <MenuContext.Provider value={{ menu, setMenu }}>
      {children}
    </MenuContext.Provider>
  );
};

export default MenuProvider;
