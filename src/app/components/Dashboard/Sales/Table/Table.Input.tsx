import { useContext } from "react";
import { formContext } from "./Table.SubForm";
import { format } from "date-fns";
import { ITableInputProps } from "./Table.interfaces";

const TableInput: React.FC<ITableInputProps> = ({ name, type }) => {
  const { formState, setFormState } = useContext(formContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (name === "day") {
      value = format(new Date(value), "mm/dd/yyyy");
    }
    console.log(value);
    setFormState({
      type: name,
      args: {
        ...formState.args,
        [name]: e.target.value,
      },
    });
    console.log(formState);
  };

  return (
    <div className="flex flex-col gap-2 w-1/4">
      <label htmlFor={name}>
        {name.replace(/\b[a-z]/g, (x) => x.toUpperCase())}
      </label>
      <input name={name} type={type} onChange={handleChange} />
    </div>
  );
};

export default TableInput;
