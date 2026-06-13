import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "MATCHA — Where matcha meets coffee.",
  description: "A bold new blend of tradition and energy. Ceremonial-grade matcha meets single-origin coffee.",
  openGraph: {
    title: "MATCHA — Where matcha meets coffee.",
    description: "Ceremonial-grade matcha meets single-origin coffee.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
    >
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
