import { fetchSales } from "./libs/queries/sales/get.sales";
import { getQueryClient } from "./ReactQueryClient";
import { dehydrate } from "@tanstack/react-query";
import { Hydrate } from "./components/Hydrate";
import TestSaleComponent from "./components/TestSaleComponent";

export default async function Home() {
  const sales = await fetchSales();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>{sales.date}</h1>
      <p>{sales.morningSales}</p>
      <p>{sales.nightSales}</p>
      <p>{sales.totalSales}</p>
    </main>
  );
}
