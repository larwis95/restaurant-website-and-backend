import type { Metadata } from "next";
import { Viewport } from "next";
import { Inter as FontSans } from "next/font/google";
import { ReactQueryClientProvider } from "./ReactQueryClient";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
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
      <body className={fontSans.variable}>
        <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
      </body>
    </html>
  );
}
