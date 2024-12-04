import { Session } from "next-auth";
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
  status: Session | null;
}

export interface INavProps {
  isMobile: boolean;
  status: Session | null;
}

export interface IMobileIconProps {
  className: string;
}
