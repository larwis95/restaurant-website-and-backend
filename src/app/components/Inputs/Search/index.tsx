"use client";

import { useContext, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { MenuResponse } from "@/app/libs/api.types";
import { MenuContext } from "../../Providers/Menu";

const Search = ({ menu }: { menu: MenuResponse[] }) => {
  const { setMenu } = useContext(MenuContext);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (searchValue === "") {
      setMenu(menu);
    } else {
      const filteredMenu = menu.filter((category) => {
        const cat = category.name.toLowerCase();
        return cat.includes(searchValue.toLowerCase());
      });
      setMenu(filteredMenu);
    }
  }, [searchValue, setMenu, menu]);

  return (
    <div className="w-full flex flex-row justify-start items-start">
      <Input
        className="w-fit"
        type="text"
        value={searchValue}
        placeholder="Search for food"
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
};

export default Search;
