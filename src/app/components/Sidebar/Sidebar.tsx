'use client';

import React from 'react';
import SidebarItem from '../SidebarItem/SidebarItem';
import Image from 'next/image';
import './Sidebar.scss';
import { IconButton } from '@mui/material';
import { useParams, usePathname, useRouter } from 'next/navigation';
import Assets from '@/constants/assets.constant';
import { SideBarItemLink } from '@/utils/types/types';
import { useDispatch } from 'react-redux';
import { profileLogoutAction } from '@/store/profile.slice';
// import { links } from '@/app/utils/data/data';

const Sidebar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const currentPath = pathname;
  const subpath = currentPath?.split('/')[2];
  const isActive = (paths: string[]) => paths.includes(subpath ?? '');

  const logout = () => {
    dispatch(profileLogoutAction());
    router.push('/login');
  };

  const links: SideBarItemLink[] = [
    {
      name: "Dashboard",
      icon: currentPath === "/dashboard" ? Assets.dashboardActive : Assets.dashboard,
      to: "/dashboard",
      paths: [""],
    },
    {
      name: "User Management",
      icon: currentPath === "/dashboard/user-management" ? Assets.userManagementActive : Assets.userManagement,
      to: "/dashboard/user-management",
      paths: ["user-management"],
    },
    {
      name: "Period Management",
      icon: currentPath === "/dashboard/period-management" ? Assets.periodActive : Assets.period,
      to: "/dashboard/period-management",
      paths: ["period-management"],
    },
    {
      name: "Goal Management",
      icon: currentPath === "/dashboard/goal-management" ? Assets.goalIcon : Assets.goalIcon,
      to: "/dashboard/goal-management",
      paths: ["goal-management"],
    },
    {
      name: "Community Management",
      icon: currentPath === "/dashboard/community-management" ? Assets.communityActive : Assets.community,
      to: "/dashboard/community-management",
      paths: ["community-management"],
    },
    {
      name: "Project Management",
      icon: currentPath === "/dashboard/project-management" ? Assets.userManagementActive : Assets.userManagement,
      to: "/dashboard/project-management",
      paths: ["project-management"],
    },
    {
      name: "Content Management",
      icon: currentPath === "/dashboard/content-management" ? Assets.contentActive : Assets.content,
      to: "/dashboard/content-management",
      paths: ["content-management"],
    },
    {
      name: "Admin Management",
      icon: currentPath === "/dashboard/admin-management" ? Assets.adminActive : Assets.admin,
      to: "/dashboard/admin-management",
      paths: ["admin-management"],
    },
    {
      name: "Notification",
      icon: currentPath === "/dashboard/notification" ? Assets.notificationActive : Assets.notification,
      to: "/dashboard/notification",
      paths: ["notification"],
    },
  ];

  return (
    <>
      <div className="sidebar-container bg-primaryColor pb-10 px-3 z-10">
        <div className="w-full">
          <div className="w-full flex justify-start items-center relative px-5 pb-5 pt-7">
            <Image src={Assets.closerLogoWhite} alt="logo" width={120} height={120} />
          </div>

          <div className="h-auto links mt-3">
            {links.map((link, index) => (
              <SidebarItem link={link} key={index} active={isActive(link.paths)} />
            ))}
          </div>
        </div>

        <div className="sidebar-item">
          <div className="flex items-center text-[#939393] gap-[20px] px-3 py-4 cursor-pointer rounded-[12px] hover:bg-[#fafafa15]" onClick={logout}>
            <Image src={Assets.logout} alt="" width={20} height={20} />
            <span className="w-full font-[500] text-[1vw]">Logout</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
