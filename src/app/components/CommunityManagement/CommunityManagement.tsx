import Assets from '@/constants/assets.constant';
import CommunityManagementService from '@/utils/services/communityManagement.service';
import { ButtonBase } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react'
import { AppButton } from '../Buttons/Buttons';
import Card from '../Card/Card'
import EmptyStateView from '../EmptyStateView/EmptyStateView';
import Tab from '../Tab/Tab';
import CommunityTable from '../Table/CommunityTable'


export default function CommunityManagement() {
  const {
    userMenuOpen,
    anchorEl,
    searchQuery,
    handleOpen,
    handleClose,
    handleSearchInputChange,
    activeTab,
    handleTabClick,
    communityManagementCardData,
    isLoading,
    filteredRings,
    handleDelete,
    handleRingActivate,
    handleRingDeactivate,
  } = CommunityManagementService();
  const router = useRouter();

  return (
    <div className={`${filteredRings?.length > 0 && 'space-y-7'}`}>
      <div className="rounded-[10px] border border-white h-auto w-full p-5"
        style={{ background: "rgba(255, 255, 255, 0.72)" }}
      >
        <h1 className="text-[#121F3E] font-[700] text-[1.3vw]">Overview</h1>
        <div className="grid grid-cols-3 gap-x-[30px] gap-y-[20px] mt-5">
          {communityManagementCardData.map((item, i) => (
            <Card
              key={i}
              bgColor={item.bgColor}
              title={item.title}
              data={item?.data?.toLocaleString()}
              iconPath={item.iconPath}
              isLoading={isLoading}
            />
          ))}
        </div>
      </div>

      {filteredRings?.length === 0 ? (
           <div className="mt-16">
           <EmptyStateView
             icon={Assets.notFound}
             title="No Ring Found"
             subtitle=''
             actions={<AppButton content="Create Ring" onClickButton={() => router.push('/dashboard/community-management/create')} isRounded={false} isLoading={undefined} />}
           />
         </div>
      ) : (
        <div>
        <div className="text-[1vw] font-[400] flex items-center justify-start bg-white rounded-[10px] px-5 pt-3">
          <Tab title="All Communities" tab={0} activeTab={activeTab} onHandle={() => handleTabClick(0)} />
          <Tab title="Active" tab={1} activeTab={activeTab} onHandle={() => handleTabClick(1)} />
          <Tab title="Deactivated" tab={2} activeTab={activeTab} onHandle={() => handleTabClick(2)} />
          <Tab title="New Request (2)" tab={3} activeTab={activeTab} onHandle={() => handleTabClick(3)} />
          <Tab title="Rejected" tab={4} activeTab={activeTab} onHandle={() => handleTabClick(4)} />
        </div>

        {activeTab === 1 ? (
          <CommunityTable
            header="Phases"
            anchorEl={anchorEl}
            searchQuery={searchQuery}
            filteredRings={filteredRings}
            handleOpen={handleOpen}
            handleClose={handleClose}
            handleSearchInputChange={handleSearchInputChange}
            userMenuOpen={userMenuOpen}
          />
        ) : activeTab === 2 ? (
          <CommunityTable
            header="Phases"
            anchorEl={anchorEl}
            searchQuery={searchQuery}
            filteredRings={filteredRings}
            handleOpen={handleOpen}
            handleClose={handleClose}
            handleSearchInputChange={handleSearchInputChange}
            userMenuOpen={userMenuOpen}
          />
        ) : activeTab === 3 ? (
          <CommunityTable
            header="Phases"
            anchorEl={anchorEl}
            searchQuery={searchQuery}
            filteredRings={filteredRings}
            handleOpen={handleOpen}
            handleClose={handleClose}
            handleSearchInputChange={handleSearchInputChange}
            userMenuOpen={userMenuOpen}
            handleDelete={handleDelete}
          />
        ) : activeTab === 4 ? (
          <CommunityTable
            header="Phases"
            anchorEl={anchorEl}
            searchQuery={searchQuery}
            filteredRings={filteredRings}
            handleOpen={handleOpen}
            handleClose={handleClose}
            handleSearchInputChange={handleSearchInputChange}
            userMenuOpen={userMenuOpen}
            handleDelete={handleDelete}
          />
        ) : (
          <CommunityTable
            header="Community"
            anchorEl={anchorEl}
            searchQuery={searchQuery}
            filteredRings={filteredRings}
            handleOpen={handleOpen}
            handleClose={handleClose}
            handleSearchInputChange={handleSearchInputChange}
            userMenuOpen={userMenuOpen}
            handleDelete={handleDelete}
            handleRingActivate={handleRingActivate}
            handleRingDeactivate={handleRingDeactivate}
          />
        )}
      </div>
      )}

     

    </div>
  )
}
