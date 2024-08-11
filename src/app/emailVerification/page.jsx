"use client";
import { Suspense, useEffect } from "react";
import { HashLoaderComponent } from "../components/loader";
import PleaseWaitComponent from "./component/PleaseWaitPage";

export default function EmailVerification() {
  
  return (
    <>
      <Suspense fallback={<div className="w-full h-[70vh] flex justify-center items-center"><HashLoaderComponent /></div>}>
        <PleaseWaitComponent />
      </Suspense>
    </>
  )
}
