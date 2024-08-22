import { IFooterProps } from "./Footer.interfaces";
import FooterCopyWrite from "./Footer.CopyWrite";
import FooterInfo from "./Footer.Info";

const Footer: React.FC<IFooterProps> = ({ children }) => {
  return (
    <footer className="w-full flex flex-col justify-center items-center p-8 bg-background border-t border-border">
      {children}
    </footer>
  );
};

export { FooterCopyWrite, FooterInfo };

export default Footer;
