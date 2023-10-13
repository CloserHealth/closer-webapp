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

export default function User() {
    const { isLoading, makeRequest } = useRequest();
    const params = useParams();
    const id = params.id;

    const [disableModal, setDisableModal] = useState<boolean>(false);
    const [statusModal, setStatusModal] = useState<boolean>(false);
    const [user, setUser] = useState<any>();
    const [periodLogs, setPeriodLogs] = useState<[]>([]);

    // Fetch User management card Data
    const handleFetch = async () => {
        try {
            const res = await makeRequest({
                method: "GET",
                url: `${API.users}/${id}?include=periodLogs`,
            });

            const { message, data } = res.data;

            if (message === "Data fetched successfully!") {
                // Check if 'data' exists and it has 'users' property as an array
                if (data) {
                    setUser(data?.user);
                    setPeriodLogs(data?.user?.periodLogs);
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


    // Handle the case when user data is not found
    if (!user) {
        return (
            <div className="w-full h-[700vh] flex justify-center items-center text-primaryColor">
                <h1>Loading...</h1>
            </div>
        );
    }

    const firstNameFirstLetter = user.firstname.charAt(0).toUpperCase();
    const lastNameFirstLetter = user.lastname.split(" ")[0].charAt(0).toUpperCase();


    // Step 3: Concatenate the first letters to form the result
    const result = firstNameFirstLetter + lastNameFirstLetter;

    const handleDisableModalOpen = () => {
        setDisableModal(true);
    };

    const handleDisableModalClose = () => {
        setDisableModal(false);
    };

    // Status Function
    const handleStatusModalOpen = () => {
        handleDisableModalClose();
        setStatusModal(true);
    };

    const handleStatusModalClose = () => {
        setStatusModal(false);
    };

    // Format date
    const originalDateStr = user.created_at;

    const originalDate = new Date(originalDateStr);
    const formattedDate = `${originalDate.getDate()}/${originalDate.getMonth() + 1}/${originalDate
        .getFullYear()
        .toString()
        .slice(-2)}`;



    return (
        <>
            {isLoading ? (
                <div className="w-full h-[700vh] flex justify-center items-center">
                    <h1>Loading...</h1>
                </div>
            ) : (
                <div>
                    <div className="border border-[#E5EBF0] rounded-[12px] w-full h-auto p-4 bg-[#fff] flex items-center space-x-7">
                        <div className="rounded-full w-[120px] h-[120px] border border-[#E5EBF0] flex justify-center items-center">
                            <h1 className="uppercase text-primaryColor text-[2.2vw] font-[600]">{result}</h1>
                        </div>
                        <div className='space-y-2'>
                            <p className="text-[#333346] font-[600] text-[1.2vw]">{user.firstname + ' ' + user.lastname}</p>
                            <div className="flex items-center space-x-2">
                                <div
                                    className={`w-[5px] h-[5px] rounded-full
                                            ${user.status === "active" ? 'bg-primaryColor' :
                                            user.status === 'inactive' ? 'bg-[#F3282B]' :
                                                'bg-[#FFA800]'}`}></div>
                                <p className={`font-[400] text-[1.1vw] flex items-center space-x-1.5
                                            ${user.status === "active" ? 'text-primaryColor' :
                                        user.status === 'inactive' ? 'text-[#F3282B]' :
                                            'text-[#FFA800]'}`}>{firstLetter(user.status)}</p>
                            </div>
                        </div>
                    </div>

                    <div className="h-auto w-full rounded-[10px] border border-[#fff] mt-7 pt-7 px-7 pb-14"
                        style={{ background: "rgba(255, 255, 255, 0.72)" }}
                    >
                        <div className="flex justify-between items-center w-full">
                            <h1 className="text-[#212429] text-[1.5vw] font-[600]">User Information</h1>
                            <Back />
                        </div>

                        <div className="flex justify-between items-center mt-10">
                            <div className="rounded-full w-[75px] h-[75px] border border-[#E5EBF0] bg-[#fff] flex justify-center items-center">
                                <h1 className="uppercase text-primaryColor text-[1.5vw] font-[600]">{result}</h1>
                            </div>
                            <button onClick={handleDisableModalOpen} className="w-[232px] rounded-[5px] border border-[#DFE3EB] bg-[#FAFAFB] text-[1vw] py-3 flex items-center space-x-3 px-7">
                                <Image src={Assets.disable} alt="" width={15} height={15} />
                                <span className="text-[1vw] font-[600] text-[#989CA0]">Disable user</span>
                            </button>
                        </div>

                        <div className="w-full h-[auto] mt-14 grid grid-cols-3 gap-x-32 gap-y-10">
                            <div className="space-y-1">
                                <p className="text-[#212429] text-[1vw] font-[600]">Name</p>
                                <p className="text-[#121F3E] text-[0.9vw] font-[400]">{user.firstname + ' ' + user.lastname}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[#212429] text-[1vw] font-[600]">Country</p>
                                <p className="text-[#121F3E] text-[0.9vw] font-[400]">- - - - -</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[#212429] text-[1vw] font-[600]">Email</p>
                                <p className="text-[#121F3E] text-[0.9vw] font-[400]">{user.email}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[#212429] text-[1vw] font-[600]">Phone no</p>
                                <p className="text-[#121F3E] text-[0.9vw] font-[400]">{user.phone === null ? "- - - - -" : user.phone}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[#212429] text-[1vw] font-[600]">Date</p>
                                <p className="text-[#121F3E] text-[0.9vw] font-[400]">{formattedDate}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[#212429] text-[1vw] font-[600]">Point</p>
                                <p className="text-[#121F3E] text-[0.9vw] font-[400]">{user.streak}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[#212429] text-[1vw] font-[600]">Rings</p>
                                <p className="text-[#121F3E] text-[0.9vw] font-[400]">- - - - -</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[#212429] text-[1vw] font-[600]">Cycle Phase</p>
                                <p className="text-[#121F3E] text-[0.9vw] font-[400]">- - - - -</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[#212429] text-[1vw] font-[600]">Cycle Length</p>
                                <p className="text-[#121F3E] text-[0.9vw] font-[400]">- - - - -</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[#212429] text-[1vw] font-[600]">Period Experience</p>
                                <p className="text-[#121F3E] text-[0.9vw] font-[400]">- - - - -</p>
                            </div>
                        </div>
                    </div>


                    {/* Modal */}
                    {disableModal && (
                        <QuestionBaseModal
                            text="Are you sure you want to disable this user? "
                            buttonText="Disable"
                            buttonTextClose="Close"
                            onClick={handleStatusModalOpen}
                            onClose={handleDisableModalClose}
                        />
                    )}

                    {/* Status Modal */}
                    {statusModal && (
                        <StatusModal
                            icon={Assets.success}
                            text="User disabled Successfully"
                            header="Successful"
                            onClose={handleStatusModalClose}
                        />
                    )}
                </div>
            )}
        </>
    )
}
