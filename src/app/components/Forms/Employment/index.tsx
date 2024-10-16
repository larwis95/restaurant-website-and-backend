import ComboBox from "./ComboBox";
import { Button } from "@/components/ui/button";

const EmploymentForm = () => {
  const positions = [
    {
      value: "foh",
      label: "Front of House",
    },
    {
      value: "boh",
      label: "Back of House",
    },
    {
      value: "cook",
      label: "Line Cook",
    },
    {
      value: "delivery",
      label: "Delivery",
    },
  ];
  return (
    <form className="flex flex-col items-start justify-start h-fit gap-2 w-fit p-4">
      <label htmlFor="name">Name</label>
      <input
        name="name"
        type="text"
        className="border border-border rounded-md p-2 bg-primary text-white hover:cursor-pointer hover:border-secondary hover:bg-slate-700 transition duration-500 focus:bg-slate-600 focus:border-x-green-600 focus:border-y-green-600 w-fit"
      />
      <label htmlFor="email">Email</label>
      <input
        name="email"
        type="email"
        className="border border-border rounded-md p-2 bg-primary text-white hover:cursor-pointer hover:border-secondary hover:bg-slate-700 transition duration-500 focus:bg-slate-600 focus:border-x-green-600 focus:border-y-green-600 w-fit"
      />
      <label htmlFor="phone">Phone</label>
      <input
        name="phone"
        type="tel"
        className="border border-border rounded-md p-2 bg-primary text-white hover:cursor-pointer hover:border-secondary hover:bg-slate-700 transition duration-500 focus:bg-slate-600 focus:border-x-green-600 focus:border-y-green-600 w-fit"
      />
      <ComboBox positions={positions} />
      <label htmlFor="questions">Questions</label>
      <textarea
        name="questions"
        className="border border-border rounded-md p-2 bg-primary text-white hover:cursor-pointer hover:border-secondary hover:bg-slate-700 transition duration-500 focus:bg-slate-600 focus:border-x-green-600 focus:border-y-green-600 w-fit"
        placeholder="Questions or Comments"
      />
      <Button
        type="submit"
        variant="outline"
        className="border-secondary hover:border-green-600 hover:text-green-600"
      >
        Submit
      </Button>
    </form>
  );
};

export default EmploymentForm;
