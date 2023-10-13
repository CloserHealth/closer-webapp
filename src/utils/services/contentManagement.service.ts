import API from "@/constants/api.constant";
import Assets from "@/constants/assets.constant";
import useRequest from "@/services/request.service";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ContentManagementService = () => {
  const { isLoading, makeRequest } = useRequest();
  const [cardData, setCardData] = useState<any>(null);
  const [allQuestions, setAllQuestions] = useState<any>(0);
  const [allLearnings, setAllLearnings] = useState<any>(0);
  const [allArticles, setAllArticles] = useState<any>(0);
  const [allChallenges, setAllChallenges] = useState<any>(0);

  // Fetch Rings  Data
  const handleFetch = async () => {
    try {
      const res = await makeRequest({
        method: "GET",
        url: API.getQuestions,
      });

      const { message, data } = res.data;
      console.log("data", data);

      if (message === "Data fetched successfully!") {
        // Check if 'data' exists and it has 'users' property as an array
        if (data && Array.isArray(data?.questions)) {
          setAllQuestions(data?.questions.length);
        } else {
          console.log("Invalid or missing 'users' data in the API response.");
        }
      }
    } catch (err) {
      console.log("Error fetching users:", err);
    }
  };

  // Fetch Rings  Data
  const handleFetchLearnings = async () => {
    try {
      const res = await makeRequest({
        method: "GET",
        url: API.getLearnings,
      });

      const { message, data } = res.data;

      if (message === "Data fetched successfully!") {
        setAllLearnings(data?.learnings.length);
      }
    } catch (err) {
      console.log("Error fetching users:", err);
    }
  };

  // Fetch Rings  Data
  const handleFetchArticles = async () => {
    try {
      const res = await makeRequest({
        method: "GET",
        url: API.getArticles,
      });

      const { message, data } = res.data;

      if (message === "Data fetched successfully!") {
        setAllArticles(data?.articles.length);
      }
    } catch (err) {
      console.log("Error fetching users:", err);
    }
  };

  // Fetch Rings  Data
  const handleFetchChallenges = async () => {
    try {
      const res = await makeRequest({
        method: "GET",
        url: API.getChallenges,
      });

      const { message, data } = res.data;

      if (message === "Data fetched successfully!") {
        setAllChallenges(data?.challenges.length);
      }
    } catch (err) {
      console.log("Error fetching users:", err);
    }
  };

  useEffect(() => {
    handleFetch();
    handleFetchLearnings();
    handleFetchArticles();
    handleFetchChallenges();
  }, []);

  // Community Card data
  const contentManagementCardData = [
    {
      bgColor: "rgba(223, 212, 254, 0.27)",
      title: "Daily Questions",
      data: allQuestions,
      iconPath: Assets.purpleIcon,
    },
    {
      bgColor: "rgba(254, 235, 193, 0.27)",
      title: "Daily Learning",
      data: allLearnings,
      iconPath: Assets.orangeIcon,
    },
    {
      bgColor: "rgba(253, 213, 236, 0.27)",
      title: "Articles",
      data: allArticles,
      iconPath: Assets.pinkIcon,
    },
    {
      bgColor: "rgba(223, 212, 254, 0.27)",
      title: "Challenges",
      data: allChallenges,
      iconPath: Assets.purpleIcon,
    },
  ];

  return {
    contentManagementCardData,
    isLoading,
    allQuestions,
  };
};

export default ContentManagementService;
