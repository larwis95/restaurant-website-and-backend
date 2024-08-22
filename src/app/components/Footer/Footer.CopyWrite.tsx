import { IFooterCopyWrite } from "./Footer.interfaces";

const FooterCopyWrite: React.FC<IFooterCopyWrite> = ({ children }) => {
  return (
    <div className="flex flex-row justify-center items-center">{children}</div>
  );
};

export default FooterCopyWrite;
