import React from 'react';
import Image from 'next/image';
import Assets from '@/constants/assets.constant';

export default function DropZone(
    { selectedFile,
        onDrop,
        getRootProps,
        getInputProps,
        isDragActive,
        imagePathValue,
        header
    }: any) {
    return (
        <>
            {selectedFile ? (
                <div
                    className={`rounded-[5px] border border-[#DDE2E5] w-full h-[104px] ${isDragActive ? 'bg-gray-100' : ''
                        }`}
                    {...getRootProps()}
                >
                    <input {...getInputProps()} />
                    <Image src={URL.createObjectURL(selectedFile)} alt="" width={1000} height={1000} style={{ objectFit: "cover", backgroundPosition: "top", width: "100%", height: "100%", borderRadius: "5px" }} />
                </div>
            ) : (
                <div
                    className={`rounded-[5px] border border-[#DDE2E5] w-full h-[104px] 
                    ${header !== "Edit Project" && !imagePathValue && 'flex flex-col justify-center items-center space-y-2'}`}
                    {...getRootProps()}
                >
                    <input {...getInputProps()} />
                    {header === "Edit Project" && imagePathValue ? (
                        <Image src={imagePathValue} alt="" width={1000} height={1000} style={{ objectFit: "cover", backgroundPosition: "top", width: "100%", height: "100%", borderRadius: "5px" }} />
                    ) : (
                        <>
                            <Image src={Assets.camera} alt="" width={30} height={30} />
                            <p className="text-[#979999] text-[1.1vw] font-[400]">Upload Image</p>
                        </>
                    )}
                </div>
            )}
        </>
    )
}
