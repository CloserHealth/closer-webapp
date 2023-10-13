import Assets from '@/constants/assets.constant';
import PeriodManagementService from '@/utils/services/periodManagement.service';
import React from 'react'
import EmptyStateView from '../EmptyStateView/EmptyStateView';
import PeriodTable from '../Table/PeriodTable'

export default function PeriodManagement() {
  const {
    userMenuOpen,
    anchorEl,
    searchQuery,
    phases,
    handleOpen,
    handleClose,
    handleSearchInputChange,
    deactivateModal,
    statusModal,
    handleStatusModalOpen,
    handleStatusModalClose,
    handleDeactivateModalOpen,
    handleDeactivateModalClose,
  } = PeriodManagementService();

  return (
    <div>
        {/* // <div className="mt-24">
        //   <EmptyStateView
        //     icon={Assets.notFound}
        //     title="No Phase Found"
        //     subtitle=''
        //     />
        // </div> */}

        <PeriodTable
          header="Phases"
          anchorEl={anchorEl}
          searchQuery={searchQuery}
          filteredPhases={phases}
          handleOpen={handleOpen}
          handleClose={handleClose}
          handleSearchInputChange={handleSearchInputChange}
          userMenuOpen={userMenuOpen}
          deactivateModal={deactivateModal}
          statusModal={statusModal}
          handleDeactivateModalOpen={handleDeactivateModalOpen}
          handleStatusModalOpen={handleStatusModalOpen}
          handleStatusModalClose={handleStatusModalClose}
          handleDeactivateModalClose={handleDeactivateModalClose}
        />

    </div>
  )
}
