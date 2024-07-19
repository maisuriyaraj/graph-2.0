"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import logo1 from '../../../../public/logo-white.png';
import logo2 from '../../../../public/logo-2.png';
import Image from "next/image";
export default function Header() {
    const [activeTab, setActive] = useState('Home');
    const [openMenu, setOpenMenu] = useState(false);
    const route = useRouter();

    const scrollToElement = (e) => {
        var div = document.getElementById(e);
        div.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    }


    useEffect(() => {
        addEventListener('scroll', function () {
            // We add pageYOffset for compatibility with IE.
            var scrollTrigger = 50;
            let sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-link');
            if (window.scrollY >= scrollTrigger) {
                document.getElementById("header")?.classList.add('header-normal');
                document.getElementById("header")?.classList.remove('header-advance');
                document.querySelectorAll('.nav-link').forEach((x) => {
                    x?.classList.add('text-black');
                    x?.classList.remove('text-white');
                })
            } else {
                document.getElementById("header")?.classList.remove('header-normal');
                document.getElementById("header")?.classList.add('header-advance');
                document.querySelectorAll('.nav-link').forEach((x) => {
                    x?.classList.add('text-white');
                    x?.classList.remove('text-black');
                })
            }

            // sections.forEach(section => {
            //     let top = window.scrollY;
            //     let sectionTop = section.offsetTop - 60;
            //     let sectionHeight = section.offsetHeight;
            //     let sectionId = section.getAttribute('id');
        
            //     if (top >= sectionTop && top < sectionTop + sectionHeight) {
            //         navLinks.forEach(link => {
            //             link.classList.remove('activeNav');
            //         });
            //         document.querySelector(`nav ul li a[href*=${sectionId}]`).classList.add('activeNav');
            //     }
            // });
        })

    }, []);

    function changeTab(tab) {
        setActive(tab);
        setOpenMenu(false);
    }

    function goToNavigate(path) {
        route.push(path);
    }

    function openNav() {
        setOpenMenu(!openMenu); // Toggle the value of openMenu
    }



    return (
        <div className="w-full z-50 fixed">
            {/*- more free and premium Tailwind CSS components at https://tailwinduikit.com/ -*/}
            <div className="bg-none transition-all shadow-lg py-5 px-7 header-advance" id="header">
                <nav className="flex sm:px-10 justify-between">
                    <div className="cursor-pointer text-center space-x-3 lg:pr-16 pr-6">
                        <h2 className="font-normal logo text-2xl leading-6" id='logo'>
                            Graph <span>Community</span>
                        </h2>
                        {/* <Image src={logo2} id="logo" alt="logo" width={100} /> */}
                    </div>
                    {/* For medium and plus sized devices */}
                    <ul className="hidden md:flex flex space-x-2">
                        <li
                            onClick={() => { changeTab('Home'); scrollToElement('hero_section') }}
                            className={`text-white nav-link focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 ${activeTab == 'Home' ? 'activeNav' : 'text-black'} cursor-pointer px-3 py-2.5 font-normal text-xs leading-3 rounded`}
                        >
                           <a> Home </a>
                        </li>
                        <li
                            onClick={() => { changeTab('About'); scrollToElement('about_section') }}
                            className={`text-white nav-link focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 ${activeTab == 'About' ? 'activeNav' : 'text-black'}   cursor-pointer px-3 py-2.5 font-normal text-xs leading-3 rounded`}
                        >
                           <a> About us </a>
                        </li>
                        <li
                            onClick={() => { changeTab('Community'); scrollToElement('community') }}
                            className={`text-white nav-link focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 ${activeTab == 'Community' ? 'activeNav' : 'text-black'}   cursor-pointer px-3 py-2.5 font-normal text-xs leading-3 rounded`}
                        >
                           <a>Community</a>
                        </li>
                        {/* <li
                            onClick={() => changeTab('Contact')}
                            className={`text-white nav-link focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 ${activeTab == 'Contact' ? 'activeNav' : 'text-black'}   cursor-pointer px-3 py-2.5 font-normal text-xs leading-3 rounded`}
                        >
                            Contact us
                        </li> */}
                    </ul>
                    <div className=" flex space-x-5 justify-center items-center pl-2">
                        <div className="flex relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 ">
                            <button className=" mx-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800  text-white bg-green-600 cursor-pointer px-3 py-2.5 font-normal text-xs leading-3 rounded" onClick={() => goToNavigate('/signin')} >Sign in</button>
                            <button className=" mx-2   text-green-600 bg-white border-solid cursor-pointer px-3 py-2.5 font-normal text-xs leading-3 rounded" onClick={() => goToNavigate('/signup')} >Sign up</button>
                            {/* <svg
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
                                    stroke="#1F2937"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <div className="animate-ping w-1.5 h-1.5 bg-green-700 rounded-full absolute -top-1 -right-1 m-auto duration-200" />
                            <div className=" w-1.5 h-1.5 bg-green-700 rounded-full absolute -top-1 -right-1 m-auto shadow-lg" /> */}
                        </div>
                        {/* <svg
                            className="cursor-pointer  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 "
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
                                stroke="#1F2937"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
                                stroke="#1F2937"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg> */}
                    </div>
                </nav>
                {/* for smaller devcies */}
                <div className="block md:hidden w-full mt-5 ">
                    <div
                        onClick={() => openNav()}
                        className="cursor-pointer px-4 py-3 text-white bg-green-600 rounded flex justify-between items-center w-full"
                    >
                        <div className="flex space-x-2" >
                            <span id="s1" className="font-semibold text-sm leading-3 hidden">
                                {" "}
                            </span>
                            <p
                                id="textClicked"
                                className="font-normal text-sm leading-3 focus:outline-none hover:bg-gray-800 duration-100 cursor-pointer "
                            >
                                {activeTab}
                            </p>
                        </div>
                        <svg
                            id="ArrowSVG"
                            className=" transform"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M6 9L12 15L18 9"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                    {openMenu && <div className=" relative">
                        <ul
                            id="list"
                            className=" font-normal text-base leading-4 absolute top-2  w-full rounded shadow-md"
                        >
                            <li
                                onClick={() => { changeTab('Home'); scrollToElement('hero_section') }}
                                className="px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-normal"
                            >
                                <a>Home</a>
                            </li>
                            <li
                                onClick={() => { changeTab('About'); scrollToElement('about_section') }}
                                className="px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-normal"
                            >
                               <a> About us </a>
                            </li>
                            <li
                                onClick={() => { changeTab('Community'); scrollToElement('community') }}
                                className="px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-normal"
                            >
                               <a>Community </a>
                            </li>
                            {/* <li
             onClick={}
            className="px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-normal"
          >
            Utility
          </li>
          <li
             onClick={}
            className="px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-normal"
          >
            Cards
          </li> */}
                        </ul>
                    </div>}
                </div>
            </div>
        </div>

    )
}
