"use client";
import NavigationTabs from "../components/NavigationTabs";
import { useSearchParams } from "next/navigation";
import SalesPage from "./dashboard.sales";
import MenuPage from "./dashboard.menu";
import SpecialPage from "./dashboard.specials";
import ApplicationPage from "./dashboard.applications";
import { AnimatePresence } from "framer-motion";

const DashboardPage: React.FC = () => {
  const searchParams = useSearchParams();
  const tabs = [
    { name: "Sales", page: <SalesPage /> },
    { name: "Menu", page: <MenuPage /> },
    { name: "Specials", page: <SpecialPage /> },
    { name: "Applications", page: <ApplicationPage /> },
  ];

  const renderPage = () => {
    const pageMap = new Map<string, JSX.Element>(
      tabs.map((tab) => [tab.name, tab.page])
    );
    const activeTab = searchParams.get("tab");
    return pageMap.get(activeTab ? activeTab : "Sales") as JSX.Element;
  };

  return (
    <div className="w-full h-fit flex flex-col pt-24 pb-1 overflow-x-hidden">
      <div className="flex w-full flex-row justify-center items-center p-4">
        <NavigationTabs tabs={tabs} />
      </div>
      <AnimatePresence mode="wait">{renderPage()}</AnimatePresence>
    </div>
  );
};

export default DashboardPage;
