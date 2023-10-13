"use client"
import Assets from '@/constants/assets.constant';
import { IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import React from 'react'

export default function Back() {
    const router = useRouter();
    const goBack = () => {
        router.back();
    }
    
    return (
        <div className='flex items-center space-x-2'>
            <IconButton onClick={goBack}>
                <div className="bg-[#e7e5ed] w-[30px] h-[30px] flex items-center justify-center rounded-full">
                    <Image src={Assets.back} alt="" width={9} height={9} />
                </div>
            </IconButton>
            <p className="text-[#1E1E1E] font-[400] text-[1vw]">Back</p>
        </div>
    )
}
