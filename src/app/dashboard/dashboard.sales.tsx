"use client";
import { motion } from "framer-motion";
import { format } from "date-fns";
import Section from "../components/Section";
import SectionText from "../components/Section/Section.Text";
import Prediction from "../components/Dashboard/Sales/Prediction";
import SalesGraph from "../components/Dashboard/Sales/SalesGraph";
import SalesTable from "../components/Dashboard/Sales/Table";
import DashBoardNotification from "../components/Dashboard/Dashboard.notification";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const SalesPage: React.FC = () => {
  const { data } = useSession();
  const date = format(new Date(), "MMMM do, yyyy");

  return (
    <motion.div
      className="w-full h-fit text-center flex flex-wrap gap-5 flex-row items-center justify-center overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <Section className="flex flex-row flex-wrap w-full xl:w-fit lg:w-fit md:w-fit sm:w-full p-4 border border-white rounded-sm h-fit">
        <DashBoardNotification />
        <div className="flex w-full justify-end items-start"></div>
        <SectionText className="flex flex-col w-full text-secondary gap-2 h-44">
          <div className="flex flex-col items-center justify-center border-b border-secondary p-2">
            <motion.h2
              className="text-2xl w-fit"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.0 }}
            >
              Hello,{" "}
              <motion.span
                className="text-secondary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 3.0 }}
              >
                {data?.user?.name}
              </motion.span>
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
      <Section className="flex flex-col w-full h-screen p-4 border border-white rounded-sm">
        <SalesGraph />
      </Section>
      <Section className="flex flex-col w-full p-4 border border-white rounded-sm gap-4">
        <SalesTable />
      </Section>
    </motion.div>
  );
};

export default SalesPage;
