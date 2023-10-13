import Assets from "../../constants/assets.constant";
import {
  CardProps,
  SideBarItemLink,
  PhasesProps,
  CommunityProps,
  AdminProps,
  ProjectProps,
  AdminsProps,
} from "../types/types";

export const links: SideBarItemLink[] = [
  {
    name: "Dashboard",
    icon: Assets.dashboard,
    to: "/dashboard",
    paths: [""],
  },
  {
    name: "User Management",
    icon: Assets.userManagement,
    to: "/dashboard/user-management",
    paths: ["user-management"],
  },
  {
    name: "Period Management",
    icon: Assets.period,
    to: "/dashboard/period-management",
    paths: ["period-management"],
  },
  {
    name: "Community Management",
    icon: Assets.community,
    to: "/dashboard/community-management",
    paths: ["community-management"],
  },
  {
    name: "Project Management",
    icon: Assets.userManagement,
    to: "/dashboard/project-management",
    paths: ["project-management"],
  },
  {
    name: "Content Management",
    icon: Assets.content,
    to: "/dashboard/content-management",
    paths: ["content-management"],
  },
  {
    name: "Admin Management",
    icon: Assets.admin,
    to: "/dashboard/admin-management",
    paths: ["admin-management"],
  },
  {
    name: "Notification",
    icon: Assets.notification,
    to: "/dashboard/notification",
    paths: ["notification"],
  },
];



// Admin Management Card data
export const goalManagementCardData = [
  {
    bgColor: "rgba(223, 212, 254, 0.27)",
    title: "Total Goals",
    data: 0,
    iconPath: Assets.purpleIcon,
  },
  {
    bgColor: "rgba(254, 235, 193, 0.27)",
    title: "Active Goals",
    data: 0,
    iconPath: Assets.orangeIcon,
  },
  {
    bgColor: "rgba(253, 213, 236, 0.27)",
    title: "Inactive Goals",
    data: 0,
    iconPath: Assets.pinkIcon,
  },
];


// Admin Management Card data
export const ContentManagementCardData = [
  {
    bgColor: "rgba(223, 212, 254, 0.27)",
    title: "Daily Questions",
    data: 2,
    iconPath: Assets.purpleIcon,
  },
  {
    bgColor: "rgba(254, 235, 193, 0.27)",
    title: "Daily Learning",
    data: 1,
    iconPath: Assets.orangeIcon,
  },
  {
    bgColor: "rgba(253, 213, 236, 0.27)",
    title: "Articles",
    data: 0,
    iconPath: Assets.pinkIcon,
  },
  {
    bgColor: "rgba(223, 212, 254, 0.27)",
    title: "Challenges",
    data: 0,
    iconPath: Assets.purpleIcon,
  },
];


// Chart Data
export const chartDummieData = [
  {
    dataCount: "1000",
    id: "Jan",
  },
  {
    dataCount: "500",
    id: "Feb",
  },
  {
    dataCount: "1700",
    id: "Mar",
  },
  {
    dataCount: "3200",
    id: "Apr",
  },
  {
    dataCount: "1000",
    id: "May",
  },
  {
    dataCount: "100",
    id: "Jun",
  },
  {
    dataCount: "600",
    id: "Jul",
  },
  {
    dataCount: "550",
    id: "Aug",
  },
  {
    dataCount: "2500",
    id: "Sep",
  },
  {
    dataCount: "4000",
    id: "Oct",
  },
  {
    dataCount: "200",
    id: "Nov",
  },
  {
    dataCount: "5000",
    id: "Dec",
  },
];

// Users data
export const userData = [
  {
    id: 1,
    name: "Godwin Olele",
    country: "Egypt",
    phoneNumber: "09139101101",
    email: "godwinolele10@gmail.com",
    point: 10,
    status: "Active",
    date: "22/05/23",
  },
  {
    id: 2,
    name: "Morwin Daniel",
    country: "Nigeria",
    phoneNumber: "08083786824",
    email: "morwindan@gmail.com",
    point: 100,
    status: "Active",
    date: "15/07/22",
  },
  {
    id: 3,
    name: "Morire Oluwa",
    country: "Canada",
    phoneNumber: "07065877386",
    email: "morireoluwa@gmail.com",
    point: 285,
    status: "Active",
    date: "21/02/23",
  },
  {
    id: 4,
    name: "Gloria Ayishat",
    country: "Sweden",
    phoneNumber: "07065877386",
    email: "g.ayishat@gmail.com",
    point: 4,
    status: "Inactive",
    date: "21/02/23",
  },
];

