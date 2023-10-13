"use client"

import { FadeIn } from '@/app/components/Transitions/Transitions'
import { PhaseProps } from '@/utils/types/types'
import React, { useState } from 'react'
import Back from '../Back/Back'
import { AppButton, OutlinedAppButton } from '../Buttons/Buttons'
import Tip from '../Tip/Tip'

export default function Phase({ header, onClickButton }: PhaseProps) {
  const [tip1, setTip1] = useState<string>('');
  const [tip2, setTip2] = useState<string>('');
  const [tip3, setTip3] = useState<string>('');

  const handleTip1Change = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setTip1(event.target.value);
  };

  const handleTip2Change = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setTip2(event.target.value);
  };

  const handleTip3Change = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setTip3(event.target.value);
  };

  // Validation rules for the tips inputs
  const isTip1Valid = tip1.length > 2;
  const isTip2Valid = tip2.length > 2;
  const isTip3Valid = tip3.length > 2;

  return (
    <div className="rounded-[10px] border border-white h-auto w-full p-5"
      style={{ background: "rgba(255, 255, 255, 0.72)" }}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-[#253B51] text-[1.5vw] font-[600]">{header}</h1>
        {isTip1Valid || isTip2Valid || isTip3Valid ? (
          <FadeIn fullWidth={false}>
            <div className="flex items-center space-x-3">
              <OutlinedAppButton content="Edit" isRounded={false} onClickButton={onClickButton} />
              <AppButton content="Save" isRounded={false} onClickButton={onClickButton} isLoading={undefined} />
            </div>
          </FadeIn>
        ) : (
          <div>
            <AppButton content="Add New Tip" isRounded={false} onClickButton={onClickButton} isLoading={undefined} />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-[24px] mt-7 mb-20">
        <Tip header="Tip 1" value={tip1} onChangeTip={handleTip1Change} />
        <Tip header="Tip 2" value={tip2} onChangeTip={handleTip2Change} />
        <Tip header="Tip 3" value={tip3} onChangeTip={handleTip3Change} />
      </div>

      <Back />
    </div>
  )
}
