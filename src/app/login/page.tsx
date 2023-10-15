"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { AppButton, AuthButton } from '../components/Buttons/Buttons';
import { AppModal } from '../components/Modals/Modals';
import { useRouter } from 'next/navigation';
import Assets from '@/constants/assets.constant';
import TextField from '../components/Fields/TextField';
import { IconButton } from '@mui/material';


export default function Signup() {
    const router = useRouter();
    const [openModal, setOpenModal] = useState<boolean>(false);
    const handleOpenModal = () => {
        setOpenModal(true);
    }
    const handleCloseModal = () => {
        setOpenModal(false);
    }

    // Navigate to Signup
    const goToSignup = () => {
        router.push('/signup');
    }

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>("");

    const handleEmailChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: {
        target: { value: React.SetStateAction<string> };
    }) => {
        setPassword(event.target.value);
    };

    // Validation rules for the email and Password inputs
    const isEmailValid = email.length > 5 && email.includes('@');
    const isPasswordValid = password.length > 3;

    return (
        <>
            <div className='w-full min-h-[100vh] px-5 pt-10 pb-20 relative'>
                <div className="w-full flex justify-center items-center relative">
                    <div className="absolute left-0">
                        <IconButton>
                            <Image src={Assets.backIconBlack} alt="" width={10} height={10} />
                        </IconButton>
                    </div>
                    <p className="text-[#17181C] font-[600] text-[4.5vw]">Login</p>
                </div>
                <form className="mt-12 w-full h-auto space-y-10">
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
                            isLoading={false}
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
