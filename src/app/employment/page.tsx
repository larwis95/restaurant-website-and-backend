import Section from "../components/Section";
import Collage from "../components/Collage";
import makingPizza from "../../../public/images/DSC_6654.webp";
import transaction from "../../../public/images/transaction.webp";
import team from "../../../public/images/DSC_6549.webp";
import kitchen from "../../../public/images/DSC_7225.webp";
import EmploymentForm from "../components/Forms/Employment";

const EmploymentPage: React.FC = () => {
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
    <div className="w-full flex flex-col pt-24 overflow-x-hidden xl:px-24 md:px-12 sm:px-6">
      <Section className="w-full flex flex-col justify-center items-start">
        <Collage photos={photos} />
      </Section>
      <Section className="w-full h-fit flex flex-col justify-center items-center">
        <EmploymentForm />
      </Section>
    </div>
  );
};

export default EmploymentPage;
