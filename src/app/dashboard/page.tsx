"use client";
import NavigationTabs from "../components/NavigationTabs";
import { useSearchParams, usePathname } from "next/navigation";
import SalesPage from "./dashboard.sales";
import { AnimatePresence } from "framer-motion";

const DashboardPage: React.FC = () => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const tabs = [
    { name: "Sales", href: "Sales" },
    { name: "Orders", href: "Orders" },
    { name: "Customers", href: "Customers" },
  ];

  return (
    <div className="w-full h-fit flex flex-col items-center pt-24 p-4 overflow-x-hidden">
      <NavigationTabs tabs={tabs} />
      <AnimatePresence mode="wait">
        {(searchParams.get("tab") === "Sales" ||
          searchParams.get("tab") === null) && <SalesPage tabs={tabs} />}
      </AnimatePresence>
    </div>
  );
};

export default DashboardPage;
