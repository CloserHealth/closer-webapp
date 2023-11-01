"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Assets from '@/constants/assets.constant';
import { IconButton } from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';
import { FadeIn } from '../Transitions/Transitions';
import { profileLogoutAction } from '@/store/profile.slice';
import { useDispatch } from 'react-redux';

const MobileNavbar = () => {
    const router = useRouter();
    const pathName = usePathname();
    const [navMenu, setNavMenu] = useState<boolean>(false);
    const currentPath = pathName;
    const dispatch = useDispatch();

    const navbarMenus = [
        {
            icon: Assets.home,
            title: 'Home',
            route: '/dashboard',
        },
        {
            icon: Assets.navbarCalendar,
            title: 'Calendar',
            route: '/calendar',
        },
        {
            icon: Assets.symptoms,
            title: 'Symptoms',
            route: '/symptoms',
        },
        {
            icon: Assets.task,
            title: 'Tasks',
            route: '',
        },
    ]

    const logout = () => {
        dispatch(profileLogoutAction());
        router.push('/');
    };

    return (
        <>
            <div className="px-5 h-[84px] flex items-center justify-between bg-white relative">
                <Image src={Assets.closerLogo} alt="" width={130} height={100} />
                <IconButton onClick={() => setNavMenu(!navMenu)}>
                    <Image src={Assets.menu} alt="" width={25} height={25} />
                </IconButton>

                {navMenu && (
                    <div className="bg-white px-5 rounded-[10px] z-50 w-[50vw] h-auto absolute right-4 top-[70px]"
                        style={{ boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px' }}
                    >
                        {navbarMenus.map((item, i) => (
                            <FadeIn key={i}>
                                <div className="flex items-center space-x-5 py-5 border-b cursor-pointer" onClick={() => router.push(item.route)}>
                                    <Image src={item.icon} alt='' width={22} height={22} />
                                    <p className={`${item.route === currentPath ? 'text-[#2B0A60]' : 'text-[#5F5F5F]'} text-[3.5vw] font-[700]`}>{item.title}</p>
                                </div>
                            </FadeIn>
                        ))}
                        <div className="flex items-center space-x-5 py-5 border-b cursor-pointer" onClick={logout}>
                            <Image src={Assets.logout} alt='' width={22} height={22} />
                            <p className={`text-[#5F5F5F] text-[3.5vw] font-[700]`}>Logout</p>
                        </div>
                    </div>
                )}
            </div>


        </>
    )
}

export default MobileNavbar
