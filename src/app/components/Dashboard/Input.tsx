interface IInputProps {
  label: string;
  type: "text" | "number" | "date" | "textarea";
  value: string | number | undefined;
  name: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const Input: React.FC<IInputProps> = ({
  label,
  type,
  value,
  name,
  onChange,
}) => {
  return type !== "textarea" ? (
    <div>
      <label>{label}</label>
      <input
        type={type}
        id={name}
        value={value}
        step={0.01}
        min={0}
        onChange={onChange}
        className="border border-border rounded-md p-2 bg-primary text-white hover:cursor-pointer hover:border-secondary hover:bg-slate-700 transition duration-500 focus:bg-slate-600 focus:border-x-green-600 focus:border-y-green-600 w-fit"
      />
    </div>
  ) : (
    <div>
      <label>{label}</label>
      <textarea
        value={value}
        id={name}
        onChange={onChange}
        className="border border-border rounded-md p-2 bg-primary text-white hover:cursor-pointer hover:border-secondary hover:bg-slate-700 transition duration-500 focus:bg-slate-600 focus:border-x-green-600 focus:border-y-green-600 w-fit"
      />
    </div>
  );
};

export default Input;
