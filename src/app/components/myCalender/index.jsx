
"use client";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { HashLoaderComponent } from '../loader';
import { useEffect, useState } from 'react';
import GraphAddScheduleModal from '@/app/dashboard/schedule/component/AddCalenderEventsModal';
const localizer = momentLocalizer(moment);

export default function MyCalendar(props) {

    const [loader, setLoader] = useState(true);
    const [openAddEvents,setOpenAddEvents] = useState(false);
    useEffect(() => {
        setLoader(true);
        setTimeout(() => {
            setLoader(false)
        }, 2000);
    }, []);
    const dummyEvents = props?.events && props?.events.map((x) => ({
        'title': x?.summary || "N/A",
        'allDay': true,
        'start': x?.start?.dateTime,
        'end': x?.end?.dateTime
    })) || [];

    return (
        <>
            <div className='h-[100vh]'>
                {loader && <div className='w-full flex justify-center'> <HashLoaderComponent isLoading={loader} /> </div>}
                {!loader && 
                <>
                <button onClick={() => setOpenAddEvents(true)}>Add Events</button>
                <Calendar
                    localizer={localizer}
                    events={dummyEvents}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                />
                        {openAddEvents && <GraphAddScheduleModal closeModal={() => setOpenAddEvents(false)}  />}

                </>
                }
            </div>
        </>
    )
}