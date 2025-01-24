"use client";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import {
  useState,
  useContext,
  createContext,
  ReactNode,
  FC,
  ChangeEvent,
  FormEvent,
} from "react";
import {
  postMutationForItem,
  putMutationForItem,
  postMutationForMenu,
  putMutatiuonForMenu,
  putSpecial,
  postSpecial,
  addSale,
  updateSale,
} from "@/lib/mutations";
import { toast } from "@/hooks/use-toast";
import titleCase from "@/lib/helpers/titleCase";
import {
  ItemRequest,
  ItemResponse,
  SaleRequest,
  SaleResponse,
} from "@/lib/api.types";
import { fetchImages } from "@/lib/queries/images/get.images";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { LoadingSpinner } from "@/components/ui/loading";
import { Input as CNInput } from "@/components/ui/input";
import { format } from "date-fns";
import { UTCDate } from "@date-fns/utc";

const mutationMap = {
  post: {
    sale: addSale,
    item: postMutationForItem,
    menu: postMutationForMenu,
    special: postSpecial,
  },
  put: {
    sale: updateSale,
    item: putMutationForItem,
    special: putSpecial,
    menu: async () => {
      throw new Error("Menu update not implemented");
    },
  },
};

interface IFormProps {
  item?: ItemResponse | SaleResponse | string;
  mutationType: "post" | "put";
  itemType: "sale" | "item" | "menu" | "special";
  category?: string;
  onClose: () => void;
  children: ReactNode;
}

interface IInputProps {
  label: string;
  type: "text" | "number" | "date";
  value: string | number;
  name:
    | "date"
    | "morning"
    | "night"
    | "holiday"
    | "name"
    | "price"
    | "description";
  required?: boolean;
}

interface IDatePicker extends IInputProps {
  allowPicker?: boolean;
}

type Data = SaleRequest | ItemRequest | string;

interface FormContextProps {
  formData: Data;
  setFormData: (data: Data) => void;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string,
    type?: "date" | "number" | "text"
  ) => void;
}

const FormContext = createContext<FormContextProps>({
  formData: {} as Data,
  setFormData: () => {},
  handleChange: () => {},
});

const Root: FC<IFormProps> = ({
  itemType,
  mutationType,
  category,
  item,
  onClose,
  children,
}) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<Data>(item || ({} as Data));

  const renderToastMessage = () => {
    let item: string = "";
    if (typeof formData === "string") item = formData;
    if (typeof formData === "object" && "date" in formData)
      item = formData.date.toString();
    if (typeof formData === "object" && "name" in formData)
      item = formData.name;
    return `${titleCase(itemType)}: ${
      typeof formData === "object" && !("date" in formData)
        ? titleCase(item)
        : format(new UTCDate(item), "MM/dd/yyyy")
    } ${mutationType === "put" ? "updated" : "added"} successfully`;
  };

  const mutationFunc = mutationMap[mutationType][itemType];
  const mutation = useMutation<any, Error, Data>({
    mutationFn: mutationFunc as any,
    onSuccess: () => {
      toast({ title: "Success", description: renderToastMessage() });
      queryClient.invalidateQueries();
      onClose();
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message });
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string,
    type?: "date" | "number" | "text"
  ) => {
    const { value } = e.target;
    if (type === "number" && isNaN(parseFloat(value))) return;
    setFormData((prev) => {
      if (typeof prev === "string") return value;
      return {
        ...prev,
        category,
        [key]: type === "number" ? parseFloat(value) : value,
      };
    });
  };

  return (
    <form
      className="flex flex-col items-start justify-start h-fit gap-2 p-2"
      onSubmit={handleSubmit}
    >
      <FormContext.Provider value={{ formData, setFormData, handleChange }}>
        {children}
      </FormContext.Provider>
      <button
        type="submit"
        className="bg-primary text-white p-2 rounded-md hover:bg-slate-700 transition duration-500"
      >
        Submit
      </button>
    </form>
  );
};

