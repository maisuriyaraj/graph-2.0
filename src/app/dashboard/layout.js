import { Inter } from "next/font/google";
import "@/lib/db";
import SideNav from "./components/sidenav";
import './global.css';
import MainHeader from "./components/header";
import { cookies } from "next/headers";
import Script from "next/script";
import Head from "next/head";
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

async function getUserData() {
  // Retrieve user data and bearer token from cookies
  const userId = JSON.parse(cookies().get("userId").value);
  const BearerToken = JSON.parse(cookies().get("AuthToken").value);
  const AuthToken = BearerToken.split(' ')[1];

  // Define the API endpoint
  const url = `http://localhost:3000/api/user/${userId}`;

  // Make the fetch request
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': AuthToken,
      'Content-Type': 'application/json'  // Include Content-Type header for good practice
    }
  });

  if(response.ok){
    return response.json();
  }

}

export const metadata = {
  title: `Graph Community`,
  description: "",
};


export default async function DashBoardLayout({ children }) {
  const userData = await  getUserData();
  return (
    <html lang="en">
      <Head>
        {/* <Script src="https://unpkg.co/gsap@3/dist/gsap.min.js"></Script> */}
      </Head>
      <body className={inter.className}>
        <SideNav userData={userData} />
        <MainHeader />
        <div className="ml-[16rem] mt-32 relative">
          {children}
        </div>
      </body>
    </html>
  );
}
