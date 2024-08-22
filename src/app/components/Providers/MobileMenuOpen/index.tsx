"use client";
import { useState, useContext, createContext } from "react";

export const MobileMenuOpenContext = createContext({
  isMobileMenuOpen: false,
  toggleMobileMenu: () => {},
});

const MobileMenuOpenProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <MobileMenuOpenContext.Provider
      value={{ isMobileMenuOpen, toggleMobileMenu }}
    >
      {children}
    </MobileMenuOpenContext.Provider>
  );
};

export default MobileMenuOpenProvider;
