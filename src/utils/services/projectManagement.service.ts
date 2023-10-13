import API from "@/constants/api.constant";
import Assets from "@/constants/assets.constant";
import { catchAsync } from "@/helpers/api.helper";
import useRequest from "@/services/request.service";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";

const ProjectsManagementService = () => {
  const { isLoading, makeRequest } = useRequest();
  const [cardData, setCardData] = useState<any>(null);
  const [allProjects, setAllProjects] = useState<any>();
  const [projectData, setProjectData] = useState<any>([]);
  const [editProjectModal, setIsEditProjectModal] = useState<boolean>(false);
  const [addProjectModal, setAddProjectModal] = useState<boolean>(false);
  const [saveModal, setSaveModal] = useState<boolean>(false);
  const [addedModal, setAddedModal] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<any>(null);



  // Add New Project
const [addProjectName, setAddProjectName] = useState<string>("");
const [addProjectPoint, setAddProjectPoint] = useState<string>("");
const [addDescription, setAddDescription] = useState<string>("");

const handleAddProjectImageChange = (acceptedFiles: File[]) => {
  if (acceptedFiles && acceptedFiles.length > 0) {
    setSelectedFile(acceptedFiles[0]);
  }
};

const handleAddProjectNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setAddProjectName(event.target.value);
};

const handleAddProjectPointChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setAddProjectPoint(event.target.value);
};

const handleAddDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setAddDescription(event.target.value);
};

const handleAddProject = async () => {
  try {
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("name", addProjectName);
    formData.append("description", addDescription);
    formData.append("point", addProjectPoint);

    const res = await makeRequest({
      method: "POST",
      url: API.getProjects,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const { message } = res.data;
    if (message === "Project added successfully!") {
      toast.success(message);
      handleAddNewProjectModalClose();
      handleFetch();
      handleSaveModalOpen();
      setAddProjectName('');
      setAddProjectPoint('');
      setAddDescription('');
      setSelectedFile(null);
      

      // Close the modal after 3 seconds
      setTimeout(() => {
        handleSaveModalClose();
      }, 2000);
    }
  } catch (err) {
    console.log(err);
  }
};



// Edit Project
const [editedProjectId, setEditedProjectId] = useState<any>(null);
const [editProjectImage, setEditProjectImage] = useState<string>("");
const [editProjectName, setEditProjectName] = useState<string>("");
const [editProjectPoint, setEditProjectPoint] = useState<string>('');
const [editDescription, setEditDescription] = useState<string>("");

const handleEditProjectImageChange = (acceptedFiles: File[]) => {
  if (acceptedFiles && acceptedFiles.length > 0) {
    setSelectedFile(acceptedFiles[0]);
  }
};

const handleEditProjectNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setEditProjectName(event.target.value);
};

const handleEditProjectPointChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setEditProjectPoint(event.target.value);
};

const handleEditDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setEditDescription(event.target.value);
};

const handleEditProject = async (projectId: any) => {
  try {
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("name", editProjectName);
    formData.append("description", editDescription);
    formData.append("point", editProjectPoint);

    const res = await makeRequest({
      method: "POST",
      url: `${API.getProjects}/${projectId}`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const { message } = res.data;
    if (message === "Project updated successfully!") {
      toast.success(message);
      handleAddNewProjectModalClose();
      handleFetch();
      handleSaveModalOpen();
      setEditProjectName('');
      setEditProjectPoint('');
      setEditDescription('');
      setSelectedFile(null);
      

      // Close the modal after 3 seconds
      setTimeout(() => {
        handleSaveModalClose();
      }, 2000);
    }
  } catch (err) {
    console.log(err);
  }
};

  // Get Project
  const handleEditModalOpen = (projectId: any) => {
    const firstProject = projectData.find((project: { id: any; }) => project.id === projectId);
    if (firstProject) {
      setEditProjectImage(firstProject.imagePath);
      setEditProjectName(firstProject.title);
      setEditProjectPoint(firstProject.donationPoint.toString());
      setEditDescription(firstProject.description);
    }
  
    setEditedProjectId(projectId);
    setIsEditProjectModal(true);
  };




  // Project Card data
  const projectManagementCardData: any[] = [
    {
      bgColor: "rgba(223, 212, 254, 0.27)",
      title: "Total Project",
      data: cardData?.total_projects,
      iconPath: Assets.purpleIcon,
    },
    {
      bgColor: "rgba(254, 235, 193, 0.27)",
      title: "Active Project",
      data: cardData?.active_projects,
      iconPath: Assets.orangeIcon,
    },
    {
      bgColor: "rgba(253, 213, 236, 0.27)",
      title: "Completed Project",
      data: cardData?.completed_projects,
      iconPath: Assets.pinkIcon,
    },
  ];

  // Fetch Projects  Data
  const handleFetch = async () => {
    try {
      const res = await makeRequest({
        method: "GET",
        url: API.getProjects,
      });

      const { message, data } = res.data;
      console.log(data);

      if (message === "Data fetched successfully!") {
        // Check if 'data' exists and it has 'projects' property as an array
        if (data && Array.isArray(data?.projects)) {
          setCardData(data?.stat);
          setProjectData(
            data?.projects.map((project: any) => ({
              id: project.id,
              imagePath: project.image,
              description: project.description,
              title: project.name,
              percentage: 0,
              donationPoint: project.point,
              donatedPoint: 0,
              donor: 0,
            }))
          );
        } else {
          console.log(
            "Invalid or missing 'projects' data in the API response."
          );
        }
      }
    } catch (err) {
      console.log("Error fetching projects:", err);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);



  const handleEditModalClose = () => {
    setIsEditProjectModal(false);
  };

  // Validation rules for the name and email inputs
  // const isPasswordValid = password.length > 3;
  // const isEmailValid = email.length > 5 && email.includes('@');

  // Open Save Modal
  const handleSaveModalOpen = () => {
    setSaveModal(true);
  };

  // Close Save Modal
  const handleSaveModalClose = () => {
    setSaveModal(false);
  };

  // Open Add New Project Modal
  const handleAddNewProjectModalOpen = () => {
    setAddProjectModal(true);
  };

  // Close Added New Project Modal
  const handleAddNewProjectModalClose = () => {
    setAddProjectModal(false);
  };

  // Image upload
  const onDrop = useCallback((acceptedFiles: any) => {
    // Handle the accepted file (in this case, we'll just take the first file)
    const file = acceptedFiles[0];
    setSelectedFile(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });




  return {
    projectManagementCardData,
    allProjects,
    isLoading,
    projectData,
    setProjectData,
    handleSaveModalClose,
    handleAddNewProjectModalOpen,
    handleAddNewProjectModalClose,
    getRootProps,
    getInputProps,
    isDragActive,
    addProjectModal,
    saveModal,
    addedModal,
    editProjectModal,
    handleEditModalClose,
    selectedFile,
    onDrop,
    addProjectName,
    addProjectPoint,
    addDescription,
    handleAddProjectImageChange,
    handleAddProjectNameChange,
    handleAddProjectPointChange,
    handleAddDescriptionChange,
    handleAddProject,
    editProjectName,
    editProjectPoint,
    editDescription,
    handleEditProject,
    handleEditProjectImageChange,
    handleEditProjectNameChange,
    handleEditProjectPointChange,
    handleEditDescriptionChange,
    handleEditModalOpen,
    editedProjectId
  };
};

export default ProjectsManagementService;
