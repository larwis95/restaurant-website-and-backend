"use client";
import { useState } from "react";
import { FindSaleArgs } from "@/app/libs/api.types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import SubForm from "./Table.SubForm";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { IFilterFormProps } from "./Table.interfaces";
import TableInput from "./Table.Input";

const FilterForm = ({ onSubmit, actionStore }: IFilterFormProps) => {
  const today = new Date();
  const [formType, setFormType] = useState<"year" | "month" | "week" | "day">(
    "month"
  );

  return (
    <>
      <RadioGroup
        defaultValue="week"
        onValueChange={(value) => {
          setFormType(value as "year" | "month" | "week" | "day");
        }}
        className="flex flex-row gap-4"
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
      {formType === "day" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <SubForm action={actionStore[formType]} onSubmit={onSubmit}>
            <TableInput type="date" name="day" />
            <Button type="submit">Submit</Button>
          </SubForm>
        </motion.div>
      )}
    </>
  );
};

export default FilterForm;
