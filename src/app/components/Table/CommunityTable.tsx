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
import { firstLetter } from '@/utils/formatter/formatter';

const CommunityTable = (
    {
        anchorEl,
        searchQuery,
        filteredRings,
        handleOpen,
        handleSearchInputChange,
        userMenuOpen,
        handleClose,
        header,
        deactivateModal,
        statusModal,
        handleDeactivateModalOpen,
        handleStatusModalOpen,
        handleStatusModalClose,
        handleDeactivateModalClose,
        handleDelete,
        handleRingActivate,
        handleRingDeactivate,
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
                        <div>
                            <AppButton content="Create Community" isRounded={false} onClickButton={() => router.push('/dashboard/community-management/create')} isLoading={undefined} />
                        </div>
                    </div>
                </div>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-[#151515] bg-white">
                        <tr>
                            <th scope="col" className="px-6 py-4">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Created by
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Members
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Action
                            </th>
                        </tr>
                    </thead>
                    {filteredRings?.length === 0 ? (
                        <div className="min-w-full h-[300px] flex flex-col items-center justify-center space-y-7 mx-auto">
                            <Image src={Assets.notFound} alt="" width={200} height={200} />
                            <p>No results found</p>
                        </div>
                    ) : (
                        <tbody>
                            {filteredRings?.map((community: any, i: any) => (
                                <tr
                                    key={i}
                                    className={i % 2 === 0 ? "bg-gray-50 dark:bg-gray-800 dark:border-gray-700" : "bg-white"}
                                >
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {community?.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {community?.creator?.firstname + ' ' + community?.creator?.lastname}
                                    </td>
                                    <td className="px-6 py-4">
                                        {community?.member_count}
                                    </td>
                                    <td
                                        className={`px-6 py-4 flex translate-y-[7px] items-center space-x-1.5
                                            ${community.status === "active" ? 'text-primaryColor' :
                                                community.status === 'deactivated' ? 'text-[#626262]' :
                                                    'text-[#F3282B]'}`}>
                                        <div
                                            className={`w-[5px] h-[5px] rounded-full
                                            ${community.status === "active" ? 'bg-primaryColor' :
                                                    community.status === 'deactivated' ? 'bg-[#626262]' :
                                                        'bg-[#F3282B]'}`}></div>
                                        <div>{firstLetter(community.status)}</div>
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

                                    {/* The UserMenu component can remain unchanged */}
                                    <>
                                        <UserMenu
                                            open={userMenuOpen[i]}
                                            anchorEl={anchorEl}
                                            handleClose={handleClose}
                                            handleView={() => router.push(community.link)}
                                            handleActivateRing={() => handleRingActivate(community.id, 'active')}
                                            handleDeactivateRing={() => handleRingDeactivate(community.id, 'deactivated')}
                                            handleDeleteRing={() => handleDelete(community.id)}
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
    handleDeactivateRing,
    handleDeleteRing,
    handleActivateRing,
}: {
    anchorEl: any;
    open: boolean;
    handleClose: () => void;
    handleView: () => void;
    handleDeactivateRing: () => void;
    handleDeleteRing: () => void;
    handleActivateRing: () => void;
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
            <UserMenuItem onClick={handleView} icon={Assets.check} title="View" />
            <UserMenuItem onClick={handleActivateRing} icon={Assets.check} title="Activate" />
            <UserMenuItem onClick={handleDeactivateRing} icon={Assets.removeIcon} title="Deactivate" />
            <UserMenuItem onClick={handleDeleteRing} icon={Assets.deleteIcon} title="Delete" />
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

export default CommunityTable;
