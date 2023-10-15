"use client"

import React, { useEffect, useState } from 'react'
import MobileNavbar from '../components/Navbar/MobileNavbar';
import 'react-minimal-progress-steps/dist/index.css';
import CustomCalendar from '../components/Calendar/Calendar';
import useGlobalState from '@/hooks/globalstate.hook';
import { useRouter } from 'next/router';
import SplashScreen from '../components/SplashScreen/SplashScreen';
import API from '@/constants/api.constant';
import useRequest from '@/services/request.service';
import { calculateDaysLeft } from '@/helpers';

const Dashboard = () => {
  const { profile, isAuthenticated } = useGlobalState();
  const [isUser, setIsUser] = useState<boolean>(false);
  const [selectRange, setSelectRange] = useState<any>(true);
  const { isLoading, makeRequest } = useRequest();
  const [periodLog, setPeriodLog] = useState<any>([]);
  const [periodLeftDays, setPeriodLeftDays] = useState<any>(0);
  const [ovulationLeftDays, setOvulationLeftDays] = useState<any>(0);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      isAuthenticated ? setIsUser(true) : setIsUser(false);
    }, 2000);

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



  // Fetch User management Data
  const handleFetch = async () => {
    try {
      const res = await makeRequest({
        method: "GET",
        url: API.dashboard,
      });

      const { message, data } = res.data;
      console.log(data)

      if (message === "Data fetched successfully!") {
        setPeriodLog(data?.period_log);
      }
    } catch (err) {
      console.log("Error fetching users:", err);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  const formatDate = (inputDate: any) => {
    if (!inputDate) {
      return 'Invalid date';
    }

    const dateParts = inputDate.split('-');
    if (dateParts.length !== 3) {
      return 'Invalid date format';
    }

    const months = [
      'January', 'February', 'March', 'April',
      'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
    ];

    const year = parseInt(dateParts[0]);
    const month = months[parseInt(dateParts[1]) - 1];
    const day = parseInt(dateParts[2]);

    let daySuffix = 'th';

    if (day === 1 || day === 21 || day === 31) {
      daySuffix = 'st';
    } else if (day === 2 || day === 22) {
      daySuffix = 'nd';
    } else if (day === 3 || day === 23) {
      daySuffix = 'rd';
    }

    return `${month} ${day}${daySuffix}, ${year}`;
  };

  // Example usage
  const inputPeriodDate = periodLog?.next_period?.start;
  const inputOvulationDate = periodLog?.next_ovulation?.start;
  const formattedPeriodDate = formatDate(inputPeriodDate);
  const formattedOvulationDate = formatDate(inputOvulationDate);


  // Calculate days left
  useEffect(() => {
    const nextPeriodStartDate = new Date(periodLog?.next_period?.start);  // Next period start date
    try {
      const daysLeft = calculateDaysLeft(nextPeriodStartDate, new Date());
      setPeriodLeftDays(daysLeft);
    } catch (error: any) {
      console.error('Error calculating days left:', error.message);
    }
  }, [periodLog]);


  useEffect(() => {
    const nextOvulationStartDate = new Date(periodLog?.next_ovulation?.start);  // Next Ovulation start date
    try {
      const ovulationDaysLeft = calculateDaysLeft(nextOvulationStartDate, new Date());
      setOvulationLeftDays(ovulationDaysLeft);
    } catch (error: any) {
      console.error('Error calculating days left:', error.message);
    }
  }, [periodLog]);



  // Parse the start and end dates
  const periodStartDate = periodLog?.prev_period?.start;
  const periodEndDate = periodLog?.prev_period?.end;

  const ovulationStartDate = periodLog?.prev_ovulation?.start;
  const ovulationEndDate = periodLog?.prev_ovulation?.end;

  const [date, setDate] = useState(new Date());


  const tileContent = ({ date, view }: any) => {
    const formatDate = (d: Date) => {
      const year = d.getFullYear();
      const month = `${d.getMonth() + 1}`.padStart(2, '0');
      const day = `${d.getDate()}`.padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
  
    if (view === 'month') {
      const dateStr = formatDate(date);
  
      const formattedPeriodStartDate = formatDate(new Date(periodStartDate));
      const formattedPeriodEndDate = formatDate(new Date(periodEndDate));
      const formattedOvulationStartDate = formatDate(new Date(ovulationStartDate));
      const formattedOvulationEndDate = formatDate(new Date(ovulationEndDate));
  
      if (dateStr >= formattedPeriodStartDate && dateStr <= formattedPeriodEndDate) {
        return (
          <div className="period-date-marker">
            <span className="period-date-text absolute">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 8 12" fill="none">
                <path d="M6.9261 6.34468L3.61807 0.933594L0.552715 6.30769C-0.161063 7.44649 -0.223356 8.92726 0.526435 10.1537C1.59223 11.8969 3.88865 12.4566 5.65623 11.405C7.42315 10.3538 7.9919 8.08922 6.9261 6.34468Z" fill="#F3282B" />
              </svg>
            </span>
          </div>
        );
      }
      if (dateStr >= formattedOvulationStartDate && dateStr <= formattedOvulationEndDate) {
        return (
          <div className="ovulation-date-marker">
            <span className="ovulation-date-text absolute">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 7 8" fill="none">
                <path d="M3.86296 7.83105C3.05046 7.83105 2.36115 7.548 1.79504 6.98189C1.22893 6.41578 0.946011 5.72661 0.946289 4.91439C0.946289 4.37967 1.0349 3.84147 1.21212 3.2998C1.38934 2.75814 1.61851 2.26675 1.89962 1.82564C2.18073 1.3848 2.4949 1.0255 2.84212 0.747721C3.18934 0.469944 3.52962 0.331055 3.86296 0.331055C4.20323 0.331055 4.54532 0.469944 4.88921 0.747721C5.23309 1.0255 5.54559 1.38494 5.82671 1.82605C6.10782 2.26689 6.33698 2.75814 6.51421 3.2998C6.69143 3.84147 6.7799 4.37967 6.77962 4.91439C6.77962 5.72689 6.49657 6.41619 5.93046 6.9823C5.36434 7.54841 4.67518 7.83133 3.86296 7.83105ZM4.27962 6.58105C4.39768 6.58105 4.49671 6.54105 4.57671 6.46105C4.65671 6.38105 4.69657 6.28217 4.69629 6.16439C4.69629 6.04633 4.65629 5.9473 4.57629 5.8673C4.49629 5.7873 4.3974 5.74744 4.27962 5.74772C3.9324 5.74772 3.63726 5.62619 3.39421 5.38314C3.15115 5.14008 3.02962 4.84494 3.02962 4.49772C3.02962 4.37967 2.98962 4.28064 2.90962 4.20064C2.82962 4.12064 2.73073 4.08078 2.61296 4.08105C2.4949 4.08105 2.39587 4.12105 2.31587 4.20105C2.23587 4.28105 2.19601 4.37994 2.19629 4.49772C2.19629 5.07411 2.39948 5.5655 2.80587 5.97189C3.21226 6.37828 3.70351 6.58133 4.27962 6.58105Z" fill="#FFC700" />
              </svg>
            </span>
          </div>
        );
      }
    }
    return null;
  };
  



  return (
    <>
      {!isUser ? (
        <SplashScreen />
      ) : (
        <div className='px-5 pb-20 relative h-[100vh] overflow-y-auto'>
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
              selectRange={false}
              setSelectRange={setSelectRange}
              periodStartDate={periodStartDate}
              periodEndDate={periodEndDate}
              tileContent={tileContent}
            />

            <div className="w-full h-auto rounded-[16px] mt-7 px-[10px] py-[29px]"
              style={{ background: '#C8B7FA', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}>
              <h1 className="text-[3.7vw] font-[600] text-[#1E1E1E]">Cycle Prediction</h1>
              <div className="mt-7 flex space-x-7 items-center">
                <div>
                  <p className="text-[#1E1E1E] text-[4vw] font-[600]">Period</p>
                  <p className="text-[#1E1E1E] text-[3vw] font-[400]">{periodLeftDays} days left: {formattedPeriodDate}</p>
                </div>
                <div>
                  <p className="text-[#1E1E1E] text-[4vw] font-[600]">Ovulation</p>
                  <p className="text-[#1E1E1E] text-[3vw] font-[400]">{ovulationLeftDays} days left: {formattedOvulationDate}</p>
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