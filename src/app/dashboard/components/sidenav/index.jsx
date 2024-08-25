"use client";
import React, { useEffect } from 'react';
import avatar from '../../../../../public/user.png';
import Image from 'next/image';
import '../../global.css';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import useCookies from '@/hooks/useCookiesHook';

export default function SideNav() {
  const { removeCookie } = useCookies();

  const navigate = useRouter();


  function goToHome(path) {
    navigate.push(path);
  }


  const { userData, loading, value } = useSelector((state) => state.user);

  const path = usePathname();


  useEffect(() => {

  }, [path]);

  function logOutUser() {
    removeCookie('AuthToken');
    removeCookie('userId');
    window.location.reload();
  }

  function openCloseSideNav() {
    let nav = document.getElementById('sideNav');
    if (nav) {
      nav.classList.add('hide');
      nav.classList.remove('show');
    }
  }


  return (

    <>
      <div className='w-64 bg-white fixed border top-0 border-solid border-r-[#e5e7eb] left-0 h-[100vh] py-4 hide' id='sideNav'>
        <div className="p-6 flex justify-center items-center cursor-pointer text-start space-x-3">
          <h2 className="font-normal logo text-2xl leading-6" id='logo' onClick={() => { goToHome('/dashboard') }}>
            Graph <span>Community</span>
          </h2>
        </div>
        <div className='flex flex-col items-center justify-center border-b mt-2 p-8 cursor-pointer relative'>
          <div className='absolute top-0 right-2 md:hidden'>
            <i className="bi bi-x-lg " onClick={() => openCloseSideNav()} ></i>
          </div>
          <div className='border image-section rounded-[50%] p-2' onClick={() => goToHome('/dashboard/profile')}>
            {userData?.profile_picture && <img src={userData?.profile_picture} className="rounded-[50%] object-cover" alt='avatar' width={100} />}
            {!userData?.profile_picture && <Image src={avatar} className="rounded-[50%] object-cover" alt='avatar' width={80} />}
          </div>
          <div className='text-center mt-1'>
            <p className='font-bold text-xl'>{userData?.userName}</p>
            <span className='text-sm font-semibold text-gray-600'>Co-Manager</span>
          </div>
        </div>
        <div className="flex flex-col border-b">
          <ul className='pl-5'>
            <li className={`p-2 nav-link-1 cursor-pointer hover:bg-gray-200 ${path == '/dashboard' ? 'activePath' : ''} mt-1`}>
              <Link href="/dashboard"><p className='flex justify-between cursor-pointer'>
                Dashboard
                <i className="bi bi-body-text"></i>
              </p></Link>
            </li>
            <li className={`p-2 nav-link-1 cursor-pointer hover:bg-gray-200 ${path == '/dashboard/question' ? 'activePath' : ''} mt-1`}>
              <Link href="#"><p className='flex justify-between cursor-pointer'>
                Quests
                <i className="bi bi-patch-question"></i>
              </p></Link>
            </li>
            <li className={`p-2 nav-link-1 cursor-pointer hover:bg-gray-200 ${path == '/dashboard/feed' ? 'activePath' : ''} mt-1`}>
              <Link href="#"><p className='flex justify-between cursor-pointer'>
                Explore
                <i className="bi bi-compass"></i>
              </p></Link>
            </li>
            <li className={`p-2 nav-link-1 cursor-pointer hover:bg-gray-200 ${path == '/dashboard/articals' ? 'activePath' : ''} mt-1`}>
              <Link href="#"><p className='flex justify-between cursor-pointer'>
                Articles
                <i className="bi bi-layout-text-sidebar-reverse"></i>
              </p></Link>
            </li>
            <li className={`p-2 nav-link-1 cursor-pointer hover:bg-gray-200 ${path == '/dashboard/collections' ? 'activePath' : ''} mt-1`}>
              <Link href="#" ><p className='flex justify-between cursor-pointer'>
                Collections
                <i className="bi bi-collection-play"></i>
              </p></Link>
            </li>
            <li className={`p-2 nav-link-1 cursor-pointer hover:bg-gray-200 ${path == '/dashboard/communities' ? 'activePath' : ''} mt-1`}>
              <Link href="#"><p className='flex justify-between cursor-pointer'>
                Community
                <i className="bi bi-people"></i>
              </p></Link>
            </li>
            <li className={`p-2 nav-link-1 cursor-pointer hover:bg-gray-200 ${path == '/dashboard/graphAI/v2' ? 'activePath' : ''} mt-1`}>
              <Link href="/dashboard/graphAI/v2">
              <p className='flex justify-between cursor-pointer'>
                GraphAI
                <i className="bi bi-robot"></i>
              </p>
              </Link>
            </li>
            <li className={`p-2 nav-link-1 cursor-pointer hover:bg-gray-200 mt-1`}>
              <a type='button' onClick={logOutUser}> 
                <p className='flex justify-between cursor-pointer'>
                Logout
                <i className='bi bi-box-arrow-left'></i>
              </p></a>
            </li>
          </ul>
        </div>
        <div className='flex flex-col pl-5 hover:bg-gray-200' onClick={logOutUser}>

        </div>
      </div>
    </>


  )
}
