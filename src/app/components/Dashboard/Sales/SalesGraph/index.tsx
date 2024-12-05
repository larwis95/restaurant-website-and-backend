"use client";
import useSalesData from "@/lib/hooks/useSalesData";
import Graph from "./SalesGraph.graph";
import { LoadingSpinner } from "@/components/ui/loading";

const SalesGraph = () => {
  const salesData = useSalesData();
  const isLoading = Object.values(salesData).some((data) => data.isLoading);
  return (
    <>
      {isLoading ? (
        <LoadingSpinner className="text-secondary" />
      ) : (
        <Graph data={salesData} />
      )}
    </>
  );
};

export default SalesGraph;
