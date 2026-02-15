
import type { Metadata } from "next";
import { PT_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const ptSans = PT_Sans({ 
  subsets: ["latin"],
  weight: ['400', '700'],
  variable: '--font-pt-sans'
});

const playfairDisplay = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair-display'
});

export const metadata: Metadata = {
  title: "Sagar Films | Premier Wedding Photography",
  description: "Capturing timeless moments with artistic wedding photography and videography. Based in the heart of the city, available worldwide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body 
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          ptSans.variable,
          playfairDisplay.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
