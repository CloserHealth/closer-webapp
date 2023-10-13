import API from "@/constants/api.constant";
import Assets from "@/constants/assets.constant";
import useRequest from "@/services/request.service";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CommunityManagementService = () => {
  const { isLoading, makeRequest } = useRequest();
  const [userMenuOpen, setUserMenuOpen] = useState<Array<boolean>>([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [cardData, setCardData] = useState<any>(null);
  const [allRings, setAllRings] = useState<any>();

  // Fetch Rings  Data
  const handleFetch = async () => {
    try {
      const res = await makeRequest({
        method: "GET",
        url: `${API.rings}?include=creator`,
      });

      const { message, data } = res.data;

      if (message === "Data fetched successfully!") {
        // Check if 'data' exists and it has 'users' property as an array
        if (data && Array.isArray(data?.rings)) {
          setCardData(data?.stat);
          setAllRings(data?.rings);
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

  // Community Card data
  const communityManagementCardData: any[] = [
    {
      bgColor: "rgba(223, 212, 254, 0.27)",
      title: "Total Rings",
      data: cardData?.total_rings,
      iconPath: Assets.purpleIcon,
    },
    {
      bgColor: "rgba(254, 235, 193, 0.27)",
      title: "Active Rings",
      data: cardData?.active_rings,
      iconPath: Assets.orangeIcon,
    },
    {
      bgColor: "rgba(253, 213, 236, 0.27)",
      title: "Inactive Rings",
      data: cardData?.inactive_rings,
      iconPath: Assets.pinkIcon,
    },
  ];

  const handleOpen = (event: any, userId: number) => {
    setAnchorEl(event.currentTarget);
    event.stopPropagation();

    // Set the specific UserMenu state to open for the clicked user row
    const updatedUserMenuOpen = [...userMenuOpen];
    updatedUserMenuOpen[userId] = true;
    setUserMenuOpen(updatedUserMenuOpen);
  };

  const handleClose = () => {
    setUserMenuOpen(Array(allRings.length).fill(false));
    setAnchorEl(null);
  };

  // Function to handle the search input change
  const handleSearchInputChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchQuery(event.target.value);
  };

  const filteredRings = allRings?.filter((ring: any) => {
    const nameMatch = ring.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const statusMatch = ring.status
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const creatorFirstnameMatch = ring.creator.firstname
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const creatorLastnameMatch = ring.creator.lastname
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return (
      nameMatch || statusMatch || creatorFirstnameMatch || creatorLastnameMatch
    );
  });

  // Tab Switch
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabClick = (index: React.SetStateAction<number>) => {
    setActiveTab(index);
  };


   // Delete a ring
   const handleDelete = async (ringId: string) => {
    try {
      const res = await makeRequest({
        method: "DELETE",
        url: `${API.rings}/${ringId}`,
      });
  
      const { message } = res.data;
  
      if (message === "Ring deleted successfully!") {
        toast.success(message);
        handleFetch();
        handleClose(); // Close the menu after deleting
      }
    } catch (err) {
      console.log("Error deleting ring:", err);
    }
  };


    // Activate a ring
    const handleRingActivate = async (ringId: string, ringStatus: string) => {
      try {
        const res = await makeRequest({
          method: "PATCH",
          url: `${API.rings}/${ringId}/${ringStatus}`,
        });
    
        const { message } = res.data;
    
        if (message === "Ring updated successfully!") {
          toast.success(message);
          handleFetch();
          handleClose(); // Close the menu after deleting
        }
      } catch (err) {
        console.log("Error Updating ring status:", err);
      }
    };


    // Deactivate a ring
    const handleRingDeactivate = async (ringId: string, ringStatus: string) => {
      try {
        const res = await makeRequest({
          method: "PATCH",
          url: `${API.rings}/${ringId}/${ringStatus}`,
        });
    
        const { message } = res.data;
    
        if (message === "Ring updated successfully!") {
          toast.success(message);
          handleFetch();
          handleClose(); // Close the menu after deleting
        }
      } catch (err) {
        console.log("Error Updating ring status:", err);
      }
    };
  

  return {
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
  };
};

export default CommunityManagementService;
