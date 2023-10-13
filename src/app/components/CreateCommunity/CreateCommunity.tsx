"use client"
import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Close from '../Close/Close';
import TextField from '../Fields/TextField';
import Image from 'next/image';
import Assets from '@/constants/assets.constant';
import Drawer from '../Drawer/Drawer';
import { OutlinedAppButton, AppButton } from '../Buttons/Buttons';
// import { admins } from '@/utils/data/data';
import { AdminProps } from '@/utils/types/types';
import { Chip, IconButton } from '@mui/material';
import useRequest from '@/services/request.service';
import API from '@/constants/api.constant';
import toast from 'react-hot-toast';
import { catchAsync } from '@/helpers/api.helper';
import { createTheme } from '@mui/material/styles';

export default function CreateCommunityComponent() {
    const { isLoading, makeRequest } = useRequest();
    const [allUsers, setAllUsers] = useState<any>();
    const [drawer, toggleDrawer] = useState<boolean>(false);
    const [selectedAdmins, setSelectedAdmins] = useState<any[]>([]);
    const router = useRouter();
    const [groupSize, setGroupSize] = useState<number>(0);
    const [selectSize, setSelectSize] = useState<any>(null);
    const [communityName, setCommunityName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [usersSelected, setUsersSelected] = useState<any>([]);

    const close = () => {
        router.back();
    }

    const handleCommunityNameChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setCommunityName(event.target.value);
    };

    const handleDescriptionChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setDescription(event.target.value);
    };

    // Size click handle
    const handleSizeClick = (index: any) => {
        setSelectSize(index);
    };

    // Sort Admin
    const sortedAdmins = useMemo(() => {
        // Sort the 'admins' array alphabetically based on the 'firstname' property
        return allUsers?.slice().sort((a: { firstname: string; }, b: { firstname: any; }) => a.firstname.localeCompare(b.firstname));
    }, [allUsers]);

    // Pre-process data to group admins based on the starting letter of 'firstname'
    const groupedAdmins = sortedAdmins?.reduce((acc: { [x: string]: any[]; }, admin: { firstname: string; }) => {
        const firstLetter = admin.firstname.charAt(0).toUpperCase();
        if (!acc[firstLetter]) {
            acc[firstLetter] = [];
        }
        acc[firstLetter].push(admin);
        return acc;
    }, {} as { [key: string]: any[] }); // Provide a default empty object

    // ...

    // Fetch User management card Data
    const handleFetch = async () => {
        try {
            const res = await makeRequest({
                method: "GET",
                url: API.users,
            });

            const { message, data } = res.data;
            if (message === "Data fetched successfully!") {
                // Check if 'data' exists and it has 'users' property as an array
                if (data && Array.isArray(data.users)) {
                    setAllUsers(data.users);
                } else {
                    toast.error("Invalid or missing 'users' data in the API response.");
                }
            }
        } catch (err) {
            console.log("Error fetching users:", err);
        }
    };

    useEffect(() => {
        handleFetch();
    }, []);


    // Function to handle admin selection
    const handleAdminSelection = (admin: any) => {
        const isSelected = selectedAdmins.some((selectedAdmin) => selectedAdmin.id === admin.id);
      
        if (isSelected) {
          setSelectedAdmins((prevSelectedAdmins) =>
            prevSelectedAdmins.filter((selectedAdmin) => selectedAdmin.id !== admin.id)
          );
          setUsersSelected((prevUsersSelected: any[]) =>
            prevUsersSelected.filter((userId: any) => userId !== admin.id.toString())
          );
        } else {
          setSelectedAdmins((prevSelectedAdmins) => [...prevSelectedAdmins, admin]);
          setUsersSelected((prevUsersSelected: any) => [...prevUsersSelected, admin.id.toString()]);
        }
      };




    const handleSave = () => {
        toggleDrawer(false);
    };

    const handleDelete = (adminIdToDelete: any) => {
        setSelectedAdmins((prevSelectedAdmins) =>
          prevSelectedAdmins.filter((admin) => admin.id !== adminIdToDelete)
        );
      };
      

    // Validation rules
    const isCommunityNameValid = communityName.length > 3;
    const isDescriptionValid = description.length > 3;
    const isGroupSizeValid = selectSize !== null;
    const isSelectedAdminValid = selectedAdmins !== null;

    const handleGroupSize = () => {
        if (selectSize === 0) {
            setGroupSize(49);
        } else if (selectSize === 1) {
            setGroupSize(59);
        } else if (selectSize === 2) {
            setGroupSize(149);
        } else if (selectSize === 3) {
            setGroupSize(500);
        } else {
            setGroupSize(0);
        }
    }

    useEffect(() => {
        handleGroupSize();
    }, [selectSize]);


    const communityData = {
        name: communityName,
        description: description,
        capacity: groupSize,
        users: usersSelected,
    }

    const onSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        catchAsync(
            async () => {
                const res = await makeRequest({
                    method: "POST",
                    url: API.rings,
                    data: communityData,
                });

                const { message } = res.data;
                if (message === "Ring created successfully!") {
                    toast.success(message);
                    setCommunityName('');
                    setDescription('');
                    setSelectSize(null);
                    setUsersSelected([]);
                    setSelectedAdmins([]);
                }
            },
            (err: any) => {
                console.log(err);
            }
        );
    };


    return (
        <div>
            <div className="rounded-[10px] border border-white h-auto w-full px-5 pt-5 pb-28"
                style={{ background: "rgba(255, 255, 255, 0.72)" }}
            >
                <div className="flex items-center justify-between">
                    <h1 className="text-[#121F3E] font-[700] text-[1.3vw]">Create Community</h1>
                    <Close title="Close" onClickClose={close} />
                </div>

                <div className="space-y-5 mt-7">
                    <TextField
                        id="communityName"
                        type="text"
                        label="Community Name"
                        placeholder="Enter"
                        value={communityName}
                        onInputChange={handleCommunityNameChange}
                        require={false}
                        isPassword={false}
                        withBackground={false}
                        readOnly={false}
                    />
                    <TextField
                        id="description"
                        type="text"
                        label="Description"
                        placeholder="Enter"
                        value={description}
                        onInputChange={handleDescriptionChange}
                        require={false}
                        isPassword={false}
                        withBackground={false}
                        readOnly={false}
                    />

                    <div>
                        <p className="block mb-2 text-[1vw] font-medium text-gray-900 dark:text-white">Group Size</p>
                        <div className="flex justify-between items-center text-[1vw]">
                            <div onClick={() => handleSizeClick(0)} className={`px-[20px] py-[10px] space-x-2 flex items-center border ${selectSize === 0 ? 'border-primaryColor' : 'border-[#EBECEF]'} ${selectSize === 0 ? 'bg-[#d0c9db]' : 'bg-white'}  rounded-[10px] dark:border-gray-600`}>
                                <div className={`w-[17px] h-[17px] border ${selectSize === 0 ? 'border-primaryColor' : 'border-[#EBECEF]'} rounded-full ${selectSize === 0 ? 'bg-primaryColor' : 'bg-transparent'}`}></div>
                                <p>1 - 49 Members</p>
                            </div>
                            <div onClick={() => handleSizeClick(1)} className={`px-[20px] py-[10px] space-x-2 flex items-center border ${selectSize === 1 ? 'border-primaryColor' : 'border-[#EBECEF]'} ${selectSize === 1 ? 'bg-[#d0c9db]' : 'bg-white'} rounded-[10px] dark:border-gray-600`}>
                                <div className={`w-[17px] h-[17px] border ${selectSize === 1 ? 'border-primaryColor' : 'border-[#EBECEF]'} rounded-full ${selectSize === 1 ? 'bg-primaryColor' : 'bg-transparent'}`}></div>
                                <p>50 - 59 Members</p>
                            </div>
                            <div onClick={() => handleSizeClick(2)} className={`px-[20px] py-[10px] space-x-2 flex items-center border ${selectSize === 2 ? 'border-primaryColor' : 'border-[#EBECEF]'} ${selectSize === 2 ? 'bg-[#d0c9db]' : 'bg-white'}  rounded-[10px] dark:border-gray-600`}>
                                <div className={`w-[17px] h-[17px] border ${selectSize === 2 ? 'border-primaryColor' : 'border-[#EBECEF]'} rounded-full ${selectSize === 2 ? 'bg-primaryColor' : 'bg-transparent'}`}></div>
                                <p>100 - 149 Members</p>
                            </div>
                            <div onClick={() => handleSizeClick(3)} className={`px-[20px] py-[10px] space-x-2 flex items-center border ${selectSize === 3 ? 'border-primaryColor' : 'border-[#EBECEF]'} ${selectSize === 3 ? 'bg-[#d0c9db]' : 'bg-white'}  rounded-[10px] dark:border-gray-600`}>
                                <div className={`w-[17px] h-[17px] border ${selectSize === 3 ? 'border-primaryColor' : 'border-[#EBECEF]'} rounded-full ${selectSize === 3 ? 'bg-primaryColor' : 'bg-transparent'}`}></div>
                                <p>150 - 500 Members</p>
                            </div>
                        </div>
                    </div>
                </div>

                <button onClick={() => toggleDrawer(true)} className="bg-white text-[#FF6E57] font-[600] text-[0.9vw] flex items-center space-x-2 mt-7 py-[8px] px-[20px] rounded-full">
                    <span>Select Community Admin</span>
                    <Image src={Assets.arrowIconRight} alt='' width={20} height={20} />
                </button>


                {/* Display the selected admins as chips */}
                {selectedAdmins.length > 0 && (
                    <div className="mt-7">
                        <h1 className="mb-3 font-[500] text-[#17181C] text-[1vw]">Admin</h1>
                        <div className="flex space-x-2 items-center rounded-[5px] border border-[#DDE2E5] px-4 py-5">
                        {selectedAdmins.map((admin) => (
                            <Chip
                                key={admin.id}
                                label={admin.firstname + " " + admin.lastname}
                                onDelete={() => handleDelete(admin.id)}
                                variant="outlined"
                                color="primary"
                                sx={{
                                    color: '#2B0A60',
                                    borderColor: '#2B0A60',
                                }}
                            />
                        ))}
                        </div>
                    </div>
                )}

                <button
                    onClick={onSubmit}
                    className={`
                    ${!isCommunityNameValid || !isDescriptionValid || !isGroupSizeValid || !isSelectedAdminValid ? 'bg-[#F7F7F8] text-[#747A8B] ' : 'bg-primaryColor text-white'} 
                    font-[600] text-[1vw] text-center flex items-center justify-center space-x-2 mt-14 h-[59px] w-full rounded-[5px]`}
                    style={{
                        boxShadow: "0px 1px 3px 0px rgba(63, 63, 68, 0.05), 0px 1px 0px 0px rgba(63, 63, 68, 0.02)",
                        border: "1px solid rgba(63, 63, 68, 0.00)"
                    }}>
                    Create Community
                </button>

                {/* Drawer */}
                <Drawer drawer={drawer} anchor="right" toggleDrawer={toggleDrawer}>
                    <div className="flex flex-col justify-between h-full">
                        <div>
                            <div className="flex items-center justify-between border-b-[0.5px] pb-[20px] border-[#EBECEF]">
                                <h1 className='text-[1.1vw] font-[600] text-[#17181C]'>Select Community Admin</h1>
                                <Close title="Back" />
                            </div>
                            <p className="text-[#FF6E57] font-[600] text-[0.9vw] mt-3">
                                {selectedAdmins.length > 0
                                    ? `${selectedAdmins.length}/${allUsers?.length}  Selected`
                                    : "None Selected"}
                            </p>


                            <div className="relative mt-5">
                                {/* <div className='absolute inset-y-0 left-0 pl-3 flex items-center cursor-pointer'>
                                <IconContext.Provider value={{ color: "#495057", size: "20px" }}>
                                    <div>
                                        <AiOutlineSearch />
                                    </div>
                                </IconContext.Provider>
                            </div> */}
                                <input
                                    type="text"
                                    id="search"
                                    value=""
                                    onChange={() => { }}
                                    className="bg-white border border-[#CED3D8] text-gray-900 text-[1vw] outline-none w-full px-4 py-3 rounded-full"
                                    placeholder="Search..."
                                />
                            </div>

                            <div className="mt-3 h-[57vh] overflow-y-auto">
                                <div className="grid grid-cols-1 gap-3">
                                    {sortedAdmins && Object.entries(groupedAdmins).map(([header, adminsInSection]: any) => (
                                        <div key={header}>
                                            <p className="text-[#747A8B] font-[500] text-[0.9vw]">{header}</p>
                                            {adminsInSection.map((admin: any) => (
                                                <div key={admin.firstname} className="flex items-center space-x-3 mt-3" onClick={() => handleAdminSelection(admin)}>
                                                    <div
                                                        className={`w-[20px] h-[20px] cursor-pointer border ${selectedAdmins.some((selectedAdmin) => selectedAdmin.id === admin.id)
                                                            ? "bg-primaryColor border-primaryColor"
                                                            : "bg-transparent border-[#EBECEF]"
                                                            } rounded-[4px]`}
                                                    ></div>
                                                    <div className="rounded-full w-[32px] h-[32px]">
                                                        <Image src={admin.avatar === null ? Assets.authImage : admin.avatar} alt="" width={100} height={100} style={{ objectFit: "cover", width: "100%", height: "100%", borderRadius: "100%" }} />
                                                    </div>
                                                    <p className='text-[1vw] font-[400] text-[#17181C]'>{admin.firstname + ' ' + admin.lastname}</p>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex items-center space-x-5">
                            <OutlinedAppButton content="Close" isRounded={true} onClickButton={() => toggleDrawer(false)} />
                            <AppButton content="Save" isRounded={true} onClickButton={handleSave} isLoading={undefined} />
                        </div>
                    </div>
                </Drawer>
            </div>
        </div>
    )
}
