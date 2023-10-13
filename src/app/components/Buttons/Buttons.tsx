"use client"
import { AppButtonProps, CloseAppButtonProps, AuthButtonProps, OutlinedButtonProps } from '@/utils/types/types'
import React from 'react';
import Image from "next/image";
import Assets from '@/constants/assets.constant';

export function AuthButton({ content, type, isDisabled, isLoading }: AuthButtonProps) {
    return (
        <button
            type={type}
            className={`w-full rounded-[5px] py-4 ${isDisabled ? 'bg-[#2b0a6071]' : 'bg-primaryColor'} ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'} text-white font-[600] text-[1vw]`}
            disabled={isDisabled}>
            {isLoading ? (
                <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.86 3.01 7.978l2.01-2.686zm2.967 2.677A7.963 7.963 0 0112 20v-4a3.993 3.993 0 00-3.888-3.98L8.967 20.968zM12 4c2.71 0 5.19 1.054 7.02 2.775l2.01-2.686A11.963 11.963 0 0012 0v4zM4.022 6.732l2.01 2.686A11.963 11.963 0 000 12h4c0-1.516.29-2.98.818-4.268zm1.178 5.306l-2.01 2.686A11.963 11.963 0 004 20h4c0-1.516.29-2.98.818-4.268L5.2 12.038zM20.978 8.732A11.963 11.963 0 0020 12h4c0-3.042-1.135-5.86-3.01-7.978l-2.01 2.686zm-2.967 2.677L15.033.332A7.963 7.963 0 0112 4v4a3.993 3.993 0 003.888 3.98z"></path>
                    </svg>
                    Loading...
                </span>
            ) : (
                content
            )}
        </button>
    )
}


export function AppButton({ content, onClickButton, isRounded, isLoading }: AppButtonProps) {
    return (
        <button
            onClick={onClickButton}
            className={`w-full ${isRounded ? 'rounded-full' : 'rounded-[5px]'} py-3 bg-primaryColor cursor-pointer text-white font-[400] text-[4vw]`}
            style={{ border: "1px solid rgba(63, 63, 68, 0.00)" }}>
            {isLoading ? (
                <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.86 3.01 7.978l2.01-2.686zm2.967 2.677A7.963 7.963 0 0112 20v-4a3.993 3.993 0 00-3.888-3.98L8.967 20.968zM12 4c2.71 0 5.19 1.054 7.02 2.775l2.01-2.686A11.963 11.963 0 0012 0v4zM4.022 6.732l2.01 2.686A11.963 11.963 0 000 12h4c0-1.516.29-2.98.818-4.268zm1.178 5.306l-2.01 2.686A11.963 11.963 0 004 20h4c0-1.516.29-2.98.818-4.268L5.2 12.038zM20.978 8.732A11.963 11.963 0 0020 12h4c0-3.042-1.135-5.86-3.01-7.978l-2.01 2.686zm-2.967 2.677L15.033.332A7.963 7.963 0 0112 4v4a3.993 3.993 0 003.888 3.98z"></path>
                    </svg>
                    Loading...
                </span>
            ) : (
                content
            )}
        </button>
    )
}

export function OutlinedAppButton({ content, onClickButton, isRounded, isLoading }: AppButtonProps) {
    return (
        <button
            onClick={onClickButton}
            className={`w-full ${isRounded ? 'rounded-full' : 'rounded-[5px]'} py-3 bg-white border border-[#EBECEF] cursor-pointer text-[#17181C] font-[400] text-[4vw]`}>
            {isLoading ? (
                <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.86 3.01 7.978l2.01-2.686zm2.967 2.677A7.963 7.963 0 0112 20v-4a3.993 3.993 0 00-3.888-3.98L8.967 20.968zM12 4c2.71 0 5.19 1.054 7.02 2.775l2.01-2.686A11.963 11.963 0 0012 0v4zM4.022 6.732l2.01 2.686A11.963 11.963 0 000 12h4c0-1.516.29-2.98.818-4.268zm1.178 5.306l-2.01 2.686A11.963 11.963 0 004 20h4c0-1.516.29-2.98.818-4.268L5.2 12.038zM20.978 8.732A11.963 11.963 0 0020 12h4c0-3.042-1.135-5.86-3.01-7.978l-2.01 2.686zm-2.967 2.677L15.033.332A7.963 7.963 0 0112 4v4a3.993 3.993 0 003.888 3.98z"></path>
                    </svg>
                    Loading...
                </span>
            ) : (
                content
            )}
        </button>
    )
}

export function OutlinedAppButton2({ content, onClickButton, isRounded }: OutlinedButtonProps) {
    return (
        <button
            onClick={onClickButton}
            className={`w-full ${isRounded ? 'rounded-full' : 'rounded-[5px]'} py-3 bg-transparent border border-[#979797] px-14 cursor-pointer text-[#737373] font-[400] text-[1vw]`}>
            {content}
        </button>
    )
}

export function ContentOutlinedButton({ content, onClickButton, isRounded }: OutlinedButtonProps) {
    return (
        <button
            onClick={onClickButton}
            className={`w-full ${isRounded ? 'rounded-full' : 'rounded-[10px]'} text-start py-[20px] bg-white border border-[#CECECE] px-6 cursor-pointer text-[#1E1E1E] font-[500] text-[1vw]`}>
            {content}
        </button>
    )
}



export function CloseAppButtonModal({ content, onClickButtonClose }: CloseAppButtonProps) {
    return (
        <button
            onClick={onClickButtonClose}
            className="w-full rounded-[5px] py-4 bg-[#F9F9FA] text-[#F07E6E] font-[600] text-[1vw]">
            {content}
        </button>
    )
}

export function CsvDownloadButton({ content, onClickButton }: OutlinedButtonProps) {
    return (
        <button onClick={onClickButton} className="rounded-[5px] py-2.5 px-3 w-[180px] border border-[#ced3d8cd] text-[#6B6C7A] font-[500] text-[0.9vw] flex space-x-3 items-center">
            <Image src={Assets.download} alt="" width={20} height={20} />
            <span>{content}</span>
        </button>
    )
}


