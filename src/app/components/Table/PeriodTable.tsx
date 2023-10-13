"use client"

import Assets from '@/constants/assets.constant';
import { IconButton, Menu, MenuItem } from '@mui/material';
import React from 'react';
import { IconContext } from "react-icons";
import { BsThreeDotsVertical } from "react-icons/bs";
import SearchField from '../Fields/SearchField';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { AppButton } from '../Buttons/Buttons';
import { QuestionBaseModal, StatusModal } from '../Modals/Modals';

const PeriodTable = (
    { 
        anchorEl, 
        searchQuery, 
        filteredPhases, 
        handleOpen, 
        handleSearchInputChange, 
        userMenuOpen, 
        handleClose, 
        header ,
        deactivateModal,
        statusModal,
        handleDeactivateModalOpen,
        handleStatusModalOpen,
        handleStatusModalClose,
        handleDeactivateModalClose,
    }: any) => {
    const router = useRouter();

    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="flex justify-between items-center px-5 bg-[#F9FAFB] w-full h-auto py-3 border rounded-t-lg">
                    <h1 className="text-[#212429] text-[1.5vw] font-[600]">{header}</h1>
                    <div className="flex space-x-7 items-center">
                        <div>
                            <SearchField
                                id="search"
                                type="text"
                                placeholder="Search"
                                value={searchQuery}
                                onInputChange={handleSearchInputChange}
                            />
                        </div>
                        {/* <div>
                            <AppButton content="Add New Phase" isRounded={false} onClickButton={() => { } } isLoading={undefined} />
                        </div> */}
                    </div>
                </div>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-[#151515] bg-white">
                        <tr>
                            <th scope="col" className="px-6 py-4">
                                Phase
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Tips
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Action
                            </th>
                            <th scope="col" className="px-6 py-4">

                            </th>
                            <th scope="col" className="px-6 py-4">

                            </th>
                            <th scope="col" className="px-6 py-4">

                            </th>
                            <th scope="col" className="px-6 py-4">

                            </th>
                            <th scope="col" className="px-6 py-4"></th>
                        </tr>
                    </thead>
                    {filteredPhases?.length === 0 ? (
                        <div className="min-w-full h-[300px] flex flex-col items-center justify-center space-y-7 mx-auto">
                            <Image src={Assets.notFound} alt="" width={200} height={200} />
                            <p>No results found</p>
                        </div>
                    ) : (
                        <tbody>
                            {filteredPhases?.map((user: any, i: any) => (
                                <tr
                                    key={i}
                                    className={i % 2 === 0 ? "bg-gray-50 dark:bg-gray-800 dark:border-gray-700" : "bg-white"}
                                >
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {user.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {user.tips_count}
                                    </td>
                                    <td className="px-6 py-4">
                                        <IconButton onClick={(event) => handleOpen(event, i)}>
                                            <IconContext.Provider value={{ color: "#4A5057", size: "20px" }}>
                                                <div>
                                                    <BsThreeDotsVertical />
                                                </div>
                                            </IconContext.Provider>
                                        </IconButton>
                                    </td>
                                    <td className="px-6 py-4">

                                    </td>
                                    <td className="px-6 py-4">

                                    </td>
                                    <td className="px-6 py-4 text-primaryColor">

                                    </td>
                                    <td className="px-6 py-4">

                                    </td>
                                    <td className="px-6 py-4 text-right">

                                    </td>

                                    {/* The UserMenu component can remain unchanged */}
                                    <>
                                        <UserMenu
                                            open={userMenuOpen[i]}
                                            anchorEl={anchorEl}
                                            handleClose={handleClose}
                                            handleView={() => router.push(`/dashboard/period-management/${user.id}`)}
                                            handleDeactivate={handleDeactivateModalOpen}
                                        />
                                    </>
                                </tr>
                            ))}
                        </tbody>
                    )}

                </table>
            </div>

            {/* Modal */}
            {deactivateModal && (
                <QuestionBaseModal
                    text="Are you sure you want to deactivate this phase?"
                    buttonText="Deactivate"
                    buttonTextClose="Cancel"
                    onClick={handleStatusModalOpen}
                    onClose={handleDeactivateModalClose}
                />
            )}

            {/* Status Modal */}
            {statusModal && (
                <StatusModal
                    icon={Assets.success}
                    text="Phase deactivated Successfully"
                    header="Successful"
                    onClose={handleStatusModalClose}
                />
            )}
        </>
    );
}

export const UserMenu = ({
    anchorEl,
    open,
    handleClose,
    handleView,
    handleDeactivate
}: {
    anchorEl: any;
    open: boolean;
    handleClose: () => void;
    handleView: () => void;
    handleDeactivate: () => void;
}) => {
    return (
        <Menu
            anchorEl={anchorEl}
            id="connection-menu"
            open={open}
            onClose={handleClose}
            PaperProps={{
                elevation: 0,
                sx: {
                    borderRadius: '16px',
                    overflow: 'visible',
                    boxShadow: '0px 4px 14px rgba(0, 0, 0, 0.15)',
                    mt: 1.5,
                    ml: 2.2,
                    width: '180px',
                },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
            <UserMenuItem onClick={handleView} icon={Assets.view} title="View" />
            {/* <UserMenuItem onClick={handleDeactivate} icon={Assets.deactivate} title="Deactivate" /> */}
        </Menu>
    );
};

export const UserMenuItem = ({
    onClick,
    icon,
    title,
    color,
}: {
    color?: string;
    title?: string;
    icon?: any;
    onClick?: any;
}) => {
    return (
        <MenuItem onClick={onClick}>
            <div className="w-full h-[31px] flex justify-center items-center gap-[10px]">
                <Image src={icon} alt="" width={20} height={20} />

                <span className={'font-[500] text-[1vw] w-[100px] text-[#292E38]'} style={{ color }}>
                    {title}
                </span>
            </div>
        </MenuItem>
    );
};

export default PeriodTable;
