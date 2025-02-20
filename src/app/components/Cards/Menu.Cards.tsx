import { IMenuCardProps } from "./interfaces.Cards";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutContext } from "@/app/components/Providers/Menu";
import { useContext, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { renderPrice } from "@/lib/helpers/renderPrice";
import SelectedCard from "./SelectedCard";

const MenuCard: React.FC<IMenuCardProps> = ({ item }) => {
  const { name, price, description, image } = item;
  const { selected, setSelected } = useContext(LayoutContext);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selected === item) {
      ref.current?.scrollIntoView({ behavior: "instant" });
    }
  }, [selected, item]);

  return (
    <>
      <motion.div
        onClick={() => {
          setSelected(item);
          document.body.style.overflow = "hidden";
        }}
        animate={{ opacity: selected !== item ? 1 : 0 }}
        className="flex xl:w-1/4 md:w-1/2 sm:w-full hover:cursor-pointer"
      >
        <Card className="flex flex-col flex-grow justify-start w-full bg-primary relative">
          <Image
            src={image}
            alt={name}
            width={200}
            height={200}
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
          <CardContent>
            <CardDescription className="text-white text-lg">
              {description}
            </CardDescription>
          </CardContent>
        </Card>
      </motion.div>
      <AnimatePresence>
        {selected === item && <SelectedCard item={item} ref={ref} />}
      </AnimatePresence>
    </>
  );
};

export default MenuCard;
