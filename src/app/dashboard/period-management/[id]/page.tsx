"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Assets from '@/constants/assets.constant';
import { IconButton } from '@mui/material';
import { QuestionBaseModal, StatusModal } from '@/app/components/Modals/Modals';
import { useParams, useRouter } from 'next/navigation';
import { userData } from '@/utils/data/data';
import Back from '@/app/components/Back/Back';
import API from '@/constants/api.constant';
import toast from 'react-hot-toast';
import useRequest from '@/services/request.service';
import { firstLetter } from '@/utils/formatter/formatter';
import { OutlinedAppButton, AppButton } from '@/app/components/Buttons/Buttons';
import Tip from '@/app/components/Tip/Tip';
import { FadeIn } from '@/app/components/Transitions/Transitions';
import TextArea from '@/app/components/Fields/TextArea';

export default function User() {
    const { isLoading, makeRequest } = useRequest();
    const params = useParams();
    const id = params.id;
    const [phase, setPhase] = useState<any>();
    const [tips, setTips] = useState<string[]>([]);
    const [isModified, setIsModified] = useState<boolean>(false);


    const handleTipChange = (index: number, value: string) => {
        const updatedTips = [...tips];
        updatedTips[index] = value;

        console.log("Updated Tips:", updatedTips);
        setTips(updatedTips);
        setIsModified(true);
    };



    // Fetch User management card Data
    const handleFetch = async () => {
        try {
            const res = await makeRequest({
                method: "GET",
                url: `${API.periodPhases}/${id}`,
            });

            const { message, data } = res.data;

            if (message === "Data fetched successfully!") {
                // Check if 'data' exists and it has 'users' property as an array
                if (data) {
                    setPhase(data?.phase);
                    setTips(data.phase.tips); // Initialize the tips state with API tips
                } else {
                    console.log("Invalid or missing 'users' data in the API response.");
                }
            }
        } catch (err) {
            console.log("Error fetching users:", err);
        }
    };

    useEffect(() => {
        handleFetch();
    }, []);



    const handleUpdatePhase = async (phaseId: any) => {
        console.log("Inside handleUpdatePhase");
        try {
            console.log("Tips sent to server:", tips);
            const res = await makeRequest({
                method: "POST",
                url: `${API.periodPhases}/${phaseId}`,
                data: {
                    name: phase?.name,
                    tips: tips,
                },
            });

            const { message, data } = res.data;

            console.log("Data sent to server:", data);
            console.log("Response:", res.data);

            if (message === "Phase updated successfully!") {
                if (data) {
                    // Handle success, e.g., show a success message or update local data
                    toast.success("Phase updated successfully!");
                    handleFetch();
                    setIsModified(false); // Reset isModified state to false
                } else {
                    console.log("Invalid or missing 'phase' data in the API response.");
                }
            }
        } catch (err) {
            console.log("Error updating phase:", err);
        }
    };




    return (
        <div className="rounded-[10px] border border-white h-auto w-full p-5"
            style={{ background: "rgba(255, 255, 255, 0.72)" }}
        >
            <div className="flex items-center justify-between">
                <h1 className="text-[#253B51] text-[1.5vw] font-[600]">{phase?.name}</h1>
                {/* <FadeIn fullWidth={false}>
                        <div className="flex items-center space-x-3">
                            <OutlinedAppButton content="Cancel" isRounded={false} onClickButton={() => setIsModified(false)} />
                            <AppButton content="Save" isRounded={false} onClickButton={handleUpdatePhase} />
                        </div>
                    </FadeIn> */}

                <div>
                    <AppButton content="Add New Tip" isRounded={false} onClickButton={() => { }} isLoading={undefined} />
                </div>

            </div>

            <div className="grid grid-cols-1 gap-[24px] mt-7 mb-20">
                {phase?.tips.map((tip: string, index: number) => (
                    <Tip
                        key={index}
                        header={`Tip ${index + 1}`}
                        value={tips[index] || tip}
                        onChangeTip={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                            handleTipChange(index, event.target.value)
                        }
                    />
                ))}
            </div>



            <div className="mb-10 mt-7 flex justify-center items-center mx-auto">
                <AppButton content="Save" isRounded={false} onClickButton={() => handleUpdatePhase(phase?.id)} isLoading={isLoading} />
            </div>


            <Back />
        </div>
    )
}
