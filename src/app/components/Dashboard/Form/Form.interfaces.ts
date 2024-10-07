import { SaleRequest } from "@/lib/api.types";
import { ISelectedSale } from "../Sales/Table/Table.interfaces";

export interface IUpdateSaleFormProps {
  handleUpdateSale: (e: React.FormEvent<HTMLFormElement>) => void;
  setSelectedSale: React.Dispatch<React.SetStateAction<ISelectedSale | null>>;
  selectedSale: ISelectedSale | null;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IAddSaleFormProps {
  type?: string;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ISetModalState {
  addItem: boolean;
  addCategory: boolean;
}

export interface IAddCategoryFormProps {
  setModalOpen: React.Dispatch<React.SetStateAction<ISetModalState>>;
}
export interface IAddItemFormProps {
  category: string;
  setModalOpen: React.Dispatch<React.SetStateAction<ISetModalState>>;
}

export interface IBulkAddSalesInputProps {
  date: string;
  handleChange: (
    index: number,
    key: keyof SaleRequest,
    value: string | number
  ) => void;
  handleRemoveSale: (index: number) => void;
  index: number;
}

export interface IAddSpecialFormProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
