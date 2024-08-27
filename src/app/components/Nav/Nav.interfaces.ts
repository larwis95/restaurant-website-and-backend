import {
  NavLinkConfig,
  SocialLinkListConfig,
  NavLinkListConfig,
} from "./Nav.types";

export interface INavMenuProps {
  menuLinks: NavLinkListConfig[];
  socialLinks: SocialLinkListConfig[];
  navLinks: NavLinkConfig[];
  pathName: string;
}

export interface INavProps {
  isMobile: boolean;
}

export interface IMobileIconProps {
  className: string;
}
