import API from "@/constants/api.constant";
import useRequest from "@/services/request.service";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const PeriodManagementService = () => {
  const { isLoading, makeRequest } = useRequest();
  const [phases, setPhases] = useState<any>();
  const [userMenuOpen, setUserMenuOpen] = useState(
    Array(phases?.length).fill(false)
  );
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPhase, setFilteredPhase] = useState([]);
  const [deactivateModal, setDeactivateModal] = useState<boolean>(false);
  const [statusModal, setStatusModal] = useState<boolean>(false);

  const handleOpen = (event: any, userId: number) => {
    setAnchorEl(event.currentTarget);
    event.stopPropagation();

    // Set the specific UserMenu state to open for the clicked user row
    const updatedUserMenuOpen = [...userMenuOpen];
    updatedUserMenuOpen[userId] = true;
    setUserMenuOpen(updatedUserMenuOpen);
  };
  const handleClose = () => {
    setUserMenuOpen(Array(phases.length).fill(false));
    setAnchorEl(null);
  };

  // Function to handle the search input change
  const handleSearchInputChange = (event: any) => {
    const query = event.target.value;
    setSearchQuery(query);
    filterPhases(query);
  };

  // Function to filter users based on the search query
  const filterPhases = (query: any) => {
    const filteredPhases = phases.filter((phase: { name: string; }) =>
      phase.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPhase(filteredPhase);
  };

  const handleDeactivateModalOpen = () => {
    handleClose();
    setDeactivateModal(true);
  };

  const handleDeactivateModalClose = () => {
    setDeactivateModal(false);
  };

  // Status Function
  const handleStatusModalOpen = () => {
    handleDeactivateModalClose();
    setStatusModal(true);
  };

  const handleStatusModalClose = () => {
    setStatusModal(false);
  };

  // Fetch User management card Data
  const handleFetch = async () => {
    try {
      const res = await makeRequest({
        method: "GET",
        url: API.periodPhases,
      });

      const { message, data } = res.data;

      if (message === "Data fetched successfully!") {
        // Check if 'data' exists and it has 'users' property as an array
        if (data && Array.isArray(data?.phases)) {
          setPhases(data?.phases);
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

  console.log("pahes", phases)

  return {
    userMenuOpen,
    anchorEl,
    searchQuery,
    phases,
    handleOpen,
    handleClose,
    handleSearchInputChange,
    deactivateModal,
    statusModal,
    handleStatusModalOpen,
    handleStatusModalClose,
    handleDeactivateModalOpen,
    handleDeactivateModalClose,
  };
};

export default PeriodManagementService;
