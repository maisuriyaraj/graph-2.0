import MyCalendar from '@/app/components/myCalender'
import React from 'react';
import { cookies } from "next/headers";
import GraphScheduleModal from './component/ScheduleCrediantialmodal';


async function getCalenderCradiantials(){
    const userId = JSON.parse(cookies().get("userId").value);
    const response = await fetch(`http://localhost:3000/api/google/v1/${userId}`);
    const result = response.json();
    return result;
}
export default async function SchedulePage() {
  // const [openModal,setModal] = useState(true);
  // const cradiantials = await getCalenderCradiantials();

 
  const closeModal = () =>{
    return false;
  }
  return (
    <div className='w-full px-5'>
        {/* <MyCalendar events={cradiantials?.calenderData} />
          
        {cradiantials && !cradiantials?.data?.accountConnected && <GraphScheduleModal  />} */}
        <h1>SERVER UNDER MAINTENANCE</h1>
    </div>
  )
}
