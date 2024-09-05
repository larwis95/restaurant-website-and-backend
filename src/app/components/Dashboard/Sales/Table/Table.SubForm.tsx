import React, { createContext, useState } from "react";
import {
  IFilterFormState,
  IFormContext,
  ISubFormProps,
} from "./Table.interfaces";
import { format, getWeekOfMonth } from "date-fns";

export const formContext = createContext<IFormContext>({
  formState: {
    type: "week",
    args: {
      year: undefined,
      month: undefined,
      week: undefined,
      day: undefined,
    },
  },
  setFormState: (state: IFilterFormState) => {},
});

const SubForm: React.FC<ISubFormProps> = ({ children, onSubmit, action }) => {
  const today = new Date();
  const [formState, setFormState] = useState<IFilterFormState>({
    type: "week",
    args: {
      year: today.getFullYear(),
      month: today.getMonth(),
      week: getWeekOfMonth(today, { weekStartsOn: 1 }),
      day: format(today, "yyyy-MM-dd"),
    },
  });

  const handleFetchSales = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formState.args);
    const sales = await action({ ...formState.args });
    if (!Array.isArray(sales)) {
      return;
    }

    onSubmit(sales);
  };

  return (
    <formContext.Provider value={{ formState, setFormState }}>
      <form
        onSubmit={handleFetchSales}
        className="w-full flex flex-row items-end gap-5 "
      >
        {children}
      </form>
    </formContext.Provider>
  );
};

export default SubForm;
