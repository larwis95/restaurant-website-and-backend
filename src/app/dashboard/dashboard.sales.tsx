"use client";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { useSearchParams } from "next/navigation";
import Section from "../components/Section";
import SectionText from "../components/Section/Section.Text";
import { ISalesPageProps } from "./dashboard.interfaces";
import Prediction from "../components/Dashboard/Sales/Prediction";
import SalesGraph from "../components/Dashboard/Sales/SalesGraph";
import SalesTable from "../components/Dashboard/Sales/Table";

const SalesPage: React.FC<ISalesPageProps> = ({ tabs }) => {
  const date = format(new Date(), "MMMM do, yyyy");
  return (
    <motion.div
      className="pt-24 w-full text-center flex flex-wrap gap-5 flex-row items-center justify-center overflow-x-hidden"
      initial={{ x: "-100%" }}
      animate={{ x: "0%" }}
      exit={{ x: "150%" }}
      transition={{ duration: 1, type: "spring", stiffness: 120 }}
    >
      <Section className="flex flex-col w-fit p-4 border border-white rounded-sm">
        <SectionText className="flex flex-col w-full text-secondary gap-2">
          <div className="flex flex-col items-center justify-center border-b border-secondary p-2">
            <motion.h2
              className="text-2xl w-fit"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.0 }}
            >
              Hello, Andrew.
            </motion.h2>
            <motion.p
              className="text-lg text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.0 }}
            >
              Today, {date}
            </motion.p>
          </div>
          <Prediction />
        </SectionText>
      </Section>
      <Section className="flex flex-col xl:w-1/3 lg:w-1/3 sm:w-full xs:w-full md:w-1/2 p-4 border border-white rounded-sm">
        <SalesGraph />
      </Section>
      <Section className="flex flex-col w-3/4 p-4 border border-white rounded-sm">
        <SalesTable />
      </Section>
    </motion.div>
  );
};

export default SalesPage;
