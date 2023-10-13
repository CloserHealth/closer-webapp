"use client"

import Assets from '@/constants/assets.constant';
import { IconButton, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { IconContext } from "react-icons";
import { BsThreeDotsVertical } from "react-icons/bs";
import SearchField from '../Fields/SearchField';
import Image from 'next/image';
import { userData } from '@/utils/data/data';
import { useRouter } from 'next/navigation';
import { formatFilterDate } from '@/helpers/date.helper';
import { firstLetter, formatDate } from '@/utils/formatter/formatter';

const Table = (
    {
        anchorEl,
        searchQuery,
        filteredUsers,
        handleOpen,
        handleSearchInputChange,
        userMenuOpen,
        handleClose,
        header,
        handleUserActivate,
        handleUserDeactivate
    }: any) => {
    const router = useRouter();


    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="flex justify-between items-center px-5 bg-[#F9FAFB] w-full h-auto py-3 border rounded-t-lg">
                    <h1 className="text-[#212429] text-[1.5vw] font-[600]">{header}</h1>
                    <div>
                        <SearchField
                            id="search"
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onInputChange={handleSearchInputChange}
                        />
                    </div>
                </div>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-[#151515] bg-white">
                        <tr>
                            <th scope="col" className="px-6 py-4">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Country
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Phone no
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Points
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-4"></th>
                        </tr>
                    </thead>
                    {filteredUsers?.length === 0 ? (
                        <div className="min-w-full h-[300px] flex flex-col items-center justify-center space-y-7 mx-auto">
                            <Image src={Assets.notFound} alt="" width={200} height={200} />
                            <p>No results found</p>
                        </div>
                    ) : (
                        <tbody>
                            {filteredUsers?.map((user: any, i: any) => (
                                <tr
                                    key={i}
                                    className={i % 2 === 0 ? "bg-gray-50 dark:bg-gray-800 dark:border-gray-700" : "bg-white"}
                                >
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {user.firstname + ' ' + user.lastname}
                                    </th>
                                    <td className="px-6 py-4">
                                        - - - - - -
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.phone === "" || user.phone === null ? "- - - - - -" : user.phone}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.email === "" || user.email === null ? "- - - - - -" : user.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.streak}
                                    </td>
                                    <td
                                        className={`px-6 py-4 flex translate-y-[7px] items-center space-x-1.5
                                            ${user.status === "active" ? 'text-primaryColor' :
                                                user.status === 'inactive' ? 'text-[#626262]' :
                                                    'text-[#F3282B]'}`}>
                                        <div
                                            className={`w-[5px] h-[5px] rounded-full
                                            ${user.status === "active" ? 'bg-primaryColor' :
                                                    user.status === 'inactive' ? 'bg-[#626262]' :
                                                        'bg-[#F3282B]'}`}></div>
                                        <div>{firstLetter(user.status === "inactive" ? 'Deactivated' : user.status)}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {formatDate(user.created_at)}
                                    </td>
                                    <td className="px-6 py-4 text-right">
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
                                            handleView={() => router.push(`/dashboard/user-management/${user.id}`)}
                                            handleStatus={user.status === "active" ? () => handleUserDeactivate(user.id) : () => handleUserActivate(user.id)}
                                            status={user.status}
                                        />
                                    </>
                                </tr>
                            ))}
                        </tbody>
                    )}

                </table>
            </div>

        </>
    );
}

export const UserMenu = ({
    anchorEl,
    open,
    handleClose,
    handleView,
    handleStatus,
    status,
}: {
    anchorEl: any;
    open: boolean;
    handleClose: () => void;
    handleView: () => void;
    handleStatus: () => void;
    status: string;
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
            <UserMenuItem onClick={handleStatus} icon={status === "active" ? Assets.deactivate : Assets.check} title={status === "active" ? "Deactivate" : "Activate"} />
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

export default Table;
