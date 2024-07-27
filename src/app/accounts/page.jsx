"use client";
import Image from "next/image";
import loaderGif from '../../../public/Infinity.gif';
import logo from '../../../public/logo-2.png';
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { getRequest } from "@/lib/api.service";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
/**
 * 
 * @description In Below Function I get Search Params for E.x "http://localhost:3000/accounts?code=4/0ATx3LY4hm1wdOUXwjfSXcz8gzKiPW0tgm72d5amMjkCwruZ-2luwKpZ5RMZGGDCnltAhPQ&scope=https://www.googleapis.com/auth/calendar"
 * from Above Url I get the value of Query Params 
 * 
 */
export default function Accounts() {

    const searchParams = useSearchParams();
    const route = useRouter();

    const code = searchParams.get('code');
    const userId = JSON.parse(Cookies.get('userId'));


    useEffect(()=>{
        getRequest(`api/google/v1?code=${code}&userId=${userId}`).then((response)=>{
            if(response.status == 201){
                route.push('/dashboard/schedule');
            }
        }).catch((error)=>{
            console.error(error);
        })
    },[]);

     
  return (
    <div className="flex justify-center items-center w-100">
        <div className="flex flex-col items-center">
            <Image src={logo} alt="App Logo" width={550} />
            <Image src={loaderGif} alt="Loading..."  />
            <span className="text-xl font-semibold">Please Wait , While We are redirecting you !</span>
        </div>
    </div>
  )
}

