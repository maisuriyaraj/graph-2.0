import Image from 'next/image';
import './profile.css'
import avatar from '../../../../public/man.png';


export default function Profile() {
  return (
    <main className='h-[100vh] w-full px-3' id='profile'>
      <div className='relative'>
        <div className='w-full bg-cover object-cover bg-center  h-[40vh]' style={{ backgroundImage: `url("https://neonscreens-dev.vercel.app/placeholders/neon/profile-banner.png")` }}>
        </div>
        <div className="rounded-full profile-img bg-white absolute top-36 left-0 cursor-pointer">
          <Image
            className=""
            alt=""
            width={200}
            src={avatar}
          />
        </div>
        <div className='w-full mt-5 shadow-xl name-card'>
          <div className="bg-white rounded-b-3xl p-2">
              <div className="bg-white mt-5">
                <nav className="tabs flex flex-col sm:flex-row">
                  <button
                    data-target="panel-1"
                    className="tab active text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none text-blue-500 border-b-2 font-medium border-blue-500"
                  >
                    My Profile
                  </button>
                  <button
                    data-target="panel-2"
                    className="tab ext-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none"
                  >
                    Posts
                  </button>
                  <button
                    data-target="panel-3"
                    className="tab text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none"
                  >
                    Settings
                  </button>
                </nav>
              </div>
          </div>
        </div>
      </div>

    </main>
  )
}
