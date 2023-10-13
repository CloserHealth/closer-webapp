import React from 'react'

export default function NotificationItem({item, index}: any) {
  return (
    <div className={` ${index % 2 === 0 ? 'bg-[#F9F9F9]' : 'bg-white'} w-full h-auto px-8 py-5 space-y-3`}>
        <p className="text-[#535661] font-[400] text-[0.9vw]">{item.dateAndTime}</p>
        <p className="text-[#1E1E1E] text-[1.1vw] font-[400] ">{item.message}</p>
    </div>
  )
}
