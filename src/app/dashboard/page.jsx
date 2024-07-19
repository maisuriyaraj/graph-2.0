"use client";
import { getRequest, postRequest, putRequest } from '@/lib/api.service';
import Cookies from 'js-cookie';
import { useEffect, useRef, useState } from 'react';
import running from '../../../public/running.svg';
import verification from '../../../public/verification.svg';
import Image from 'next/image';
import TimeAgo from 'react-timeago'
import moment from 'moment';
import GraphFieldTextModal from '../components/Fieldmodal';
import { EmailVerificationMail } from '@/lib/mailService';
import { ToastContainer, toast } from 'react-toastify';
import englishStrings from 'react-timeago/lib/language-strings/en';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import verifiedImage from '../../../public/approved.png';
import grayBack from '../../../public/gray-back.jpg';
import * as  Aos from 'aos';
import "aos/dist/aos.css";
import { HashLoaderComponent } from '../components/loader';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules'
import 'swiper/css';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';




export default function Dashboard() {
  const [openModal, setModal] = useState(false);
  const [modalTitle, setModalTitle] = useState();
  const [modalLoader, setModalLoader] = useState(false);
  const [modalType, setModalType] = useState();
  const [textField, setTextField] = useState();
  const [fieldType, setFieldType] = useState();
  const [fieldValue, setFieldValue] = useState();
  const [jobList, setjobList] = useState([]);
  const [jobPortalList, setJobPortals] = useState([]);
  const [communities, setCommunityList] = useState([]);
  const [loader, setLoader] = useState(true);

  const formatter = buildFormatter(englishStrings);


  const { userData, loading } = useSelector((state) => state.user);
  const willMount = useRef(true)


  /*
    Ref for Initial Mount: The isInitialMount ref is used to ensure that the effect runs only once during the initial mount.
  */

  useEffect(() => {
    Aos.init();
    setLoader(loading);
    if (willMount.current){  getUserData(); }
  }, []);

  function getUserData() {
    setLoader(true);
    getRequest(`http://localhost:3000/api/jobs`).then((response) => {
      if (response.data.status) {
        setjobList(response.data.data);
      }
    })
      .then(async () => {
        let response = await getRequest(`http://localhost:3000/api/jobPortals`);
        if (response.data.status) {
          setJobPortals(response.data.data);
        }
      }).then(async () => {
        let res = await getRequest("http://localhost:3000/api/community");
        if (res.data.status) {
          setCommunityList(res.data.data);
        }
        setLoader(false);
      }).catch((error) => {
        toast.error(error)
        setLoader(false);
      })
  }

  function openVerificationModal(modalName) {
    if (modalName == "Email") {
      setFieldType("email");
      setModalType('Email');
      setModalTitle("Email Verification");
      setTextField("Email Address");
      setModal(true);
      setFieldValue(userData.email || null);
    } else {
      setFieldType("text");
      setModalType('Phone');
      setModalTitle("Mobile Verification");
      setTextField("Mobile Number");
      setModal(true);
      setFieldValue(userData.phone_number || null);
    }
  }

  const closeModal = () => {
    setModal(false);
  }

  const handleFormSubmit = (event, type) => {

    event.preventDefault();
    if (type == 'Email') {
      const userId = JSON.parse(Cookies.get('userId'));
      const token = JSON.parse(Cookies.get('AuthToken'));
      const AuthToken = token.split(' ')[1];

      let link = `http://localhost:3000/emailVerification?userId=${userId}&token=${AuthToken}`
      let mailBody = EmailVerificationMail(link);

      const payload = { userId: userId, email: event?.target[0].value }
      putRequest('http://localhost:3000/api/auth/verification', payload, { 'Authorization': AuthToken })
        .then((res) => {
          if (res.data.status) {
            return true;
          } else {
            setModal(false);
            toast.error(res.data.message);
            return false;
          }
        }).then((res) => {
          if (res) {
            const payload = {
              email: event?.target[0].value,
              mailBody: mailBody
            }
            return postRequest('http://localhost:3000/api/mail', payload, { 'Authorization': AuthToken })
          }
        }).catch((error) => {
          toast.error(error);
        });
    } else {
      toast.success("SMS Sent Successfully");
    }
    setModalLoader(true);
    setFieldValue(event?.target[0].value);
  }

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    let greeting;

    if (currentHour < 12) {
      greeting = "Good Morning!";
    } else if (currentHour < 18) {
      greeting = "Good Afternoon!";
    } else {
      greeting = "Good Evening!";
    }

    return greeting;
  }


  return (
    <main className='h-[100vh] w-full px-3' id='dashboard'>
      {loader && <div className='w-full flex justify-center'> <HashLoaderComponent isLoading={loader} /> </div>}
      {!loader && <div>
        <div className='p-4'>
          <h2 className='text-4xl greetings'>{getGreeting()} {userData?.userName || "User"}</h2>
        </div>
        <div className='flex gap-1'>
          <ToastContainer />

          {!userData?.isEmailVerified && <div className='w-full lg:w-1/2 activation-card flex justify-between items-center h-auto shadow border p-6'>
            <div className='text-white'>
              <h2 className='text-white title-card'>Email Verification</h2>
              <p className='desc-card'>Please Complete Your Email Verification.</p>
              <a type='button' onClick={() => openVerificationModal("Email")} className='text-white cursor-pointer mt-3 underline font-bold'>Verify Now</a>
            </div>
            <div className='pt-2'>
              <Image src={running} alt='running' width={180} />
            </div>
          </div>}
          {!userData?.isMobileVerified && <div className='w-full lg:w-1/2 activation-card2 flex justify-between items-center h-auto shadow border p-6'>
            <div className='text-black'>
              <h2 className='text-green-600 title-card'>Phone Verification</h2>
              <p className='desc-card'>Please Complete Your Mobile Number Verification.</p>
              <a type='button' onClick={() => openVerificationModal("Phone")} className='text-black cursor-pointer mt-3 underline font-bold'>Verify Now</a>
            </div>
            <div className='pt-2'>
              <Image src={verification} alt='running' width={180} />
            </div>
          </div>}
        </div>

        <div className='mt-10 relative'>
          <div className='section-header'>
            <h1>Latest Jobs</h1>
          </div>
          <Swiper
            autoplay={{
              delay: 1000,
              disableOnInteraction: false
            }}
            loop={true}
            modules={[Autoplay]}
            spaceBetween={10}
            slidesPerView={3}
            breakpoints={{
              343: {
                slidesPerView: 1,
                centeredSlides: true,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 1,
                centeredSlides: true,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                centeredSlides: false,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                centeredSlides: false,
                spaceBetween: 15,
              },
              1440: {
                slidesPerView: 3,
                centeredSlides: false,
                spaceBetween: 20,
              },
              1780: {
                slidesPerView: 3,
                centeredSlides: false,
                spaceBetween: 25,
              },
            }}>
            {jobList.map((x, i) => (
              <SwiperSlide key={i}>
                <div data-aos="fade-up" className="w-auto bg-white border cursor-pointer transition-all rounded-2xl hover:bg-gray-200 relative py-4 px-4 flex-shrink-0" key={x._id}>
                  <div className='absolute right-2 top-2'>
                    <Image src={verifiedImage} alt='verified' width={40} />
                  </div>
                  <h3 className='text-2xl'>{x.job_title}</h3>
                  <p>{x.company}</p>
                  <p className="text-gray-400 mt-3 text-sm h-16 overflow-hidden line-clamp-3">
                    {x.job_description}</p>
                  <div className='flex justify-between items-center mt-5'>
                    <button type='button' className='px-6 rounded-2xl text-sm py-3 bg-[#2aa557] hover:bg-[#267141] text-white font-bold'>View Job</button>
                    <span className='text-sm text-gray-400'>{<TimeAgo date={moment(x.created_date).format('MMM DD , YYYY')} formatter={formatter} />}</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className='mt-10'>
          <div className='section-header'>
            <h1>High Profile Job Portals</h1>
          </div>

          <Swiper
            loop={true}
            spaceBetween={10}
            breakpoints={{
              343: {
                slidesPerView: 1,
                centeredSlides: true,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 1,
                centeredSlides: true,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                centeredSlides: false,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                centeredSlides: false,
                spaceBetween: 15,
              },
              1440: {
                slidesPerView: 4,
                centeredSlides: false,
                spaceBetween: 20,
              },
              1780: {
                slidesPerView: 4,
                centeredSlides: false,
                spaceBetween: 25,
              },
            }}
            slidesPerView={4}
          >
            {jobPortalList.map((x, i) => (
              <SwiperSlide key={i}>
                <div data-aos="fade-up" className="w-auto bg-white border cursor-pointer transition-all rounded-2xl hover:bg-gray-200 relative flex-shrink-0" key={x._id}>
                  <div className=" bg-white shadow-xl rounded-lg text-gray-900">
                    <div className="rounded-t-lg h-32 overflow-hidden">
                      <Image
                        className="object-cover object-top w-full"
                        src={grayBack}
                        alt="Mountain"
                      />
                    </div>
                    <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
                      <img
                        className=" bg-white object-center h-32"
                        src={x.logo_url}
                        alt="Woman looking front"
                      />
                    </div>
                    <div className="text-center mt-2">
                      <h2 className="font-semibold">{x.name}</h2>
                    </div>

                    <div className="p-4 border-t mx-8 mt-2">
                      <button className="w-1/2 block mx-auto text-sm transition-all rounded-2xl bg-green-600 hover:bg-white hover:text-green-600 border hover:border-green-600  font-semibold text-white px-3 py-4">
                        Open Portal
                      </button>
                    </div>
                  </div>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className='mt-10'>
          <div className='section-header'>
            <h1>Populer Public Communities</h1>
          </div>

          <Swiper
            loop={true}
            spaceBetween={10}
            slidesPerView={4}
            breakpoints={{
              343: {
                slidesPerView: 1,
                centeredSlides: true,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 1,
                centeredSlides: true,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                centeredSlides: false,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                centeredSlides: false,
                spaceBetween: 15,
              },
              1440: {
                slidesPerView: 4,
                centeredSlides: false,
                spaceBetween: 20,
              },
              1780: {
                slidesPerView: 4,
                centeredSlides: false,
                spaceBetween: 25,
              },
            }}
          >
            {communities.map((x, i) => (
              <SwiperSlide key={i}>
                <div data-aos="fade-up" className="w-auto bg-white border cursor-pointer transition-all rounded-2xl hover:bg-gray-200 relative flex-shrink-0" key={x._id}>
                  <div className=" bg-white shadow-xl rounded-lg text-gray-900">
                    <div className="rounded-t-lg h-32 overflow-hidden">
                      <img
                        className="object-cover object-top w-full"
                        src={x.background_picture}
                        alt="Mountain"
                      />
                    </div>
                    <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
                      <img
                        className=" bg-white object-center h-32"
                        src={x.profile_picture}
                        alt="Woman looking front"
                      />
                    </div>
                    <div className="text-center mt-2">
                      <h2 className="font-semibold">{x.community_name}</h2>
                      <p className="text-gray-500">{x.total_users} Members</p>
                    </div>
                    <div className="p-4 border-t mx-8 mt-2">
                      <button className="w-1/2 block mx-auto text-sm transition-all rounded-2xl bg-green-600 hover:bg-white hover:text-green-600 border hover:border-green-600  font-semibold text-white px-3 py-4">
                        Join
                      </button>
                    </div>
                  </div>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>}
      {openModal && <div>
        <GraphFieldTextModal closeModal={closeModal} fieldValue={fieldValue} loader={modalLoader} modalTitle={modalTitle} textField={textField} fieldType={fieldType} modalType={modalType} handleFormSubmit={handleFormSubmit} />
      </div>}
    </main>
  )
}
