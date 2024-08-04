"use client";
import React, { useEffect, useState } from 'react';
import './modal.css'
import gsap from 'gsap';

export default function GraphSearchModal(props) {

  const [authAnimation, setAnimation] = useState();
  const [searchQuery,setSearchQuery] = useState("");

  useEffect(() => {
    openModalAnimation();
  }, []);

  useEffect(()=>{
    // openAuthModal();
  },[props])

  function openModalAnimation() {
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
      props.closeModal();
    }, 900);
  }

  function handleSubmit(event){
    props.handleFormSubmit(event,props.modalType);
    setSubmitted(true);
    setLoader(true);

    setTimeout(() => {
        setLoader(false);
    }, 3000);
  }

  function handleSearchQuery(event){
    setSearchQuery(event.target.value);

  }
  return (
    <div className="w-full h-screen absolute bg-gradient-to-tr" onClick={closeAuthModal}>
      <div
        id="authOverlay"
        className="fixed z-10 left-0 top-0 h-full w-full flex justify-center py-3 px-2 overflow-y-auto bg-white/80 backdrop-blur-sm scale-y-0 -translate-x-full opacity-0 origin-center"
      >
        <div
          id="fourth"
          className="bg-white/0 w-[50%] h-auto overflow-hidden p-3 border border-white/0 rounded-2xl shadow-sm"
        >
          <div
            id="second"
            className="bg-white p-4 sm:p-8 w-full h-screen rounded-xl shadow-sm scale-y-0 opacity-0"
          >
            <div id="third" className="relative scale-y-0 opacity-0" onClick={(e) => e.stopPropagation() }>
              <h1 className="text-green-600 text-4xl font-[Montserrat] mb-4">
                Search
              </h1>

              <div className='w-full'>
                  <input type="search" autoFocus={true} placeholder={'Search Here'} value={searchQuery} onChange={(e) => handleSearchQuery(e)} className="w-full px-4 py-4 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-green-200" />
              </div>

            </div>
            {/* {loader && <div id="third" className="relative scale-y-0 opacity-0">
                <HashLoaderComponent isLoading={loader} />
            </div>} */}
          </div>
        </div>
      </div>
    </div>
  )
}
