"use client";
import { Button } from "@/components/ui/button";
import { useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MobileMenuOpenContext } from "../Providers/MobileMenuOpen";
import Link from "next/link";
import { MenuIcon, XIcon, ChevronRightIcon } from "./Nav.icons";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { INavMenuProps } from "./Nav.interfaces";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const MobileNav: React.FC<INavMenuProps> = ({
  menuLinks,
  socialLinks,
  navLinks,
  pathName,
}) => {
  const router = useRouter();

  const { isMobileMenuOpen, toggleMobileMenu } = useContext(
    MobileMenuOpenContext
  );

  const { status } = useSession();

  const handleOutsideClick = (e: MouseEvent) => {
    if (isMobileMenuOpen) {
      const target = e.target as HTMLElement;
      if (!target.closest(".mobile-menu")) {
        toggleMobileMenu();
      }
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  });

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMobileMenuOpen]);

  return (
    <div>
      <div>
        {!isMobileMenuOpen && (
          <Button
            className="fixed z-[15] right-4"
            variant="outline"
            size="icon"
            onClick={toggleMobileMenu}
          >
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        )}
      </div>
      <div>
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="mobile-menu fixed left-1/2 z-[15] flex flex-col h-fit w-screen bg-black bg-opacity-70 text-white p-4 border border-border"
              initial={{ x: "100%" }}
              animate={{ x: "-50%" }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="self-start"
                onClick={toggleMobileMenu}
              >
                <XIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
              <div className="grid gap-4 py-4">
                <Collapsible className="grid gap-4">
                  <CollapsibleTrigger className="flex w-full items-center text-lg font-semibold [&[data-state=open]>svg]:rotate-90 hover:underline hover:text-secondary">
                    Menu
                    <ChevronRightIcon className="ml-auto h-5 w-5 transition-all" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <motion.div
                      className="-mx-6 grid gap-6 bg-primary p-6 border-border"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {menuLinks.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`group grid h-auto w-full justify-start gap-1 ${pathName === item.href ? "pointer-events-none" : ""}`}
                          prefetch={false}
                        >
                          <div
                            className={`${pathName === item.href ? "text-secondary" : ""} text-sm font-medium leading-none group-hover:text-secondary group-hover:underline`}
                          >
                            {item.title}
                          </div>
                          <div className="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
                            {item.description}
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  </CollapsibleContent>
                </Collapsible>
                <Collapsible className="grid gap-4">
                  <CollapsibleTrigger className="flex w-full items-center text-lg font-semibold [&[data-state=open]>svg]:rotate-90 hover:underline hover:text-secondary">
                    Socials
                    <ChevronRightIcon className="ml-auto h-5 w-5 transition-all" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <motion.div
                      className="-mx-6 grid gap-6 bg-primary p-6 border-border"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {socialLinks.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`group grid h-auto w-full justify-start gap-1 ${pathName === item.href ? "pointer-events-none" : ""}`}
                          prefetch={false}
                        >
                          <div
                            className={`${pathName === item.href ? "text-secondary" : ""} text-sm font-medium leading-none group-hover:text-secondary group-hover:underline`}
                          >
                            {item.icon}
                          </div>
                          <div className="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
                            {item.title}
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  </CollapsibleContent>
                </Collapsible>
                {navLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex w-full items-center py-2 text-lg font-semibold ${pathName === item.href ? "text-secondary pointer-events-none" : "hover:text-secondary hover:underline"}`}
                    prefetch={false}
                  >
                    {item.pageTitle}
                  </Link>
                ))}
                {status === "authenticated" && (
                  <Collapsible className="grid gap-4">
                    <CollapsibleTrigger className="flex w-full items-center text-lg font-semibold [&[data-state=open]>svg]:rotate-90 hover:underline hover:text-secondary">
                      Dashboard
                      <ChevronRightIcon className="ml-auto h-5 w-5 transition-all" />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <motion.div
                        className="-mx-6 grid gap-6 bg-primary p-6 border-border"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Link
                          href="/dashboard"
                          className={`group grid h-auto w-full justify-start gap-1 group-hover:underline group-hover:text-secondary ${pathName === "/dashboard" ? "pointer-events-none" : ""}`}
                          prefetch={false}
                        >
                          <div
                            className={`${pathName === "/dashboard" ? "text-secondary" : ""} text-sm font-medium leading-none group-hover:text-secondary group-hover:underline`}
                          >
                            Dashboard
                          </div>
                          <div className="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
                            View your dashboard.
                          </div>
                        </Link>
                        <Link
                          href="/api/auth/signout"
                          className="group grid h-auto w-full justify-start gap-1"
                          prefetch={false}
                          onClick={async (e) => {
                            e.preventDefault();
                            await signOut({ redirect: false });
                            router.push("/");
                          }}
                        >
                          <div className="text-sm font-medium leading-none group-hover:text-secondary group-hover:underline">
                            Logout
                          </div>
                          <div className="line-clamp-2 text-sm leading-snug text-gray-500 dark:text-gray-400">
                            Sign out of your account.
                          </div>
                        </Link>
                      </motion.div>
                    </CollapsibleContent>
                  </Collapsible>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MobileNav;
