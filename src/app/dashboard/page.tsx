"use client";
import NavigationTabs from "../components/NavigationTabs";
import { useSearchParams } from "next/navigation";
import SalesPage from "./dashboard.sales";
import MenuPage from "./dashboard.menu";
import { AnimatePresence } from "framer-motion";
import SpecialPage from "./dashboard.specials";

const DashboardPage: React.FC = () => {
  const searchParams = useSearchParams();
  const tabs = [
    { name: "Sales", href: "Sales" },
    { name: "Menu", href: "Menu" },
    { name: "Specials", href: "Specials" },
  ];

  return (
    <div className="w-full h-fit flex flex-col pt-24 pb-1 overflow-x-hidden">
      <div className="flex w-full flex-row justify-center items-center p-4">
        <NavigationTabs tabs={tabs} />
      </div>
      <AnimatePresence mode="wait">
        {(searchParams.get("tab") === "Sales" ||
          searchParams.get("tab") === null) && <SalesPage />}
        {searchParams.get("tab") === "Menu" && <MenuPage />}
        {searchParams.get("tab") === "Specials" && <SpecialPage />}
      </AnimatePresence>
    </div>
  );
};

export default DashboardPage;
