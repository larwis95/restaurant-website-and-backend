"use client";
import NavigationTabs from "../components/NavigationTabs";
import { useSearchParams } from "next/navigation";
import SalesPage from "./dashboard.sales";
import MenuPage from "./dashboard.menu";
import SpecialPage from "./dashboard.specials";
import ApplicationPage from "./dashboard.applications";
import { AnimatePresence } from "framer-motion";
import { useMemo } from "react";

const DashboardPage: React.FC = () => {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab");

  const tabs = useMemo(
    () => [
      { name: "Sales", page: <SalesPage /> },
      { name: "Menu", page: <MenuPage /> },
      { name: "Specials", page: <SpecialPage /> },
      { name: "Applications", page: <ApplicationPage /> },
    ],
    []
  );

  const renderPage = useMemo(() => {
    const activePage = tabs.find(
      (tab) => tab.name.toLowerCase() === activeTab?.toLowerCase()
    );
    return activePage ? activePage.page : tabs[0].page;
  }, [activeTab, tabs]);

  return (
    <div className="w-full h-fit flex flex-col pt-24 pb-1 overflow-x-hidden">
      <div className="flex w-full flex-row justify-center items-center p-4">
        <NavigationTabs tabs={tabs} />
      </div>
      <AnimatePresence mode="wait">{renderPage}</AnimatePresence>
    </div>
  );
};

export default DashboardPage;
