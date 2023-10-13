"use client"

import { AppButton } from '@/app/components/Buttons/Buttons'
import TextArea from '@/app/components/Fields/TextArea'
import Question from '@/app/components/Question/Question'
import React from 'react'

export default function articlesPage() {
    const learnings = [
        {
            content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit fermentum arcu, purus feugiat aliquet.
            Ut arcu, risus rhoncus, gravida accumsan fermentum. Pellentesque iaculis quis orci arcu quis. Diam, et nulla lacus, sit arcu leo arcu. 
             Lectus scelerisque mauris, morbi eu tortor, urna suscipit. Quis sed ac eu erat. urna, id duis tortor nulla posuere mattis in faucibus. `,
        },
        {
            content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit fermentum arcu, purus feugiat aliquet.
            Ut arcu, risus rhoncus, gravida accumsan fermentum. Pellentesque iaculis quis orci arcu quis. Diam, et nulla lacus, sit arcu leo arcu. 
             Lectus scelerisque mauris, morbi eu tortor, urna suscipit. Quis sed ac eu erat. urna, id duis tortor nulla posuere mattis in faucibus. `,
        },
    ]
    return (
        <div>
            <div className="rounded-[10px] border border-white h-[500px] w-full p-5"
                style={{ background: "rgba(255, 255, 255, 0.72)" }}
            >
                <div className="w-full items-start justify-between flex">
                    <h1 className="text-[#121F3E] font-[700] text-[1.3vw]">Articles</h1>
                    <div>
                        <AppButton content="Add New" isRounded={false} onClickButton={() => { } } isLoading={undefined} />
                    </div>
                </div>

                {/* Questions */}
                <div className="mt-7 space-y-5 w-full">
                    {learnings.map((item, i) => (
                        <div key={i} className="border border-[#E1E5EB] rounded-[5px] bg-[#F6F6F6] h-auto w-full p-4">
                            <TextArea
                                id="text"
                                label=""
                                placeholder="Write Article..."
                                value={''}
                                onInputChange={() => { }}
                                require={false}
                                padding="px-5 py-5"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
