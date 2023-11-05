"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Assets from '@/constants/assets.constant';
import { Chip, IconButton } from '@mui/material';
import { AppButton } from '@/app/components/Buttons/Buttons';
import { AppModal } from '@/app/components/Modals/Modals';
import useRequest from '@/services/request.service';
import SymptomsCategory from '@/app/components/SymptomsCategory/SymptomsCategory';


export default function AddSymptom() {
    const router = useRouter();
    const { isLoading, makeRequest } = useRequest();
    const [openModal, setOpenModal] = useState<boolean>(false);



    const handleOpenModal = () => {
        setOpenModal(true);
    }
    const handleCloseModal = () => {
        setOpenModal(false);
    }

    const goBack = () => {
        router.back();
    };


    const handleClick = () => {
        console.info('You clicked the Chip.');
    };

    const handleDelete = () => {
        console.info('You clicked the delete icon.');
    };

    const experienceBeforePeriod = [
        {
            label: 'Headache',
        },
        {
            label: 'Bloating',
        },
         {
            label: 'Weakness',
        },
         {
            label: 'Nausea',
        },
         {
            label: 'Dizziness',
        },
         {
            label: 'Other',
        },
    ];

    const experienceDuringPeriod = [
        {
            label: 'Headache',
        },
        {
            label: 'Bloating',
        },
         {
            label: 'Weakness',
        },
         {
            label: 'Nausea',
        },
         {
            label: 'Dizziness',
        },
         {
            label: 'Other',
        },
    ];

    const experienceAfterPeriod = [
        {
            label: 'Headache',
        },
        {
            label: 'Bloating',
        },
         {
            label: 'Weakness',
        },
         {
            label: 'Nausea',
        },
         {
            label: 'Dizziness',
        },
         {
            label: 'Other',
        },
    ];


    return (
        <>
            <div className='w-full min-h-[100vh] px-5 pt-7 pb-20 relative bg-white'>
                <div className="w-full flex justify-center items-center relative">
                    <div className="absolute left-0">
                        <IconButton onClick={goBack}>
                            <Image src={Assets.backIconBlack} alt="" width={10} height={10} />
                        </IconButton>
                    </div>
                    <p className="text-[#17181C] font-[600] text-[4.5vw]">Add symptoms</p>
                </div>
                <div className="mt-12 w-full h-auto space-y-14">
                    <p className="text-[#17181C] text-[4vw] font-[400]">What symptoms do you experience during the following phases?</p>

                    <div className="mt-5 space-y-10">
                        <SymptomsCategory phase="Before Period" experience={experienceBeforePeriod} />
                        <SymptomsCategory phase="During Period" experience={experienceDuringPeriod} />
                        <SymptomsCategory phase="After Period" experience={experienceAfterPeriod} />
                    </div>

                    <div>
                        <AppButton
                            type="button"
                            content="Save"
                            isDisabled={false}
                            isLoading={false}
                            onClickButton={() => { }}
                            isRounded={true}
                        />
                    </div>
                </div>
            </div>

            {openModal && (
                <AppModal
                    header="Symptom Added successful!"
                    text="Your symptom has been added successfully."
                    buttonText="Continue"
                    onClick={() => { }}
                    onClose={handleCloseModal}
                />
            )}
        </>
    )
}
