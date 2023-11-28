"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { AppButton, AuthButton } from '../components/Buttons/Buttons';
import { AppModal } from '../components/Modals/Modals';
import { useRouter } from 'next/navigation';
import Assets from '@/constants/assets.constant';
import TextField from '../components/Fields/TextField';
import { IconButton } from '@mui/material';
import API from '@/constants/api.constant';
import { catchAsync } from '@/helpers/api.helper';
import useRequest from '@/services/request.service';
import DatePicker from 'react-date-picker';
import CustomCalendar from '../components/Calendar/Calendar';
import useGlobalState from '@/hooks/globalstate.hook';
import { profileUpdateAction } from '@/store/profile.slice';
import { useDispatch } from 'react-redux';
import toast from "react-hot-toast";


export default function PeriodInformation() {
    const { profile } = useGlobalState();
    const dispatch = useDispatch();
    const router = useRouter();
    const { isLoading, makeRequest } = useRequest();
    const [date, setDate] = useState<any>(new Date());
    const [selectRange, setSelectRange] = useState<any>(false);
    const [datePicker, setDatePicker] = useState<boolean>(false);
    const [openModal, setOpenModal] = useState<boolean>(false);

    // Format date
    const formattedDate = date.toLocaleDateString('en-GB')
        .split('/')
        .reverse()
        .join('-'); // Format as "YYYY-MM-DD"


    const [periodLength, setPeriodLength] = useState<number>(0);

    const handlePeriodLengthChange = (event: { target: { value: React.SetStateAction<number>; }; }) => {
        setPeriodLength(event.target.value);
    }


    const periodInfoData = {
        period_start: formattedDate,
    };

    const onSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        catchAsync(
            async () => {
                const res = await makeRequest({
                    method: "POST",
                    url: API.period,
                    data: periodInfoData,
                });

                const { message, data } = res.data;

                if (message === "Period logged successfully!") {
                    toast.success(message);
                    router.push("/dashboard");
                }
            },
            (err: any) => {
                console.log(err);
            }
        );
    };

    const goBack = () => {
        router.back();
    };


    return (
        <>
            <div className='w-full min-h-[100vh] px-5 pt-7 pb-20 relative bg-white'>
                <div className="w-full flex justify-center items-center relative">
                    <div className="absolute left-0">
                        <IconButton onClick={goBack}>
                            <Image src={Assets.backIconBlack} alt="" width={10} height={10} />
                        </IconButton>
                    </div>
                    <p className="text-[#17181C] font-[600] text-[4.5vw]">Log Period</p>
                </div>
                <form className="mt-12 w-full h-auto space-y-16" onSubmit={onSubmit}>
                    <div>
                        <div className="space-y-5">
                        <div className="w-full">
                                <label htmlFor='periodLog' className="block mb-2 text-[4vw] font-medium text-gray-900 dark:text-white w-full">Period Start Date</label>
                                <div className="relative">
                                    <input
                                        type='text'
                                        id='periodLog'
                                        value={formattedDate}
                                        onChange={() => { }}
                                        className={`border border-[#E3E4E8] text-gray-900 text-[4vw] rounded-[8px] outline-none w-full px-4 py-3`}
                                        placeholder='What day did your period start?'
                                    />

                                    <div className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer' onClick={() => setDatePicker(!datePicker)}>
                                        <IconButton>
                                            <Image src={Assets.calendar} alt="" width={20} height={20} />
                                        </IconButton>
                                    </div>
                                </div>
                            </div>

                            {/* Calendar */}
                            {datePicker && (
                                <CustomCalendar
                                    date={date}
                                    setDate={setDate}
                                    selectRange={selectRange}
                                    setSelectRange={setSelectRange}
                                    periodStartDate={undefined}
                                    periodEndDate={undefined}
                                    tileContent={undefined}
                                />
                            )}
                        </div>
                    </div>
                    <div>
                        <AppButton
                            type="submit"
                            content="Submit"
                            isDisabled={false}
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
