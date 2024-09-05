import { IFindSaleServerAction } from "@/app/libs/api.interfaces";
import { SaleResponse } from "@/app/libs/api.types";

export interface IFilterFormState {
  type: "year" | "month" | "week" | "day";
  args: {
    year?: number;
    month?: number;
    week?: number;
    day?: string;
  };
}

export interface IFilterFormProps {
  onSubmit: (sales: SaleResponse[]) => void;
  actionStore: {
    [key: string]: IFindSaleServerAction;
  };
}

export interface ISubFormProps {
  children: React.ReactNode;
  onSubmit: (sales: SaleResponse[]) => void;
  action: IFindSaleServerAction;
}

export interface ITableInputProps {
  name: "year" | "month" | "week" | "day";
  type: string;
}

export interface IFormContext {
  formState: IFilterFormState;
  setFormState: (state: IFilterFormState) => void;
}
