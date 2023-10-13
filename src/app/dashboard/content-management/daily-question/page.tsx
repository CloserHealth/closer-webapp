"use client"

import { AppButton } from '@/app/components/Buttons/Buttons'
import Question from '@/app/components/Question/Question'
import API from '@/constants/api.constant';
import useRequest from '@/services/request.service';
import ContentManagementService from '@/utils/services/contentManagement.service';
import React, { useEffect, useState } from 'react'

export default function DailyQuestionPage() {
    const { isLoading, makeRequest } = useRequest();
    const [allQuestions, setAllQuestions] = useState<any>();

    // Fetch Rings  Data
  const handleFetch = async () => {
    try {
      const res = await makeRequest({
        method: "GET",
        url: API.getQuestions,
      });

      const { message, data } = res.data;

      if (message === "Data fetched successfully!") {
        // Check if 'data' exists and it has 'users' property as an array
        if (data && Array.isArray(data?.questions)) {
          setAllQuestions(data?.questions);
        } else {
          console.log("Invalid or missing 'users' data in the API response.");
        }
      }
    } catch (err) {
      console.log("Error fetching users:", err);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

    return (
        <div>
            <div className="rounded-[10px] border border-white h-[500px] w-full p-5"
                style={{ background: "rgba(255, 255, 255, 0.72)" }}
            >
                <div className="w-full items-start justify-between flex">
                    <h1 className="text-[#121F3E] font-[700] text-[1.3vw]">Today’s Question</h1>
                    <div>
                        <AppButton content="Add New Question" isRounded={false} onClickButton={() => { } } isLoading={undefined} />
                    </div>
                </div>

                {/* Questions */}
                <div className="mt-7 space-y-5 w-full">
                    {allQuestions?.map((item: any, i: any) => (
                        <Question key={i} item={item} />
                    ))}
                </div>
            </div>
        </div>
    )
}
