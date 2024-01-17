"use client"
import { TextFieldProps } from '@/utils/types/types'
import React, { useState } from 'react';
import { IconContext } from "react-icons";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function TextField({ label, placeholder, value, require, id, type, onInputChange, isPassword, withBackground, readOnly }: TextFieldProps) {
    const [viewPassword, setViewPassword] = useState<boolean>(false);
    const handleViewPassword = () => {
        setViewPassword(!viewPassword);
    }

    return (
        <div className="w-full flex flex-col">
            <label htmlFor={id} className="mb-2 text-[4vw] font-medium text-gray-900 dark:text-white">{label}</label>
            <div className="relative flex items-center">
                <input
                    type={viewPassword ? "text" : type}
                    id={id}
                    value={value}
                    onChange={onInputChange}
                    className={`${withBackground ? 'bg-white' : 'bg-transparent'} border border-[#E3E4E8] text-gray-900 text-[4vw] rounded-[8px] outline-none w-full px-4 py-3`}
                    placeholder={placeholder}
                    required={require}
                    readOnly={readOnly}
                />
                {isPassword && (
                    <div className='pl-3 flex items-center cursor-pointer' onClick={handleViewPassword}>
                        <IconContext.Provider value={{ color: "#ababaa", size: "20px" }}>
                            <div>
                                {viewPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                            </div>
                        </IconContext.Provider>
                    </div>
                )}
            </div>
        </div>

    )
}
