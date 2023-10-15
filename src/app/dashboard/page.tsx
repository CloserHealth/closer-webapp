"use client"

import React, { useEffect, useState } from 'react'
import MobileNavbar from '../components/Navbar/MobileNavbar';
import 'react-minimal-progress-steps/dist/index.css';
import CustomCalendar from '../components/Calendar/Calendar';
import useGlobalState from '@/hooks/globalstate.hook';
import { useRouter } from 'next/router';
import SplashScreen from '../components/SplashScreen/SplashScreen';

const Dashboard = () => {
  const { profile, isAuthenticated } = useGlobalState();
  const [isUser, setIsUser] = useState<boolean>(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      isAuthenticated ? setIsUser(true) : setIsUser(false);
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  // tasks
  const tasks = [
    {
      title: 'Call Ada'
    },
    {
      title: 'Do my assignment'
    },
    {
      title: 'Visit the gym'
    },
    {
      title: 'Travel to europe'
    },
  ];

  const [date, setDate] = useState<any>(new Date());
  const [selectRange, setSelectRange] = useState<any>(false);

  return (
    <>
      {!isUser ? (
        <SplashScreen />
      ) : (
        <div className='px-5 pb-20 relative h-[100vh]'>
          <div className="fixed top-0 right-0 left-0">
            <MobileNavbar />
          </div>
          <div className='mt-28'>
            <p className="font-[700] text-[3.8vw] text-[#17181C]">Hello {profile?.data?.user?.firstname}, get closer to your best self!</p>
            <div className="w-full h-auto rounded-[16px] mt-5 px-[20px] py-[28px] mb-7"
              style={{ background: 'linear-gradient(90deg, #2B0A60 99.99%, #FFD4ED 100%)' }}>
              <h1 className="text-[5vw] font-[600] text-white">Your Cycle Phase</h1>
              <div className="mt-7 flex items-center justify-between">
                <p className="text-[3.5vw] font-[400] text-white">You’re currently in your <span className="font-[800]">{profile?.data?.user?.phase?.name || '-----'} Phase</span>... <br /> <span>Learn More</span></p>
              </div>
            </div>

            {/* Calendar */}
            <CustomCalendar
              date={date}
              setDate={setDate}
              selectRange={selectRange}
              setSelectRange={setSelectRange}
            />

            <div className="w-full h-auto rounded-[16px] mt-7 px-[10px] py-[29px]"
              style={{ background: '#C8B7FA', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}>
              <h1 className="text-[3.7vw] font-[600] text-[#1E1E1E]">Cycle Prediction</h1>
              <div className="mt-7 flex space-x-7 items-center">
                <div>
                  <p className="text-[#1E1E1E] text-[4vw] font-[600]">Period</p>
                  <p className="text-[#1E1E1E] text-[3vw] font-[400]">3 days left: May 1st, 2023</p>
                </div>
                <div>
                  <p className="text-[#1E1E1E] text-[4vw] font-[600]">Ovulation</p>
                  <p className="text-[#1E1E1E] text-[3vw] font-[400]">24 days left: May 1st, 2023</p>
                </div>
              </div>
            </div>

            {/* <div className="w-full h-auto rounded-[16px] mt-7 px-[10px] py-[20px]"
          style={{ 
            background: 'linear-gradient(90deg, #2B0A60 99.99%, #FFD4ED 100%)',
            boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
             }}>
          <div className="flex justify-between items-center">
            <h1 className="text-[3.7vw] font-[600] text-white">This Week’s Tasks</h1>
            <button className="rounded-full px-5 py-[6px] bg-primaryColor border-[0.75px] border-[#E3E4E8] text-[2.5vw] text-white">Plan task</button>
          </div>
          <div className="mt-7 grid grid-cols-2 gap-y-4">
            {tasks.map((item, i) => (
              <p key={i} className="text-[3.5vw] font-[400] text-white">{item.title}</p>
            ))}
          </div>
        </div> */}

            {/* <div className="w-full h-auto rounded-[16px] mt-7 px-[10px] py-[20px]"
          style={{ 
            background: 'linear-gradient(90deg, #2B0A60 99.99%, #FFD4ED 100%)',
            boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
             }}>
          <div className="flex justify-between items-center">
            <h1 className="text-[3.7vw] font-[600] text-white">Symptoms</h1>
            <button className="rounded-full px-5 py-[6px] bg-primaryColor border-[0.75px] border-[#E3E4E8] text-[2.5vw] text-white">Track Symptom</button>
          </div>
          <div className="mt-7 grid grid-cols-2 gap-y-4">
            {tasks.map((item, i) => (
              <p key={i} className="text-[3.5vw] font-[400] text-white">{item.title}</p>
            ))}
          </div>
        </div>

        <div className="w-full h-auto rounded-[16px] mt-5 px-[20px] py-[28px]"
          style={{ background: 'linear-gradient(90deg, #2B0A60 99.99%, #FFD4ED 100%)' }}>
          <h1 className="text-[5vw] font-[600] text-white">Your Cycle Phase</h1>
          <div className="mt-7 flex items-center jsutify-between">
            <p className="text-[3.5vw] font-[400] text-white">You’re currently in your <span className="font-[800]">Follicular Phase</span>, the best time to plan your activities.....<span>Learn More</span></p>
          </div>
        </div> */}
          </div>
        </div>
      )}
    </>
  )
}

export default Dashboard