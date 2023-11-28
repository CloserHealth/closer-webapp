"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Assets from '@/constants/assets.constant';
import { IconButton, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { AppButton } from '@/app/components/Buttons/Buttons';
import CustomCalendar from '@/app/components/Calendar/Calendar';
import { formattedDate } from '@/helpers/date.helper';
import { date } from 'yup';
import { AppModal } from '@/app/components/Modals/Modals';
import useRequest from '@/services/request.service';
import TextField from '@/app/components/Fields/TextField';
import API from '@/constants/api.constant';


export default function NewTask() {
    const router = useRouter();
    const { isLoading, makeRequest } = useRequest();
    const [selectRange, setSelectRange] = useState<any>(false);
    const [datePicker, setDatePicker] = useState<boolean>(false);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const { makeRequest: makeTaskRequest, isLoading: isLoadingTask } = useRequest();
    const [name, setName] = useState<string>("");
    const [date, setDate] = useState<any>(new Date());
    const [selectedCategories, setSelectedCategories] = useState<any>([]);
    const [category, setCategory] = useState<String[]>([
        'Exercise', 
        'Rest & Self-care', 
        'Nutrition', 
        'Work & Study', 
        'Fitness',
        'Social Activities', 
        'Healthcare', 
        'Hygiene', 
        'Emotional Well-being',
        'Daily Tasks',
        'Fertility Awareness',
        'Healthy Diet for Ovulation',
        'Stress Management',
      ]);
      

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

    const goBack = () => {
        router.back();
    };

    const goToTask = () => {
        router.push('/task');
    };


    const handleCreate = async (e: any) => {
        e.preventDefault();

        // Prepare the POST request payload using the state variables
        const payload = {
            name,
            category: selectedCategories,
            date: formattedDate
        };

        try {
            const res = await makeTaskRequest({
                url: API.userTask,
                method: 'POST',
                data: payload,
            });

            const { status, data }: any = res.data;
            handleOpenModal();
            setName("");
            setDate(new Date());
            setSelectedCategories([]);
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
                    <p className="text-[#17181C] font-[600] text-[4.5vw]">Set new Task</p>
                </div>
                <form className="mt-12 w-full h-auto space-y-14" onSubmit={handleCreate}>

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
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>

                        <div className="w-full">
                            <label htmlFor='lastPeriod' className="block mb-2 text-[4vw] font-medium text-gray-900 dark:text-white w-full">Date</label>
                            <div className="relative">
                                <input
                                    type='text'
                                    id='date'
                                    value={formattedDate}
                                    onChange={() => { }}
                                    className={`border border-[#E3E4E8] text-gray-900 text-[4vw] rounded-[8px] outline-none w-full px-4 py-3`}
                                    placeholder='Select date to be achieved'
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

                    <div>
                        <AppButton
                            type="submit"
                            content="Next"
                            isDisabled={false}
                            isLoading={isLoadingTask}
                            onClickButton={() => { }}
                            isRounded={true}
                        />
                    </div>
                </form>
            </div>

            {openModal && (
                <AppModal
                    header="Task Added successfully!"
                    text="Your task has been added successfully."
                    buttonText="Continue"
                    onClick={goToTask}
                    onClose={handleCloseModal}
                />
            )}
        </>
    )
}
