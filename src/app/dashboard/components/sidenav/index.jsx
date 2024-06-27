"use client";
import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import avatar from '../../../../../public/user.png';
import Image from 'next/image';
import '../../global.css';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';


export default function SideNav({ userData }) {

  const path = usePathname();

  useEffect(()=>{

  },[path]);

  function logOutUser(){
    localStorage.clear();
    Cookies.remove('AuthToken');
    Cookies.remove('userId');
    window.location.reload();
  }


  return (
    <div className='w-64 bg-white fixed border top-0 border-solid border-r-[#e5e7eb] left-0 h-[100vh]' id='sideNav'>
      <div className='flex flex-col items-center justify-center border-b mt-24 p-8 cursor-pointer'>
        <div className='border image-section rounded-[50%] p-2'>
          {/* <img src={"https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} className="rounded-[50%] object-cover" alt='avatar' width={100} /> */}
          {userData.data.profile_picture && <img src={userData?.data?.profile_picture} className="rounded-[50%] object-cover" alt='avatar' width={100} />}

          {!userData.data.profile_picture && <Image src={avatar} className="rounded-[50%] object-cover" alt='avatar' width={80} />}

        </div>
        <div className='text-center mt-1'>
          <p className='font-bold text-xl'>{userData?.data?.userName}</p>
          <span className='text-sm font-semibold text-gray-600'>Co-Manager</span>
        </div>
      </div>
      <div className="flex flex-col border-b">
        <ul className='pl-5'>
          <li className={`p-2 nav-link-1 cursor-pointer hover:bg-gray-200 ${path == '/dashboard' ? 'activePath' : ''} mt-1`}>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li className={`p-2 nav-link-1 cursor-pointer hover:bg-gray-200 ${path == '/dashboard/question' ? 'activePath' : ''} mt-1`}>
            <Link href="#">Questions</Link>
          </li>
          <li className={`p-2 nav-link-1 cursor-pointer hover:bg-gray-200 ${path == '/dashboard/feed' ? 'activePath' : ''} mt-1`}>
            <Link href="#">For You</Link>
          </li>
          <li className={`p-2 nav-link-1 cursor-pointer hover:bg-gray-200 ${path == '/dashboard/articals' ? 'activePath' : ''} mt-1`}>
            <Link href="#">Articles</Link>
          </li>
          <li className={`p-2 nav-link-1 cursor-pointer hover:bg-gray-200 ${path == '/dashboard/collections' ? 'activePath' : ''} mt-1`}>
            <Link href="#" >Collections</Link>
          </li>
          <li className={`p-2 nav-link-1 cursor-pointer hover:bg-gray-200 ${path == '/dashboard/communities' ? 'activePath' : ''} mt-1`}>
            <Link href="#">Communities</Link>
          </li>
          <li className={`p-2 nav-link-1 cursor-pointer hover:bg-gray-200 ${path == '/dashboard/graphAI' ? 'activePath' : ''} mt-1`}>
            <Link href="/dashboard/graphAI">GraphAI</Link>
          </li>
        </ul>
      </div>
      <div className='flex flex-col pl-5'>
        <p className='flex justify-between cursor-pointer pr-3 text-sm py-4 text-gray-500 uppercase'>
          Friends
          <i className='bi bi-plus-circle'></i>
        </p>
        <ul className=''>
          <li className='p-2 flex items-center nav-link cursor-pointer mt-1'>
            <div className='border image-section rounded-[50%] p-2'>
              <img src={"https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} className="rounded-[50%] object-cover" alt='avatar' width={40} />
              {/* <Image src={avatar} className="rounded-[50%] object-cover" alt='avatar' width={80} /> */}
            </div>
            <p className='mx-2'>Chris Evans</p>
          </li>
          <li className='p-2 flex items-center nav-link cursor-pointer mt-1'>
            <div className='border image-section rounded-[50%] p-2'>
              <img src={"https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} className="rounded-[50%] object-cover" alt='avatar' width={40} />
              {/* <Image src={avatar} className="rounded-[50%] object-cover" alt='avatar' width={80} /> */}
            </div>
            <p className='mx-2'>Chris Evans</p>
          </li>
        </ul>
      </div>
      <div className='flex flex-col pl-5 hover:bg-gray-200' onClick={logOutUser}>
        <p className='flex justify-between cursor-pointer pr-3 text-sm py-4 text-gray-500 uppercase'>
          Logout
          <i className='bi bi-box-arrow-left'></i>
        </p>
      </div>
    </div>
  )
}
