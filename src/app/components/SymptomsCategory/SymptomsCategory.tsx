import React, { useState } from 'react';
import { Chip } from '@mui/material';

export default function SymptomsCategory({ phase, experience, setSelectedChips, selectedChips, setSelectedPhase }: any) {
    const handleChipClick = (id: string, category: string, phase: string) => {
        const existingChip = selectedChips.find((chip: { id: string; phase: string; }) => chip.id === id && chip.phase === phase);
    
        if (existingChip) {
            setSelectedChips((prevSelected: any[]) =>
                prevSelected.filter((chip: { id: string; phase: string; }) => !(chip.id === id && chip.phase === phase))
            );
        } else {
            setSelectedChips((prevSelected: any) => [...prevSelected, { id, category, phase }]);
            setSelectedPhase(phase);
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
                {experience?.map((item: { name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; id: string; }, index: React.Key | null | undefined) => (
                    <Chip
                    key={index}
                    label={item?.name}
                    onClick={() => handleChipClick(item?.id, phase, phase)}
                    sx={{
                        border: selectedChips.some((chip: { id: string; phase: any; }) => chip.id === item?.id && chip.phase === phase)
                            ? '2px solid #FF00FF'
                            : '2px solid transparent',
                    }}
                />
                
                ))}
            </div>
        </div>
    );
}