// Users data
export const phases: PhasesProps[] = [
  {
    id: 1,
    name: "Period",
    tips: 10,
    link: "/dashboard/period-management/period",
  },
  {
    id: 2,
    name: "Ovulation",
    tips: 10,
    link: "/dashboard/period-management/ovulation",
  },
  {
    id: 3,
    name: "Follicular",
    tips: 10,
    link: "/dashboard/period-management/follicular",
  },
  {
    id: 4,
    name: "Luteal",
    tips: 10,
    link: "/dashboard/period-management/luteal",
  },
];

// Communities data
export const communitiesData: CommunityProps[] = [
  {
    id: 1,
    name: "Period struggles",
    createdBy: "Oyindamola Ade",
    member: 10,
    status: "Active",
  },
  {
    id: 2,
    name: "Dealing with PMS",
    createdBy: "Oyindamola Ade",
    member: 10,
    status: "Active",
  },
  {
    id: 3,
    name: "Period struggles",
    createdBy: "Oyindamola Ade",
    member: 10,
    status: "Active",
  },
  {
    id: 4,
    name: "Period struggles",
    createdBy: "Oyindamola Ade",
    member: 10,
    status: "Active",
  },
];

// Admins data
export const adminsData: AdminsProps[] = [
  {
    id: 1,
    name: "Period struggles",
    email: "morireoluwa@gmail.com",
    status: "Active",
    date: "21/02/23",
  },
  {
    id: 2,
    name: "Period struggles",
    email: "morireoluwa@gmail.com",
    status: "Active",
    date: "21/02/23",
  },
  {
    id: 3,
    name: "Period struggles",
    email: "morireoluwa@gmail.com",
    status: "Active",
    date: "21/02/23",
  },
  {
    id: 4,
    name: "Period struggles",
    email: "morireoluwa@gmail.com",
    status: "Active",
    date: "21/02/23",
  },
];

export const admins: AdminProps[] = [
  {
    imagePath: Assets.sample,
    name: "Dare ishola",
  },
  {
    imagePath: Assets.sample,
    name: "Allen Gred",
  },
  {
    imagePath: Assets.sample,
    name: "Ayo ishola",
  },
  {
    imagePath: Assets.sample,
    name: "Barry Allen",
  },
  {
    imagePath: Assets.sample,
    name: "Ben Foster",
  },
  {
    imagePath: Assets.sample,
    name: "Carren Gred",
  },
  {
    imagePath: Assets.sample,
    name: "Clark Gred",
  },
  {
    imagePath: Assets.sample,
    name: "Barry Allen",
  },
  {
    imagePath: Assets.sample,
    name: "Allen Gred",
  },
  {
    imagePath: Assets.sample,
    name: "Ayo ishola",
  },
];

// Project Data
export const projectData: ProjectProps[] = [
  {
    imagePath: Assets.smilingGirl2,
    description:
      "Ut arcu, risus rhoncus, gravida accumsan fermentum. Pellentesque iaculis quis orci arcu quis. Diam, et nulla lacus, sit arcu leo arcu.",
    title: "Pad Donation Project",
    percentage: 70,
    donationPoint: 1000,
    donatedPoint: 300,
    donor: 150,
  },
];

// Notification Items
export const notifications = [
  {
    dateAndTime: "Tuesday September 11, 2022  10:36 AM",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id malesuada augue neque tortor tellus pellentesque est, in ipsum. Nunc vitae donec augue non  pellentesque est, in ipsum. Nunc vitae donec",
  },
  {
    dateAndTime: "Tuesday September 11, 2022  10:36 AM",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id malesuada augue neque tortor tellus pellentesque est, in ipsum. Nunc vitae donec augue non  pellentesque est, in ipsum. Nunc vitae donec",
  },
  {
    dateAndTime: "Tuesday September 11, 2022  10:36 AM",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id malesuada augue neque tortor tellus pellentesque est, in ipsum. Nunc vitae donec augue non  pellentesque est, in ipsum. Nunc vitae donec",
  },
];
