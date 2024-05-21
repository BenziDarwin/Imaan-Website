import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavigationBar from "./components/NavigationBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://imaan-website-kit7dhdem-innosolve.vercel.app"),
  title: "Imaan Computer World",
  description: "Kampala's no. 1 Computer Store!",
  openGraph: {
    images: [
      {
        url: "/images/image.jpg",
        width: 800,
        height: 600,
        alt: "Imaan Computer World",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-white text-black">
          <NavigationBar />
          {children}
        </div>
      </body>
    </html>
  );
}
