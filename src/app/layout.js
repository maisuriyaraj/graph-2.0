import { Inter } from "next/font/google";
import "./globals.css";
import "@/lib/db";
import { Suspense } from "react";
import { HashLoaderComponent } from "./components/loader";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Welcome to Graph Community",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Suspense fallback={<div><HashLoaderComponent /></div>}>{children}</Suspense></body>
    </html>
  );
}
