import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import Section from "../components/Section";

const ApplicationPage = () => {
  const searchParams = useSearchParams();

  return (
    <motion.div
      className="w-full h-fit text-center flex flex-wrap gap-5 flex-row items-center justify-center overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <Section className="w-full flex flex-row p-5 flex-wrap items-start border border-white gap-2">
        <div className="flex flex-col justify-start border-secondary border-b pb-2 xl:1/4 lg:w-1/4 md:w-full sm:w-full">
          <h2 className="text-2xl w-fit">Applications</h2>
          <p className="text-md text-slate-400 w-fit">
            Click an application to view full application.
          </p>
        </div>
      </Section>
    </motion.div>
  );
};

export default ApplicationPage;
