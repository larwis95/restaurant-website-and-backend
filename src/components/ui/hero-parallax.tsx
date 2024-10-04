"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    description: string;
    price: number;
    thumbnail: string;
  }[];
}) => {
  const firstRow = products.slice(0, 6);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [200, -100]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [-1000, 0]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 200]),
    springConfig
  );
  return (
    <div
      ref={ref}
      className="h-[400vh] xl:h-[200vh] lg:h-[200vh] md:[400vh] overflow-hidden w-full antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div className="flex flex-row-reverse flex-wrap mb-20">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full  left-0 top-0">
      <h1 className="text-2xl text-secondary md:text-7xl font-bold dark:text-white">
        Our Specials, <br />
        Your Favorites
      </h1>
      <p className="max-w-2xl text-base md:text-xl text-slate-400 dark:text-neutral-200">
        We&apos;re always cooking up something special. Check out our latest
        creations.
      </p>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    description: string;
    price: number;
    thumbnail: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-96 w-full xl:w-1/3 lg:w-1/3 md:w-1/3 relative flex-shrink-0"
    >
      <div className="absolute bottom-4 left-4 z-20 p-4 w-fit  opacity-100 group-hover/product:opacity-0 flex flex-col justify-start bg-black bg-opacity-50">
        <h2 className="text-3xl text-secondary font-bold">{product.title}</h2>
        <h3 className="text-xl text-white">${product.price.toFixed(2)}</h3>
      </div>
      <Image
        src={product.thumbnail}
        height="600"
        width="600"
        className="object-cover object-left-top absolute h-full w-full inset-0"
        alt={product.title}
      />

      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none flex flex-col justify-center items-center">
        <h2 className="opacity-0 group-hover/product:opacity-100 text-white text-2xl">
          {product.description}
        </h2>
      </div>
    </motion.div>
  );
};
