"use client";
import Image from "next/image";
import '../../global.css';
import avatar from '../../../../../public/user.png'
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function MainHeader() {
  const [open, setOpen] = useState(false);
  const [openTheme, setOpenTheme] = useState(false);
  const navigate = useRouter();

  const [Theme, setTheme] = useState('Theme');

  const [searchFilter, setFilter] = useState('All');

  const opFilter = (filter) => {
    setFilter(filter);
    setOpen(false);
  }

  const openDropMenuonHover = (id) => {
    let element = document.getElementById(id);
    if (element !== null) {
      if (element.classList.contains('hidden')) {
        element.classList.add('block');
        element.classList.remove('hidden')

      } else {
        element.classList.remove('block');
        element.classList.add('hidden')

      }
    }
  }

  function goToHome(path){
    navigate.push(path);
}

  const changeTheme = (theme) => {
    setTheme(theme)
    setOpenTheme(false);
  }
  return (
    <div className='w-full z-[1111] bg-white border border-solid  fixed top-0 py-4 px-12' id="headerMain">
      <nav className="w-full flex items-center px-4">
        <div className="w-1/6 cursor-pointer text-start space-x-3 lg:pr-16 pr-6">
          <h2 className="font-normal logo text-2xl leading-6" id='logo' onClick={() => {goToHome('/dashboard')}}>
            Graph <span>Community</span>
          </h2>
          {/* <Image src={logo2} id="logo" alt="logo" width={100} /> */}
        </div>
        <div className="w-1/2 cursor-pointer">
          <div className="dropdown mx-2 inline-block relative" id="filter-dropdown">
            <button onClick={() => setOpen(!open)} className="bg-green-600 w-full text-white font-semibold py-2 px-4 rounded inline-flex items-center">
              <span className="mr-1">{searchFilter}</span>
              <i className="bi bi-chevron-down"></i>
            </button>
            {open && <ul className="dropdown-menu bg-white absolute shadow-xl rounded-md text-gray-700 pt-1">
              <li className={`${searchFilter == 'Jobs' && "activeFilter"}`}>
                <a
                  className="rounded-t bg-white hover:bg-gray-200   py-2 px-4 block whitespace-no-wrap"
                  onClick={() => opFilter('Jobs')}
                >
                  Jobs
                </a>
              </li>
              <li className={`${searchFilter == 'Developers' && "activeFilter"} border`}>
                <a
                  className="bg-white hover:bg-gray-200   py-2 px-4 block whitespace-no-wrap"
                  onClick={() => opFilter('Developers')}
                >
                  Developers
                </a>
              </li>
              <li className={`${searchFilter == 'Communities' && "activeFilter"} border`}>
                <a
                  className="bg-white hover:bg-gray-200   py-2 px-4 block whitespace-no-wrap"
                  onClick={() => opFilter('Communities')}
                >
                  Communities
                </a>
              </li>
              <li className={`${searchFilter == 'All' && "activeFilter"} border`}>
                <a
                  className="bg-white hover:bg-gray-200   py-2 px-4 block whitespace-no-wrap"
                  onClick={() => opFilter('All')}
                >
                  All
                </a>
              </li>
            </ul>}
          </div>
          <input type="search" name="search" id="search" placeholder="Search here ..." className="w-[70%] px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-green-200  input-controls" />
        </div>
        <div className="w-1/2 flex items-center justify-end h-12">
          <div className="mx-2 flex gap-2 relative cursor-pointer">
            <button className="bg-white rounded-lg transition-all  text-green-600 border border-solid border-green-600 hover:bg-green-600 hover:text-white font-semibold py-2 px-4 inline-flex items-center">
              <a className="" href="#"> <i className="bi bi-plus-circle"></i> New Community </a>
            </button>
            <button className="bg-white rounded-lg transition-all text-green-600 border border-solid border-green-600 hover:bg-green-600 hover:text-white font-semibold py-2 px-4 inline-flex items-center">
              <Link className="" href="/dashboard/schedule"> <i className="bi bi-calendar4-range"></i> My Schedule </Link>
            </button>
          </div>
          <div className="mx-2 relative cursor-pointer" title="Profile">
            <Image src={avatar} alt="avatar" width={20} />
            <div className="absolute top-0 right-0 -mr-1 -mt-1 w-2 h-2 rounded-full bg-green-500 animate-ping"></div>
            <div className="absolute top-0 right-0 -mr-1 -mt-1 w-2 h-2 rounded-full bg-green-600"></div>
          </div>
          <div className="mx-2 relative cursor-pointer" onMouseEnter={() => openDropMenuonHover('drop_1')} onMouseLeave={() => openDropMenuonHover('drop_1')}>
            <div className="absolute top-0 right-0 -mr-1 -mt-1 w-2 h-2 rounded-full bg-green-500 animate-ping"></div>
            <div className="absolute top-0 right-0 -mr-1 -mt-1 w-2 h-2 rounded-full bg-green-600"></div>
            <i className="bi bi-award"></i>
            <div className="dropdown-menu hidden w-[30vw] z-50 bg-white right-[-7rem] absolute border border-solid rounded-md text-gray-700 p-4" id="drop_1">
              <h1 className="text-xl">Rewards</h1>
              <div className="flex flex-col p-8 bg-white shadow-md hover:shodow-lg rounded-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-16 h-16 rounded-2xl p-3 border border-blue-100 text-blue-400 bg-blue-50"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div className="flex flex-col ml-3">
                      <div className="font-medium leading-none">Delete Your Acccount ?</div>
                      <p className="text-sm text-gray-600  mt-1">
                        By deleting your account you will lose your all data
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-2 relative cursor-pointer" onMouseEnter={() => openDropMenuonHover('drop_2')} onMouseLeave={() => openDropMenuonHover('drop_2')}>
            <i className="bi bi-bell"></i>
            <div className="absolute top-0 right-0 -mr-1 -mt-1 w-2 h-2 rounded-full bg-green-500 animate-ping"></div>
            <div className="absolute top-0 right-0 -mr-1 -mt-1 w-2 h-2 rounded-full bg-green-600"></div>
            <div className="dropdown-menu w-[30vw] z-50 hidden bg-white right-[-7rem]  absolute border border-solid rounded-md text-gray-700 p-4" id="drop_2">
              <h1 className="text-xl">Notification</h1>
              <div className="flex flex-col p-8 bg-white shadow-md hover:shodow-lg rounded-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-16 h-16 rounded-2xl p-3 border border-blue-100 text-blue-400 bg-blue-50"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div className="flex flex-col ml-3">
                      <div className="font-medium leading-none">Delete Your Acccount ?</div>
                      <p className="text-sm text-gray-600  mt-1">
                        By deleting your account you will lose your all data
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-2 relative cursor-pointer" title="Theme">
            {/* <div className="dropdown mx-2 inline-block relative">
              <button onClick={() => setOpenTheme(!openTheme)} className="bg-green-600 w-full text-white py-2 px-4 rounded inline-flex items-center">
                <span className="mx-1">{Theme == 'Light' && <i className="bi bi-brightness-high"></i>}{Theme == 'Dark' && <i className="bi bi-moon"></i>}</span>
                <span className="mr-1">{Theme}</span>
                <i className="bi bi-chevron-down"></i>
              </button>
              {openTheme && <ul className="dropdown-menu bg-white absolute shadow-xl rounded-md text-gray-700 pt-1">
                <li className={`${Theme == 'Light' && "activeFilter"}`}>
                  <a
                    className="rounded-t cursor-pointer bg-white hover:bg-gray-200   py-2 px-4 block whitespace-no-wrap"
                    onClick={() => changeTheme('Light')}
                  >
                    Light
                  </a>
                </li>
                <li className={`${Theme == 'Dark' && "activeFilter"} border`}>
                  <a
                    className="bg-white cursor-pointer hover:bg-gray-200   py-2 px-4 block whitespace-no-wrap"
                    onClick={() => changeTheme('Dark')}
                  >
                    Dark
                  </a>
                </li>
                <li className={`${Theme == 'Default' && "activeFilter"} border`}>
                  <a
                    className="bg-white cursor-pointer hover:bg-gray-200   py-2 px-4 block whitespace-no-wrap"
                    onClick={() => changeTheme('Default')}
                  >
                    Default
                  </a>
                </li>
              </ul>}
            </div> */}
            <div className="toggle">
              <input type="checkbox" />
              <label></label>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
