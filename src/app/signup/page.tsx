"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Assets from '../../constants/assets.constant';
import TextField from '../components/Fields/TextField';
import { AuthButton } from '../components/Buttons/Buttons';
import { AppModal } from '../components/Modals/Modals';
import { useRouter } from 'next/navigation';

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

    const handleNameChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setEmail(event.target.value);
    };

    // Validation rules for the name and email inputs
    const isNameValid = name.length > 3;
    const isEmailValid = email.length > 5 && email.includes('@');

    return (
        <>
            <div className='w-full min-h-[100vh] px-28 py-16 flex flex-col justify-center relative'>
                <Image src={Assets.closerLogo} alt="" width={200} height={100} />
                <div className="mt-7 w-full h-[600px] border border-[#CDCDCD] rounded-[5px] flex space-x-32">
                    <div className="w-full h-full p-16">
                        <div>
                            <h1 className="text-[#272037] font-[700] text-[2.5vw]">Sign Up</h1>
                            <p className="text-[1.1vw] text-[#1e1e1e] font-[400]">Please enter your details to get started</p>
                        </div>
                        <form className="mt-10 w-full h-auto space-y-16">
                            <div>
                                <div className="space-y-5">
                                    <TextField
                                        id="name"
                                        type="text"
                                        label="Name"
                                        placeholder="Full Name"
                                        value={name}
                                        onInputChange={handleNameChange}
                                        require={false}
                                        isPassword={false}
                                        withBackground={true}
                                        readOnly={false}
                                    />
                                    <TextField
                                        id="email"
                                        type="email"
                                        label="Email address"
                                        placeholder="Enter your email"
                                        value={email}
                                        onInputChange={handleEmailChange}
                                        require={false}
                                        isPassword={false}
                                        withBackground={true}
                                        readOnly={false}
                                    />
                                </div>
                                <p className="mt-3 text-[#B7B3BF] text-[0.9vw] font-[400] text-right">Already have an account? <span className="text-primaryColor cursor-pointer hover:underline underline-offset-4" onClick={goToLogin}>Login</span></p>
                            </div>
                            <div>
                                <AuthButton type="submit" content="Next" isDisabled={!isNameValid || !isEmailValid} isLoading />
                            </div>
                        </form>
                    </div>
                    <div className="w-full h-full">
                        <Image
                            src={Assets.authImage}
                            alt=""
                            width={1000}
                            height={1000}
                            style={{ objectFit: "cover", width: "100%", height: "100%", borderRadius: "0px 5px 5px 0px" }}
                        />
                    </div>
                    <div className="absolute right-0 bottom-0 -z-10">
                        <Image
                            src={Assets.pattern}
                            alt=""
                            width={165}
                            height={165}
                        />
                    </div>
                </div>
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
