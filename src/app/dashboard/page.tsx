"use client";
import NavigationTabs from "../components/NavigationTabs";
import { useSearchParams, useRouter } from "next/navigation";
import SalesPage from "./dashboard.sales";
import MenuPage from "./dashboard.menu";
import { AnimatePresence } from "framer-motion";

const DashboardPage: React.FC = () => {
  const searchParams = useSearchParams();
  const tabs = [
    { name: "Sales", href: "Sales" },
    { name: "Menu", href: "Menu" },
    { name: "Specials", href: "Specials" },
  ];

  return (
    <div className="w-full h-fit flex flex-col items-center pt-24 p-4 overflow-x-hidden">
      <NavigationTabs tabs={tabs} />
      <AnimatePresence mode="wait">
        {(searchParams.get("tab") === "Sales" ||
          searchParams.get("tab") === null) && <SalesPage />}
        {searchParams.get("tab") === "Menu" && <MenuPage />}
        {searchParams.get("tab") === "Specials" && (
          <div>Not yet implemented.</div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardPage;