const Input: FC<IInputProps> = ({ label, type, value, name, required }) => {
  const { handleChange } = useContext(FormContext);
  const [inputValue, setInputValue] = useState<string | number>(value);

  return (
    <div className="flex flex-col justify-start items-start gap-1">
      <label>{label}</label>
      <input
        value={inputValue}
        id={name}
        onChange={(e) => {
          setInputValue(e.target.value);
          handleChange(e, name, type);
        }}
        type={type}
        step={0.01}
        min={0}
        className="border border-border rounded-md p-2 bg-primary text-white hover:cursor-pointer hover:border-secondary hover:bg-slate-700 transition duration-500 focus:bg-slate-600 focus:border-x-green-600 focus:border-y-green-600 w-fit"
        required={required}
      />
    </div>
  );
};

const DatePicker: FC<IDatePicker> = ({
  label,
  type,
  value,
  name,
  allowPicker,
  required,
}) => {
  const { handleChange } = useContext(FormContext);
  const renderDate = (): string => {
    if (!value) return format(new UTCDate(), "yyyy-MM-dd");
    if (typeof value === "string") return value;
    return format(new UTCDate(value), "yyyy-MM-dd");
  };
  const [inputValue, setInputValue] = useState<string | number | undefined>(
    renderDate()
  );

  return (
    <div className="flex flex-col justify-start items-start gap-1">
      <label>{label}</label>
      <input
        value={inputValue}
        id={name}
        disabled={!allowPicker}
        onChange={(e) => {
          setInputValue(e.target.value);
          handleChange(e, name, type);
        }}
        type="date"
        className="border border-border rounded-md p-2 bg-primary text-white hover:cursor-pointer hover:border-secondary hover:bg-slate-700 transition duration-500 focus:bg-slate-600 focus:border-x-green-600 focus:border-y-green-600 w-fit"
        required={required}
      />
    </div>
  );
};

const TextArea: FC<IInputProps> = ({ label, value, name, required }) => {
  const { handleChange } = useContext(FormContext);

  return (
    <div className="flex flex-col justify-start items-start gap-1">
      <label>{label}</label>
      <textarea
        value={value}
        id={name}
        onChange={(e) => handleChange(e, name)}
        className="border border-border rounded-md p-2 bg-primary text-white hover:cursor-pointer hover:border-secondary hover:bg-slate-700 transition duration-500 focus:bg-slate-600 focus:border-x-green-600 focus:border-y-green-600 w-fit"
        required={required}
      />
    </div>
  );
};

