type Item = {
  id: number;
  content: JSX.Element | React.ReactNode | string;
  className: string;
  thumbnail: string;
  title: string;
  price?: number | { small?: number; medium?: number; large?: number };
};

const LayoutGird = ({ items }: { items: Item[] }) => {
  const dividedItems = items.reduce(
    (acc, item, index) => {
      if (index % 3 === 0) {
        acc.push([]);
      }
      acc[acc.length - 1].push(item);
      return acc;
    },
    [[]] as Item[][]
  );

  return (
    <div className="w-full min-h-screen flex flex-col gap-4 justify-center items-stretch overflow-x-hidden relative">
      {dividedItems.map((row, i) => (
        <div
          key={i}
          className="w-full h-fit flex flex-1 flex-row flex-wrap justify-center items-stretch gap-4 p-4"
        >
          {row.map((card, i) => card.content)}
        </div>
      ))}
    </div>
  );
};

export default LayoutGird;
