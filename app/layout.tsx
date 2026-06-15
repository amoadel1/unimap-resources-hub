import type { Metadata } from "next";
import { Inter, Cairo } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const arabic = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://unimap-resources-hub.vercel.app"),
  title: {
    default: "UniMAP Resources Hub",
    template: "%s | UniMAP Resources Hub",
  },
  description:
    "A student-built public platform that organizes UniMAP academic resources by programme.",
  openGraph: {
    title: "UniMAP Resources Hub",
    description: "By Students, For Students.",
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
      className={`${inter.variable} ${arabic.variable}`}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}