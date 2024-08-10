"use client";
import Image from "next/image";
import loaderGif from '../../../public/Infinity.gif';
import logo from '../../../public/logo-2.png';
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { getRequest } from "@/lib/api.service";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { HashLoaderComponent } from "../components/loader";
import PleaseWaitComponentAccount from "./components/PleaseWaitPage";
/**
 * 
 * @description In Below Function I get Search Params for E.x "http://localhost:3000/accounts?code=4/0ATx3LY4hm1wdOUXwjfSXcz8gzKiPW0tgm72d5amMjkCwruZ-2luwKpZ5RMZGGDCnltAhPQ&scope=https://www.googleapis.com/auth/calendar"
 * from Above Url I get the value of Query Params 
 * 
 */
export default function Accounts() {

     
  return (
    <>
    <Suspense fallback={<div><HashLoaderComponent /></div>}>
        <PleaseWaitComponentAccount />
    </Suspense>
    </>
  )
}

