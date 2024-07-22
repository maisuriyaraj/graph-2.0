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
            <h2 className="text-center text-gray-800 text-2xl font-bold pt-6">
              Order Summary
            </h2>
            <div className="w-5/6 m-auto">
              <p className="text-center text-gray-500 pt-5">
                You can now listen to millions of songs, audiobooks ands podcasts on
                any device anywhere you like!
              </p>
            </div>
          </div>
        </div>
      </div>

    </main>
  )
}
