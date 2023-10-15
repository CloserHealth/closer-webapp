"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { AppButton, AuthButton } from '../components/Buttons/Buttons';
import { AppModal } from '../components/Modals/Modals';
import { useRouter } from 'next/navigation';
import Assets from '@/constants/assets.constant';
import TextField from '../components/Fields/TextField';
import error from 'next/error';
import OtpInputField from '../components/Fields/OtpInputField';
import { ShakeWhenError } from '../components/Transitions/Transitions';
import useCountdown from '@/hooks/countdown.hook';
import API from '@/constants/api.constant';
import useGlobalState from '@/hooks/globalstate.hook';
import useRequest from '@/services/request.service';
import { profileLoginAction } from '@/store/profile.slice';
import { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { IconButton } from '@mui/material';


export default function Vefification() {
    const router = useRouter();
    const { profile } = useGlobalState();
    const [code, setCode] = useState('');
    const [error, setError] = useState<any>();
    const [timeouts, setTimeouts] = useState<any>(null);
    const dispatch = useDispatch();
    const { makeRequest: makeVerifyEmailRequest, isLoading, data } = useRequest();
    const { makeRequest: makeRequestVerificationEmailRequest, isLoading: isFetchingRequestEmail } = useRequest();

    const [duration, setDuration] = useState(600);
    const [countdown, isDone, restartTimer] = useCountdown(duration);

    const handleTimerRestart = () => {
        restartTimer(duration);
    };


    const handleCodeChange = (value: string) => {
        setCode(value);
        error && setError('');
    };

    useEffect(() => {
        return () => timeouts && clearTimeout(timeouts);
    }, [timeouts]);

    const next = () => {
        const t = setTimeout(() => {
            router.push('/period-information');
        }, 3000);
        setTimeouts(t);
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (code.length !== 4) return setError('make sure the code is complete!');

        const formData: any = {
            token: code,
        };

        makeVerifyEmailRequest({
            url: API.verify,
            method: 'POST',
            data: formData,
        })
            .then((res) => {
                const { data } = res.data;
                // dispatch(
                //     profileLoginAction({
                //         isVerified: true,
                //         accessToken: data?.access,
                //         refreshToken: data?.refresh,
                //     })
                // );

                router.push('/period-information');
            })
            .catch((error: AxiosError) => {
                const res = error.response;
                const status = res?.status;
                const data: any = res?.data;

                if (status === 406) {
                    setError(data.message);
                } else if (status === 400) {
                    setError(data.message);
                } else {
                    setError('Something went wrong! Pls try again!');
                }
            });
    };

    const resendVerificationEmail = () => {
        makeRequestVerificationEmailRequest({
            url: API.resendToken,
            method: 'POST',
            data: {
                email: profile?.data?.user?.email,
            },
        })
            .then(({ data: res }) => {
                const data = res.data;

                data?.code && setCode(`${data?.code}`);
                handleTimerRestart();

                toast.success('Successfully resent code!');
            })
            .catch((e) => {
                setError("Could'nt resend code!, Pls try again");
            });
    };

    const IDisabled = code.length < 4;


    return (
        <>
            <div className='w-full min-h-[100vh] px-5 pt-7 pb-20 relative bg-white'>
                <div className="w-full flex justify-center items-center relative">
                    <div className="absolute left-0">
                        <IconButton>
                            <Image src={Assets.backIconBlack} alt="" width={10} height={10} />
                        </IconButton>
                    </div>
                    <p className="text-[#17181C] font-[600] text-[4.5vw]">OTP Verification</p>
                </div>
                <p className='text-[#17181C] text-[3.5vw] text-center font-[400] mt-10 px-10'>Please input the OTP code sent to your email address</p>
                <form className="mt-12 w-full h-auto space-y-28" onSubmit={handleSubmit}>
                    <div className="flex flex-col items-center">
                        <div>
                            <ShakeWhenError error={error} className="w-full mb-[32px]">
                                <OtpInputField onChange={handleCodeChange} error={error} value={code} />
                            </ShakeWhenError>
                        </div>
                        <span className="text-[#17181C] text-[3.5vw] font-[400]">
                            Didn’t receive code? <span className="text-[#747A8B]" onClick={resendVerificationEmail}> Resend in {countdown}</span>
                        </span>
                    </div>
                    <div>
                        <AppButton
                            type="submit"
                            content="Next"
                            isDisabled={IDisabled}
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
