import { ISectionProps } from "./Section.interfaces";

const Section: React.FC<ISectionProps> = ({ children }) => {
  return (
    <section className="w-full flex flex-row flex-wrap justify-center items-center p-24 xl:p-80 lg:p-24 md:p-24 sm:p-24">
      {children}
    </section>
  );
};

export default Section;
