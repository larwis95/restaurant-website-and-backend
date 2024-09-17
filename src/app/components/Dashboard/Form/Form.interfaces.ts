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
