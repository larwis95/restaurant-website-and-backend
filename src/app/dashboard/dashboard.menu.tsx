import { motion } from "framer-motion";
import Section from "../components/Section";
import MenuAccordion from "../components/Dashboard/Menu/Accordion.menu";

const MenuPage: React.FC = () => {
  return (
    <motion.div
      className="pt-24 w-full h-fit text-center flex flex-wrap gap-5 flex-row items-center justify-center overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <Section className="w-full flex flex-row p-5 flex-wrap items-start border border-white">
        <div className="flex flex-col justify-start border-secondary border-b pb-2">
          <h2 className="text-2xl w-fit">Menu</h2>
          <p className="text-md text-slate-400">Click an item field to edit.</p>
        </div>
        <MenuAccordion />
      </Section>
    </motion.div>
  );
};

export default MenuPage;
