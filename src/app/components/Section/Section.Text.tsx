import { ISectionTextProps } from "./Section.interfaces";

export const SectionText: React.FC<ISectionTextProps> = ({ children }) => {
  return (
    <div className="sm:w-full md:w-1/2 lg:w-1/3  text-2xl text-secondary">
      {children}
    </div>
  );
};

export default SectionText;
