"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import AutoPlay from "embla-carousel-autoplay";

import { ICarouselProps } from "./Hero.interfaces";
import Image from "next/image";
import HeroHeading from "./Hero.Heading";
import HeroChevron from "./Hero.Chevron";

export const HeroCarousel: React.FC<ICarouselProps> = ({ items }) => {
  return (
    <Carousel
      className="w-full p-4 flex justify-center rounded-md"
      plugins={[
        AutoPlay({
          delay: 5000,
        }),
      ]}
      opts={{
        loop: true,
      }}
    >
      <HeroHeading />
      <CarouselContent className="rounded-lg">
        {items.map((item, index) => (
          <CarouselItem key={index}>
            <Image
              src={item.src}
              alt={item.alt}
              height={1080}
              width={1920}
              className="w-full h-screen object-cover rounded-lg"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <HeroChevron />
    </Carousel>
  );
};

export default HeroCarousel;
