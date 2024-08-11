"use client";
import { Suspense } from "react";
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
    <Suspense fallback={<div className="w-full h-[70vh] flex justify-center items-center"><HashLoaderComponent /></div>}>
        <PleaseWaitComponentAccount />
    </Suspense>
    </>
  )
}

