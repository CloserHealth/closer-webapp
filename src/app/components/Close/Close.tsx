import { ButtonBase } from '@mui/material'
import React from 'react'

export default function Close({ title, onClickClose }: any) {
    return (
        <ButtonBase sx={{ borderRadius: "10px" }} onClick={onClickClose}>
            <button className="bg-[#F6F6F6] rounded-full py-[4px] px-[12px] text-[#17181C] font-[500] text-[0.9vw]">{title}</button>
        </ButtonBase>
    )
}
