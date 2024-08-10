"use client";
import { Suspense, useEffect } from "react";
import { HashLoaderComponent } from "../components/loader";
import PleaseWaitComponent from "./component/PleaseWaitPage";

export default function EmailVerification() {
  
  return (
    <>
      <Suspense fallback={<div><HashLoaderComponent /></div>}>
        <PleaseWaitComponent />
      </Suspense>
    </>
  )
}
