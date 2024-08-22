"use client";
import { menuLinks, socialLinks, navLinks } from "./Nav.config";
import DesktopNav from "./Nav.Desktop";
import MobileNav from "./Nav.Mobile";
import { useEffect, useState } from "react";
import { INavProps } from "./Nav.interfaces";

const Nav: React.FC<INavProps> = ({ isMobile, pathName }) => {
  return (
    <>
      {isMobile ? (
        <MobileNav
          menuLinks={menuLinks}
          socialLinks={socialLinks}
          navLinks={navLinks}
          pathName={pathName}
        />
      ) : (
        <DesktopNav
          menuLinks={menuLinks}
          socialLinks={socialLinks}
          navLinks={navLinks}
          pathName={pathName}
        />
      )}
    </>
  );
};

export default Nav;
