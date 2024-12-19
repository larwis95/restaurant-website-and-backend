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
        <div className="flex justify-center items-center h-96 w-full">
          <LoadingSpinner className="text-secondary" />
        </div>
      ) : (
        <Graph data={salesData} />
      )}
    </>
  );
};

export default SalesGraph;
