import { Inter } from "next/font/google";
import "@/lib/db";
import SideNav from "./components/sidenav";
import './global.css';
import MainHeader from "./components/header";
import Head from "next/head";
import 'react-toastify/dist/ReactToastify.css';
import { ReduxProvider } from "../components/redux-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: `Graph Community`,
  description: "",
};


export default async function DashBoardLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        {/* <Script src="https://unpkg.co/gsap@3/dist/gsap.min.js"></Script> */}
      </Head>
      <body className={inter.className}>
        <ReduxProvider>
          <MainHeader />
          <SideNav />
          <div className="ml-[16rem] mt-32 relative" id="main-content">

            {children}
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
