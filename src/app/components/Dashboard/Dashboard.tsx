"use client"
import API from '@/constants/api.constant'
import Assets from '@/constants/assets.constant'
import { catchAsync } from '@/helpers/api.helper'
import useRequest from '@/services/request.service'
import styled from '@emotion/styled'
import { InputBase, FormControl, Select, MenuItem, SelectChangeEvent, CardProps } from '@mui/material'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Card from '../Card/Card'
import Chart from '../Chart/Chart'

export default function Dashboard() {
  const { isLoading, makeRequest } = useRequest();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [feeCarrier, setFeeCarrier] = useState<string>('');

  const handleChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setFeeCarrier(event.target.value);
  };

  const BootstrapInput = styled(InputBase)(({ theme }) => ({
    '& .MuiInputBase-input': {
      borderRadius: "5px",
      position: 'relative',
      backgroundColor: '#fff',
      border: '1px solid #CED3D8',
      fontSize: "1vw",
      padding: '12px 30px 12px 15px',
      // transition: theme.transitions.create(['border-color', 'box-shadow']),
      color: "rgba(107, 108, 122, 0.50)",
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: "5px",
        borderColor: '#6104BD',
      },
    },
    "& .MuiSvgIcon-root": {
      color: "rgba(107, 108, 122, 0.50)",
    },
  }));


  const handleFetch = async () => {
    catchAsync(
      async () => {
        const res = await makeRequest({
          method: "GET",
          url: API.dashboard,
        });

        const { message, data } = res.data;
        if (message === "Data fetched successfully!") {
          setDashboardData(data);

          console.log("data", dashboardData);
        }

      },
      (err: any) => {
        console.log(err);
      }
    );
  };

  useEffect(() => {
    handleFetch();
  }, [])


  const dashboardCardData: any[] = [
    {
      bgColor: "rgba(253, 213, 236, 0.27)",
      title: "Total Downloads",
      data: dashboardData?.total_downloads,
      iconPath: Assets.pinkIcon,
    },
    {
      bgColor: "rgba(254, 235, 193, 0.27)",
      title: "Total Signups",
      data: dashboardData?.total_signups,
      iconPath: Assets.orangeIcon,
    },
    {
      bgColor: "rgba(223, 212, 254, 0.27)",
      title: "Active Users",
      data: dashboardData?.active_users,
      iconPath: Assets.purpleIcon,
    },
    {
      bgColor: "rgba(223, 212, 254, 0.27)",
      title: "Inactive Users",
      data: dashboardData?.inactive_users,
      iconPath: Assets.purpleIcon,
    },
    {
      bgColor: "rgba(253, 213, 236, 0.27)",
      title: "Total Rings",
      data: dashboardData?.total_rings,
      iconPath: Assets.pinkIcon,
    },
    {
      bgColor: "rgba(254, 235, 193, 0.27)",
      title: "Total Points",
      data: dashboardData?.total_points,
      iconPath: Assets.orangeIcon,
    },
  ];

  const chartDummieData = [
    {
      dataCount: dashboardData?.chart?.Jan,
      id: "Jan",
    },
    {
      dataCount: dashboardData?.chart?.Feb,
      id: "Feb",
    },
    {
      dataCount: dashboardData?.chart?.Mar,
      id: "Mar",
    },
    {
      dataCount: dashboardData?.chart?.Apr,
      id: "Apr",
    },
    {
      dataCount: dashboardData?.chart?.May,
      id: "May",
    },
    {
      dataCount: dashboardData?.chart?.Jun,
      id: "Jun",
    },
    {
      dataCount: dashboardData?.chart?.Jul,
      id: "Jul",
    },
    {
      dataCount: dashboardData?.chart?.Aug,
      id: "Aug",
    },
    {
      dataCount: dashboardData?.chart?.Sep,
      id: "Sep",
    },
    {
      dataCount: dashboardData?.chart?.Oct,
      id: "Oct",
    },
    {
      dataCount: dashboardData?.chart?.Nov,
      id: "Nov",
    },
    {
      dataCount: dashboardData?.chart?.Dec,
      id: "Dec",
    },
  ];


  return (
    <div className='space-y-7'>
      <div className="rounded-[10px] border border-white h-auto w-full p-5"
        style={{ background: "rgba(255, 255, 255, 0.72)" }}
      >
        <h1 className="text-[#121F3E] font-[700] text-[1.3vw]">Overview</h1>
        <div className="grid grid-cols-3 gap-x-[30px] gap-y-[20px] mt-5">
          {dashboardCardData.map((item, i) => (
            <Card
              key={i}
              bgColor={item.bgColor}
              title={item.title}
              data={item?.data?.toLocaleString()}
              iconPath={item.iconPath}
              isLoading={isLoading}
            />
          ))}
        </div>
      </div>

      <div className="rounded-[10px] border border-white h-auto w-full p-5"
        style={{ background: "rgba(255, 255, 255, 0.72)" }}
      >
        <div className="flex items-center justify-between mb-7 px-7 pt-7">
          <h1 className='text-[1.3vw] font-[600] text-[#212337]'>Monthly Signups</h1>
          <div>
            <FormControl sx={{ width: "200px" }}>
              <Select
                value={feeCarrier}
                onChange={handleChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                input={<BootstrapInput />}
              >
                <MenuItem value="">
                  Option 1
                </MenuItem>
                <MenuItem value={10}>Option 2</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <Chart data={chartDummieData} />
      </div>

    </div>
  )
}
