import { FadeIn, ZoomInOut } from '@/app/components/Transitions/Transitions'
import { ModalProps, StatusModalProps } from '@/utils/types/types'
import React from 'react'
import { AppButton, CloseAppButtonModal } from '../Buttons/Buttons';
import Image from 'next/image';

export function AppModal({ header, text, buttonText, onClick, onClose }: ModalProps) {
    return (
        <FadeIn fullWidth>
            <div className='z-50 w-full min-h-[100vh] fixed top-o right-0 left-0 bottom-0 flex justify-center items-center' onClick={onClose} style={{ background: "rgba(43, 10, 96, 0.63)" }}>
                <div className="rounded-[10px] px-5 py-[50px] bg-white space-y-12">
                    <div className='text-center space-y-2'>
                        <h1 className="text-primaryColor font-[600] text-[5.5vw]">{header}</h1>
                        <p className="text-[#868686] text-[4vw] font-[400] w-full mx-auto">{text}</p>
                    </div>
                    <div className='px-5'>
                        <AppButton content={buttonText} isRounded={false} onClickButton={onClick} isLoading={undefined} type={undefined} isDisabled={false} />
                    </div>
                </div>
            </div>
        </FadeIn>
    )
}


export function StatusModal({ text, header, icon, onClose }: StatusModalProps) {
    return (
        <div className='z-50 w-full min-h-[100vh] fixed top-o right-0 left-0 bottom-0 flex justify-center items-center' onClick={onClose} style={{ background: "rgba(43, 10, 96, 0.63)" }}>
            <div className="rounded-[10px] py-[60px] px-[150px] bg-white space-y-4 flex flex-col items-center justify-center">
                <Image src={icon} alt="" width={40} height={40} />
                <div className='text-center space-y-5'>
                    <h1 className="text-primaryColor font-[600] text-[1.8vw]">{header}</h1>
                    <p className="text-[#1E1E1E] text-[1.1vw] font-[400] mx-auto">{text}</p>
                </div>
            </div>
        </div>
    )
}