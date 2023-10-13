import { FadeIn, ZoomInOut } from '@/app/components/Transitions/Transitions'
import { ModalProps, QuestionBaseModalProps, StatusModalProps } from '@/utils/types/types'
import React from 'react'
import { AppButton, CloseAppButtonModal } from '../Buttons/Buttons';
import Image from 'next/image';
import { IconButton } from '@mui/material';
import Assets from '@/constants/assets.constant';
import TextField from '../Fields/TextField';
import DropZone from '../DropZone/DropZone';

export function AppModal({ header, text, buttonText, onClick, onClose }: ModalProps) {
    return (
        <FadeIn fullWidth>
            <div className='z-50 w-full min-h-[100vh] fixed top-o right-0 left-0 bottom-0 flex justify-center items-center' onClick={onClose} style={{ background: "rgba(43, 10, 96, 0.63)" }}>
                <div className="rounded-[10px] px-[120px] py-[100px] bg-white space-y-12">
                    <div className='text-center space-y-2'>
                        <h1 className="text-primaryColor font-[600] text-[2.5vw]">{header}</h1>
                        <p className="text-[#868686] text-[1vw] font-[400] w-[26vw] mx-auto">{text}</p>
                    </div>
                    <div className='px-20'>
                        <AppButton content={buttonText} isRounded={false} onClickButton={onClick} isLoading={undefined} />
                    </div>
                </div>
            </div>
        </FadeIn>
    )
}


export function QuestionBaseModal({ text, buttonText, buttonTextClose, onClick, onClose }: QuestionBaseModalProps) {
    return (
        <div className='z-50 w-full min-h-[100vh] fixed top-o right-0 left-0 bottom-0 flex justify-center items-center' onClick={onClose} style={{ background: "rgba(43, 10, 96, 0.63)" }}>
            <div className="rounded-[10px] p-[60px] bg-white space-y-12">
                <p className="text-[#404F56] text-[1.1vw] font-[400] text-center mx-auto">{text}</p>
                <div className='w-full flex items-center space-x-7'>
                    <AppButton content={buttonText} isRounded={false} onClickButton={onClick} isLoading={undefined} />
                    <CloseAppButtonModal content={buttonTextClose} onClickButtonClose={onClose} />
                </div>
            </div>
        </div>
    )
}


export function StatusModal({ text, header, icon, onClose }: StatusModalProps) {
    return (
        <div className='z-50 w-full min-h-[100vh] fixed top-o right-0 left-0 bottom-0 flex justify-center items-center' onClick={onClose} style={{ background: "rgba(43, 10, 96, 0.63)" }}>
            <div className="rounded-[10px] py-[60px] px-[150px] bg-white space-y-4 flex flex-col items-center justify-center">
                <Image src={icon} alt="" width={40} height={40} />
                <div className='text-center space-y-5'>
                    <h1 className="text-primaryColor font-[600] text-[1.8vw]">{header}</h1>
                    <p className="text-[#1E1E1E] text-[1.1vw] font-[400] mx-auto">{text}</p>
                </div>
            </div>
        </div>
    )
}


