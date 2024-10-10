"use client";
import { useQuery } from "@tanstack/react-query";
import { getActiveSpecials } from "@/lib/queries/specials/get.specials";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { LoadingSpinner } from "@/components/ui/loading";

const Specials = () => {
  const {
    data: activeSpecials,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["activeSpecials"],
    queryFn: getActiveSpecials,
  });

  const specials = activeSpecials?.map((special) => {
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
