import { TabProps } from '@/utils/types/types'
import { ButtonBase } from '@mui/material'
import React from 'react'

export default function Tab({ title, activeTab, tab, onHandle }: TabProps) {
    return (
        <>
            <ButtonBase>
                <div
                    className={`border-b-[2px] py-3 px-[8px] transform ease-in-out duration-500 delay-150 cursor-pointer
              ${activeTab === tab ? 'border-primaryColor' : 'border-transparent'} 
              ${activeTab === tab ? 'text-primaryColor' : 'text-[#747A8B]'}`}
                    onClick={onHandle}>
                    <p>{title}</p>
                </div>
            </ButtonBase>
        </>
    )
}
