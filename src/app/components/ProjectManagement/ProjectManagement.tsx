import Assets from '@/constants/assets.constant'
import React from 'react'
import { AppButton, OutlinedAppButton2 } from '../Buttons/Buttons'
import Card from '../Card/Card';
import Image from 'next/image';
import { Line } from 'rc-progress';
import { AddProjectManagementModal, EditProjectManagementModal, StatusModal } from '../Modals/Modals';
import ProjectsManagementService from '@/utils/services/projectManagement.service';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import EmptyStateView from '../EmptyStateView/EmptyStateView';


export default function ProjectManagement() {
  const {
    projectManagementCardData,
    allProjects,
    isLoading,
    projectData,
    setProjectData,
    handleSaveModalClose,
    handleAddNewProjectModalOpen,
    handleAddNewProjectModalClose,
    getRootProps,
    getInputProps,
    isDragActive,
    addProjectModal,
    saveModal,
    addedModal,
    editProjectModal,
    handleEditModalClose,
    selectedFile,
    onDrop,
    addProjectName,
    addProjectPoint,
    addDescription,
    handleAddProjectImageChange,
    handleAddProjectNameChange,
    handleAddProjectPointChange,
    handleAddDescriptionChange,
    handleAddProject,
    handleEditProject,
    handleEditProjectImageChange,
    handleEditProjectNameChange,
    handleEditProjectPointChange,
    handleEditDescriptionChange,
    editProjectName,
    editProjectPoint,
    editDescription,
    handleEditModalOpen,
    editedProjectId,
  } = ProjectsManagementService();

  return (
    <>
      <div className={`${projectData.length > 0 && 'space-y-7'}`}>
        <div className="rounded-[10px] border border-white h-auto w-full p-5"
          style={{ background: "rgba(255, 255, 255, 0.72)" }}
        >
          <h1 className="text-[#121F3E] font-[700] text-[1.3vw]">Overview</h1>
          <div className="grid grid-cols-3 gap-x-[30px] gap-y-[20px] mt-5">
            {projectManagementCardData.map((item: any, i: any) => (
              <Card
                key={i}
                isLoading={isLoading}
                bgColor={item.bgColor}
                title={item.title}
                data={item.data}
                iconPath={item.iconPath}
              />
            ))}
          </div>
        </div>

        {projectData.length === 0 ? (
          <div className="mt-16">
            <EmptyStateView
              icon={Assets.notFound}
              title="No Project Found"
              subtitle=''
              actions={<AppButton content="Upload Project" onClickButton={handleAddNewProjectModalOpen} isRounded={false} isLoading={undefined} />}
            />
          </div>
        ) : (
          <>
            {projectData.map((project: any, i: React.Key | null | undefined) => (
              <div key={project.id} className="rounded-[10px] border border-white h-auto w-full px-5 pt-5 pb-28"
                style={{ background: "rgba(255, 255, 255, 0.72)" }}
              >
                <div className="flex items-center justify-between">
                  <h1 className="text-[#121F3E] font-[700] text-[1.3vw]">Project in Progress</h1>
                  <div className="flex items-start space-x-3 w-[36vw]">
                    <AppButton content="Edit Project" onClickButton={handleEditModalOpen.bind(null, project.id)} isRounded={false} isLoading={undefined} />
                    <OutlinedAppButton2 content="Add New Project" onClickButton={handleAddNewProjectModalOpen} isRounded={false} />
                  </div>
                </div>

                <div>
                  <div className="w-full h-[286px] rounded-[10px] mt-10 bg-top">
                    <Image src={project.imagePath} alt="" width={2000} height={2000} style={{ objectFit: "cover", backgroundPosition: "top", width: "100%", height: "100%", borderRadius: "10px" }} />
                  </div>
                  <p className="mt-5 text-[#1E1E1E] font-[500] text-[1vw]">{project.description}</p>

                  <div className="space-y-3 mt-7">
                    <p className="text-[#1E1E1E] font-[600] text-[1vw]">{project.title}</p>
                    <Line percent={project.percentage} strokeWidth={1} strokeColor="#2B0A60" />
                  </div>

                  <div className="mt-7 flex items-center space-x-7">
                    <p className='text-[#484848] font-[400] text-[0.9vw]'>{project.donatedPoint} points donated of {project.donationPoint} points</p>
                    <div className="flex space-x-1 items-center">
                      <div className="rounded-full w-[5px] h-[5px] bg-[#D9D9D9]"></div>
                      <p className='text-[#484848] font-[400] text-[0.9vw]'><span className='text-[#1E1E1E]'>{project.donor}</span> Donors</p>
                    </div>
                  </div>
                </div>


                {/* Projects Modal */}
                {editProjectModal && editedProjectId === project.id && (
                  <EditProjectManagementModal
                    header="Edit Project"
                    text={''}
                    buttonText="Save Project"
                    onClickEdit={() => handleEditProject(project.id)}
                    onClose={handleEditModalClose}
                    editProjectNameValue={editProjectName}
                    editPointsValue={editProjectPoint}
                    editDescriptionValue={editDescription}
                    imagePathValue={selectedFile}
                    onChangeEditProjectName={handleEditProjectNameChange}
                    onChangeEditPoint={handleEditProjectPointChange}
                    onChangeEditDescription={handleEditDescriptionChange}
                    onChangeEditImage={handleEditProjectImageChange}
                    selectedFile={selectedFile}
                    onDrop={onDrop}
                    getRootProps={getRootProps}
                    getInputProps={getInputProps}
                    isDragActive={isDragActive}
                    isLoading={isLoading}
                  />
                )}
              </div>
            ))}
          </>
        )}


      </div>



      {addProjectModal && (
        <AddProjectManagementModal
          header="Add new Project"
          text={''}
          buttonText="Save Project"
          onClickAddNew={handleAddProject}
          onClose={handleAddNewProjectModalClose}
          projectNameValue={addProjectName}
          pointsValue={addProjectPoint}
          descriptionValue={addDescription}
          imagePathValue={selectedFile}
          onChangeProjectName={handleAddProjectNameChange}
          onChangePoint={handleAddProjectPointChange}
          onChangeDescription={handleAddDescriptionChange}
          onChangeImage={handleAddProjectImageChange}
          selectedFile={selectedFile}
          onDrop={onDrop}
          getRootProps={getRootProps}
          getInputProps={getInputProps}
          isDragActive={isDragActive}
          isLoading={isLoading}
        />
      )}

      {/* Status Modal */}
      {/* {saveModal && (
        <StatusModal
          icon={Assets.success}
          text="Changes saved Successfully"
          header="Saved"
          onClose={handleSaveModalClose}
        />
      )} */}

      {saveModal && (
        <StatusModal
          icon={Assets.success}
          text="Project added Successfully"
          header="Successful"
          onClose={handleSaveModalClose}
        />
      )}
    </>
  )
}
