"use client";
import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";

interface ICollageProps {
  photos: Array<{ src: StaticImageData; alt: string }>;
}

const Collage: React.FC<ICollageProps> = ({ photos }) => {
  return (
    <div className="w-full h-[200svh] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center max-w-7xl gap-4">
      {photos.map((photo, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.4 }}
          className="w-full h-full relative rounded-lg overflow-hidden"
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            className="w-full h-full  object-cover object-top"
          />
        </motion.div>
      ))}
      <motion.h2
        className="text-3xl text-secondary font-bold p-4 text-nowrap"
        initial={{
          opacity: 0,
          y: 50,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: photos.length * 0.4,
        }}
      >
        Join Our Team
      </motion.h2>
    </div>
  );
};

export default Collage;
