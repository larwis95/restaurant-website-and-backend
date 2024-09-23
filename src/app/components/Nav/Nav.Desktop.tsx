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
import styles from "./Nav.styles";

const DesktopNav: React.FC<INavMenuProps> = ({
  menuLinks,
  socialLinks,
  navLinks,
  pathName,
}) => {
  const router = useRouter();
  const { status } = useSession();
  return (
    <NavigationMenu className="p-4">
      <NavigationMenuList className="space-x-0">
        <NavigationMenuItem>
          <NavigationMenuTrigger className={styles.button}>
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
          <NavigationMenuTrigger className={styles.button}>
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
          <NavigationMenuItem key={item.href}>
            <Link href={item.href} legacyBehavior passHref>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} ${pathName === item.href ? styles.active : styles.button}`}
              >
                {item.pageTitle}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
        {status === "authenticated" && (
          <NavigationMenuItem>
            <NavigationMenuTrigger className={styles.button}>
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
