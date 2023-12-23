"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Assets from '@/constants/assets.constant';
import { IconButton, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { AppButton } from '@/app/components/Buttons/Buttons';
import CustomCalendar from '@/app/components/Calendar/Calendar';
import { formattedDate } from '@/helpers/date.helper';
import { date } from 'yup';
import { AppModal, TaskNoticeModal } from '@/app/components/Modals/Modals';
import useRequest from '@/services/request.service';
import TextField from '@/app/components/Fields/TextField';
import API from '@/constants/api.constant';
import { catchAsync } from '@/helpers/api.helper';
import { InfinitySpin } from 'react-loader-spinner';
import Loader from '@/app/components/Loader/Loader';


export default function NewTask() {
    const router = useRouter();
    const { isLoading, makeRequest } = useRequest();
    const [selectRange, setSelectRange] = useState<any>(false);
    const [datePicker, setDatePicker] = useState<boolean>(false);
    const [datePickerEnd, setDatePickerEnd] = useState<boolean>(false);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [openTaskNoticeModal, setOpenTaskNoticeModal] = useState<boolean>(false);
    const { makeRequest: makeTaskRequest, isLoading: isLoadingTask } = useRequest();
    const { makeRequest: makeTaskPhaseCheckRequest, isLoading: isLoadingTaskPhaseCheck } = useRequest();
    const { makeRequest: makeTaskCategoryRequest, isLoading: isLoadingTaskCategory } = useRequest();
    const [name, setName] = useState<string>("");
    const [startDate, setStartDate] = useState<any>(new Date());
    const [endDate, setEndDate] = useState<any>(new Date());
    const [selectedCategories, setSelectedCategories] = useState<any>([]);
    const [category, setCategory] = useState<any[]>([]);
    const [taskPhaseMessage, setTaskPhaseMessage] = useState('');
    const [startDatePhase, setStartDatePhase] = useState(new Date());
    const [endDatePhase, setEndDatePhase] = useState(new Date());
    const [dateSaved, setDateSaved] = useState(false)

    useEffect(() => {
        // Retrieve saved dates from localStorage if available
        const savedDates = localStorage.getItem('savedDates');
        if (savedDates) {
            setDateSaved(true)
            const { start, end } = JSON.parse(savedDates);
            setStartDatePhase(new Date(start));
            setEndDatePhase(new Date(end));
        }
    }, []);


    // Get task categories
    const handleFetchTaskCategory = async () => {
        catchAsync(
            async () => {
                const res = await makeTaskCategoryRequest({
                    method: "GET",
                    url: API.taskCategory,
                });

                const { message, data } = res.data;
                if (message === "Data fetched successfully!") {
                    setCategory(data?.categories);
                }
            },
            (err: any) => {
                console.log(err);
            }
        );
    };

    useEffect(() => {
        handleFetchTaskCategory();
    }, [])


    // Handle name change
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    // Handle category change
    const handleCategoryChange = (event: SelectChangeEvent<{ value: unknown }>) => {
        const selectedValues = event.target.value as any;

        setSelectedCategories(selectedValues);
    };




    // Format date
    const formattedStartDate = startDate.toLocaleDateString('en-GB')
        .split('/')
        .reverse()
        .join('-'); // Format as "YYYY-MM-DD"

    const formattedEndDate = endDate.toLocaleDateString('en-GB')
        .split('/')
        .reverse()
        .join('-');

    const formattedStartDatePhase = startDatePhase.toLocaleDateString('en-GB')
        .split('/')
        .reverse()
        .join('-'); // Format as "YYYY-MM-DD"

    const formattedEndDatePhase = endDatePhase.toLocaleDateString('en-GB')
        .split('/')
        .reverse()
        .join('-');

    const handleOpenModal = () => {
        setOpenModal(true);
    }
    const handleCloseModal = () => {
        setOpenModal(false);
    }

    const handleOpenTaskNoticeModal = () => {
        setOpenTaskNoticeModal(true);
    }
    const handleCloseTaskNoticeModal = () => {
        setOpenTaskNoticeModal(false);
    }

    const goBack = () => {
        router.back();
    };

    const goToTask = () => {
        router.push('/task');
    };


    const handleCheckTaskPhase = async (e: any) => {
        e.preventDefault();

        // Prepare the POST request payload using the state variables
        const payload = {
            name,
            category: selectedCategories,
            start_date: dateSaved ? formattedStartDatePhase + ' 23:59:00' : formattedStartDate + ' 23:59:00',
            end_date: dateSaved ? formattedEndDatePhase + '23:59:00' : formattedEndDate + ' 23:59:00',
        };

        try {
            const res = await makeTaskPhaseCheckRequest({
                url: API.checkTaskPhase,
                method: 'POST',
                data: payload,
            });

            const { status, data, meta, message }: any = res.data;

            if (meta?.saved === false) {
                const { start, end } = data?.dates;
                setTaskPhaseMessage(message);
                handleOpenTaskNoticeModal();
                localStorage.setItem('savedNewTaskDates', JSON.stringify({ start, end }));
            } else {
                handleOpenModal();
                setName("");
                setStartDate(new Date());
                setEndDate(new Date());
                setSelectedCategories([]);
            }
        } catch (e) {
            console.log(e);
        }
    };


    const handleCreate = async () => {

        // Prepare the POST request payload using the state variables
        const payload = {
            name,
            category: selectedCategories,
            start_date: dateSaved ? formattedStartDatePhase + ' 23:59:00' : formattedStartDate + ' 23:59:00',
            end_date: dateSaved ? formattedEndDatePhase + '23:59:00' : formattedEndDate + ' 23:59:00',
        };

        try {
            const res = await makeTaskRequest({
                url: API.userTask,
                method: 'POST',
                data: payload,
            });

            const { status, data }: any = res.data;
            handleCloseTaskNoticeModal();
            handleOpenModal();
            setName("");
            setStartDate(new Date());
            setEndDate(new Date());
            setSelectedCategories([]);

        } catch (e) {
            console.log(e);
        }
    };


    const onCloseTaskPhaseModal = () => {
        handleCreate();
        handleCloseTaskNoticeModal();
        localStorage.removeItem('savedNewTaskDates'); // Remove stored dates from localStorage after task creation
        setDateSaved(false); // Reset dateSaved state variable
    }





    return (
        <>
            {isLoadingTaskCategory ? (
                <Loader />
            ) : (
                <div className='w-full min-h-[100vh] px-5 pt-7 pb-20 relative bg-white'>
                    <div className="w-full flex justify-center items-center relative">
                        <div className="absolute left-0">
                            <IconButton onClick={goBack}>
                                <Image src={Assets.backIconBlack} alt="" width={10} height={10} />
                            </IconButton>
                        </div>
                        <p className="text-[#17181C] font-[600] text-[4.5vw]">Set new Task</p>
                    </div>
                    <form className="mt-12 w-full h-auto space-y-14" onSubmit={handleCheckTaskPhase}>

                        <div className="space-y-5">
                            <div className="w-full">
                                <label htmlFor='lastPeriod' className="block mb-2 text-[4vw] font-medium text-gray-900 dark:text-white w-full">Task Name</label>
                                <div className="relative">
                                    <input
                                        type='text'
                                        id='task'
                                        value={name}
                                        onChange={handleNameChange}
                                        className={`border border-[#E3E4E8] text-gray-900 text-[4vw] rounded-[8px] outline-none w-full px-4 py-3`}
                                        placeholder='Enter task name'
                                    />
                                </div>
                            </div>

                            <div className="w-full">
                                <label htmlFor='lastPeriod' className="block mb-2 text-[4vw] font-medium text-gray-900 dark:text-white w-full">Category</label>
                                <Select
                                    labelId="demo-select-small-label"
                                    id="category"
                                    value={selectedCategories}
                                    onChange={handleCategoryChange}
                                    sx={{ width: '100%', borderRadius: '8px' }}
                                    className="border border-[#E3E4E8]"
                                >
                                    {category.map((option: any) => (
                                        <MenuItem key={option} value={option?.id}>
                                            {option?.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </div>

                            <div className="w-full">
                                <label htmlFor='lastPeriod' className="block mb-2 text-[4vw] font-medium text-gray-900 dark:text-white w-full">Start Date</label>
                                <div className="relative">
                                    <input
                                        type='text'
                                        id='date'
                                        value={formattedStartDate}
                                        onChange={() => { }}
                                        className={`border border-[#E3E4E8] text-gray-900 text-[4vw] rounded-[8px] outline-none w-full px-4 py-3`}
                                        placeholder='Select date to be achieved'
                                    />

                                    <div className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer'
                                        onClick={() => {
                                            setDatePicker(!datePicker);
                                            setDatePickerEnd(false);
                                        }}>
                                        <IconButton>
                                            <Image src={Assets.calendar} alt="" width={20} height={20} />
                                        </IconButton>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full">
                                <label htmlFor='lastPeriod' className="block mb-2 text-[4vw] font-medium text-gray-900 dark:text-white w-full">End Date</label>
                                <div className="relative">
                                    <input
                                        type='text'
                                        id='date'
                                        value={formattedEndDate}
                                        onChange={() => { }}
                                        className={`border border-[#E3E4E8] text-gray-900 text-[4vw] rounded-[8px] outline-none w-full px-4 py-3`}
                                        placeholder='Select date to be achieved'
                                    />

                                    <div className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer'
                                        onClick={() => {
                                            setDatePickerEnd(!datePickerEnd);
                                            setDatePicker(false);
                                        }}>
                                        <IconButton>
                                            <Image src={Assets.calendar} alt="" width={20} height={20} />
                                        </IconButton>
                                    </div>
                                </div>
                            </div>
                            {/* Calendar */}
                            {datePicker && (
                                <CustomCalendar
                                    date={startDate}
                                    setDate={setStartDate}
                                    selectRange={selectRange}
                                    setSelectRange={setSelectRange}
                                    periodStartDate={undefined}
                                    periodEndDate={undefined}
                                    tileContent={undefined}
                                />
                            )}

                            {datePickerEnd && (
                                <CustomCalendar
                                    date={endDate}
                                    setDate={setEndDate}
                                    selectRange={selectRange}
                                    setSelectRange={setSelectRange}
                                    periodStartDate={undefined}
                                    periodEndDate={undefined}
                                    tileContent={undefined}
                                />
                            )}
                        </div>

                        <div>
                            <AppButton
                                type="submit"
                                content="Next"
                                isDisabled={false}
                                isLoading={isLoadingTask || isLoadingTaskPhaseCheck}
                                onClickButton={() => { }}
                                isRounded={true}
                            />
                        </div>
                    </form>
                </div>
            )}


            {openModal && (
                <AppModal
                    header="Task Added successfully!"
                    text="Your task has been added successfully."
                    buttonText="Continue"
                    onClick={goToTask}
                    onClose={handleCloseModal}
                />
            )}

            {openTaskNoticeModal && (
                <TaskNoticeModal
                    header="Notice"
                    text={taskPhaseMessage}
                    onClick={handleCreate}
                    onClose={onCloseTaskPhaseModal}
                />
            )}
        </>
    )
}
