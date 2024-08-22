import type { Metadata } from "next";
import { Viewport } from "next";
import { Inter as FontSans } from "next/font/google";
import { ReactQueryClientProvider } from "./ReactQueryClient";
import MobileMenuOpenProvider from "./components/Providers/MobileMenuOpen";
import Header from "./components/Header";
import Footer, { FooterCopyWrite, FooterInfo } from "./components/Footer";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Big Joe's Pizza, Chicken, Seafood & Ribs",
  description:
    "Takeout & delivery restaurant in Imlay City, MI. When Hunger Calls, We Answer, because we are Bigger and Better!",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontSans.className} antialiased`}>
        <MobileMenuOpenProvider>
          <Header />
        </MobileMenuOpenProvider>
        <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
        <Footer>
          <FooterInfo>
            <p>810-724-900 • 1935 S Cedar St, Imlay City, MI 48444</p>
          </FooterInfo>
          <FooterCopyWrite>
            <p className="text-xs text-gray-500">
              &copy; 2021 Big Joe&rsquo;s Pizza, Chicken, Seafood & Ribs
            </p>
          </FooterCopyWrite>
        </Footer>
      </body>
    </html>
  );
}
