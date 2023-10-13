'use client';
import React from 'react';
import Image from 'next/image';
import { IconButton, Badge } from '@mui/material';
import Assets from '@/constants/assets.constant';
import { getSubPathName } from '@/utils';
import { CsvDownloadButton } from '../Buttons/Buttons';

export default function Navbar() {
  const subpath = getSubPathName();
  // const capitalizedSubpath = subpath.charAt(0).toUpperCase() + subpath.slice(1);

  return (
    <div className="min-h-[76px] max-h-[76px] bg-white pl-7 pr-16 flex items-center justify-between">
      <div className="flex items-center gap-[19px]">
        <p className="text-[1.3vw] text-[#212429] font-[600]">
          {subpath === "dashboard" ? "Dashboard" :
            subpath === "user-management" ? "User Management" :
              subpath === "period-management" ? "Period Management" :
              subpath === "goal-management" ? "Goal Management" :
                subpath === "community-management" ? "Community Management" :
                  subpath === "project-management" ? "Project Management" :
                    subpath === "content-management" ? "Content Management" :
                      subpath === "notification" ? "Notification" :
                        subpath === "admin-management" ? "Admin Management" : "Dashboard"
          }
        </p>
      </div>
      <div className="flex items-center space-x-10">
        {subpath === "Dashboard" && (
          <CsvDownloadButton content="Download CSV" onClickButton={() => { } } isRounded={false} />
        )}
        <IconButton>
          <Badge
            sx={{
              "& .MuiBadge-badge": {
                color: "#FB523A",
                backgroundColor: "#FB523A"
              }
            }} variant="dot">
            <Image src={Assets.notificationIcon} alt="theme toggler" width={20} height={20} />
          </Badge>
        </IconButton>
      </div>
    </div>
  );
}