export function AddProjectManagementModal(
    {
        header,
        text,
        buttonText,
        onClickEditSave,
        onClickAddNew,
        onClose,
        pointsValue,
        projectNameValue,
        descriptionValue,
        imagePathValue,
        onChangeProjectName,
        onChangePoint,
        onChangeDescription,
        onDrop,
        getRootProps,
        getInputProps,
        isDragActive,
        selectedFile,
        isLoading
    }: any) {
    return (
        <div className='z-50 w-full min-h-[100vh] fixed top-o right-0 left-0 bottom-0 flex justify-center items-center' style={{ background: "rgba(43, 10, 96, 0.63)" }}>
            <div className="rounded-[10px] px-5 pt-5 pb-7 bg-white sm:w-[595px] w-full">
                <div className='flex justify-between items-center'>
                    <h1 className="text-primaryColor font-[600] text-[1.3vw]">{header}</h1>
                    <IconButton onClick={onClose}>
                        <Image src={Assets.closeIcon} alt="" width={17} height={17} />
                    </IconButton>
                </div>
                <div className="space-y-5 mt-7 mb-12">
                    <TextField
                        id="projectName"
                        type="text"
                        label="Project Name"
                        placeholder="Enter project name"
                        value={projectNameValue}
                        onInputChange={onChangeProjectName}
                        require={true}
                        isPassword={false}
                        withBackground={false}
                        readOnly={false}
                    />
                    <TextField
                        id="pointNeeded"
                        type="text"
                        label="Points Needed"
                        placeholder="Enter"
                        value={pointsValue}
                        onInputChange={onChangePoint}
                        require={true}
                        isPassword={false}
                        withBackground={false}
                        readOnly={false}
                    />
                    <TextField
                        id="description"
                        type="text"
                        label="Description"
                        placeholder="Enter description"
                        value={descriptionValue}
                        onInputChange={onChangeDescription}
                        require={true}
                        isPassword={false}
                        withBackground={false}
                        readOnly={false}
                    />
                    <div>
                        <p className="block mb-2 text-[1vw] font-medium text-gray-900 dark:text-white">Image</p>
                        <DropZone
                            selectedFile={selectedFile}
                            onDrop={onDrop}
                            getInputProps={getInputProps}
                            getRootProps={getRootProps}
                            isDragActive={isDragActive}
                            imagePathValue={imagePathValue}
                            header={header}
                        />
                    </div>
                </div>
                <div>
                    <AppButton content={buttonText} isRounded={false} onClickButton={onClickAddNew} isLoading={isLoading} />
                </div>
            </div>
        </div>
    )
}



export function EditProjectManagementModal(
    {
        header,
        text,
        buttonText,
        onClickEdit,
        onClose,
        editPointsValue,
        editProjectNameValue,
        editDescriptionValue,
        imagePathValue,
        onChangeEditProjectName,
        onChangeEditPoint,
        onChangeEditDescription,
        onDrop,
        getRootProps,
        getInputProps,
        isDragActive,
        selectedFile,
        isLoading
    }: any) {
    return (
        <div className='z-50 w-full min-h-[100vh] fixed top-o right-0 left-0 bottom-0 flex justify-center items-center' style={{ background: "rgba(43, 10, 96, 0.63)" }}>
            <div className="rounded-[10px] px-5 pt-5 pb-7 bg-white sm:w-[595px] w-full">
                <div className='flex justify-between items-center'>
                    <h1 className="text-primaryColor font-[600] text-[1.3vw]">{header}</h1>
                    <IconButton onClick={onClose}>
                        <Image src={Assets.closeIcon} alt="" width={17} height={17} />
                    </IconButton>
                </div>
                <div className="space-y-5 mt-7 mb-12">
                    <TextField
                        id="projectName"
                        type="text"
                        label="Project Name"
                        placeholder="Enter project name"
                        value={editProjectNameValue}
                        onInputChange={onChangeEditProjectName}
                        require={true}
                        isPassword={false}
                        withBackground={false}
                        readOnly={false}
                    />
                    <TextField
                        id="pointNeeded"
                        type="text"
                        label="Points Needed"
                        placeholder="Enter"
                        value={editPointsValue}
                        onInputChange={onChangeEditPoint}
                        require={true}
                        isPassword={false}
                        withBackground={false}
                        readOnly={false}
                    />
                    <TextField
                        id="description"
                        type="text"
                        label="Description"
                        placeholder="Enter description"
                        value={editDescriptionValue}
                        onInputChange={onChangeEditDescription}
                        require={true}
                        isPassword={false}
                        withBackground={false}
                        readOnly={false}
                    />
                    <div>
                        <p className="block mb-2 text-[1vw] font-medium text-gray-900 dark:text-white">Image</p>
                        <DropZone
                            selectedFile={selectedFile}
                            onDrop={onDrop}
                            getInputProps={getInputProps}
                            getRootProps={getRootProps}
                            isDragActive={isDragActive}
                            imagePathValue={imagePathValue}
                            header={header}
                        />
                    </div>
                </div>
                <div>
                    <AppButton content={buttonText} isRounded={false} onClickButton={onClickEdit} isLoading={isLoading} />
                </div>
            </div>
        </div>
    )
}




