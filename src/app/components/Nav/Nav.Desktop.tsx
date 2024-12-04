"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import ListItem from "./Nav.listitem";
import { INavMenuProps } from "./Nav.interfaces";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const DesktopNav: React.FC<INavMenuProps> = ({
  menuLinks,
  socialLinks,
  navLinks,
  pathName,
  status,
}) => {
  const router = useRouter();
  return (
    <NavigationMenu className="w-full">
      <NavigationMenuList className="flex gap-3">
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={`rounded-none transition-all duration-500 ${pathName.includes("/menu") ? "border-b-2" : ""}`}
          >
            Menu
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {menuLinks.map((item) => (
                <ListItem key={item.href} title={item.title} href={item.href}>
                  {item.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="rounded-none">
            Socials
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {socialLinks.map((item) => (
                <ListItem
                  key={item.href}
                  title={item.icon as string}
                  href={item.href}
                >
                  {item.title}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {navLinks.map((item) => (
          <NavigationMenuItem
            className={`${cn(navigationMenuTriggerStyle(), "rounded-none")} ${pathName.includes(item.href) ? "border-b-2 pointer-events-none" : ""}`}
            key={item.href}
          >
            <Link href={item.href} legacyBehavior passHref>
              <NavigationMenuLink>{item.pageTitle}</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
        {status && (
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className={`rounded-none transition-all duration-500 ${pathName.includes("/dashboard") ? "border-b-2" : ""}`}
            >
              Dashboard
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                <ListItem title="Dashboard" href="/dashboard">
                  View your dashboard.
                </ListItem>
                <ListItem
                  title="Logout"
                  onClick={async () => {
                    await signOut({ redirect: false });
                    router.push("/");
                    router.refresh();
                  }}
                >
                  Sign out of your account.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default DesktopNav;
