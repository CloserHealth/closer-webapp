import API from "@/constants/api.constant";
import Assets from "@/constants/assets.constant";
import { catchAsync } from "@/helpers/api.helper";
import useRequest from "@/services/request.service";
import { CardProps } from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const UserManagementService = () => {
  const { isLoading, makeRequest } = useRequest();
  const [allUsers, setAllUsers] = useState<any>();
  const [userMenuOpen, setUserMenuOpen] = useState<Array<boolean>>([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [cardData, setCardData] = useState<any>(null);


    // Fetch User management card Data
    const handleFetch = async () => {
      try {
        const res = await makeRequest({
          method: "GET",
          url: API.users,
        });
    
        const { message, data } = res.data;
    
        if (message === "Data fetched successfully!") {
          // Check if 'data' exists and it has 'users' property as an array
          if (data && Array.isArray(data.users)) {
            setCardData(data);
            setAllUsers(data?.users);
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


  // Activate a User
  const handleUserActivate = async (userId: string) => {
    try {
      const res = await makeRequest({
        method: "PATCH",
        url: `${API.users}/${userId}/toggle`,
      });

      const { message } = res.data;

      if (message === "User updated successfully!") {
        toast.success(message);
        handleFetch();
        handleClose(); // Close the menu after updating status
      }
    } catch (err) {
      console.log("Error Updating admin status:", err);
    }
  };

  // Deactivate a User
  const handleUserDeactivate = async (userId: string) => {
    try {
      const res = await makeRequest({
        method: "PATCH",
        url: `${API.users}/${userId}/toggle`,
      });

      const { message } = res.data;

      if (message === "User updated successfully!") {
        toast.success(message);
        handleFetch();
        handleClose(); // Close the menu after updating status
      }
    } catch (err) {
      console.log("Error Updating admin status:", err);
    }
  };


// Menu Function
  const handleOpen = (event: any, userId: number) => {
    setAnchorEl(event.currentTarget);
    event.stopPropagation();

    // Set the specific UserMenu state to open for the clicked user row
    const updatedUserMenuOpen = [...userMenuOpen];
    updatedUserMenuOpen[userId] = true;
    setUserMenuOpen(updatedUserMenuOpen);
  };
  const handleClose = () => {
    setUserMenuOpen(Array(allUsers.length).fill(false));
    setAnchorEl(null);
  };


   // Function to handle the search input change
   const handleSearchInputChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = allUsers?.filter((user: any) => {
    const firstnameMatch = user.firstname
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const lastnameMatch = user.lastname
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const statusMatch = user.status
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const emailMatch = user.email
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return firstnameMatch || lastnameMatch || statusMatch || emailMatch;
  });
  


  // User Management Card data
  const userManagementCardData: any[] = [
    {
      bgColor: "rgba(223, 212, 254, 0.27)",
      title: "Total Users",
      data: cardData?.stat?.total_users,
      iconPath: Assets.purpleIcon,
    },
    {
      bgColor: "rgba(254, 235, 193, 0.27)",
      title: "Active Users",
      data: cardData?.stat?.active_users,
      iconPath: Assets.orangeIcon,
    },
    {
      bgColor: "rgba(253, 213, 236, 0.27)",
      title: "Inactive Users",
      data: cardData?.stat?.inactive_users,
      iconPath: Assets.pinkIcon,
    },
  ];

  return {
    userMenuOpen,
    anchorEl,
    searchQuery,
    filteredUsers,
    handleOpen,
    handleClose,
    handleSearchInputChange,
    isLoading,
    userManagementCardData,
    handleUserActivate,
    handleUserDeactivate
  };
};

export default UserManagementService;
