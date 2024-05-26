import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavigationBar from "./components/NavigationBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Imaan Computer World",
  description: "Kampala's no. 1 Computer Store!",
  keywords: ["Computers", "Hardware", "Printers", "Scanners"],
  icons: {
    icon: "/icon.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div style={{backgroundColor:"white", color:"black"}}>
          <NavigationBar />
          {children}
        </div>
      </body>
    </html>
  );
}
