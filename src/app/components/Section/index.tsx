import { ISectionProps } from "./Section.interfaces";

const Section: React.FC<ISectionProps> = ({ children, className, id }) => {
  return (
    <section className={className} id={id}>
      {children}
    </section>
  );
};

export default Section;
