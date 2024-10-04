"use client";
import { useQuery } from "@tanstack/react-query";
import { getSpecials } from "../libs/queries/specials/get.specials";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { LoadingSpinner } from "@/components/ui/loading";

const Specials = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["specials"],
    queryFn: getSpecials,
  });

  const specials = data?.map((special) => {
    return {
      title: special.name,
      description: special.description,
      thumbnail: special.image,
      price: special.price,
    };
  });

  return (
    <>
      {isLoading && <LoadingSpinner className="text-secondary" />}
      {error && <div>Error: {error.message}</div>}
      {specials && <HeroParallax products={specials} />}
    </>
  );
};

export default Specials;
