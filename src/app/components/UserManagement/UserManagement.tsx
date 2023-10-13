import UserManagementService from '@/utils/services/userManagement.service';
import React from 'react'
import Card from '../Card/Card'
import Table from '../Table/Table'


export default function UserManagement() {
  const {
    userMenuOpen,
    anchorEl,
    searchQuery,
    filteredUsers,
    handleOpen,
    handleClose,
    handleSearchInputChange,
    isLoading,
    userManagementCardData,
    handleUserActivate,
    handleUserDeactivate
  } = UserManagementService();

  return (
    <div className='space-y-7'>
      <div className="rounded-[10px] border border-white h-auto w-full p-5"
        style={{ background: "rgba(255, 255, 255, 0.72)" }}
      >
        <h1 className="text-[#121F3E] font-[700] text-[1.3vw]">Overview</h1>
        <div className="grid grid-cols-3 gap-x-[30px] gap-y-[20px] mt-5">
          {userManagementCardData.map((item, i) => (
            <Card key={i} bgColor={item.bgColor} title={item.title} data={item.data} iconPath={item.iconPath} isLoading={isLoading} />
          ))}
        </div>
      </div>

      <div>
        <Table
          header="User Info"
          anchorEl={anchorEl}
          searchQuery={searchQuery}
          filteredUsers={filteredUsers}
          handleOpen={handleOpen}
          handleClose={handleClose}
          handleSearchInputChange={handleSearchInputChange}
          userMenuOpen={userMenuOpen}
          handleUserActivate={handleUserActivate}
          handleUserDeactivate={handleUserDeactivate}
        />
      </div>

    </div>
  )
}
