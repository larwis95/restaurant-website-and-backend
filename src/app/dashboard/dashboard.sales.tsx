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
import { useQuery } from "@tanstack/react-query";
import { IPrediction } from "@/lib/tensorflow";
import WeekCalendar from "../components/Dashboard/Sales/Prediction/Prediction.WeekCalendar";

const SalesPage: React.FC = () => {
  const { data: session } = useSession();
  const { isPending, error, data } = useQuery({
    queryKey: ["prediction"],
    queryFn: async () => {
      const response = await fetch(`/api/prediction`);
      const data: IPrediction = await response.json();
      return data;
    },
  });
  const date = format(new Date(), "MMMM do, yyyy");

  return (
    <motion.div
      className="w-full h-fit text-center flex flex-wrap gap-5 flex-row items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <Section className="flex flex-row flex-wrap xl:w-1/4 lg:w-1/4 md:w-1/2 sm:w-full p-4 border border-border rounded-sm h-fit">
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
                {session?.user?.name}
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
          <Prediction data={data} isPending={isPending} error={error} />
        </SectionText>
      </Section>
      <Section className="flex flex-col w-full p-4 rounded-sm">
        <WeekCalendar prediction={data} />
      </Section>
      <Section className="flex flex-col w-full p-4  rounded-sm">
        <SalesGraph />
      </Section>
      <Section className="flex flex-col w-full p-4  rounded-sm gap-4">
        <SalesTable />
      </Section>
    </motion.div>
  );
};

export default SalesPage;
