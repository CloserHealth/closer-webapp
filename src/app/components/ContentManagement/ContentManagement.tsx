import { ContentManagementCardData } from '@/utils/data/data'
import { Router } from 'next/router'
import React from 'react'
import { ContentOutlinedButton } from '../Buttons/Buttons'
import Card from '../Card/Card';
import { useRouter } from 'next/navigation';
import ContentManagementService from '@/utils/services/contentManagement.service';

export default function ContentManagement() {
  const router = useRouter();
  const contentAction = [
    {
      title: "Add/ Edit Daily Questions",
      link: "/dashboard/content-management/daily-question"
    },
    {
      title: "Add/ Edit Daily Learning",
      link: "/dashboard/content-management/learning"
    },
    {
      title: "Add/ Edit Articles",
      link: "/dashboard/content-management/articles"
    },
    {
      title: "Add/ Edit Challenges",
      link: "/dashboard/content-management/challenges"
    },
  ]

  const {
    contentManagementCardData,
    isLoading,
    allQuestions
  } = ContentManagementService();

  return (
    <div className='space-y-7'>
      <div className="rounded-[10px] border border-white h-auto w-full p-5"
        style={{ background: "rgba(255, 255, 255, 0.72)" }}
      >
        <h1 className="text-[#121F3E] font-[700] text-[1.3vw]">Overview</h1>
        <div className="grid grid-cols-3 gap-x-[30px] gap-y-[20px] mt-5">
          {contentManagementCardData.map((item, i) => (
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

      <div className="rounded-[10px] border border-white h-[500px] w-full p-5"
        style={{ background: "rgba(255, 255, 255, 0.72)" }}
      >
        <h1 className="text-[#121F3E] font-[700] text-[1.3vw]">Action</h1>
        <div className="grid grid-cols-3 gap-x-7 gap-y-7 mt-7">
          {contentAction.map((item, i) => (
            <ContentOutlinedButton key={i} content={item.title} isRounded={false} onClickButton={() => router.push(item.link)} />
          ))}
        </div>
      </div>
    </div>
  )
}
