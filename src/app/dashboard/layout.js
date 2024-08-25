import { Inter } from "next/font/google";
import "@/utils/db";
import SideNav from "./components/sidenav";
import './global.css';
import MainHeader from "./components/header";
import Head from "next/head";
import 'react-toastify/dist/ReactToastify.css';
import { ReduxProvider } from "../components/redux-provider";

export const metadata = {
  title: `Graph Community`,
  description: "",
};


export default async function DashBoardLayout({ children }) {
  return (
    <ReduxProvider>
      <MainHeader />
      <SideNav />
      <div className="ml-[16rem] mt-32 relative" id="main-content">
        {children}
      </div>
    </ReduxProvider>
  );
}
