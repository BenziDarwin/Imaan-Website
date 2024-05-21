import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavigationBar from "./components/NavigationBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Imaan Computer World",
  description: "Kampala's no. 1 Computer Store!",
  keywords: ["Computers", "Hardware", "Printers", "Scanners"],
  openGraph: {
    images:  "/images/logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/favicon.ico" sizes="any" />
        <link rel="shortcut icon" href="/images/favicon.ico" />
      </head>
      <body className={inter.className}>
        <div className="bg-white text-black">
          <NavigationBar />
          {children}
        </div>
      </body>
    </html>
  );
}
