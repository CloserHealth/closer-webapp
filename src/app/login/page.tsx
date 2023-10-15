"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { AppButton, AuthButton } from '../components/Buttons/Buttons';
import { AppModal } from '../components/Modals/Modals';
import { useRouter } from 'next/navigation';
import Assets from '@/constants/assets.constant';
import TextField from '../components/Fields/TextField';
import { IconButton } from '@mui/material';
import useLoginController from './controller';


export default function Login() {
    const {
        onSubmit,
        handlePasswordChange,
        handleEmailChange,
        password,
        email,
        isPasswordValid,
        isEmailValid,
        isLoading,
        goToSignup,
        goBack,
    } = useLoginController();


    return (
        <>
            <div className='w-full min-h-[100vh] px-5 pt-7 pb-20 relative bg-white'>
                <div className="w-full flex justify-center items-center relative">
                    <div className="absolute left-0">
                        <IconButton onClick={goBack}>
                            <Image src={Assets.backIconBlack} alt="" width={10} height={10} />
                        </IconButton>
                    </div>
                    <p className="text-[#17181C] font-[600] text-[4.5vw]">Login</p>
                </div>
                <form className="mt-12 w-full h-auto space-y-10" onSubmit={onSubmit}>
                    <div>
                        <div className="space-y-5">
                            <TextField
                                id="email"
                                type="email"
                                label="Email address"
                                placeholder="Enter email"
                                value={email}
                                onInputChange={handleEmailChange}
                                require={false}
                                isPassword={false}
                                withBackground={false}
                                readOnly={false}
                            />
                            <TextField
                                id="password"
                                type="password"
                                label="Password"
                                placeholder="Password"
                                value={password}
                                onInputChange={handlePasswordChange}
                                require={true}
                                isPassword={true}
                                withBackground={false}
                                readOnly={false}
                            />

                        </div>
                        <p className="mt-3 text-[#B7B3BF] text-[3.5vw] font-[400] text-right">Don’t have an account? <span className="text-primaryColor cursor-pointer hover:underline underline-offset-4" onClick={goToSignup}>Sign Up</span></p>
                    </div>
                    <div>
                        <AppButton
                            type="submit"
                            content="Login"
                            isDisabled={!isEmailValid || !isPasswordValid}
                            isLoading={isLoading}
                            onClickButton={() => { }}
                            isRounded={true}
                        />
                    </div>
                </form>
            </div>
        </>
    )
}
