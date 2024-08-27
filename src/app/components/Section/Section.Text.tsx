import { ISectionTextProps } from "./Section.interfaces";

export const SectionText: React.FC<ISectionTextProps> = ({
  children,
  className,
}) => {
  return <div className={className}>{children}</div>;
};

export default SectionText;
