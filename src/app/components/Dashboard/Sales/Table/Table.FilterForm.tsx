"use client";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import SubForm from "./Table.SubForm";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { IFilterFormProps, IFilterFormState } from "./Table.interfaces";
import TableInput from "./Table.Input";
import { getWeekOfMonth } from "date-fns";

const FilterForm = ({ setFetch }: IFilterFormProps) => {
  const today = new Date();
  const [formType, setFormType] = useState<IFilterFormState>({
    type: "week",
    args: {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      week: getWeekOfMonth(new Date()),
    },
  });

  return (
    <div className="flex flex-col w-fit items-start p-4 gap-4 border border-border">
      <h2 className="text-white text-lg">Filter Sales</h2>
      <RadioGroup
        onValueChange={(value: "week" | "month" | "year" | "day") => {
          setFormType({ type: value, args: {} });
        }}
        className="flex flex-row gap-4"
        defaultValue="week"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="day"
            id="day"
            className="text-white border-border"
          />
          <Label htmlFor="day">Day</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="week"
            id="week"
            className="text-white border-border"
          />
          <Label htmlFor="week">Week</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="month"
            id="month"
            className="text-white border-border"
          />
          <Label htmlFor="month">Month</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="year"
            id="year"
            className="text-white border-border"
          />
          <Label htmlFor="year">Year</Label>
        </div>
      </RadioGroup>
      {formType.type === "day" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <SubForm setFetch={setFetch} type={formType.type}>
            <TableInput type="date" name="day" dataType="day" />
            <Button type="submit">Submit</Button>
          </SubForm>
        </motion.div>
      )}
      {formType.type === "week" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <SubForm setFetch={setFetch} type={formType.type}>
            <TableInput
              type="number"
              name="month"
              max={12}
              min={1}
              dataType={formType.type}
            />
            <TableInput
              type="number"
              name="week"
              max={6}
              min={1}
              dataType={formType.type}
            />
            <TableInput
              type="number"
              name="year"
              max={today.getFullYear()}
              min={2023}
              dataType={formType.type}
            />
            <Button type="submit">Submit</Button>
          </SubForm>
        </motion.div>
      )}
      {formType.type === "month" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <SubForm setFetch={setFetch} type={formType.type}>
            <TableInput
              type="number"
              name="month"
              max={12}
              min={1}
              dataType={formType.type}
            />
            <TableInput
              type="number"
              name="year"
              max={today.getFullYear()}
              min={today.getFullYear() - 1}
              dataType={formType.type}
            />
            <Button type="submit">Submit</Button>
          </SubForm>
        </motion.div>
      )}
      {formType.type === "year" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <SubForm setFetch={setFetch} type={formType.type}>
            <TableInput
              type="number"
              name="year"
              max={today.getFullYear()}
              min={today.getFullYear() - 1}
              dataType={formType.type}
            />
            <Button type="submit">Submit</Button>
          </SubForm>
        </motion.div>
      )}
    </div>
  );
};

export default FilterForm;
