"use client";
import Image from 'next/image';
import './profile.css';
import avatar from '../../../../public/man.png';
import { useEffect, useState } from 'react';
import { HashLoaderComponent } from '@/app/components/loader';
import { useSelector } from 'react-redux';
import ProfileSection from './components/profileSection';
import PostsSection from './components/postsSection';
import ProfileInsightsSection from './components/profileInsightsSection';


export default function Profile() {

  const [activeTab, setActiveTab] = useState(1);
  const [loader, setLoader] = useState(true);
  const [userForm, setuserForm] = useState({
    userName: "",
    phone_number: "",
    designation: "",
    bio: "",

  })

  const { userData, loading } = useSelector((state) => state.user);


  useEffect(() => {
    setTimeout(() => {
      setLoader(false)

    }, 2000);
  }, []);

  useEffect(() => {
    setuserForm({
      userName: userData?.userName,
      phone_number: userData?.phone_number,
      designation: userData?.designation,
      bio: userData?.bio
    })
  }, [userData])

  const handleChange = (value, field) => {
    setuserForm((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  }

  return (
    <main className='h-[100vh] w-full px-3' id='profile'>
      {!loader && <div className='relative'>
        <div className='w-full rounded bg-cover object-cover bg-center  h-[40vh]' style={{ backgroundImage: `url("https://neonscreens-dev.vercel.app/placeholders/neon/profile-banner.png")` }}>
        </div>
        <div className="rounded-full overflow-hidden profile-img bg-white absolute top-36 left-0 cursor-pointer">
          {userData?.profile_picture && <img
            className=""
            alt=""
            width={150}
            src={userData?.profile_picture || avatar}
          />}
          {!userData?.profile_picture &&
            <Image src={avatar} width={150} />
          }
        </div>
      </div>}
      {!loader && <div className='w-full rounded mt-5 shadow-xl name-card'>
        <div className="bg-white rounded-b-3xl p-2 overflow-x-auto">
          <div className="bg-white mt-5">
            <nav className="tabs flex">
              <button
                className={`tab ${activeTab == 1 && 'active-tab'} text-gray-600 py-4 px-6 block hover:text-green-600 focus:outline-none font-medium `}
                onClick={() => setActiveTab(1)}
              >
                Profile
              </button>
              <button
                className={`tab ${activeTab == 2 && 'active-tab'} text-gray-600 py-4 px-6 block hover:text-green-600 focus:outline-none font-medium `}
                onClick={() => setActiveTab(2)}
              >
                Posts
              </button>
              <button
                className={`tab ${activeTab == 3 && 'active-tab'} text-gray-600 py-4 px-6 block hover:text-green-600 focus:outline-none font-medium `}
                onClick={() => setActiveTab(3)}
              >
                Insights
              </button>
              <button
                className={`tab ${activeTab == 4 && 'active-tab'} text-gray-600 py-4 px-6 block hover:text-green-600 focus:outline-none font-medium `}
                onClick={() => setActiveTab(4)}
              >
                Settings
              </button>
            </nav>
          </div>
        </div>

        {/* Tab1 */}
        {activeTab == 1 && 
        <ProfileSection userForm={userForm} />
        }

        {activeTab == 2 && 
        <PostsSection />
        }
        {
          activeTab == 3 && <ProfileInsightsSection />
        }
      </div>}

      {loader && <div className='w-full h-[70vh] flex justify-center items-center'> <HashLoaderComponent isLoading={loader} /> </div>}


    </main>
  )
}
