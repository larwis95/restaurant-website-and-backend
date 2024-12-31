"use client";

import { ItemResponse, MenuResponse } from "@/lib/api.types";
import { useState, useContext, createContext } from "react";

export const MenuContext = createContext<{
  menu: MenuResponse[];
  setMenu: React.Dispatch<React.SetStateAction<MenuResponse[]>>;
}>({
  menu: [],
  setMenu: () => {},
});

type LayoutContext = {
  selected: ItemResponse | null;
  setSelected: (item: ItemResponse | null) => void;
};

export const LayoutContext = createContext<LayoutContext>({
  selected: null,
  setSelected: (item) => {},
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

export const SelectedCardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selected, setSelected] = useState<ItemResponse | null>(null);
  return (
    <LayoutContext.Provider value={{ selected, setSelected }}>
      {children}
    </LayoutContext.Provider>
  );
};

export default MenuProvider;
