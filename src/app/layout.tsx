import type { Metadata } from "next";
import { Yatra_One, Inter } from "next/font/google";
import "./globals.css";
import ShunyaHeader from "@/components/ShunyaHeader";
import ScrollDiya from "@/components/ScrollDiya";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import SentientVoid from "@/components/SentientVoid";
import AudioAtmosphere from "@/components/AudioAtmosphere";

const interSans = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const yatraOne = Yatra_One({
  weight: "400",
  variable: "--font-yatra",
  subsets: ["devanagari", "latin"],
});

export const metadata: Metadata = {
  title: "Shunya - The Void",
  description: "A place of direct knowledge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interSans.variable} ${yatraOne.variable} antialiased`}
      >
        <SentientVoid />
        <AudioAtmosphere />
        <SmoothScroll>
          <CustomCursor />
          <ShunyaHeader />
          {children}
          <ScrollDiya />
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
