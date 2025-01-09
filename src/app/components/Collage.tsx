"use client";
import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";

interface ICollageProps {
  photos: Array<{ src: StaticImageData; alt: string }>;
}

const Collage: React.FC<ICollageProps> = ({ photos }) => {
  return (
    <div className="flex flex-col flex-wrap w-full h-full items-stretch justify-center">
      <div className="grid xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 w-full h-full gap-1 items-stretch">
        {photos.map((photo, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.4 }}
            className="relative rounded-lg overflow-hidden"
          >
            <Image src={photo.src} alt={photo.alt} height={400} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Collage;
