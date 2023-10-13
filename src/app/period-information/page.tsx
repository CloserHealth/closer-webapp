"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { AppButton, AuthButton } from '../components/Buttons/Buttons';
import { AppModal } from '../components/Modals/Modals';
import { useRouter } from 'next/navigation';
import Assets from '@/constants/assets.constant';
import TextField from '../components/Fields/TextField';


export default function PeriodInformation() {
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
                    <p className="text-[#17181C] font-[600] text-[4.5vw]">Period Information</p>
                </div>
                <form className="mt-12 w-full h-auto space-y-16">
                    <div>
                        <div className="space-y-5">
                            <TextField
                                id="firstName"
                                type="text"
                                label="Period Length"
                                placeholder="Enter period length (Days)"
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
                                label="Last Period"
                                placeholder="Select last period"
                                value={name}
                                onInputChange={handleNameChange}
                                require={false}
                                isPassword={false}
                                withBackground={false}
                                readOnly={false}
                            />
                    </div>
                    </div>
                    <div>
                        <AppButton 
                        type="submit" 
                        content="Submit" 
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
