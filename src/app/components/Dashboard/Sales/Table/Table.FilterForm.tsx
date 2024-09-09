"use client";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import SubForm from "./Table.SubForm";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { IFilterFormProps } from "./Table.interfaces";
import TableInput from "./Table.Input";

const FilterForm = ({ setFetch }: IFilterFormProps) => {
  const today = new Date();
  const [formType, setFormType] = useState<"year" | "month" | "week" | "day">(
    "week"
  );

  return (
    <div className="flex flex-col w-fit items-start p-4 gap-4 border border-border">
      <h2 className="text-white text-lg">Filter Sales</h2>
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
          <SubForm setFetch={setFetch} type={formType}>
            <TableInput type="date" name="day" dataType="day" />
            <Button type="submit">Submit</Button>
          </SubForm>
        </motion.div>
      )}
      {formType === "week" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <SubForm setFetch={setFetch} type={formType}>
            <TableInput
              type="number"
              name="month"
              max={12}
              min={1}
              dataType={formType}
            />
            <TableInput
              type="number"
              name="week"
              max={5}
              min={1}
              dataType={formType}
            />
            <TableInput
              type="number"
              name="year"
              max={today.getFullYear()}
              min={today.getFullYear() - 1}
              dataType={formType}
            />
            <Button type="submit">Submit</Button>
          </SubForm>
        </motion.div>
      )}
      {formType === "month" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <SubForm setFetch={setFetch} type={formType}>
            <TableInput
              type="number"
              name="month"
              max={12}
              min={1}
              dataType={formType}
            />
            <TableInput
              type="number"
              name="year"
              max={today.getFullYear()}
              min={today.getFullYear() - 1}
              dataType={formType}
            />
            <Button type="submit">Submit</Button>
          </SubForm>
        </motion.div>
      )}
      {formType === "year" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <SubForm setFetch={setFetch} type={formType}>
            <TableInput
              type="number"
              name="year"
              max={today.getFullYear()}
              min={today.getFullYear() - 1}
              dataType={formType}
            />
            <Button type="submit">Submit</Button>
          </SubForm>
        </motion.div>
      )}
    </div>
  );
};

export default FilterForm;
