import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Riad Sidi Ayoub | Digital Concierge — Marrakech",
  description:
    "Welcome to Riad Sidi Ayoub in Marrakech. Browse our homemade Moroccan dining menus, traditional Hammam & massage treatments, and curated excursions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${plusJakarta.variable}`}
    >
      <body className="font-sans min-h-screen flex flex-col bg-[#FAF9F6] text-[#1A1A1A]">
        {children}
      </body>
    </html>
  );
}
