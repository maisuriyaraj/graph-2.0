
"use client";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { HashLoaderComponent } from '../loader';
import { useEffect, useState } from 'react';
import GraphAddScheduleModal from '@/app/dashboard/schedule/component/AddCalenderEventsModal';
import { getRequest } from '@/lib/api.service';
import Cookies from 'js-cookie';
const localizer = momentLocalizer(moment);

export default function MyCalendar(props) {

    const [loader, setLoader] = useState(true);
    const userId = JSON.parse(Cookies.get('userId'));
    const token = JSON.parse(Cookies.get('AuthToken'));
    const [calenderEvents,setCalenderEvents] = useState([]);
    const [openAddEvents, setOpenAddEvents] = useState(false);
    useEffect(() => {
        setLoader(true);
        setTimeout(() => {
            setLoader(false)
        }, 2000);
        getCalenderEvents();
    }, []);

    function getCalenderEvents(){
        getRequest(`http://localhost:3000/api/google/v1/${userId}`).then((response)=>{
            if(response){
                console.log(response)
                const dummyEvents = response.data?.calenderData && response.data?.calenderData.map((x) => ({
                    'title': x?.summary || "N/A",
                    // 'allDay': false,
                    'start': new Date(x?.start?.dateTime),
                    'end': new Date(x?.end?.dateTime)
                })) || [];
                setCalenderEvents(dummyEvents);
            }
        })
    }
    

    return (
        <>
            <div className='h-[100vh]'>
                {loader && <div className='w-full flex justify-center'> <HashLoaderComponent isLoading={loader} /> </div>}
                {!loader &&
                    <>
                        <div className='w-full text-right mb-3 mt-3'>
                            <button onClick={() => setOpenAddEvents(true)} className='bg-green-600 text-white p-3 rounded-md'><i className="bi bi-plus-square-fill mx-2"></i> Add Events</button>
                        </div>
                        <Calendar
                            localizer={localizer}
                            events={calenderEvents}
                            startAccessor="start"
                            endAccessor="end"
                            style={{ height: 500 }}
                        />
                        {openAddEvents && <GraphAddScheduleModal onRefresh={getCalenderEvents} closeModal={() => setOpenAddEvents(false)} />}

                    </>
                }
            </div>
        </>
    )
}