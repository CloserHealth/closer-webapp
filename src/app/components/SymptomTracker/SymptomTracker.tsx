"use client"

import React from 'react';
import StepProgressBar from 'react-step-progress';
import 'react-step-progress/dist/index.css';

export default function SymptomTracker({ title, subTitle }: any) {
    return (
        <div className="w-full rounded-[16px] h-[120px] px-[16px] py-5 bg-[#392768]"
            style={{ boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}
        >
            <h1 className="text-[14px] font-[800] text-white">{title}</h1>
            <p className="text-[12px] font-[400] mt-1.5 text-white">{subTitle}</p>
            {/* <div>
                <StepProgressBar
                    startingStep={0}
                    onSubmit={() => { }}
                    steps={[
                        {
                            label: '',
                            subtitle: '10%',
                            name: '',
                            content: '1'
                        },
                        {
                            label: '',
                            subtitle: '50%',
                            name: '',
                            content: '2',
                        },
                        {
                            label: 'Step 3',
                            subtitle: '100%',
                            name: 'step 3',
                            content: '3',
                        }
                    ]}
                />
            </div> */}
        </div>
    )
}
