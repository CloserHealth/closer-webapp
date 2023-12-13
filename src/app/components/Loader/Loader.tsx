import React from 'react'
import { InfinitySpin } from 'react-loader-spinner'

export default function Loader() {
    return (
        <div className="bg-white h-screen w-full flex justify-center items-center">
            <InfinitySpin
                width='200'
                color="#FFD4ED"
            />
        </div>
    )
}
