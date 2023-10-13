import API from "@/constants/api.constant";
import Assets from "@/constants/assets.constant";
import { catchAsync } from "@/helpers/api.helper";
import useRequest from "@/services/request.service";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AdminManagementService = () => {
  const { isLoading, makeRequest } = useRequest();
  const [cardData, setCardData] = useState<any>(null);
  const [allAdmins, setAllAdmins] = useState<any>();
  const [userMenuOpen, setUserMenuOpen] = useState<Array<boolean>>([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusModal, setStatusModal] = useState<boolean>(false);
  const [inviteModal, setInviteModal] = useState<boolean>(false);
  const [adminFirstName, setAdminFirstName] = useState<string>("");
  const [adminLastName, setAdminLastName] = useState<string>("");
  const [adminEmail, setAdminEmail] = useState<string>("");

  // Fetch Admins Data
  const handleFetch = async () => {
    try {
      const res = await makeRequest({
        method: "GET",
        url: API.admins,
      });

      const { message, data } = res.data;

      if (message === "Data fetched successfully!") {
        // Check if 'data' exists and it has 'data' property as an array
        if (data && Array.isArray(data?.admins)) {
          setCardData(data?.stat);
          setAllAdmins(data?.admins);
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

  // Activate an Admin
  const handleAdminActivate = async (adminId: string) => {
    try {
      const res = await makeRequest({
        method: "PATCH",
        url: `${API.adminStatus}/${adminId}/toggle`,
      });

      const { message } = res.data;

      if (message === "Admin updated successfully!") {
        toast.success(message);
        handleFetch();
        handleClose(); // Close the menu after deleting
      }
    } catch (err) {
      console.log("Error Updating admin status:", err);
    }
  };

  // Deactivate an Admin
  const handleAdminDeactivate = async (adminId: string) => {
    try {
      const res = await makeRequest({
        method: "PATCH",
        url: `${API.adminStatus}/${adminId}/toggle`,
      });

      const { message } = res.data;

      if (message === "Admin updated successfully!") {
        toast.success(message);
        handleFetch();
        handleClose(); // Close the menu after deleting
      }
    } catch (err) {
      console.log("Error Updating admin status:", err);
    }
  };

  // Invite an Admin
  const adminData = {
    firstname: adminFirstName,
    lastname: adminLastName,
    email: adminEmail,
  };

  const handleInviteAdmin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    catchAsync(
      async () => {
        const res = await makeRequest({
          method: "POST",
          url: API.createAdmin,
          data: adminData,
        });

        const { message } = res.data;
        if (message === "Admin created successfully!") {
          handleStatusModalOpen();
        }
      },
      (err: any) => {
        console.log(err);
      }
    );
  };

  // Admin Create onChange Functions
  const handleAdminFirstNameChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setAdminFirstName(event.target.value);
  };

  const handleAdminLastNameChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setAdminLastName(event.target.value);
  };

  const handleAdminEmailChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setAdminEmail(event.target.value);
  };

  // Admin Card data
  const adminManagementCardData: any[] = [
    {
      bgColor: "rgba(223, 212, 254, 0.27)",
      title: "Total Admin",
      data: cardData?.total_admin,
      iconPath: Assets.purpleIcon,
    },
    {
      bgColor: "rgba(254, 235, 193, 0.27)",
      title: "Active Admin",
      data: cardData?.active_admin,
      iconPath: Assets.orangeIcon,
    },
    {
      bgColor: "rgba(253, 213, 236, 0.27)",
      title: "Inactive Admin",
      data: cardData?.inactive_admin,
      iconPath: Assets.pinkIcon,
    },
    {
      bgColor: "rgba(254, 235, 193, 0.27)",
      title: "Pending Admin",
      data: cardData?.pending_admin,
      iconPath: Assets.pinkIcon,
    },
  ];

  // Function to handle the search input change
  const handleSearchInputChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchQuery(event.target.value);
  };

  const filteredAdmins = allAdmins?.filter((admin: any) => {
    const firstnameMatch = admin.firstname
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const lastnameMatch = admin.lastname
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const statusMatch = admin.status
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const emailMatch = admin.email
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return firstnameMatch || lastnameMatch || statusMatch || emailMatch;
  });

  const handleOpen = (event: any, userId: number) => {
    setAnchorEl(event.currentTarget);
    event.stopPropagation();

    // Set the specific UserMenu state to open for the clicked user row
    const updatedUserMenuOpen = [...userMenuOpen];
    updatedUserMenuOpen[userId] = true;
    setUserMenuOpen(updatedUserMenuOpen);
  };
  const handleClose = () => {
    setUserMenuOpen(Array(allAdmins.length).fill(false));
    setAnchorEl(null);
  };

  const handleInviteModalOpen = () => {
    handleClose();
    setInviteModal(true);
  };

  const handleInviteModalClose = () => {
    setInviteModal(false);
  };

  // Status Function
  const handleStatusModalOpen = () => {
    handleInviteModalClose();
    setStatusModal(true);
  };

  const handleStatusModalClose = () => {
    setStatusModal(false);
  };

  return {
    adminManagementCardData,
    inviteModal,
    handleInviteModalOpen,
    handleInviteModalClose,
    handleStatusModalClose,
    userMenuOpen,
    anchorEl,
    searchQuery,
    filteredAdmins,
    handleSearchInputChange,
    handleOpen,
    handleClose,
    adminFirstName,
    adminLastName,
    adminEmail,
    handleAdminFirstNameChange,
    handleAdminLastNameChange,
    handleAdminEmailChange,
    isLoading,
    handleAdminActivate,
    handleAdminDeactivate,
    handleInviteAdmin,
    statusModal,
  };
};

export default AdminManagementService;
