import { fetchAllMenusServerAction } from "../libs/queries/menu/get.menu";
import Search from "../components/Inputs/Search";
import MenuProvider from "../components/Providers/Menu";
import MenuSection from "../components/Menu/Menu.Section";

const MenuPage = async () => {
  const menuCategories = await fetchAllMenusServerAction();
  if ("error" in menuCategories) {
    return (
      <div>
        <h1>Error loading menu.</h1>
      </div>
    );
  }
  let menu = menuCategories;

  return (
    <main className="w-full flex flex-row flex-wrap justify-center items-center py-24 px-4 xl:px-20 lg:px-20 md:px-10 sm:px-14 gap-10">
      <MenuProvider>
        <div className="w-full flex flex-col justify-center items-start">
          <h1 className="text-4xl text-secondary font-bold">Menu</h1>
          <p className="text-md text-slate-400">Find what you are craving.</p>
          <Search menu={menu} />
        </div>
        <MenuSection />
      </MenuProvider>
    </main>
  );
};

export default MenuPage;
