import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Header";
import MarqueeComponent from "@/components/Marquee";
import Footer from "@/components/Footer";

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["latin", "bengali"],
});

export const metadata: Metadata = {
  title: "বাজারদর — আজকের নিত্যপণ্যের দাম",
  description: "প্রতিদিনের নিত্যপণ্যের বাজারদর",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="bn"
      data-theme="light"
      className={`${notoSerifBengali.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-base-200/40">
        <Navbar />
        <MarqueeComponent />
        {children}
        <Footer/>
      </body>
    </html>
  );
}