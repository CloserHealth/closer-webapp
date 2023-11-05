"use client"

import React, { useEffect, useState } from 'react'
import MobileNavbar from '../components/Navbar/MobileNavbar';
import 'react-minimal-progress-steps/dist/index.css';
import Assets from '@/constants/assets.constant';
import Image from 'next/image';
import CustomCalendar from '../components/Calendar/Calendar';
import API from '@/constants/api.constant';
import useRequest from '@/services/request.service';
import useGlobalState from '@/hooks/globalstate.hook';
import { Checkbox, IconButton } from '@mui/material';

const Calendar = () => {
    const { profile } = useGlobalState();
    const { isLoading, makeRequest } = useRequest();
    const [periodLog, setPeriodLog] = useState<any>([]);
    const [phase, setPhase] = useState<any>([]);
    const [selectRange, setSelectRange] = useState<any>(true);
    const [date, setDate] = useState(new Date());

    // Check box
    const copingTips = [
        {
            title: 'Walk 1000 steps',
        },
        {
            title: 'Sleep 8hours',
        },
        {
            title: 'Drink 5litres of water',
        },
        {
            title: 'Go to the gym',
        },
        {
            title: 'Eat Protein',
        },
        {
            title: 'Laugh a lot',
        },
    ];

    // phases
    const phases = [
        {
            icon: Assets.follicularPhase,
            title: 'Follicular Phase',
        },
        {
            icon: Assets.lutealPhase,
            title: 'Luteal Phase',
        },
        {
            icon: Assets.ovulationPhase,
            title: 'Ovulation Phase',
        },
        {
            icon: Assets.periodPhase,
            title: 'Period Phase',
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
                setPhase(data?.phase);
            }
        } catch (err) {
            console.log("Error fetching users:", err);
        }
    };

    useEffect(() => {
        handleFetch();
    }, []);



    // Parse the start and end dates
    const periodStartDate = periodLog?.prev_period?.start;
    const periodEndDate = periodLog?.prev_period?.end;

    const ovulationStartDate = periodLog?.prev_ovulation?.start;
    const ovulationEndDate = periodLog?.prev_ovulation?.end;

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
        <div className='px-5 pb-20 relative h-[100vh] overflow-y-auto'>
            <div className="fixed top-0 right-0 left-0 z-50">
                <MobileNavbar />
            </div>
            <div className='mt-28'>
                <p className="font-[700] text-[3.8vw] text-[#17181C]">Calendar</p>
                <div className="w-full h-auto rounded-[16px] mt-5 px-[20px] py-[28px] mb-7"
                    style={{ background: 'linear-gradient(90deg, #2B0A60 99.99%, #FFD4ED 100%)' }}>
                    <h1 className="text-[5vw] font-[600] text-white">Your Cycle Phase</h1>
                    <div className="mt-7 flex items-center justify-between">
                        <p className="text-[3.5vw] font-[400] text-white">You’re currently in your <span className="font-[800]">{phase?.name || '-----'} Phase</span>... <br /> <span>Learn More</span></p>
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


                <div className="mt-7 grid grid-cols-2 gap-y-5 bg-white rounded-[16px] p-4 border">
                    {phases.map((item, i) => (
                        <div key={i} className="w-full">
                            <div className="flex space-x-2 items-center w-full">
                                <Image src={item.icon} alt='' width={20} height={20} />
                                <h1 className="text-[3vw] font-[500] text-black w-full">{item.title}</h1>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Task for the day */}
                <div className="mt-7 bg-[#F0EDF8] rounded-[16px] px-4 py-5 w-full h-auto" style={{ boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}>
                    <h1 className="text-[#1E1E1E] text-[14px] font-[800]">Your Task for today</h1>

                    {copingTips.length <= 0 ? (
                        <div className="w-full flex flex-col justify-center items-center space-y-2 mt-8 pb-7">
                            <Image src={Assets.cat} alt="No coping tips" width={120} height={120} />
                            <p className="font-[600] text-[2.5vw]">You’re yet to add your symptoms</p>
                        </div>
                    ) : (
                        <div className="mt-5">
                            <p className="text-[2.8vw] font-[600] text-[#1E1E1E] mt-1.5">Select Checkbox once an activity is completed</p>
                            <div className="w-full grid grid-cols-2 gap-x-10">
                                {copingTips?.map((tip, index) => (
                                    <div key={index} className="flex items-center">
                                        <Checkbox
                                            size="small"
                                            className="-translate-x-3"
                                            sx={{
                                                color: '#939393',
                                                '&.Mui-checked': {
                                                    color: '#392768',
                                                },
                                            }}
                                        />
                                        <p className="text-[2.5vw] font-[500] text-[#1E1E1E] -translate-x-3">{tip.title}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>


                {/* Coping Tips */}
                <div className="mt-7 bg-[#F0EDF8] rounded-[16px] px-4 py-5 w-full h-auto" style={{ boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}>
                    <h1 className="text-[#1E1E1E] text-[14px] font-[800]">Coping Tips</h1>
                    <p className="text-[2.8vw] font-[400] text-[#1E1E1E] mt-1.5">Based on your symptoms, Closer suggests you do the following this week.</p>


                    {copingTips.length <= 0 ? (
                        <div className="w-full flex flex-col justify-center items-center space-y-2 mt-8 pb-7">
                            <Image src={Assets.cat} alt="No coping tips" width={120} height={120} />
                            <p className="font-[600] text-[2.5vw]">You’re yet to add your symptoms</p>
                        </div>
                    ) : (
                        <div className="mt-5">
                            <p className="text-[2.8vw] font-[600] text-[#1E1E1E] mt-1.5">Select Checkbox once an activity is completed</p>
                            <div className="w-full grid grid-cols-2 gap-x-10">
                                {copingTips?.map((tip, index) => (
                                    <div key={index} className="flex items-center">
                                        <Checkbox
                                            size="small"
                                            className="-translate-x-3"
                                            sx={{
                                                color: '#939393',
                                                '&.Mui-checked': {
                                                    color: '#392768',
                                                },
                                            }}
                                        />
                                        <p className="text-[2.5vw] font-[500] text-[#1E1E1E] -translate-x-3">{tip.title}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}

export default Calendar