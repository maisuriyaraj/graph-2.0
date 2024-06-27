import { Inter } from "next/font/google";
import "./globals.css";
import "@/lib/db";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Welcome to Graph Community",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* <script src="https://unpkg.co/gsap@3/dist/gsap.min.js"></script> */}
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
