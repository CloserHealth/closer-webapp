"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { AppButton, AuthButton } from '../components/Buttons/Buttons';
import { AppModal } from '../components/Modals/Modals';
import { useRouter } from 'next/navigation';
import Assets from '@/constants/assets.constant';
import TextField from '../components/Fields/TextField';


export default function Signup() {
    const router = useRouter();
    const [openModal, setOpenModal] = useState<boolean>(false);
    const handleOpenModal = () => {
        setOpenModal(true);
    }
    const handleCloseModal = () => {
        setOpenModal(false);
    }

    // Navigate to Login
    const goToLogin = () => {
        router.push('/login');
    }

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>("");

    const handleNameChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: {
        target: { value: React.SetStateAction<string> };
    }) => {
        setPassword(event.target.value);
    };

    // Validation rules for the name, email and Password inputs
    const isNameValid = name.length > 3;
    const isEmailValid = email.length > 5 && email.includes('@');
    const isPasswordValid = password.length > 3;

    return (
        <>
            <div className='w-full min-h-[100vh] px-5 pt-10 pb-20 relative'>
                <div className="w-full flex justify-center items-center relative">
                    <div className="absolute left-0">
                        <Image src={Assets.backIconBlack} alt="" width={12} height={12} />
                    </div>
                    <p className="text-[#17181C] font-[600] text-[4.5vw]">Create Account</p>
                </div>
                <form className="mt-12 w-full h-auto space-y-10">
                    <div>
                        <div className="space-y-5">
                            <TextField
                                id="firstName"
                                type="text"
                                label="First Name"
                                placeholder="Enter first name"
                                value={name}
                                onInputChange={handleNameChange}
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
                                value={name}
                                onInputChange={handleNameChange}
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
                                value={password}
                                onInputChange={handlePasswordChange}
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
                        isDisabled={!isNameValid || !isEmailValid || !isPasswordValid} 
                        isLoading={false}
                        onClickButton={() => {}}
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
