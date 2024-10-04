import type { Metadata } from "next";
import { Viewport } from "next";
import { Inter as FontSans } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ReactQueryClientProvider } from "./ReactQueryClient";
import MobileMenuOpenProvider from "./components/Providers/MobileMenuOpen";
import AuthProvider from "./components/Auth/auth-provider";
import Header from "./components/Header";
import { Toaster } from "@/components/ui/toaster";
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontSans.className} antialiased`}>
        <AuthProvider>
          <MobileMenuOpenProvider>
            <Header />
          </MobileMenuOpenProvider>
          <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
          <Footer>
            <FooterInfo>
              <p className="text-secondary font-bold">
                810-724-9000 • 1935 S Cedar St, Imlay City, MI 48444
              </p>
              <div className="flex flex-row flex-wrap w-full justify-between">
                <div className="flex flex-col">
                  <p className=" text-gray-500">Hours of Operation:</p>
                  <ul className="flex flex-col">
                    <li className=" text-gray-500">Mon-Thurs: 11am-9pm</li>
                    <li className=" text-gray-500">Sun: 12pm-9pm</li>
                  </ul>
                </div>
              </div>
            </FooterInfo>
            <FooterCopyWrite>
              <p className="text-xs text-gray-500">
                &copy; 2024 Big Joe&rsquo;s Pizza, Chicken, Seafood & Ribs
              </p>
            </FooterCopyWrite>
          </Footer>
          <Toaster />
        </AuthProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
