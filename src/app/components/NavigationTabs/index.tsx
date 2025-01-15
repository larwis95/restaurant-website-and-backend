"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import { NavigationTabsProps } from "./interfaces.NavigationTabs";

const NavigationTabs: React.FC<NavigationTabsProps> = ({ tabs }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab = searchParams.get("tab");

  const handleTabChange = (href: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", href);
    router.push("/dashboard" + "?" + params.toString());
  };

  return (
    <Tabs defaultValue={activeTab ? activeTab : tabs[0].name}>
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.name}
            value={tab.name}
            data-state={
              activeTab
                ? activeTab.toLowerCase() === tab.name.toLowerCase()
                  ? "active"
                  : "inactive"
                : tab.name.toLowerCase() === tabs[0].name.toLowerCase()
                  ? "active"
                  : "inactive"
            }
            onClick={() => handleTabChange(tab.name.toLowerCase())}
          >
            {tab.name}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default NavigationTabs;
