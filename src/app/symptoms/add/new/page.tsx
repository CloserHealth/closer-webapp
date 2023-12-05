"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Assets from '@/constants/assets.constant';
import { IconButton, MenuItem, Select } from '@mui/material';
import { AppButton } from '@/app/components/Buttons/Buttons';
import CustomCalendar from '@/app/components/Calendar/Calendar';
import { formattedDate } from '@/helpers/date.helper';
import { date } from 'yup';
import { AppModal } from '@/app/components/Modals/Modals';
import useRequest from '@/services/request.service';
import TextField from '@/app/components/Fields/TextField';
import API from '@/constants/api.constant';


export default function NewSymptom() {
    const router = useRouter();
    const [openModal, setOpenModal] = useState<boolean>(false);
    const { makeRequest: makeUserSymptomRequest, isLoading: isLoadingUserSymptom } = useRequest();
    const [beforePeriodSymptoms, setBeforePeriodSymptoms] = useState([]);
    const [duringPeriodSymptoms, setDuringPeriodSymptoms] = useState([]);
    const [afterPeriodSymptoms, setAfterPeriodSymptoms] = useState([]);
    const [name, setName] = useState<string>('');


    const handleOpenModal = () => {
        setOpenModal(true);
    }
    const handleCloseModal = () => {
        setOpenModal(false);
    }

    const goBack = () => {
        router.back();
    };


    const handleNameChange = (event: {
        target: { value: React.SetStateAction<string> };
    }) => {
        setName(event.target.value);
    };




    useEffect(() => {
        // Retrieve data from localStorage on component mount
        const beforePeriodSymptomsFromStorage = JSON.parse(localStorage.getItem('beforePeriodSymptoms') || '[]');
        const duringPeriodSymptomsFromStorage = JSON.parse(localStorage.getItem('duringPeriodSymptoms') || '[]');
        const afterPeriodSymptomsFromStorage = JSON.parse(localStorage.getItem('afterPeriodSymptoms') || '[]');

        // Update state with the retrieved data
        setBeforePeriodSymptoms(beforePeriodSymptomsFromStorage);
        setDuringPeriodSymptoms(duringPeriodSymptomsFromStorage);
        setAfterPeriodSymptoms(afterPeriodSymptomsFromStorage);
    }, []);

    const handleSave = async () => {
        // Prepare the POST request payload using the state variables
        const payload = {
            name,
            image: 'https://images.pexels.com/photos/18740580/pexels-photo-18740580/free-photo-of-two-women-talking-and-laughing-against-an-orange-background.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            symptoms: {
                before_period: beforePeriodSymptoms,
                during_period: duringPeriodSymptoms,
                after_period: afterPeriodSymptoms,
            },
        };

        try {
            const res = await makeUserSymptomRequest({
                url: API.userSymptom,
                method: 'POST',
                data: payload,
            });

            const { status, data }: any = res.data;
            handleOpenModal();
            // Clear localStorage after successful save
            localStorage.removeItem('beforePeriodSymptoms');
            localStorage.removeItem('duringPeriodSymptoms');
            localStorage.removeItem('afterPeriodSymptoms');
        } catch (e) {
            console.log(e);
        }
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
                    <p className="text-[#17181C] font-[600] text-[4.5vw]">Add new symptom</p>
                </div>
                <form className="mt-12 w-full h-auto space-y-14" onSubmit={() => { }}>

                    <div className="space-y-5">
                        <div className="w-full">
                            <label htmlFor='symptomName' className="block mb-2 text-[4vw] font-medium text-gray-900 dark:text-white w-full">Symptom Name</label>
                            <div className="relative">
                                <input
                                    type='text'
                                    id='task'
                                    value={name}
                                    onChange={handleNameChange}
                                    className={`border border-[#E3E4E8] text-gray-900 text-[4vw] rounded-[8px] outline-none w-full px-4 py-3`}
                                    placeholder='Enter symptom'
                                />
                            </div>
                        </div>

                        <div className="w-full">
                            <label htmlFor='symptomImage' className="block mb-2 text-[4vw] font-medium text-gray-900 dark:text-white w-full">Image (Optional)</label>
                            <div className="w-full rounded-[8px] border border-[#E3E4E8] h-[104px] flex flex-col items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                    <path d="M15.9994 23.3333C17.666 23.3333 19.0829 22.7498 20.25 21.5827C21.4171 20.4156 22.0002 18.9991 21.9994 17.3333C21.9994 15.6667 21.4158 14.2498 20.2487 13.0827C19.0816 11.9156 17.6651 11.3324 15.9994 11.3333C14.3327 11.3333 12.9158 11.9169 11.7487 13.084C10.5816 14.2511 9.99846 15.6676 9.99935 17.3333C9.99935 19 10.5829 20.4169 11.75 21.584C12.9171 22.7511 14.3336 23.3342 15.9994 23.3333ZM15.9994 20.6667C15.066 20.6667 14.2771 20.3444 13.6327 19.7C12.9882 19.0556 12.666 18.2667 12.666 17.3333C12.666 16.4 12.9882 15.6111 13.6327 14.9667C14.2771 14.3222 15.066 14 15.9994 14C16.9327 14 17.7216 14.3222 18.366 14.9667C19.0105 15.6111 19.3327 16.4 19.3327 17.3333C19.3327 18.2667 19.0105 19.0556 18.366 19.7C17.7216 20.3444 16.9327 20.6667 15.9994 20.6667ZM5.33268 28C4.59935 28 3.97135 27.7387 3.44868 27.216C2.92602 26.6933 2.66513 26.0658 2.66602 25.3333V9.33333C2.66602 8.6 2.92735 7.972 3.45002 7.44933C3.97268 6.92667 4.60024 6.66578 5.33268 6.66667H9.53269L11.9994 4H19.9994L22.466 6.66667H26.666C27.3994 6.66667 28.0274 6.928 28.55 7.45067C29.0727 7.97333 29.3336 8.60089 29.3327 9.33333V25.3333C29.3327 26.0667 29.0714 26.6947 28.5487 27.2173C28.026 27.74 27.3985 28.0009 26.666 28H5.33268ZM26.666 25.3333V9.33333H21.266L18.8327 6.66667H13.166L10.7327 9.33333H5.33268V25.3333H26.666Z" fill="#979999" />
                                </svg>
                                <p className="text-[#979999] text-[14px] font-[400]">Upload Image</p>
                            </div>
                        </div>

                    </div>

                    <div>
                        <AppButton
                            type="button"
                            content="Next"
                            isDisabled={false}
                            isLoading={isLoadingUserSymptom}
                            onClickButton={handleSave}
                            isRounded={true}
                        />

                    </div>
                </form>
            </div>

            {openModal && (
                <AppModal
                    header="Symptom Added successful!"
                    text="Your symptom has been added successfully."
                    buttonText="Continue"
                    onClick={() => router.push('/symptoms')}
                    onClose={() => {}}
                />
            )}
        </>
    )
}
