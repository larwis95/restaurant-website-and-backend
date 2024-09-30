"use client";
import NavigationTabs from "../components/NavigationTabs";
import { useSearchParams, useRouter } from "next/navigation";
import SalesPage from "./dashboard.sales";
import MenuPage from "./dashboard.menu";
import { AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { toast } from "@/hooks/use-toast";
import Image from "next/image";

const DashboardPage: React.FC = () => {
  const searchParams = useSearchParams();
  const { data } = useSession();
  const tabs = [
    { name: "Sales", href: "Sales" },
    { name: "Menu", href: "Menu" },
    { name: "Specials", href: "Specials" },
  ];

  if (data?.user.name === "Stephanie") {
    toast({
      title: ".|..",
      description: (
        <Image
          src="https://jhxtohkjwg0z7s7m.public.blob.vercel-storage.com/IMG_0094-IxmNX7534YiltRUjia4hWaSEd0Jjli.jpeg"
          alt="Stephanie"
          width={300}
          height={300}
        />
      ),
    });
  }

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
