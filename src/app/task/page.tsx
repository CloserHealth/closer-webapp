"use client"

import React, { useEffect, useState } from 'react'
import MobileNavbar from '../components/Navbar/MobileNavbar';
import Image from 'next/image';
import { ButtonBase, Checkbox, IconButton } from '@mui/material';
import Assets from '@/constants/assets.constant';
import { HeaderButton } from '../components/Buttons/Buttons';
import { useRouter } from 'next/navigation';
import { AppModal } from '../components/Modals/Modals';
import API from '@/constants/api.constant';
import useRequest from '@/services/request.service';
import toast from "react-hot-toast";
import { InfinitySpin } from 'react-loader-spinner'

export default function Task() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<boolean>(true);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const { makeRequest: makeTaskRequest, isLoading: isLoadingTask } = useRequest();
    const [weeklyTasks, setWeeklyTasks] = useState<any[]>([]);
    const [weeklyCompletedTasks, setWeeklyCompletedTasks] = useState<any[]>([]);

    const newTask = () => {
        router.push('/task/new');
    }

    const handleOpenModal = () => {
        setOpenModal(true);
    }
    const handleCloseModal = () => {
        setOpenModal(false);
    }


// Complete a Task
const handleTaskComplete = async (id: string) => {
    try {
      const res = await makeTaskRequest({
        url: `${API.userTask}/${id}`,
        method: 'PUT',
      });
      const { message, data } = res.data;
  
      toast.success(message);
  
      // Fetch updated task list after completion
      fetchWeeklyTask(); // Call the function to fetch weekly tasks again
    } catch (e) {
      console.log(e);
    }
  };
  
  // Get Weekly Tasks
  const fetchWeeklyTask = async () => {
    try {
      const res = await makeTaskRequest({
        url: API.userTask + '?filter=month',
        method: 'GET',
      });
      const { status, data } = res.data;
  
      const allTasks = data?.tasks || [];
  
      // Filter completed tasks from allTasks
      const completedTasks = allTasks?.filter((task: { status: string }) => task?.status === 'completed');
  
      // Filter pending tasks from allTasks
      const newTasks = allTasks?.filter((task: { status: string }) => task?.status === 'pending');
      
      setWeeklyTasks(newTasks);
      setWeeklyCompletedTasks(completedTasks);
    } catch (e) {
      console.log(e);
    }
  };
  
  useEffect(() => {
    fetchWeeklyTask();
  }, []); // Fetch tasks on component mount
  
  
  




    return (
        <div className='px-5 pb-20 relative h-[100vh] overflow-y-auto w-full bg-white'>
            <div className="fixed top-0 right-0 left-0 z-50">
                <MobileNavbar />
            </div>
            <div className='mt-28 w-full'>
                <div className="flex justify-between items-center w-full">
                    <p className="font-[700] text-[3.8vw] text-[#17181C]">Task</p>
                    <HeaderButton text="Set new task" onClickButton={newTask} />
                    {/* <HeaderButton text="Set new task" onClickButton={handleOpenModal} /> */}
                </div>

                {isLoadingTask ? (
                     <div className="w-full h-[158px] rounded-[16px] mt-7 flex justify-center items-center"
                     style={{ background: 'linear-gradient(90deg, #2B0A60 99.99%, #FFD4ED 100%)' }}>
                          <InfinitySpin
                              width='200'
                              color="#ffffff"
                          />
                      </div>
                ) : (
                    <div className="w-full h-auto rounded-[16px] mt-7 px-[20px] py-[28px]"
                    style={{ background: 'linear-gradient(90deg, #2B0A60 99.99%, #FFD4ED 100%)' }}>
                    <h1 className="text-[5vw] font-[600] text-white">This Month’s Task</h1>
                    <div className="mt-7 flex items-center justify-between">
                        {weeklyTasks?.length > 0 ? (
                            <p className="text-[3.5vw] font-[400] text-white">You have {weeklyTasks?.length} tasks on the queue. Ensure you complete them when due</p>
                        ) : (
                            <p className="text-[3.5vw] font-[400] text-white">You have no tasks on the queue. Set new task to get started</p>
                        )}
                    </div>
                </div>
                )}


                {/* Tasks */}
                <div className="text-[3.5vw] font-[400] text-[#5F5F5F] flex items-center justify-center space-x-7 mt-7">
                    <ButtonBase>
                        <div
                            className="border-b-[1px] py-1 px-[8px] transform ease-in-out duration-500 delay-150 cursor-pointer"
                            onClick={() => setActiveTab(true)}
                            style={{
                                borderColor: `${activeTab ? '#2B0A60' : 'transparent'}`,
                                color: `${activeTab ? '#2B0A60' : '#5F5F5F'}`,
                            }}
                        >
                            <p>Current Tasks</p>
                        </div>
                    </ButtonBase>
                    <ButtonBase>
                        <div
                            className="border-b-[1px] py-1 px-[8px] transform ease-in-out duration-500 delay-150 cursor-pointer"
                            onClick={() => setActiveTab(false)}
                            style={{
                                borderColor: `${!activeTab ? '#2B0A60' : 'transparent'}`,
                                color: `${!activeTab ? '#2B0A60' : '#5F5F5F'}`,
                            }}
                        >
                            <p>Completed Tasks</p>
                        </div>
                    </ButtonBase>
                </div>

                {activeTab ? (
                    <div className="mt-5 bg-[#F0EDF8] rounded-[16px] px-4 py-5 w-full h-auto" style={{ boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}>
                        {weeklyTasks?.length <= 0 ? (
                            <div className="w-full flex flex-col justify-center items-center space-y-2 mt-8 pb-7">
                                <Image src={Assets.cat} alt="No coping tips" width={120} height={120} />
                                <p className="font-[600] text-[2.5vw]">You’re yet to set up a task</p>
                            </div>
                        ) : (
                            <>
                                <h1 className="text-[#1E1E1E] text-[14px] font-[800]">Your Task for the month</h1>
                                <p className="text-[2.8vw] font-[400] text-[#1E1E1E] mt-1.5">Based on your phase, Closer suggests the following tasks to be done this month.</p>
                                <div className="mt-5">
                                    <p className="text-[2.8vw] font-[600] text-[#1E1E1E] mt-1.5">Select Checkbox once an activity is completed</p>
                                    <div className="w-full grid grid-cols-2 gap-x-10">
                                        {weeklyTasks?.map((task, index) => (
                                            <div key={index} className="flex items-center">
                                                <Checkbox
                                                    size="small"
                                                    className="-translate-x-3"
                                                    sx={{
                                                        color: '#939393',
                                                        '&.Mui-checked': {
                                                            color: '#392768',
                                                        },
                                                    }}
                                                    onChange={() => handleTaskComplete(task?.id)}
                                                    checked={weeklyCompletedTasks.includes(task?.id)} // Check if the task ID is in completedTasks
                                                />
                                                <p className="text-[2.5vw] font-[500] text-[#1E1E1E] -translate-x-3">
                                                    {task?.name}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                ) : (
                    <div className="mt-5 bg-[#F0EDF8] rounded-[16px] px-4 py-5 w-full h-auto" style={{ boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}>
                        {weeklyCompletedTasks?.length <= 0 ? (
                            <div className="w-full flex flex-col justify-center items-center space-y-2 mt-8 pb-7">
                                <Image src={Assets.cat} alt="No coping tips" width={120} height={120} />
                                <p className="font-[600] text-[2.5vw]">You’re yet to complete a task</p>
                            </div>
                        ) : (
                            <>
                                <h1 className="text-[#1E1E1E] text-[14px] font-[800]">Completed Tasks</h1>
                                <div className="mt-5">
                                    <div className="w-full grid grid-cols-2 gap-x-10">
                                        {weeklyCompletedTasks?.map((task, index) => (
                                            <div key={index} className="flex items-center">
                                               <Checkbox
                                                    size="small"
                                                    className="-translate-x-3"
                                                    checked={true}
                                                    onChange={() => { }}
                                                    sx={{
                                                        color: '#939393',
                                                        '&.Mui-checked': {
                                                            color: '#392768',
                                                        },
                                                    }}
                                                />
                                                <p className="text-[2.5vw] font-[500] text-[#1E1E1E] -translate-x-3 line-through">
                                                    {task?.name}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                )}


            </div>

            {openModal && (
                <AppModal
                    header="Unavailable!"
                    text="This page is currently under construction. We'll notify you once it's ready. 😉"
                    buttonText="Close"
                    onClick={() => { }}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    )
}
