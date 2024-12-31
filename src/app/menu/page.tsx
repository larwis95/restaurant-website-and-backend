import { fetchAllMenusServerAction } from "@/lib/queries/menu/get.menu";
import Search from "../components/Inputs/Search";
import MenuProvider from "../components/Providers/Menu";
import MenuSection from "../components/Menu/Menu.Section";
import { SelectedCardProvider } from "@/app/components/Providers/Menu";

const MenuPage = async () => {
  const menuCategories = await fetchAllMenusServerAction();
  if ("error" in menuCategories) {
    return (
      <div>
        <h1>{menuCategories.error}</h1>
      </div>
    );
  }
  let menu = menuCategories;

  return (
    <main className="w-full flex flex-row flex-wrap justify-center items-center py-24 px-4 xl:px-20 lg:px-20 md:px-10 sm:px-14 gap-10 relative">
      <MenuProvider>
        <div className="w-full flex flex-col justify-center items-start sticky top-9 z-[9999] bg-background p-4">
          <h1 className="text-2xl text-secondary font-bold">Menu</h1>
          <p className="text-md text-slate-400">Find what you are craving.</p>
          <Search menu={menu} />
        </div>
        <SelectedCardProvider>
          <MenuSection />
        </SelectedCardProvider>
      </MenuProvider>
    </main>
  );
};

export default MenuPage;
