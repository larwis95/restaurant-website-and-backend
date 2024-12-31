import { IMenuCardProps } from "./interfaces.Cards";
import { motion } from "framer-motion";
import { LayoutContext } from "@/app/components/Providers/Menu";
import { Ref, useContext } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { renderPrice } from "@/lib/helpers/renderPrice";
import { forwardRef } from "react";

const SelectedCard = forwardRef<HTMLDivElement, IMenuCardProps>(
  function SelectCard({ item }, ref) {
    const { name, price, description, image } = item;
    const { selected, setSelected } = useContext(LayoutContext);

    const handleOutSideClick = (e: React.MouseEvent) => {
      setSelected(null);
      document.body.style.overflow = "auto";
    };

    return (
      <motion.div
        className="w-full h-full bg-black bg-opacity-50 fixed top-0 left-0 flex justify-center items-center z-[10000]"
        onClick={handleOutSideClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card
          className="flex flex-col justify-start items-stretch xl:w-1/2 sm:w-full h-fit bg-primary z-[51]"
          ref={ref}
        >
          <Image
            src={image}
            alt={name}
            width={400}
            height={400}
            layout="responsive"
          />
          <CardHeader>
            <CardTitle className="text-secondary text-3xl font-bold">
              {name}
            </CardTitle>
            <CardDescription className="text-white text-xl">
              {renderPrice(price)}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <CardDescription className="text-white text-lg">
              {description}
            </CardDescription>
          </CardContent>
        </Card>
      </motion.div>
    );
  }
);

export default SelectedCard;
