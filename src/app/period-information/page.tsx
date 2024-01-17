"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { AppButton, AuthButton } from '../components/Buttons/Buttons';
import { AppModal } from '../components/Modals/Modals';
import { useRouter } from 'next/navigation';
import Assets from '@/constants/assets.constant';
import TextField from '../components/Fields/TextField';
import { ClickAwayListener, IconButton, Tooltip } from '@mui/material';
import API from '@/constants/api.constant';
import { catchAsync } from '@/helpers/api.helper';
import useRequest from '@/services/request.service';
import DatePicker from 'react-date-picker';
import CustomCalendar from '../components/Calendar/Calendar';
import useGlobalState from '@/hooks/globalstate.hook';
import { profileUpdateAction } from '@/store/profile.slice';
import { useDispatch } from 'react-redux';
import { GrCircleInformation } from "react-icons/gr";



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


    const handleOpenModal = () => {
        setOpenModal(true);
    }
    const handleCloseModal = () => {
        setOpenModal(false);
    }

    const [periodLength, setPeriodLength] = useState<number>(0);

    const handlePeriodLengthChange = (event: { target: { value: React.SetStateAction<number>; }; }) => {
        setPeriodLength(event.target.value);
    }

    // Validation rules for the name, email and Password inputs
    const isPeriodLengthValid = periodLength > 1;

    const periodInfoData = {
        period_length: periodLength,
        period_date: formattedDate,
    };

    const onSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        catchAsync(
            async () => {
                const res = await makeRequest({
                    method: "POST",
                    url: API.updateUser,
                    data: periodInfoData,
                });

                const { message, data } = res.data;
                const user = {
                    data,
                    accessToken: profile?.accessToken,
                };

                if (message === "Profile updated successfully!") {
                    handleOpenModal();
                    router.push("/dashboard");
                }

                dispatch(profileUpdateAction(user));
            },
            (err: any) => {
                console.log(err);
            }
        );
    };

    const goBack = () => {
        router.back();
    };


    const [openTip, setOpenTip] = React.useState(false);

    const handleTooltipClose = () => {
        setOpenTip(false);
    };

    const handleTooltipOpen = () => {
        setOpenTip(!openTip);
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
                    <p className="text-[#17181C] font-[600] text-[4.5vw]">Period Information</p>
                </div>
                <form className="mt-12 w-full h-auto space-y-16" onSubmit={onSubmit}>
                    <div>
                        <div className="space-y-5">
                            <TextField
                                id="periodLength"
                                type="number"
                                label="Period Length (e.g 4days)"
                                placeholder="Enter period length (Days)"
                                value={periodLength}
                                onInputChange={handlePeriodLengthChange}
                                require={false}
                                isPassword={false}
                                withBackground={false}
                                readOnly={false}
                            />

                            <div className="w-full">
                                <div className="flex items-center space-x-3 mb-2">
                                    <label htmlFor='lastPeriod' className="block text-[4vw] font-medium text-gray-900">Previous Period (Start date)</label>
                                    <ClickAwayListener onClickAway={handleTooltipClose}>
                                        <div>
                                            <Tooltip
                                                PopperProps={{
                                                    disablePortal: true,
                                                }}
                                                // onClose={handleTooltipClose}
                                                open={openTip}
                                                disableFocusListener
                                                disableHoverListener
                                                title="Enter the date your last menstrual period started. This helps track your menstrual cycle more effectively."
                                                placement="top"
                                                arrow
                                            >
                                                <div onClick={handleTooltipOpen}>
                                                    <GrCircleInformation style={{ color: "#000", fontSize: '20px' }} />
                                                </div>
                                            </Tooltip>
                                        </div>
                                    </ClickAwayListener>
                                </div>
                                <div className="relative">
                                    <input
                                        type='text'
                                        id='lastPeriod'
                                        value={formattedDate}
                                        onChange={() => { }}
                                        className={`border border-[#E3E4E8] text-gray-900 text-[4vw] rounded-[8px] outline-none w-full px-4 py-3`}
                                        placeholder='What day did you start your last period?'
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

            {openModal && (
                <AppModal
                    header="Account creation successful!"
                    text="Your account has been created successfully."
                    buttonText="Proceeding to Dashboard..."
                    onClick={() => { }}
                    onClose={handleCloseModal}
                />
            )}


        </>
    )
}
