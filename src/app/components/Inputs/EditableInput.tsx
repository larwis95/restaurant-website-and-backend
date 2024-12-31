import { useState, useRef, useEffect } from "react";

interface IEditableText {
  initialValue?: string | number;
  onSave: (value: string) => void;
  textBox?: boolean;
  children?: React.ReactNode;
}

const EditableText: React.FC<IEditableText> = ({
  initialValue,
  onSave,
  textBox,
  children,
}) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (typeof initialValue === "number")
      return setValue(parseFloat(e.target.value));
    return setValue(e.target.value);
  };

  const handleOnBlur = () => {
    if (value === undefined) return;
    if (typeof value === "number") {
      setValue(parseFloat(value.toString()));
      setIsUpdating(!isUpdating);
      return onSave(value.toFixed(2));
    }
    setIsUpdating(!isUpdating);
    onSave(value);
  };

  useEffect(() => {
    const ref = textBox ? textAreaRef : inputRef;
    if (isUpdating) ref.current?.focus();
  }, [isUpdating, textBox]);

  return (
    (initialValue !== undefined &&
      isUpdating &&
      (!textBox ? (
        <input
          type={typeof initialValue === "number" ? "number" : "text"}
          value={value}
          ref={inputRef}
          step={0.01}
          className="border border-border rounded-md p-2 bg-primary text-white hover:cursor-pointer hover:border-secondary hover:bg-slate-700 transition duration-500 focus:bg-slate-600 focus:border-x-green-600 focus:border-y-green-600 w-fit"
          onChange={handleOnChange}
          onBlur={handleOnBlur}
        />
      ) : (
        <textarea
          value={value}
          className="border border-border rounded-md p-2 bg-primary text-white hover:cursor-pointer hover:border-secondary hover:bg-slate-700 transition duration-500 focus:bg-slate-600 focus:border-x-green-600 focus:border-y-green-600 w-full"
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          ref={textAreaRef}
        />
      ))) || (
      <span
        className="hover:cursor-pointer hover:border-secondary hover:bg-slate-700 transition duration-500 focus:bg-slate-600 focus:border-x-green-600 focus:border-y-green-600 w-full"
        onClick={() => {
          setIsUpdating(true);
          setValue(initialValue);
        }}
      >
        {value || children}
      </span>
    )
  );
};

export default EditableText;
