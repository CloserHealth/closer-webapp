import React from 'react';
import Image from 'next/image';
import Assets from '@/constants/assets.constant';
import { IconButton } from '@mui/material';

const MobileNavbar = () => {
    return (
        <div className="px-5 h-[84px] flex items-center justify-between bg-white">
            <Image src={Assets.closerLogo} alt="" width={130} height={100} />
            <IconButton>
                <Image src={Assets.menu} alt="" width={25} height={25} />
            </IconButton>
        </div>
    )
}

export default MobileNavbar