export interface IFilterFormState {
  type: "year" | "month" | "week" | "day" | "currentweek";
  args: {
    year?: number;
    month?: number;
    week?: number;
    day?: string;
  };
}

export interface IFilterFormProps {
  setFetch: (state: IFilterFormState) => void;
}

export interface ISubFormProps {
  children: React.ReactNode;
  setFetch: (state: IFilterFormState) => void;
  type: "year" | "month" | "week" | "day";
}

export interface ITableInputProps {
  name: "year" | "month" | "week" | "day";
  type: string;
  min?: number;
  max?: number;
  dataType: "year" | "month" | "week" | "day";
}

export interface IFilterFormContext {
  formState: IFilterFormState;
  setFormState: (state: IFilterFormState) => void;
}
export interface ISelectedSale {
  date: Date;
  morning: number;
  night: number;
  holiday?: string;
}
