"use client";
import { postRequest } from '@/lib/api.service';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import gsap from 'gsap';
// import { HashLoaderComponent } from '../loader';
// import Image from 'next/image';
// import Check from '../../../../public/check.gif';

export default function GraphScheduleModal(props) {

  const [authAnimation, setAnimation] = useState();
  const [loader, setLoader] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  const [txtValue, setValue] = useState(props.fieldValue);
  const router = useRouter();

  useEffect(() => {
    openAuthModal();
  }, []);

  useEffect(() => {
    // openAuthModal();
  }, [props])

  function openAuthModal() {
    let authAnimations = gsap.timeline({ defaults: { ease: "power2.inOut" } })
      .to("#authOverlay", { scaleY: 0.01, x: 1, opacity: 1, display: "flex", duration: 0.4 })
      .to("#authOverlay", { scaleY: 1, background: "rgba(255,255,255,0.16)", duration: 0.6 })
      .to("#authOverlay #second", { scaleY: 1, opacity: 1, duration: 0.6 }, "-=0.4")
      .to("#authOverlay #third", { scaleY: 1, opacity: 1, duration: 0.4 }, "-=0.2")
      .to("#authOverlay #fourth", { background: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.3)", duration: 0.8 }, "-=0.4")
    setAnimation(authAnimations);
  }

  function closeAuthModal() {
    authAnimation.reverse().timeScale(-1.6);
    setTimeout(() => {
      // props.closeModal();
      router.push('/dashboard')
    }, 900);
  }

  const connectGoogle = (message) => {
    postRequest("http://localhost:3000/api/google/v1").then((response)=>{
      if(response.status == 201){
          // window.open(response.data.url,"_blank");
          router.push(response.data.url)
      }else{
        toast.error(response.data.message);
      }
    }).catch((error)=>{
      console.error(error)
    })
  }

  const connectOutlook = (message) => {
  }


  return (
    <div className="w-full h-screen bg-gradient-to-tr overflow-hidden">
      <div
        id="authOverlay"
        className="fixed z-10 left-0 top-0 h-full w-full flex items-center justify-center py-3 px-2 overflow-y-auto bg-white/80 backdrop-blur-sm scale-y-0 -translate-x-full opacity-0 origin-center"
      >
        <div
          id="fourth"
          className="bg-white/0 w-[40%] p-3 border border-white/0 rounded-2xl shadow-sm"
        >
          <div
            id="second"
            className="bg-white p-4 sm:p-8 w-full rounded-xl shadow-sm scale-y-0 opacity-0"
          >
            <div id="third" className="relative scale-y-0 opacity-0">
              <h1 className="text-green-600 text-4xl font-[Montserrat] mb-4 text-center">
                Connect Calender
              </h1>

              <div className='text-center flex flex-col'>
              <button className='p-3 bg-white flex justify-center items-center text-green-600 border border-green-600 font-semibold mt-2 transition-all rounded-md' onClick={()=>connectGoogle("Google Calender")}>
              <span><svg xmlns="http://www.w3.org/2000/svg" className='mx-2'  viewBox="0 0 48 48" width="30px" height="30px"><path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg></span><span>Connect To Google Calender</span></button>
                <button className='p-3 bg-green-500 flex justify-center items-center text-white font-semibold mt-2 transition-all rounded-md hover:bg-green-600' onClick={() => connectOutlook("Outlook Calender")}>
                  <span><svg xmlns="http://www.w3.org/2000/svg" className='mx-2'  viewBox="0 0 48 48" width="30px" height="30px"><path fill="#ff5722" d="M6 6H22V22H6z" transform="rotate(-180 14 14)"/><path fill="#4caf50" d="M26 6H42V22H26z" transform="rotate(-180 34 14)"/><path fill="#ffc107" d="M26 26H42V42H26z" transform="rotate(-180 34 34)"/><path fill="#03a9f4" d="M6 26H22V42H6z" transform="rotate(-180 14 34)"/></svg></span><span>Connect To Outlook Calender</span></button>
                {/* <button className='p-3 bg-green-500 text-white font-semibold mt-2 transition-all rounded-md hover:bg-green-600'>Connect To Google Calender</button> */}
              </div>
              <div className='text-end'>
                <button
                  type='button'
                  onClick={closeAuthModal}
                  className="px-4 py-2 mt-2 text-lg mx-1 transition-colors duration-300 bg-white border text-green-600 rounded-md shadow hover:bg-green-600 hover:text-white focus:outline-none focus:ring-blue-200 focus:ring-4"
                >
                  Cancle
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
