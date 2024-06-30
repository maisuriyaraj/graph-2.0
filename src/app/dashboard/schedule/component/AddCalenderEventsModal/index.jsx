"use client";
import { postRequest } from '@/lib/api.service';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import '../../calender.css';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import gsap from 'gsap';
import { timeZoneList } from '@/lib/timezone';
import Select from 'react-select'



export default function GraphAddScheduleModal(props) {

    const [authAnimation, setAnimation] = useState();
    const [loader, setLoader] = useState(false);
    const [dateRange, setDateRange] = useState();
    const [isSubmitted, setSubmitted] = useState(false);
    const [txtValue, setValue] = useState(props.fieldValue);
    const router = useRouter();

    const timeZones = timeZoneList.zones.map((x) => ({
        value:x.value,
        label:x.value
    }))

    useEffect(() => {
        openAuthModal();
    }, []);

    useEffect(() => {
        // openAuthModal();
        console.log(props)
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

    const handleDateRange = (event) => {
        console.log(event);
    }



    return (
        <div className="w-full h-screen bg-gradient-to-tr overflow-hidden relative">
            <div
                id="authOverlay"
                className="fixed z-10 left-0 top-0 h-full w-full flex items-center justify-center py-3 px-2 overflow-y-auto bg-white/80 backdrop-blur-sm scale-y-0 -translate-x-full opacity-0 origin-center"
            >
                <div
                    id="fourth"
                    className="bg-white/0 w-[40%] p-3 border border-white/0 rounded-2xl relative shadow-sm"
                >
                    <div
                        id="second"
                        className="bg-white p-4 sm:p-8 w-full h-auto rounded-xl relative shadow-sm scale-y-0 opacity-0"
                    >
                        <div id="third" className="relative h-auto scale-y-0 opacity-0">
                            <h1 className="text-green-600 text-4xl font-[Montserrat] mb-4 text-center">
                                Add Events
                            </h1>
                            <div className='w-full mt-2 mb-2 h-auto relative'>
                                <div className="flex items-center mb-2 justify-between">
                                    <label htmlFor="eventTitle" className="text-sm font-semibold text-gray-500">Add Event Title</label>
                                </div>
                                <input type='text' className='w-full p-3 border border-2 border-gray-200 rounded-lg outline-none focus:border-green-600' name='eventTitle' id='eventTitle' />
                            </div>
                            <div className='w-full mt-2 mb-2 h-auto relative'>
                                <div className="flex items-center mb-2 justify-between">
                                    <label htmlFor="eventTitle" className="text-sm font-semibold text-gray-500">Select Start Date</label>
                                </div>
                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                    <DateTimePicker className='w-full outline-none focus:border border-green-500' />
                                </LocalizationProvider>
                            </div>
                            <div className='w-full mt-2 mb-2 h-auto relative'>
                                <div className="flex items-center mb-2 justify-between">
                                    <label htmlFor="eventTitle" className="text-sm font-semibold text-gray-500">Select End Date</label>
                                </div>
                                <LocalizationProvider dateAdapter={AdapterMoment}>
                                    <DateTimePicker className='w-full outline-none focus:border border-green-500' />
                                </LocalizationProvider>
                            </div>
                            <div className='w-full mt-2 mb-2 h-auto relative'>
                                <div className="flex items-center mb-2 justify-between">
                                    <label htmlFor="eventTitle" className="text-sm font-semibold text-gray-500">Select Time Zone</label>
                                </div>

                                {/* <select name="" id="" className='w-full p-3 border border-2 border-gray-200 rounded-lg outline-none focus:border-green-600'>
                                    <option value="" hidden selected>Select an Time Zone</option>
                                    {
                                        timeZoneList.zones.map((x) => (
                                            <option value={x.value}>{x.value}</option>
                                        ))
                                    }
                                </select> */}
                                <Select options={timeZones} />

                            </div>
                            <div className='text-end'>
                                <button
                                    type='button'
                                    onClick={closeAuthModal}
                                    className="px-4 py-2 mt-2 text-lg mx-1 transition-colors duration-300 bg-white border text-green-600 rounded-md shadow hover:bg-green-600 hover:text-white focus:outline-none focus:ring-blue-200 focus:ring-4"
                                >
                                    Cancle
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
