import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Eid ul Azha Mubarak — From Sufyan Khan",
  description:
    "A cinematic Eid ul Azha greeting from Sufyan Khan. Wishing you a blessed and joyous celebration.",
  openGraph: {
    title: "Eid ul Azha Mubarak — From Sufyan Khan",
    description:
      "A cinematic Eid ul Azha greeting from Sufyan Khan.",
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
      className={`${geistSans.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col grain">{children}</body>
    </html>
  );
}
