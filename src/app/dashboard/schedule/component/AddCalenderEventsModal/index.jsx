"use client";
import React, { useEffect, useState } from 'react';
import '../../calender.css';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import gsap from 'gsap';
import { timeZoneList } from '@/utils/timezone';
import Select from 'react-select';
// import Autocomplete from "react-google-autocomplete";
import { postRequest } from '@/utils/api.service';
import { toast, ToastContainer } from 'react-toastify';
import { TimerLoader } from '@/app/components/loader';
import moment from 'moment';
import useCookies from '@/hooks/useCookiesHook';


export default function GraphAddScheduleModal(props) {

    const { cookies, getCookie, setCookie, removeCookie } = useCookies();

    const [authAnimation, setAnimation] = useState();
    const [eventTitle, setTitle] = useState("");
    const [isAllDay, setAllDay] = useState(true);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [timeZone, setTimeZone] = useState();
    const [loading, setLoading] = useState(false);
    const [userId,setuserID] = useState();
    const [token,setToken] = useState();



    const timeZones = timeZoneList.zones.map((x) => ({
        value: x.value,
        label: x.value
    }))

    useEffect(() => {
        setuserID(getCookie('userId'));
        setToken(getCookie('AuthToken'));
        openAuthModal();
    }, []);

    useEffect(() => {
        // openAuthModal();
    }, [props])

    function openAuthModal() {
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

    const handleAddEvents = (e) => {
        e.preventDefault();
        const payload = {
            title: eventTitle,
            allDay: isAllDay,
            start: startDate?._d || "",
            end: endDate?._d || "",
            zone: timeZone
        }
        setLoading(true);
        postRequest(`api/google/v1/${userId}`, payload, { 'Authorization': token }).then((response) => {
            if (response.status) {
                props.onRefresh();
                closeAuthModal();
                toast.success("Event Addedd Successfully !");
            }
            setLoading(false);
        }).catch((err) => {
            setLoading(false);
            toast.error("Something went wrong !");
            console.error(err)
        });
    }



    return (
        <div className="w-full h-screen bg-gradient-to-tr overflow-hidden relative">
            <ToastContainer />
            <div
                id="authOverlay"
                className="fixed z-10 left-0 top-0 h-full w-full flex items-center justify-center py-3 px-2 overflow-y-auto bg-white/80 backdrop-blur-sm scale-y-0 -translate-x-full opacity-0 origin-center"
            >
                <div
                    id="fourth"
                    className="bg-white/0 md:w-[40%] p-3 border border-white/0 rounded-2xl relative shadow-sm"
                >
                    <div
                        id="second"
                        className="bg-white p-4 sm:p-8 w-full h-auto rounded-xl relative shadow-sm scale-y-0 opacity-0"
                    >
                        <div id="third" className="relative h-auto scale-y-0 opacity-0">
                            <h1 className="text-green-600 text-4xl font-[Montserrat] mb-4 text-center">
                                Add Events
                            </h1>
                            {!loading && <div>
                                <form>
                                    <div className='flex gap-2 items-center'>
                                        <div className='w-1/2 mt-2 mb-2 h-auto relative'>
                                            <div className="flex items-center mb-2 justify-between">
                                                <label htmlFor="eventTitle" className="text-sm font-semibold text-gray-500">Add Event Title</label>
                                            </div>
                                            <input type='text' value={eventTitle} onChange={(e) => setTitle(e.target.value)} className='w-full p-3 border-2 border-gray-200 rounded-md outline-none focus:border-green-600' name='eventTitle' id='eventTitle' autoFocus={true} required />
                                        </div>
                                    </div>
                                    <div className='w-full mt-2 flex items-center  mb-2 relative' id='allDayCheck'>
                                        <input type="checkbox" name="allDay" id="allDay" checked={isAllDay} onChange={(e) => setAllDay(e.target.checked)} />
                                        <label htmlFor="allDay">All Day</label>
                                    </div>
                                    <div className='flex gap-2'>
                                        <div className='w-1/2 mt-2 mb-2 h-auto relative'>
                                            <div className="flex items-center mb-2 justify-between">
                                                <label htmlFor="eventTitle" className="text-sm font-semibold text-gray-500">Select Start Date</label>
                                            </div>
                                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                                <DateTimePicker className='w-full outline-none focus:border border-green-500' value={startDate} onChange={(e) => setStartDate(e)} />
                                            </LocalizationProvider>
                                        </div>
                                        {!isAllDay && <div className='w-1/2 mt-2 mb-2 h-auto relative'>
                                            <div className="flex items-center mb-2 justify-between">
                                                <label htmlFor="eventTitle" className="text-sm font-semibold text-gray-500">Select End Date</label>
                                            </div>
                                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                                <DateTimePicker className='w-full outline-none focus:border border-green-500' value={endDate} onChange={(e) => setEndDate(e)} />
                                            </LocalizationProvider>
                                        </div>}
                                    </div>
                                    <div className='w-full mt-2 mb-2 h-auto relative'>
                                        <div className="flex items-center mb-2 justify-between">
                                            <label htmlFor="eventTitle" className="text-sm font-semibold text-gray-500">Select Time Zone</label>
                                        </div>
                                        <Select options={timeZones} value={timeZone} onChange={(e) => setTimeZone(e)} required />

                                    </div>
                                    {/* <div className='w-full mt-2 mb-2 h-auto relative'>
                                    <div className="flex items-center mb-2 justify-between">
                                        <label htmlFor="eventTitle" className="text-sm font-semibold text-gray-500">Add Location</label>
                                    </div>
                                    <Select options={timeZones} value={timeZone} onChange={(e)=> setTimeZone(e)} required />
                                     <Autocomplete
                                        apiKey={YOUR_GOOGLE_MAPS_API_KEY}
                                        onPlaceSelected={(place) => {
                                            console.log(place);
                                        }}
                                    />;

                                </div> */}
                                    <div className='text-end'>
                                        <button
                                            type='submit'
                                            onClick={(e) => handleAddEvents(e)}
                                            className="px-4 py-2 mt-2 text-lg mx-1 transition-colors duration-300 bg-green-600  border text-white rounded-md shadow focus:outline-none focus:ring-green-200 focus:ring-4"
                                        >
                                            Save
                                        </button>
                                        <button
                                            type='button'
                                            onClick={closeAuthModal}
                                            className="px-4 py-2 mt-2 text-lg mx-1 transition-colors duration-300 bg-white border text-green-600 rounded-md shadow hover:bg-green-600 hover:text-white focus:outline-none focus:ring-blue-200 focus:ring-4"
                                        >
                                            Cancle
                                        </button>
                                    </div>
                                </form>
                            </div>}

                            {loading && <div className='w-100 flex justify-center'>
                                <TimerLoader />
                            </div>}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
