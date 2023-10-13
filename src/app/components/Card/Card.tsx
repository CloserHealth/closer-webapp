import { CardProps } from '@/utils/types/types'
import React from 'react';
import Image from 'next/image';
import { InfinitySpin } from 'react-loader-spinner'

export default function Card({ bgColor, title, data, iconPath, isLoading }: CardProps) {
    return (
        <div className="rounded-[12px] h-[120px] w-full p-4 flex items-center space-x-5 transform transition duration-500 sm:hover:scale-105" style={{ background: `${bgColor}` }}>
            {isLoading ? (
                <div className="min-w-full h-full flex justify-center items-center mx-auto my-0">
                    <InfinitySpin
                        width='200'
                        color="#ffffff"
                    />
                </div>
            ) : (
                <>
                    <Image src={iconPath} alt="" width={50} height={50} />
                    <div className="space-y-2">
                        <p className="text-[#151515] font-[600] text-[1vw]">{title}</p>
                        <h1 className="text-[#3A3A3A] font-[700] text-[1.8vw]">{data}</h1>
                    </div>
                </>
            )}
        </div>
    )
}
