"use client"
import React from 'react';
import Image from 'next/image';
import Assets from '@/constants/assets.constant';
import { AppButton, OutlinedAppButton } from '../components/Buttons/Buttons';

const LandingPage = () => {
    return (
        <div className="px-5 pt-10 pb-20 min-h-[100vh] w-full bg-[#f9f9f9]">
            <div className="w-full flex justify-center items-center mx-auto">
                <Image src={Assets.closerLogo} alt="" width={130} height={100} />
            </div>
            <h1 className="text-primaryColor font-[600] text-[5.5vw] mt-10 text-center px-7">Own Your Menstrual Cycle: Plan, Track, Thrive!</h1>
            <div className="mt-10 w-full flex justify-center items-center mx-auto">
                <Image src={Assets.landingImage} alt="" width={1000} height={1000} />
            </div>
            <div className="mt-7 space-y-5">
                <AppButton content='Get Started' onClickButton={() => {}} isRounded={true} isLoading={undefined} />
                <OutlinedAppButton content='Already have an account? Log In' onClickButton={() => {}} isRounded={true} isLoading={undefined} />
            </div>
        </div>
    )
}

export default LandingPage