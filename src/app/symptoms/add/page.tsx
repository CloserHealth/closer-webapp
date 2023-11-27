"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Assets from '@/constants/assets.constant';
import { Chip, IconButton } from '@mui/material';
import { AppButton } from '@/app/components/Buttons/Buttons';
import { AppModal } from '@/app/components/Modals/Modals';
import useRequest from '@/services/request.service';
import SymptomsCategory from '@/app/components/SymptomsCategory/SymptomsCategory';
import API from '@/constants/api.constant';


export default function AddSymptom() {
    const router = useRouter();
    const { isLoading, makeRequest } = useRequest();
    const [openModal, setOpenModal] = useState<boolean>(false);
    const { makeRequest: makeSymptomRequest, isLoading: isLoadingSymptom } = useRequest();
    const { makeRequest: makeUserSymptomRequest, isLoading: isLoadingUserSymptom } = useRequest();
    const [allSymptoms, setAllSymptoms] = useState<any[]>([]);
    const [selectedChips, setSelectedChips] = useState<{ id: string; category: string; phase: string }[]>([]);
    const [selectedPhase, setSelectedPhase] = useState<string>('');


    const goBack = () => {
        router.back();
    };

    // Get Symptoms
    useEffect(() => {
        const fetchSymptoms = async () => {
            try {
                const res = await makeSymptomRequest({
                    url: API.symptom + '?include=tips',
                    method: 'GET',
                });
                const { status, data } = res.data;
                setAllSymptoms(data?.symptoms);
            } catch (e: any) {
                console.log(e);
            }
        };

        fetchSymptoms();
    }, []);


    const handleSaveToLocalStorage = () => {
        const beforePeriodSymptoms = selectedChips
            .filter((chip) => chip.category === 'Before Period')
            .map((chip) => chip.id);
        const duringPeriodSymptoms = selectedChips
            .filter((chip) => chip.category === 'During Period')
            .map((chip) => chip.id);
        const afterPeriodSymptoms = selectedChips
            .filter((chip) => chip.category === 'After Period')
            .map((chip) => chip.id);

        // Save data to localStorage
        localStorage.setItem('beforePeriodSymptoms', JSON.stringify(beforePeriodSymptoms));
        localStorage.setItem('duringPeriodSymptoms', JSON.stringify(duringPeriodSymptoms));
        localStorage.setItem('afterPeriodSymptoms', JSON.stringify(afterPeriodSymptoms));

        router.push('/symptoms/add/new');
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
                    <p className="text-[#17181C] font-[600] text-[4.5vw]">Add symptoms</p>
                </div>
                <div className="mt-12 w-full h-auto space-y-14">
                    <p className="text-[#17181C] text-[4vw] font-[400]">What symptoms do you experience during the following phases?</p>

                    <div className="mt-5 space-y-10">
                        <SymptomsCategory phase="Before Period" experience={allSymptoms} setSelectedChips={setSelectedChips} selectedChips={selectedChips} setSelectedPhase={setSelectedPhase} />
                        <SymptomsCategory phase="During Period" experience={allSymptoms} setSelectedChips={setSelectedChips} selectedChips={selectedChips} setSelectedPhase={setSelectedPhase} />
                        <SymptomsCategory phase="After Period" experience={allSymptoms} setSelectedChips={setSelectedChips} selectedChips={selectedChips} setSelectedPhase={setSelectedPhase} />
                    </div>

                    <div>
                        <AppButton
                            type="button"
                            content="Save"
                            isDisabled={false}
                            isLoading={false}
                            onClickButton={handleSaveToLocalStorage}
                            isRounded={true}
                        />

                    </div>
                </div>
            </div>
        </>
    )
}
