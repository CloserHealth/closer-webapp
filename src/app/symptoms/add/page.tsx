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

interface Chip {
    id: string;
    category: string;
    phase: string;
    name: string;
}

interface CategorizedSymptoms {
    [key: string]: {
        [key: string]: { id: string; name: string }[];
    };
}

type SelectedChip = {
    id: string;
    phase: string;
    name: string;
};

export default function AddSymptom() {
    const router = useRouter();
    const { isLoading, makeRequest } = useRequest();
    const [openModal, setOpenModal] = useState<boolean>(false);
    const { makeRequest: makeSymptomRequest, isLoading: isLoadingSymptom } = useRequest();
    const { makeRequest: makeUserSymptomRequest, isLoading: isLoadingUserSymptom } = useRequest();
    const [allSymptoms, setAllSymptoms] = useState<any[]>([]);
    const [periodPhase, setPeriodPhase] = useState<any>();
    const [selectedChips, setSelectedChips] = useState<SelectedChip[]>([]);
    const [selectedPhase, setSelectedPhase] = useState('');
    const [beforePeriodSymptoms, setBeforePeriodSymptoms] = useState<any>([]);
    const [duringPeriodSymptoms, setDuringPeriodSymptoms] = useState<any>([]);
    const [afterPeriodSymptoms, setAfterPeriodSymptoms] = useState<any>([]);
    const [beforePeriodId, setBeforePeriodId] = useState<string>('');
    const [duringPeriodId, setDuringPeriodId] = useState<string>('');
    const [afterPeriodId, setAfterPeriodId] = useState<string>('');

    const handleOpenModal = () => {
        setOpenModal(true);
    };
    const handleCloseModal = () => {
        setOpenModal(false);
    };


    const goBack = () => {
        router.back();
    };

    // Get Symptoms
    useEffect(() => {
        const fetchSymptoms = async () => {
            try {
                const res = await makeSymptomRequest({
                    url: API.symptomConfig + '?include=symptoms',
                    method: 'GET',
                });
                const { status, data } = res.data;
                setPeriodPhase(data?.configs);

                // Filter symptoms for each phase
                const beforePeriod = data.configs.find((phase: { slug: string; }) => phase.slug === 'before-period');
                const duringPeriod = data.configs.find((phase: { slug: string; }) => phase.slug === 'during-period');
                const afterPeriod = data.configs.find((phase: { slug: string; }) => phase.slug === 'after-period');

                // Set symptoms for each phase in the state variables
                if (beforePeriod) {
                    setBeforePeriodSymptoms(beforePeriod?.symptoms);
                    setBeforePeriodId(beforePeriod?.id);
                }
                if (duringPeriod) {
                    setDuringPeriodSymptoms(duringPeriod?.symptoms);
                    setDuringPeriodId(duringPeriod?.id);
                }
                if (afterPeriod) {
                    setAfterPeriodSymptoms(afterPeriod?.symptoms);
                    setAfterPeriodId(afterPeriod?.id);
                }
            } catch (e: any) {
                console.log(e);
            }
        };

        fetchSymptoms();
    }, []);




    useEffect(() => {
        const beforePeriodSymptom = selectedChips
          .filter((chip) => chip.phase === 'before-period')
          .map((chip) => ({ id: chip.id}));
      
        const duringPeriodSymptom = selectedChips
          .filter((chip) => chip.phase === 'during-period')
          .map((chip) => ({ id: chip.id}));
      
        const afterPeriodSymptom = selectedChips
          .filter((chip) => chip.phase === 'after-period')
          .map((chip) => ({ id: chip.id}));
      
        // Update state variables
        setBeforePeriodSymptoms(beforePeriodSymptom);
        setDuringPeriodSymptoms(duringPeriodSymptom);
        setAfterPeriodSymptoms(afterPeriodSymptom);
    
      }, [selectedChips]);



    // Function to handle chip selection
    const handleChipClick = (id: string, phase: string, name: string) => {
        const existingChip = selectedChips.find((chip) => chip.id === id && chip.phase === phase);

        if (existingChip) {
            setSelectedChips((prevSelected) =>
                prevSelected.filter((chip) => !(chip.id === id && chip.phase === phase))
            );
        } else {
            // Use the spread operator to create a new array with the updated chip
            setSelectedChips((prevSelected) => [
                ...prevSelected,
                { id, phase, name },
            ]);
        }
    };

    const handleSave = async () => {

        const payload = {
            name: 'Symptoms',
            image: '',
            symptoms: {
                [beforePeriodId]: beforePeriodSymptoms,
                [duringPeriodId]: duringPeriodSymptoms,
                [afterPeriodId]: afterPeriodSymptoms,
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
                    <p className="text-[#17181C] font-[600] text-[4.5vw]">Add symptoms</p>
                </div>
                <div className="mt-12 w-full h-auto space-y-14">
                    <p className="text-[#17181C] text-[4vw] font-[400]">What symptoms do you experience during the following phases?</p>

                    <div className="mt-5 space-y-10">
                        {periodPhase?.map((phase: any, i: any) => (
                            <div key={i}>
                                <div className="bg-[#F5F5F5] rounded-[5px] w-full flex justify-between items-center py-[7px] px-[10px]">
                                    <p className="text-[#1E1E1E] font-[700] text-[3vw]">{phase?.name}</p>
                                    <p className="text-primaryColor font-[500] text-[3vw]">Select 1 or more</p>
                                </div>
                                {/* chip */}
                                <div className="w-full h-auto grid grid-cols-2 gap-x-7 gap-y-5 mt-5 px-7">
                                    {phase?.symptoms?.map((item: any, index: React.Key | null | undefined) => (
                                        <Chip
                                            key={index}
                                            label={item?.name}
                                            onClick={() => handleChipClick(item?.id, phase?.slug, item?.name)}
                                            sx={{
                                                border: selectedChips.some(
                                                    (chip) => chip.id === item?.id && chip.phase === phase?.slug
                                                )
                                                    ? '2px solid #FF00FF'
                                                    : '2px solid transparent',
                                            }}
                                        />

                                    ))}
                                </div>
                            </div>
                        ))}

                        {/* <SymptomsCategory phase="During Period" experience={allSymptoms} setSelectedChips={setSelectedChips} selectedChips={selectedChips} setSelectedPhase={setSelectedPhase} />
                        <SymptomsCategory phase="After Period" experience={allSymptoms} setSelectedChips={setSelectedChips} selectedChips={selectedChips} setSelectedPhase={setSelectedPhase} /> */}
                    </div>

                    <div>
                        <AppButton
                            type="button"
                            content="Save"
                            isDisabled={false}
                            isLoading={isLoadingUserSymptom}
                            onClickButton={handleSave}
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
                    onClick={() => router.push('/symptoms')}
                    onClose={() => { }}
                />
            )}
        </>
    )
}
