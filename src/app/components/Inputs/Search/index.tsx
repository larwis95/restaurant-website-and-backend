"use client";

import { useContext, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MenuResponse } from "@/lib/api.types";
import { MenuContext } from "../../Providers/Menu";
import { ScrollArea } from "@radix-ui/react-scroll-area";

const Search = ({ menu }: { menu: MenuResponse[] }) => {
  const { setMenu } = useContext(MenuContext);
  const [searchValue, setSearchValue] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const handleCommandClick = (value: string) => {
    setSearchOpen(false);
    setSearchValue(value);
  };

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
      <Popover open={searchOpen} onOpenChange={setSearchOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-fit"
            role="combobox"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            {searchValue ? searchValue : "Search for food..."}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput
              placeholder="Search for a food item"
              onValueChange={(search) => setSearchValue(search)}
              value={searchValue}
            />
            <ScrollArea className="w-[200px] h-80">
              <CommandList>
                {menu.map((category) => (
                  <CommandGroup key={category.name}>
                    <CommandItem
                      onSelect={() => handleCommandClick(category.name)}
                    >
                      {category.name}
                    </CommandItem>
                    <CommandEmpty>No items found</CommandEmpty>
                  </CommandGroup>
                ))}
              </CommandList>
            </ScrollArea>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Search;
