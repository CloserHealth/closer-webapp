import { notifications } from '@/utils/data/data';
import React, { useState } from 'react'
import SearchField from '../Fields/SearchField';
import NotificationItem from './NotificationItem/NotificationItem';

export default function Notification() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const handleSearchInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearchQuery(event.target.value);
  }

  return (
    <div className="rounded-[10px] border border-white h-auto w-full p-5"
      style={{ background: "rgba(255, 255, 255, 0.72)" }}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-[#121F3E] font-[700] text-[1.3vw]">Notifications</h1>
        <p className="text-[#696B6F] font-[500] text-[1vw]">Last login Jun 11, 03 2021  10:55 AM</p>
      </div>
      <div className="mt-10 w-[300px]">
        <SearchField
          id="search"
          type="text"
          placeholder="Search"
          value={searchQuery}
          onInputChange={handleSearchInputChange}
        />
      </div>
      <div className="mt-10">
      {notifications.map((item, i) => (
        <NotificationItem key={i} index={i} item={item} />
      ))}
      </div>
    </div>
  )
}
