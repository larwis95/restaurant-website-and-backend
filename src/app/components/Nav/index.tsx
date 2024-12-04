"use client";
import { usePathname } from "next/navigation";
import { menuLinks, socialLinks, navLinks } from "./Nav.config";
import DesktopNav from "./Nav.Desktop";
import MobileNav from "./Nav.Mobile";
import { INavProps } from "./Nav.interfaces";

const Nav: React.FC<INavProps> = ({ isMobile, status }) => {
  const pathName = usePathname();
  return (
    <>
      {isMobile ? (
        <MobileNav
          menuLinks={menuLinks}
          socialLinks={socialLinks}
          navLinks={navLinks}
          pathName={pathName}
          status={status}
        />
      ) : (
        <DesktopNav
          menuLinks={menuLinks}
          socialLinks={socialLinks}
          navLinks={navLinks}
          pathName={pathName}
          status={status}
        />
      )}
    </>
  );
};

export default Nav;
