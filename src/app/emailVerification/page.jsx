"use client";
import {useRouter, useSearchParams } from "next/navigation";
import { postRequest } from "@/lib/api.service";
// import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function EmailVerification() {
    const searchParams = useSearchParams();
    const route = useRouter();
    useEffect(()=>{
       const payload = {
        verification:'email',
        userId:searchParams.get('userId'),
      }
  
      let token = searchParams.get('token')
      postRequest("http://localhost:3000/api/auth/verification",payload,{'Authorization':token}).then((response)=>{
        if(response.data.status){
          route.push('/');
        }
      }).catch((error)=>{
        console.error(error)
      })
    },[]);
  return (
    <div>page</div>
  )
}
