"use client";
import { useEffect, useState, useContext } from "react";
import { usePathname } from "next/navigation";
import { MobileMenuOpenContext } from "../Providers/MobileMenuOpen";
import Link from "next/link";
import Nav from "../Nav";

const Header: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { isMobileMenuOpen, toggleMobileMenu } = useContext(
    MobileMenuOpenContext
  );
  const pathName = usePathname();
  const getScreenWidth = () => {
    setIsMobile(window.innerWidth < 768);
  };
  const setBodyOverflow = () => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  const handleMenuClickOutClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!isMobileMenuOpen) return;
    if (target === document.querySelector(".mobile-menu")) return;
    if (target.closest(".mobile-menu")) return;
    toggleMobileMenu();
  };

  useEffect(() => {
    getScreenWidth();
    window.addEventListener("resize", getScreenWidth);
    return () => {
      window.removeEventListener("resize", getScreenWidth);
    };
  }, []);

  useEffect(() => {
    setBodyOverflow();
  }, [isMobileMenuOpen]);

  useEffect(() => {
    document.addEventListener("click", handleMenuClickOutClick);
    return () => {
      document.removeEventListener("click", handleMenuClickOutClick);
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="w-screen p-2">
      <div
        className={`grid grid-flow-col ${isMobile === false ? "place-content-start" : "place-content-between"} place-items-center gap-x-2`}
      >
        <Link
          href="/"
          className={`z-10 font-extrabold text-xl ${pathName === "/" ? "text-secondary pointer-events-none" : "hover:text-secondary hover:scale-105 transition-all"}`}
        >
          Big Joe's
        </Link>
        <Nav isMobile={isMobile} pathName={pathName} />
      </div>
    </header>
  );
};

export default Header;