const PriceInput: FC<IInputProps> = ({
  label,
  type,
  value,
  name,
  required,
}) => {
  const { formData, handleChange, setFormData } = useContext(FormContext);
  const [multiplePrices, setMultiplePrices] = useState<boolean>(
    typeof value === "object"
  );

  const handleMultiChange = (e: ChangeEvent<HTMLInputElement>, key: string) => {
    if (typeof formData === "string") return;
    const data = formData as ItemRequest;
    if (isNaN(parseFloat(e.target.value))) return (e.target.value = "");
    if (typeof data.price === "number") data.price = {};

    setFormData({
      ...data,
      price: {
        ...data.price,
        [key]: parseFloat(e.target.value),
      },
    });
  };

  const renderSinglePrice = () => {
    if (typeof formData === "string") return 0;
    if ("date" in formData) return 0;
    if (typeof formData === "object" && typeof formData.price === "number")
      return formData.price;
    if (typeof formData === "object" && typeof formData.price === "object")
      return formData.price.small;
  };

  const renderMultiplePrice = (key: "small" | "medium" | "large") => {
    if (typeof formData === "string") return 0;
    if ("date" in formData) return 0;
    if (typeof formData === "object" && typeof formData.price === "number")
      return formData.price;
    if (typeof formData === "object" && typeof formData.price === "object")
      return formData.price[key];
  };

  return (
    <div className="flex flex-col justify-start items-start gap-1">
      <div className="flex flex-row gap-2 w-fit justify-start items-center">
        <label className="text-xs text-nowrap">Multiple Prices?</label>
        <CNInput
          type="checkbox"
          value="yes"
          name="multiplePrices"
          checked={multiplePrices}
          onChange={(e) => setMultiplePrices(e.target.checked)}
        />
      </div>
      <label>{label}</label>
      {!multiplePrices && (
        <input
          value={renderSinglePrice()}
          id={name}
          onChange={(e) => handleChange(e, name, type)}
          type={type}
          step={0.01}
          min={0}
          className="border border-border rounded-md p-2 bg-primary text-white hover:cursor-pointer hover:border-secondary hover:bg-slate-700 transition duration-500 focus:bg-slate-600 focus:border-x-green-600 focus:border-y-green-600 w-fit"
          required={required}
        />
      )}
      {multiplePrices && (
        <div className="flex flex-col gap-2 p-4">
          <label>Small</label>
          <input
            value={renderMultiplePrice("small")}
            id="small"
            type={type}
            step={0.01}
            min={0}
            className="border border-border rounded-md p-2 bg-primary text-white hover:cursor-pointer hover:border-secondary hover:bg-slate-700 transition duration-500 focus:bg-slate-600 focus:border-x-green-600 focus:border-y-green-600 w-fit"
            onChange={(e) => handleMultiChange(e, "small")}
            required={required}
          />
          <label>Medium</label>
          <input
            value={renderMultiplePrice("medium")}
            id="medium"
            type={type}
            step={0.01}
            min={0}
            className="border border-border rounded-md p-2 bg-primary text-white hover:cursor-pointer hover:border-secondary hover:bg-slate-700 transition duration-500 focus:bg-slate-600 focus:border-x-green-600 focus:border-y-green-600 w-fit"
            onChange={(e) => handleMultiChange(e, "medium")}
            required={required}
          />
          <label>Large</label>
          <input
            value={renderMultiplePrice("large")}
            id="large"
            type={type}
            step={0.01}
            min={0}
            className="border border-border rounded-md p-2 bg-primary text-white hover:cursor-pointer hover:border-secondary hover:bg-slate-700 transition duration-500 focus:bg-slate-600 focus:border-x-green-600 focus:border-y-green-600 w-fit"
            onChange={(e) => handleMultiChange(e, "large")}
            required={required}
          />
        </div>
      )}
    </div>
  );
};

const ImageSelector: FC = () => {
  const {
    data: images,
    error,
    isPending,
  } = useQuery({ queryKey: ["images"], queryFn: fetchImages });
  const { formData, setFormData } = useContext(FormContext);
  const [selectedImage, setSelectedImage] = useState<number | null>(
    images?.data && typeof formData !== "string" && !("date" in formData)
      ? images.data.urls.indexOf(formData.image || "")
      : null
  );

  return (
    images?.data &&
    typeof formData !== "string" &&
    !("date" in formData) && (
      <ScrollArea>
        <div className="flex flex-row flex-wrap gap-2">
          {isPending && <LoadingSpinner className="text-secondary" />}
          {error && <p>Error: {error.message}</p>}
          {images &&
            images.data &&
            images.data.urls.map((image, index) => (
              <Image
                key={image}
                src={image}
                alt={image}
                width={80}
                height={80}
                className={`cursor-pointer ${
                  selectedImage === index
                    ? "border border-green-600 pointer-events-none cursor-auto"
                    : "hover:scale-105 hover:border-secondary border border-border transition-all duration-500"
                }`}
                onClick={() => {
                  setFormData({ ...formData, image: image });
                  setSelectedImage(index);
                }}
              />
            ))}
        </div>
      </ScrollArea>
    )
  );
};

export const Form = {
  Root,
  Input,
  TextArea,
  ImageSelector,
  PriceInput,
  DatePicker,
};
