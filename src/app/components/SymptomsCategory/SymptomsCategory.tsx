"use client"

import React, { useState } from 'react';
import { Chip } from '@mui/material';

export default function SymptomsCategory({ phase, experience }: { phase: string; experience: any[]; }) {
    const [selectedChips, setSelectedChips] = useState<string[]>([]);

    const handleChipClick = (label: string) => {
        if (selectedChips.includes(label)) {
            // If the chip is already selected, remove it
            setSelectedChips((prevSelected) => prevSelected.filter((item) => item !== label));
        } else {
            // If the chip is not selected, add it
            setSelectedChips((prevSelected) => [...prevSelected, label]);
        }
    };



    return (
        <div>
            <div className="bg-[#F5F5F5] rounded-[5px] w-full flex justify-between items-center py-[7px] px-[10px]">
                <p className="text-[#1E1E1E] font-[700] text-[3vw]">{phase}</p>
                <p className="text-primaryColor font-[500] text-[3vw]">Select 1 or more</p>
            </div>
            {/* chip */}
            <div className="w-full h-auto grid grid-cols-2 gap-x-7 gap-y-5 mt-5 px-7">
                {experience?.map((item, index) => (
                    <Chip
                        key={index}
                        label={item.label}
                        onClick={() => handleChipClick(item.label)}
                        sx={{background: selectedChips.includes(item.label) ? '#FFD4ED' : '#FFECC8'}}
                    />
                ))}
            </div>
        </div>
    )

}
