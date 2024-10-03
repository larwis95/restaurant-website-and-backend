import { IMenuItemProps } from "../Dashboard/Menu/Menu.interfaces";

const MenuCard: React.FC<IMenuItemProps> = ({ item }) => {
  const { name, price, description } = item;
  return (
    <div className="bg-black bg-opacity-70 rounded-lg shadow-lg p-4 flex flex-col justify-start items-start w-full">
      <p className="font-bold md:text-4xl text-2xl">{name}</p>
      <p className="font-normal text-base text-white">${price.toFixed(2)}</p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200 w-fit">
        {description}
      </p>
    </div>
  );
};

export default MenuCard;
