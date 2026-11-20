import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans min-h-screen flex flex-col bg-[#FAF9F6] text-[#1A1A1A]">
        {children}
      </body>
    </html>
  );
}
