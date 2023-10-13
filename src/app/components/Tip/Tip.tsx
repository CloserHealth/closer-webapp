import React from 'react'
import TextAreaField from '../Fields/TextArea'

export default function Tip({ header, value, onChangeTip }: any) {
    return (
        <div className="h-auto w-full rounded-[10px] bg-[#F6F6F6] border border-[#E1E5EB] p-3 space-y-3">
            <p className="font-[500] text-[0.9vw] text-[#383A3F]">{header}</p>
            <TextAreaField
                id="text"
                label=""
                placeholder="Enter Tip"
                value={value}
                onInputChange={onChangeTip}
                require={false}
                padding="px-4 py-3"
            />
        </div>
    )
}
