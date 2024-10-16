import Section from "../components/Section";
import Collage from "../components/Collage";
import makingPizza from "../../../public/images/728CD99A-D369-481C-9CCC-4CA6FB791574.webp";
import transaction from "../../../public/images/transaction.webp";
import team from "../../../public/images/DSC_6549.webp";
import kitchen from "../../../public/images/DSC_7225.webp";

const TestPage = () => {
  const photos = [
    {
      src: makingPizza,
      alt: "Making Pizza at Big Joe's",
    },
    {
      src: transaction,
      alt: "Working the front of the house at Big Joe's",
    },
    {
      src: team,
      alt: "Big Joe's Team",
    },
    {
      src: kitchen,
      alt: "Working the kitchen at Big Joe's",
    },
  ];

  return (
    <Section className="w-full h-fit flex flex-col justify-center items-center py-24  border-b border-border">
      <h1>Test</h1>
      <Collage photos={photos} />
    </Section>
  );
};

export default TestPage;
