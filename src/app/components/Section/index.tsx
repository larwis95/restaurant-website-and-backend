import { ISectionProps } from "./Section.interfaces";

const Section: React.FC<ISectionProps> = ({ children, className }) => {
  return <section className={className}>{children}</section>;
};

export default Section;
