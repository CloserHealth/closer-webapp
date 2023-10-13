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
import { InviteAdminModal, StatusModal } from '../Modals/Modals';
import { firstLetter, formatDate } from '@/utils/formatter/formatter';
import toast from 'react-hot-toast';

const AdminTable = (
    {
        anchorEl,
        searchQuery,
        filteredAdmin,
        handleOpen,
        handleSearchInputChange,
        userMenuOpen,
        handleClose,
        header,
        inviteModal,
        statusModal,
        handleInviteModalOpen,
        handleInviteModalClose,
        handleStatusModalOpen,
        handleStatusModalClose,
        adminFirstName,
        adminLastName,
        adminEmail,
        handleAdminFirstNameChange,
        handleAdminLastNameChange,
        handleAdminEmailChange,
        handleAdminActivate,
        handleAdminDeactivate,
        handleInviteAdmin
    }: any) => {
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
                            <AppButton content="Invite Admin" isRounded={false} onClickButton={handleInviteModalOpen} isLoading={undefined} />
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
                                Email
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-4"></th>
                        </tr>
                    </thead>
                    {filteredAdmin?.length === 0 ? (
                        <div className="min-w-full h-[300px] flex flex-col items-center justify-center space-y-7 mx-auto">
                            <Image src={Assets.notFound} alt="" width={200} height={200} />
                            <p>No results found</p>
                        </div>
                    ) : (
                        <tbody>
                            {filteredAdmin?.map((admin: any, i: any) => (
                                <tr
                                    key={i}
                                    className={i % 2 === 0 ? "bg-gray-50 dark:bg-gray-800 dark:border-gray-700" : "bg-white"}
                                >
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {admin.firstname + ' ' + admin.lastname}
                                    </th>
                                    <td className="px-6 py-4">
                                        {admin.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        {formatDate(admin.created_at)}
                                    </td>
                                    <td
                                        className={`px-6 py-4 flex translate-y-[7px] items-center space-x-1.5
                                            ${admin.status === "active" ? 'text-primaryColor' :
                                                admin.status === 'inactive' ? 'text-[#626262]' :
                                                    'text-[#F3282B]'}`}>
                                        <div
                                            className={`w-[5px] h-[5px] rounded-full
                                            ${admin.status === "active" ? 'bg-primaryColor' :
                                                    admin.status === 'inactive' ? 'bg-[#626262]' :
                                                        'bg-[#F3282B]'}`}></div>
                                        <div>{firstLetter(admin.status === "inactive" ? 'Deactivated' : admin.status)}</div>
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
                                            handleView={() => { }}
                                            handleAdminActivate={admin.status === "active" ? () => { toast.success("This Admin is already active"); } : () => handleAdminActivate(admin.id)}
                                            handleAdminDeactivate={admin.status === "inactive" ? () => { toast.success("This Admin has already been deactivated"); } : () => handleAdminDeactivate(admin.id)}
                                        />
                                    </>
                                </tr>
                            ))}
                        </tbody>
                    )}

                </table>
            </div>

            {/* Modal */}
            {inviteModal && (
                <InviteAdminModal
                    header="Invite Admin"
                    text={''}
                    buttonText="Send Invite"
                    handleSendInvite={handleInviteAdmin}
                    onClose={handleInviteModalClose}
                    adminFirstName={adminFirstName}
                    adminLastName={adminLastName}
                    adminEmail={adminEmail}
                    onChangeAdminFirstName={handleAdminFirstNameChange}
                    onChangeAdminLastName={handleAdminLastNameChange}
                    onChangeAdminEmail={handleAdminEmailChange}
                />
            )}

            {/* Status Modal */}
            {statusModal && (
                <StatusModal
                    icon={Assets.success}
                    text="Invite sent Successfully"
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
    handleAdminActivate,
    handleAdminDeactivate
}: {
    anchorEl: any;
    open: boolean;
    handleClose: () => void;
    handleView: () => void;
    handleAdminActivate: () => void;
    handleAdminDeactivate: () => void;
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
            <UserMenuItem onClick={handleAdminActivate} icon={Assets.check} title="Activate" />
            <UserMenuItem onClick={handleAdminDeactivate} icon={Assets.deactivate} title="Deactivate" />
            <UserMenuItem onClick={() => { }} icon={Assets.deleteIcon} title="Delete" />
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

export default AdminTable;
