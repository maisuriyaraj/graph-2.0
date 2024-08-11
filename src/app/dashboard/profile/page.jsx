"use client";
import Image from 'next/image';
import './profile.css';
import avatar from '../../../../public/man.png';
import { useEffect, useState } from 'react';
import { HashLoaderComponent } from '@/app/components/loader';


export default function Profile() {

  const [activeTab,setActiveTab] = useState(1);
  const [loader,setLoader] = useState(true);

  useEffect(()=>{
    setTimeout(() => {
      setLoader(false)
      
    }, 2000);
  },[]);

  return (
    <main className='h-[100vh] w-full px-3' id='profile'>
      {!loader && <div className='relative'>
        <div className='w-full rounded bg-cover object-cover bg-center  h-[40vh]' style={{ backgroundImage: `url("https://neonscreens-dev.vercel.app/placeholders/neon/profile-banner.png")` }}>
        </div>
        <div className="rounded-full profile-img bg-white absolute top-36 left-0 cursor-pointer">
          <Image
            className=""
            alt=""
            width={150}
            src={avatar}
          />
        </div>
      </div>}
      {!loader && <div className='w-full rounded mt-5 shadow-xl name-card'>
        <div className="bg-white rounded-b-3xl p-2 overflow-x-auto">
          <div className="bg-white mt-5">
            <nav className="tabs flex">
              <button
                className={`tab ${activeTab ==1 && 'active-tab'} text-gray-600 py-4 px-6 block hover:text-green-600 focus:outline-none font-medium `}
                onClick={() => setActiveTab(1)}
              >
                Profile
              </button>
              <button
                className={`tab ${activeTab ==2 && 'active-tab'} text-gray-600 py-4 px-6 block hover:text-green-600 focus:outline-none font-medium `}
                onClick={() => setActiveTab(2)}
              >
                Posts
              </button>
              <button
                className={`tab ${activeTab ==3 && 'active-tab'} text-gray-600 py-4 px-6 block hover:text-green-600 focus:outline-none font-medium `}
                onClick={() => setActiveTab(3)}
              >
                Insights
              </button>
              <button
                className={`tab ${activeTab ==4 && 'active-tab'} text-gray-600 py-4 px-6 block hover:text-green-600 focus:outline-none font-medium `}
                onClick={() => setActiveTab(4)}
              >
                Settings
              </button>
            </nav>
          </div>
        </div>

        {/* Tab1 */}
       { activeTab == 1 &&  <div className="bg-white rounded-b-3xl p-2">
          <div className="mb-8 p-2 w-full flex flex-wrap">
            <div className="w-full px-2 mt-2 flex flex-col  lg:w-1/2" >
              <label htmlFor="email" className="text-sm mb-2 font-semibold text-gray-500">Username</label>
              <input type="text" className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-green-200" />
            </div>
            <div className="w-full flex px-2 mt-2 flex-col  lg:w-1/2" >
              <label htmlFor="email" className="text-sm mb-2 font-semibold text-gray-500">Email</label>
              <input type="text" className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-green-200" />
            </div>
            <div className="w-full flex px-2 mt-2 flex-col  lg:w-1/2" >
              <label htmlFor="email" className="text-sm mb-2 font-semibold text-gray-500">Phone</label>
              <input type="text" className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-green-200" />
            </div>
            <div className="w-full flex px-2 mt-2 flex-col  lg:w-1/2" >
              <label htmlFor="email" className="text-sm mb-2 font-semibold text-gray-500">Currently You 're ??</label>
              <select name="" id="" className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-green-200">
                <option value="" hidden>Select a Designation ..</option>
                <option value="student">Student</option>
                <option value="Professional">Professional</option>
                <option value="Jobseeker">Jobseeker</option>
              </select>
            </div>
            <div className='w-full flex px-2 mt-2 flex-col'>
              <label htmlFor="email" className="text-sm mb-2 font-semibold text-gray-500">Add Bio</label>
              <textarea name="" id="" className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-green-200"></textarea>
            </div>
          </div>

        </div>}
      </div>}

      {loader && <div className='w-full h-[70vh] flex justify-center items-center'> <HashLoaderComponent isLoading={loader} /> </div>}


    </main>
  )
}
