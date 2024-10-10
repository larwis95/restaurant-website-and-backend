import { putActiveSpecial } from "@/lib/mutations/specials/specials.put";
import { postActiveSpecial } from "@/lib/mutations/specials/specials.post";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ISpecialCheckboxProps } from "./Specials.interfaces";
import { SpecialResponse } from "@/lib/api.types";
import { useQueryClient } from "@tanstack/react-query";

const SpecialsCheckBox: React.FC<ISpecialCheckboxProps> = ({
  specials,
  activeSpecials,
}) => {
  const queryClient = useQueryClient();
  const putActiveSpecials = useMutation({
    mutationFn: async (activeSpecials: SpecialResponse[]) => {
      await putActiveSpecial({ specials: activeSpecials });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Active Specials updated successfully",
      });
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const [checked, setChecked] = useState(
    specials.map((special) =>
      activeSpecials.some((active) => active._id === special._id)
    )
  );

  const handleChecked = (index: number) => {
    const newChecked = [...checked];
    newChecked[index] = !newChecked[index];
    const amountOfActiveSpecials = newChecked.filter((check) => check).length;
    if (amountOfActiveSpecials > 6) {
      toast({
        title: "Error",
        description: "Only up to 6 specials can be active at a time",
        variant: "destructive",
      });
      newChecked[index] = false;
      setChecked(newChecked);
      return;
    }
    setChecked(newChecked);
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newActiveSpecials = specials.filter(
      (special, index) => checked[index]
    );

    if (newActiveSpecials.length === 0) {
      toast({
        title: "Error",
        description: "At least one special must be active",
        variant: "destructive",
      });
      return;
    }

    putActiveSpecials.mutate(newActiveSpecials);
  };

  return (
    <div className="flex flex-col items-start justify-start gap-2 p-4 w-fit">
      <h2 className="text-2xl font-bold text-secondary">Active Specials</h2>
      <form onSubmit={handleSave} className="flex flex-col gap-2 w-full">
        <ScrollArea className="flex flex-col items-start justify-start border border-border w-full p-4">
          {specials.map((special, index) => (
            <div
              key={special._id}
              className="flex flex-row justify-start items-center gap-2"
            >
              <Checkbox
                id={special.name}
                checked={checked[index]}
                onCheckedChange={() => handleChecked(index)}
                className="border border-border"
              />
              <label htmlFor={special.name}>{special.name}</label>
            </div>
          ))}
        </ScrollArea>

        <Button type="submit" variant="outline" className="w-fit">
          Save
        </Button>
      </form>
    </div>
  );
};

export { SpecialsCheckBox };
