"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { postRequest } from "@/lib/api.service";
import logo from '../../../../../public/logo-2.png';
import { useEffect } from "react";
import loaderGif from '../../../../../public/Infinity.gif';
import Image from 'next/image';


export default function PleaseWaitComponentAccount() {
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
        <div>
            <div className="flex justify-center items-center w-100">
                <div className="flex flex-col items-center">
                    <Image src={logo} alt="App Logo" width={550} />
                    <Image src={loaderGif} alt="Loading..." />
                    <span className="text-xl font-semibold">Please Wait , While We are redirecting you !</span>
                </div>
            </div>
        </div>
    )
}
