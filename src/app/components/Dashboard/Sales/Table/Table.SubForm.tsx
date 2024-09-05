import React, { createContext, useState } from "react";
import {
  IFilterFormState,
  IFormContext,
  ISubFormProps,
} from "./Table.interfaces";

export const formContext = createContext<IFormContext>({
  formState: {
    type: "month",
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
  const [formState, setFormState] = useState<IFilterFormState>({
    type: "week",
    args: {
      year: undefined,
      month: undefined,
      week: undefined,
      day: undefined,
    },
  });

  const handleFetchSales = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formState.args);
    const sales = await action(formState.args);
    if (!Array.isArray(sales)) {
      return;
    }

    onSubmit(sales);
  };

  return (
    <formContext.Provider
      value={{ formState: { ...formState, type: "month" }, setFormState }}
    >
      <form onSubmit={handleFetchSales}>{children}</form>
    </formContext.Provider>
  );
};

export default SubForm;
