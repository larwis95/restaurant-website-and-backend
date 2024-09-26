import {
  NavLinkListConfig,
  SocialLinkListConfig,
  NavLinkConfig,
} from "./Nav.types";
import {
  IconBrandTiktok,
  IconBrandFacebook,
  IconBrandInstagram,
} from "@tabler/icons-react";

export const menuLinks: NavLinkListConfig[] = [
  {
    title: "Coupons & Specials",
    description: "The best deals in town.",
    href: "/menu#coupons",
  },
  {
    title: "Broasted Chicken",
    description: "Juicy, crispy, and delicious.",
    href: "/menu#chicken",
  },
  {
    title: "Pizza",
    description: "Deep dish, round, and more.",
    href: "/menu#pizza",
  },
  {
    title: "Seafood",
    description: "Fresh and delicious seafood.",
    href: "/menu#seafood",
  },
  {
    title: "Ribs & BBQ",
    description: "Finger-licking, sticky, let us do the cooking.",
    href: "/menu#ribs",
  },
  {
    title: "Sides & More",
    description: "Looking for something extra?",
    href: "/menu#sides",
  },
  {
    title: "Catering",
    description: "Have a big event? We can help!",
    href: "/menu/catering",
  },
  {
    title: "Desserts",
    description: "Satisfy your sweet tooth.",
    href: "/menu#desserts",
  },
];

export const socialLinks: SocialLinkListConfig[] = [
  {
    title: "Facebook",
    href: "https://www.facebook.com/bigjoes1",
    icon: <IconBrandFacebook />,
  },
  {
    title: "Instagram",
    href: "https://www.instagram.com/bigjoespizzachickenribs/",
    icon: <IconBrandInstagram />,
  },
  {
    title: "TikTok",
    href: "https://www.tiktok.com/@eatbigjoes",
    icon: <IconBrandTiktok />,
  },
];

export const navLinks: NavLinkConfig[] = [
  {
    pageTitle: "Employment",
    href: "/employment",
  },
  {
    pageTitle: "Contact",
    href: "/contact",
  },
  {
    pageTitle: "About",
    href: "/about",
  },
];
