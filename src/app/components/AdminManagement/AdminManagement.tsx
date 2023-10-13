import AdminManagementService from '@/utils/services/adminManagement.service';
import React from 'react'
import Card from '../Card/Card'
import AdminTable from '../Table/AdminTable'


export default function AdminManagement() {
  const {
    userMenuOpen,
    anchorEl,
    searchQuery,
    filteredAdmins,
    handleOpen,
    handleClose,
    handleSearchInputChange,
    inviteModal,
    handleInviteModalOpen,
    handleInviteModalClose,
    handleStatusModalClose,
    adminFirstName,
    adminLastName,
    adminEmail,
    handleAdminFirstNameChange,
    handleAdminLastNameChange,
    handleAdminEmailChange,
    isLoading,
    adminManagementCardData,
    handleAdminActivate,
    handleAdminDeactivate,
    handleInviteAdmin,
    statusModal
  } = AdminManagementService();

  return (
    <div className='space-y-7'>
      <div className="rounded-[10px] border border-white h-auto w-full p-5"
        style={{ background: "rgba(255, 255, 255, 0.72)" }}
      >
        <h1 className="text-[#121F3E] font-[700] text-[1.3vw]">Overview</h1>
        <div className="grid grid-cols-3 gap-x-[30px] gap-y-[20px] mt-5">
          {adminManagementCardData.map((item, i) => (
            <Card 
            key={i} 
            bgColor={item.bgColor} 
            title={item.title} 
            data={item.data} 
            iconPath={item.iconPath}
            isLoading={isLoading}
             />
          ))}
        </div>
      </div>

      <div>
        <AdminTable
          header="Admin Info"
          anchorEl={anchorEl}
          searchQuery={searchQuery}
          filteredAdmin={filteredAdmins}
          handleOpen={handleOpen}
          handleClose={handleClose}
          handleSearchInputChange={handleSearchInputChange}
          userMenuOpen={userMenuOpen}
          inviteModal={inviteModal}
          handleInviteModalOpen={handleInviteModalOpen}
          handleInviteModalClose={handleInviteModalClose}
          handleStatusModalClose={handleStatusModalClose}
          adminFirstName={adminFirstName}
          adminLastName={adminLastName}
          adminEmail={adminEmail}
          handleAdminFirstNameChange={handleAdminFirstNameChange}
          handleAdminLastNameChange={handleAdminLastNameChange}
          handleAdminEmailChange={handleAdminEmailChange}
          handleAdminActivate={handleAdminActivate}
          handleAdminDeactivate={handleAdminDeactivate}
          handleInviteAdmin={handleInviteAdmin}
          statusModal={statusModal}
        />
      </div>

    </div>
  )
}