export function CreateNewGoalModal(
    {
        header,
        text,
        buttonText,
        // getRootProps,
        // onDrop,
        // getInputProps,
        // isDragActive,
        // imagePathValue,
        // selectedFile,
        onClose,
    }: any) {
    return (
        <div className='z-50 w-full min-h-[100vh] fixed top-o right-0 left-0 bottom-0 flex justify-center items-center' style={{ background: "rgba(43, 10, 96, 0.63)" }}>
            <div className="rounded-[10px] px-5 pt-5 pb-7 bg-white sm:w-[595px] w-full">
                <div className='flex justify-between items-center'>
                    <h1 className="text-primaryColor font-[600] text-[1.3vw]">{header}</h1>
                    <IconButton onClick={onClose}>
                        <Image src={Assets.closeIcon} alt="" width={17} height={17} />
                    </IconButton>
                </div>
                <div className="space-y-5 mt-7 mb-12">
                    <TextField
                        id="goalName"
                        type="text"
                        label="Goal Name"
                        placeholder="Enter goal name"
                        value={''}
                        onInputChange={() => {}}
                        require={true}
                        isPassword={false}
                        withBackground={false}
                        readOnly={false}
                    />
                    <TextField
                        id="pointNeeded"
                        type="text"
                        label="Points Needed"
                        placeholder="Enter"
                        value={''}
                        onInputChange={() => {}}
                        require={true}
                        isPassword={false}
                        withBackground={false}
                        readOnly={false}
                    />
                    <TextField
                        id="goalTips"
                        type="text"
                        label="Goal Tips"
                        placeholder="Enter Tips"
                        value={''}
                        onInputChange={() => {}}
                        require={true}
                        isPassword={false}
                        withBackground={false}
                        readOnly={false}
                    />
                    <TextField
                        id="duration"
                        type="text"
                        label="Duration"
                        placeholder="Enter description"
                        value={''}
                        onInputChange={() => {}}
                        require={true}
                        isPassword={false}
                        withBackground={false}
                        readOnly={false}
                    />
                    <div>
                        <p className="block mb-2 text-[1vw] font-medium text-gray-900 dark:text-white">Image</p>
                        {/* <DropZone
                            selectedFile={selectedFile}
                            onDrop={onDrop}
                            getInputProps={getInputProps}
                            getRootProps={getRootProps}
                            isDragActive={isDragActive}
                            imagePathValue={imagePathValue}
                            header={header}
                        /> */}
                    </div>
                </div>
                <div>
                    <AppButton content={buttonText} isRounded={false} onClickButton={() => { } } isLoading={undefined} />
                </div>
            </div>
        </div>
    )
}


export function InviteAdminModal(
    {
        header,
        text,
        buttonText,
        handleSendInvite,
        onClose,
        adminFirstName,
        adminLastName,
        adminEmail,
        onChangeAdminFirstName,
        onChangeAdminLastName,
        onChangeAdminEmail,
    }: any) {
    return (
            <div className='z-50 w-full min-h-[100vh] fixed top-o right-0 left-0 bottom-0 flex justify-center items-center' style={{ background: "rgba(43, 10, 96, 0.63)" }}>
                <div className="rounded-[10px] px-5 pt-5 pb-7 bg-white sm:w-[595px] w-full">
                    <div className='flex justify-between items-center'>
                        <h1 className="text-primaryColor font-[600] text-[1.3vw]">{header}</h1>
                        <IconButton onClick={onClose}>
                            <Image src={Assets.closeIcon} alt="" width={17} height={17} />
                        </IconButton>
                    </div>
                    <div className="space-y-5 mt-7 mb-12">
                        <TextField
                            id="firstname"
                            type="text"
                            label="Admin First Name"
                            placeholder="Enter"
                            value={adminFirstName}
                            onInputChange={onChangeAdminFirstName}
                            require={true}
                            isPassword={false}
                            withBackground={false}
                            readOnly={false}
                        />
                        <TextField
                            id="lastname"
                            type="text"
                            label="Admin Last Name"
                            placeholder="Enter"
                            value={adminLastName}
                            onInputChange={onChangeAdminLastName}
                            require={true}
                            isPassword={false}
                            withBackground={false}
                            readOnly={false}
                        />
                        <TextField
                            id="email"
                            type="email"
                            label="Email Address"
                            placeholder="Enter email"
                            value={adminEmail}
                            onInputChange={onChangeAdminEmail}
                            require={true}
                            isPassword={false}
                            withBackground={false}
                            readOnly={false}
                        />
                    </div>
                    <div>
                        <AppButton content={buttonText} isRounded={false} onClickButton={handleSendInvite} isLoading={undefined} />
                    </div>
                </div>
            </div>
    )
}