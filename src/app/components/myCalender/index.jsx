
"use client";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { HashLoaderComponent } from '../loader';
import { useEffect, useState } from 'react';
const localizer = momentLocalizer(moment);

export default function MyCalendar(props) {

    const [loader, setLoader] = useState(true);
    useEffect(() => {
        setLoader(true);
        setTimeout(() => {
            setLoader(false)
        }, 2000);
        console.log(props.events)
    }, []);
    const dummyEvents = props.events.map((x) => ({
        'title': x?.summary || "N/A",
        'allDay': true,
        'start': x?.start?.dateTime,
        'end': x?.end?.dateTime
    })) || [];

    return (
        <>
            <div className='h-[100vh]'>
                {loader && <div className='w-full flex justify-center'> <HashLoaderComponent isLoading={loader} /> </div>}
                {!loader && <Calendar
                    localizer={localizer}
                    events={dummyEvents}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                />}
            </div>
        </>
    )
}