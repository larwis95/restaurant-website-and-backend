import { IFooterInfo } from "./Footer.interfaces";

const FooterInfo: React.FC<IFooterInfo> = ({ children }) => {
  return (
    <div className="flex flex-row flex-wrap justify-center items-center">
      {children}
    </div>
  );
};

export default FooterInfo;
