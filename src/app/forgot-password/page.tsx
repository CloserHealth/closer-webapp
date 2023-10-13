"use client"
import React, {useState} from 'react';
import Image from 'next/image';
import Assets from '../../constants/assets.constant';
import TextField from '../components/Fields/TextField';
import { AuthButton } from '../components/Buttons/Buttons';

export default function ForgotPassword() {
    const [password, setPassword] = useState<string>('');

    const handlePasswordChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setPassword(event.target.value);
    };

    // Validation rules for the password inputs
    const isPasswordValid = password.length > 3;

    return (
        <div className='w-full min-h-[100vh] px-28 py-16 flex flex-col justify-center relative'>
            <Image src={Assets.closerLogo} alt="" width={200} height={100} />
            <div className="mt-7 w-full h-[600px] border border-[#CDCDCD] rounded-[5px] flex space-x-32">
                <div className="w-full h-full p-16">
                    <div>
                        <h1 className="text-[#272037] font-[700] text-[2.5vw]">Forgot Password</h1>
                        <p className="text-[1.1vw] text-[#1e1e1e] font-[400]">Enter your user account&apos;s verified email address and we will send you a default password.</p>
                    </div>
                    <form className="mt-10 w-full h-auto space-y-16">
                        <div>
                            <TextField
                                id="email"
                                type="email"
                                label="Email address"
                                placeholder="Enter your email"
                                value=""
                                onInputChange={() => { }}
                                require={true}
                                isPassword={false}
                                withBackground={true}
                                readOnly={false}
                            />
                        </div>
                        <div>
                            <AuthButton type="submit" content="Submit" isDisabled={!isPasswordValid} isLoading={''} />
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
    )
}
