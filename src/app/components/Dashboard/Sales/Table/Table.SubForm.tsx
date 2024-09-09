import React, { createContext, useEffect, useState } from "react";
import {
  IFilterFormState,
  ISubFormProps,
  IFilterFormContext,
} from "./Table.interfaces";

export const formContext = createContext<IFilterFormContext>({
  formState: {
    type: "currentweek",
    args: {},
  },
  setFormState: (state: IFilterFormState) => {},
});

const SubForm: React.FC<ISubFormProps> = ({ children, setFetch, type }) => {
  const [formState, setFormState] = useState<IFilterFormState>({
    type,
    args: {},
  });

  useEffect(() => {
    console.log(typeof setFetch);
  });

  const handleFetchSales = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFetch(formState);
  };

  return (
    <formContext.Provider value={{ formState, setFormState }}>
      <form
        onSubmit={handleFetchSales}
        className="w-full flex flex-row flex-wrap items-end gap-2 p-2 "
      >
        {children}
      </form>
    </formContext.Provider>
  );
};

export default SubForm;
