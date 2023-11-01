"use client"

import React, { useState } from 'react'
import MobileNavbar from '../components/Navbar/MobileNavbar';
import Image from 'next/image';
import { Checkbox, IconButton } from '@mui/material';
import Assets from '@/constants/assets.constant';
import SymptomTracker from '../components/SymptomTracker/SymptomTracker';
import { UserMenu } from '../components/Menu/Menu';

export default function Symptoms() {
    const symptoms = [
        {
            icon: Assets.menstrual,
            title: 'Menstrual Cramps',
        },
        {
            icon: Assets.bloating,
            title: 'Bloating',
        },
        {
            icon: Assets.backPain,
            title: 'Back Pain',
        },
        {
            icon: Assets.fatigue,
            title: 'Fatigue',
        },
        {
            icon: Assets.headache,
            title: 'Headache',
        },
        {
            icon: Assets.fever,
            title: 'Fever',
        },
    ];

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

    // Health Watch
    const healthWatch: any = [
        {
            image: 'https://images.pexels.com/photos/6542700/pexels-photo-6542700.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            title: 'My period vs my mood swings'
        },
        {
            image: 'https://images.pexels.com/photos/3807733/pexels-photo-3807733.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            title: 'My mood swing vs my period'
        },
    ];

     // menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
    event.stopPropagation();
  };
  const handleMenuClose = () => setAnchorEl(null);

    return (
        <div className='px-5 pb-20 relative h-[100vh] overflow-y-auto w-full'>
            <div className="fixed top-0 right-0 left-0 z-50">
                <MobileNavbar />
            </div>
            <div className='mt-28 w-full'>
                <div className="flex justify-between items-center w-full">
                    <p className="font-[700] text-[3.8vw] text-[#17181C]">Symptoms</p>
                    <IconButton onClick={handleMenuOpen}>
                        <Image src={Assets.dotMenu} alt="" width={6} height={6} />
                    </IconButton>
                </div>

                {/* Menu */}
                <>
                  <UserMenu
                    open={open}
                    anchorEl={anchorEl}
                    handleClose={handleMenuClose}
                    onDelete={() => {}}
                  />
                </>

                {/* Symptoms */}
                <div className="mt-7 grid grid-cols-3 gap-x-3 gap-y-5">
                    {symptoms?.map((symptom, index) => (
                        <div key={index} className="flex flex-col items-center space-y-2">
                            <div
                                className="flex justify-center items-center rounded-[12px] w-full h-[100px]"
                                style={{ background: 'linear-gradient(90deg, #2B0A60 99.99%, #FFD4ED 100%)' }}
                            >
                                <Image src={symptom.icon} alt={symptom.title} width={50} height={50} />
                            </div>
                            <p className="font-[800] text-[2.8vw] text-primaryColor">{symptom.title}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-10">
                    <SymptomTracker title="Track Symptom" subTitle="Menstrual Cramps" />
                </div>

                {/* Coping Tips */}
                <div className="mt-7 bg-[#F0EDF8] rounded-[16px] px-4 py-5 w-full h-auto" style={{ boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}>
                    <h1 className="text-[#1E1E1E] text-[14px] font-[800]">Coping Tips</h1>
                    <p className="text-[2.8vw] font-[400] text-[#1E1E1E] mt-1.5">Based on your symptoms, Closer suggests you do the following this week.</p>
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
                </div>

                {/* Health Watch */}
                <div className="mt-7">
                    <div className="flex items-center justify-between">
                        <h1 className="text-[#17181C] font-[700] text-[4vw]">Health Watch</h1>
                        <p className="font-[400] text-[3vw] text-primaryColor">See all</p>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-4">
                        {healthWatch?.map((item: any, index: React.Key | null | undefined) => (
                            <div
                                key={index}
                                className="w-full h-[157px] rounded-[10px] px-3 py-4"
                                style={{
                                    backgroundImage: `url(${item.image})`,
                                    backgroundSize: 'cover',  // Adjust to your needs
                                    backgroundPosition: 'center',  // Adjust to your needs
                                    position: 'relative',
                                }}
                            >
                                <div
                                    className="linear-overlay px-3 py-4"
                                    style={{
                                        background: 'linear-gradient(136deg, rgba(52, 2, 132, 0.70) 45.39%, rgba(43, 10, 96, 0.48) 98.89%)',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: '10px',
                                    }}
                                >
                                    <p className="font-[700] text-white text-[3vw]">{item.title}</p>
                                </div>
                            </div>

                        ))}
                    </div>
                </div>


            </div>
        </div>
    )
}
