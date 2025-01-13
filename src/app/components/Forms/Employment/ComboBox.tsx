"use client";
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
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  position: string;
  about: string;
  _id: string;
};
interface IComboBoxProps {
  positions: Array<{ value: string; label: string }>;
  onChange: Dispatch<SetStateAction<FormState>>;
}

const ComboBox: React.FC<IComboBoxProps> = ({ positions, onChange }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {(value &&
              positions.find((position) => position.value === value)?.label) ||
              "Select a position"}
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </motion.svg>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput
              placeholder="Search for a position"
              onValueChange={(search) => {
                onChange((prev) => {
                  return { ...prev, position: search };
                });
                setValue(search);
              }}
            />
            <CommandList>
              <CommandEmpty>No positions found</CommandEmpty>
              <CommandGroup>
                {positions.map((position) => (
                  <CommandItem
                    key={position.value}
                    value={position.value}
                    onSelect={(currentValue) => {
                      onChange((prev) => {
                        return { ...prev, position: currentValue };
                      });
                      setValue(currentValue);
                      setOpen(false);
                    }}
                    className={`${position.value === value ? "border-2 border-green-600" : ""} transition duration-500 `}
                  >
                    {position.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default ComboBox;
