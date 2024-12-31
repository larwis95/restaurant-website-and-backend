import { ItemResponse } from "@/lib/api.types";
import EditableText from "./EditableInput";

export type Price =
  | { small?: number; medium?: number; large?: number }
  | number
  | string;

interface IEditablePriceProps {
  price: Price;
  handleSave: (field: keyof ItemResponse, value: Price) => void;
}

const EditablePrice: React.FC<IEditablePriceProps> = ({
  price,
  handleSave,
}) => {
  if (typeof price === "number") {
    return (
      <EditableText
        initialValue={price}
        onSave={(value) => handleSave("price", parseFloat(value))}
      >
        {`${price.toFixed(2)}`}
      </EditableText>
    );
  }

  return (
    typeof price === "object" &&
    price && (
      <>
        <EditableText
          initialValue={price.small}
          onSave={(value) =>
            handleSave("price", { ...price, small: parseFloat(value) })
          }
        >
          {`${price.small?.toFixed(2) || "N/A"}`}
        </EditableText>
        {" / "}
        <EditableText
          initialValue={price.medium}
          onSave={(value) =>
            handleSave("price", { ...price, medium: parseFloat(value) })
          }
        >
          {`${price.medium?.toFixed(2) || "N/A"}`}
        </EditableText>
        {" / "}
        <EditableText
          initialValue={price.large}
          onSave={(value) =>
            handleSave("price", { ...price, large: parseFloat(value) })
          }
        >
          {`${price.large?.toFixed(2) || "N/A"}`}
        </EditableText>
      </>
    )
  );
};

export default EditablePrice;
