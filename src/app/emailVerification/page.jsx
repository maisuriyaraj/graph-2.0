"use client";
import Image from "next/image";
import loaderGif from '../../../public/Infinity.gif';
import logo from '../../../public/logo-2.png';
import { useRouter, useSearchParams } from "next/navigation";
import { postRequest } from "@/lib/api.service";
import { Suspense, useEffect } from "react";

export default function EmailVerification() {
  const searchParams = useSearchParams();
  const route = useRouter();
  useEffect(() => {
    const payload = {
      verification: 'email',
      userId: searchParams.get('userId'),
    }

    let token = searchParams.get('token')
    postRequest("api/auth/verification", payload, { 'Authorization': token }).then((response) => {
      if (response.data.status) {
        route.push('/');
      }
    }).catch((error) => {
      console.error(error)
    })
  }, []);
  return (
    
      <div className="flex justify-center items-center w-100">
        <div className="flex flex-col items-center">
          <Image src={logo} alt="App Logo" width={550} />
          <Image src={loaderGif} alt="Loading..." />
          <span className="text-xl font-semibold">Please Wait , While We are redirecting you !</span>
        </div>
      </div>
  )
}
