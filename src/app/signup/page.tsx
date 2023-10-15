"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { AppButton } from '../components/Buttons/Buttons';
import { AppModal } from '../components/Modals/Modals';
import Assets from '@/constants/assets.constant';
import TextField from '../components/Fields/TextField';
import useSignupController from './controller';
import { IconButton } from '@mui/material';


export default function Signup() {
    const {
        onSubmit,
        handlePasswordChange,
        handleConfirmPasswordChange,
        handleEmailChange,
        handleFirstNameChange,
        handleLastNameChange,
        firstName,
        lastName,
        password,
        confirmPassword,
        email,
        isPasswordValid,
        isConfirmPasswordValid,
        isEmailValid,
        isLoading,
        goToLogin,
        isFirstNameValid,
        isLastNameValid,
        openModal,
        setOpenModal,
        handleCloseModal,
        handleOpenModal,
        router,
        passwordValidation,
    } = useSignupController();



    return (
        <>
            <div className='w-full min-h-[100vh] px-5 pt-10 pb-20 relative'>
                <div className="w-full flex justify-center items-center relative">
                    <div className="absolute left-0">
                        <IconButton>
                            <Image src={Assets.backIconBlack} alt="" width={10} height={10} />
                        </IconButton>
                    </div>
                    <p className="text-[#17181C] font-[600] text-[4.5vw]">Create Account</p>
                </div>
                <form className="mt-12 w-full h-auto space-y-10" onSubmit={onSubmit}>
                    <div>
                        <div className="space-y-5">
                            <TextField
                                id="firstName"
                                type="text"
                                label="First Name"
                                placeholder="Enter first name"
                                value={firstName}
                                onInputChange={handleFirstNameChange}
                                require={false}
                                isPassword={false}
                                withBackground={false}
                                readOnly={false}
                            />
                            <TextField
                                id="lastName"
                                type="text"
                                label="Last Name"
                                placeholder="Enter last name"
                                value={lastName}
                                onInputChange={handleLastNameChange}
                                require={false}
                                isPassword={false}
                                withBackground={false}
                                readOnly={false}
                            />
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
                            <TextField
                                id="confirmPassword"
                                type="password"
                                label="Confirm Password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onInputChange={handleConfirmPasswordChange}
                                require={true}
                                isPassword={true}
                                withBackground={false}
                                readOnly={false}
                            />
                        </div>
                        <p className="mt-3 text-[#B7B3BF] text-[3.5vw] font-[400] text-right">Already have an account? <span className="text-primaryColor cursor-pointer hover:underline underline-offset-4" onClick={goToLogin}>Login</span></p>
                    </div>
                    <div>
                        <AppButton
                            type="submit"
                            content="Next"
                            isDisabled={!isFirstNameValid || !isLastNameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid || !passwordValidation}
                            isLoading={isLoading}
                            onClickButton={() => { }}
                            isRounded={true}
                        />
                    </div>
                </form>
            </div>

            {openModal && (
                <AppModal
                    header="Account creation successful!"
                    text="Your account has been created successfully. Check your email for login credentials."
                    buttonText="Proceed to Login"
                    onClick={() => { }}
                    onClose={handleCloseModal}
                />
            )}
        </>
    )
}
