"use client"

import React, { useState } from 'react'
import MobileNavbar from '../components/Navbar/MobileNavbar';
import 'react-minimal-progress-steps/dist/index.css';
import Assets from '@/constants/assets.constant';
import Image from 'next/image';
import CustomCalendar from '../components/Calendar/Calendar';

const Calendar = () => {
    // phases
    const phases = [
        {
            icon: Assets.follicularPhase,
            title: 'Follicular Phase',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id malesuada augue neque tortor tellus pellentesque est, in ipsum. Nunc vitae donec augue non  pellentesque est, in ipsum. Nunc vitae donec Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id malesuada augue neque tortor tellus pellentesque est, in ipsum. Nunc vitae donec augue non  pellentesque est, in ipsum. Nunc vitae donec'
        },
        {
            icon: Assets.lutealPhase,
            title: 'Luteal Phase',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id malesuada augue neque tortor tellus pellentesque est, in ipsum. Nunc vitae donec augue non  pellentesque est, in ipsum. Nunc vitae donec Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id malesuada augue neque tortor tellus pellentesque est, in ipsum. Nunc vitae donec augue non  pellentesque est, in ipsum. Nunc vitae donec'
        },
        {
            icon: Assets.ovulationPhase,
            title: 'Ovulation Phase',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id malesuada augue neque tortor tellus pellentesque est, in ipsum. Nunc vitae donec augue non  pellentesque est, in ipsum. Nunc vitae donec Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id malesuada augue neque tortor tellus pellentesque est, in ipsum. Nunc vitae donec augue non  pellentesque est, in ipsum. Nunc vitae donec'
        },
        {
            icon: Assets.periodPhase,
            title: 'Period Phase',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id malesuada augue neque tortor tellus pellentesque est, in ipsum. Nunc vitae donec augue non  pellentesque est, in ipsum. Nunc vitae donec Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id malesuada augue neque tortor tellus pellentesque est, in ipsum. Nunc vitae donec augue non  pellentesque est, in ipsum. Nunc vitae donec'
        },
    ];

    const [date, setDate] = useState<any>(new Date());
    const [selectRange, setSelectRange] = useState<any>(false);

    return (
        <div className='px-5 pb-20 relative min-h-[100vh]'>
            <div className="fixed top-0 right-0 left-0">
                <MobileNavbar />
            </div>
            <div className='mt-28'>
                <p className="font-[700] text-[3.8vw] text-[#17181C]">Calendar</p>
                <div className="w-full h-auto rounded-[16px] mt-5 px-[20px] py-[28px] mb-7"
                    style={{ background: 'linear-gradient(90deg, #2B0A60 99.99%, #FFD4ED 100%)' }}>
                    <h1 className="text-[5vw] font-[600] text-white">Your Cycle Phase</h1>
                    <div className="mt-7 flex items-center justify-between">
                        <p className="text-[3.5vw] font-[400] text-white">You’re currently in your <span className="font-[800]">Follicular Phase</span>, the best time to plan your activities.....<span>Learn More</span></p>
                    </div>
                </div>

                {/* Calendar */}
                <CustomCalendar
                    date={date}
                    setDate={setDate}
                    selectRange={selectRange}
                    setSelectRange={setSelectRange}
                />

                <div className="mt-7 grid grid-cols-1 gap-y-5">
                    {phases.map((item, i) => (
                        <div key={i} className="w-full h-auto rounded-[16px] px-[10px] py-[29px]"
                            style={{ background: '#594D94', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}>
                            <div className="flex space-x-2 items-center">
                                <h1 className="text-[4.5vw] font-[800] text-white">{item.title}</h1>
                                <Image src={item.icon} alt='' width={20} height={20} />
                            </div>
                            <p className="text-[3.5vw] font-[400] text-white mt-7">{item.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Calendar