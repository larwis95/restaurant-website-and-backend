import { useContext } from "react";
import { formContext } from "./Table.SubForm";
import { format } from "date-fns";
import { ITableInputProps } from "./Table.interfaces";

const TableInput: React.FC<ITableInputProps> = ({
  name,
  type,
  max,
  min,
  dataType,
}) => {
  const { formState, setFormState } = useContext(formContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (name === "day") {
      value = format(new Date(value), "mm/dd/yyyy");
    }
    setFormState({
      type: dataType,
      args: {
        ...formState.args,
        [name]: e.target.value,
      },
    });
  };

  return (
    <div className="flex flex-col w-fit">
      <label htmlFor={name}>
        {name.replace(/\b[a-z]/g, (x) => x.toUpperCase())}
      </label>
      <input
        name={name}
        type={type}
        onChange={handleChange}
        max={max}
        min={min}
        className="border border-border rounded-md p-2 bg-primary text-white hover:cursor-pointer hover:border-secondary hover:bg-slate-700 transition duration-500 focus:bg-slate-600 focus:border-x-green-600 focus:border-y-green-600 w-24"
      />
    </div>
  );
};

export default TableInput;
