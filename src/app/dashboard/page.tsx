"use client"

import React, { useEffect, useState } from 'react'
import MobileNavbar from '../components/Navbar/MobileNavbar';
import 'react-minimal-progress-steps/dist/index.css';
import CustomCalendar from '../components/Calendar/Calendar';
import useGlobalState from '@/hooks/globalstate.hook';
import SplashScreen from '../components/SplashScreen/SplashScreen';
import API from '@/constants/api.constant';
import useRequest from '@/services/request.service';
import { calculateDaysLeft } from '@/helpers';
import Image from 'next/image';
import Assets from '@/constants/assets.constant';
import { useRouter } from 'next/navigation';
import { InfinitySpin } from 'react-loader-spinner'

const Dashboard = () => {
  const router = useRouter();
  const { profile, isAuthenticated } = useGlobalState();
  const { makeRequest: makeTaskRequest, isLoading: isLoadingTask } = useRequest();
  const [isUser, setIsUser] = useState<boolean>(false);
  const [selectRange, setSelectRange] = useState<any>(true);
  const { isLoading, makeRequest } = useRequest();
  const [periodLog, setPeriodLog] = useState<any>([]);
  const [periodLeftDays, setPeriodLeftDays] = useState<any>(0);
  const [ovulationLeftDays, setOvulationLeftDays] = useState<any>(0);
  const [follicularLeftDays, setFollicularLeftDays] = useState<any>(0);
  const [lutealLeftDays, setLutealLeftDays] = useState<any>(0);
  const [weeklyTasks, setWeeklyTasks] = useState<any[]>([]);
  const [phase, setPhase] = useState<any>({});

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      isAuthenticated ? setIsUser(true) : setIsUser(false);
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);



  // Fetch User management Data
  const handleFetch = async () => {
    try {
      const res = await makeRequest({
        method: "GET",
        url: API.dashboard,
      });

      const { message, data } = res.data;

      if (message === "Data fetched successfully!") {
        setPeriodLog(data?.period_log);
        setPhase(data?.phase);
      }
    } catch (err) {
      console.log("Error fetching users:", err);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  const formatDate = (inputDate: any) => {
    if (!inputDate) {
      return 'Invalid date';
    }

    const dateParts = inputDate.split('-');
    if (dateParts.length !== 3) {
      return 'Invalid date format';
    }

    const months = [
      'January', 'February', 'March', 'April',
      'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December'
    ];

    const year = parseInt(dateParts[0]);
    const month = months[parseInt(dateParts[1]) - 1];
    const day = parseInt(dateParts[2]);

    let daySuffix = 'th';

    if (day === 1 || day === 21 || day === 31) {
      daySuffix = 'st';
    } else if (day === 2 || day === 22) {
      daySuffix = 'nd';
    } else if (day === 3 || day === 23) {
      daySuffix = 'rd';
    }

    return `${month} ${day}${daySuffix}, ${year}`;
  };

  // Example usage
  const inputPeriodDate = periodLog?.next_period?.start;
  const inputOvulationDate = periodLog?.next_ovulation?.start;
  const inputFollicularDate = periodLog?.next_follicular?.start;
  const inputLutealDate = periodLog?.next_luteal?.start;
  const formattedPeriodDate = formatDate(inputPeriodDate);
  const formattedOvulationDate = formatDate(inputOvulationDate);
  const formattedFollicularDate = formatDate(inputFollicularDate);
  const formattedLutealDate = formatDate(inputLutealDate);


  // Calculate days left
  useEffect(() => {
    const nextPeriodStartDate = new Date(periodLog?.next_period?.start);  // Next period start date
    try {
      const daysLeft = calculateDaysLeft(nextPeriodStartDate, new Date());
      setPeriodLeftDays(daysLeft);
    } catch (error: any) {
      console.error('Error calculating days left:', error.message);
    }
  }, [periodLog]);


  useEffect(() => {
    const nextOvulationStartDate = new Date(periodLog?.next_ovulation?.start);  // Next Ovulation start date
    try {
      const ovulationDaysLeft = calculateDaysLeft(nextOvulationStartDate, new Date());
      setOvulationLeftDays(ovulationDaysLeft);
    } catch (error: any) {
      console.error('Error calculating days left:', error.message);
    }
  }, [periodLog]);

  useEffect(() => {
    const nextFollicularStartDate = new Date(periodLog?.next_follicular?.start);  // Next Ovulation start date
    try {
      const follicularDaysLeft = calculateDaysLeft(nextFollicularStartDate, new Date());
      setFollicularLeftDays(follicularDaysLeft);
    } catch (error: any) {
      console.error('Error calculating days left:', error.message);
    }
  }, [periodLog]);

  useEffect(() => {
    const nextLutealStartDate = new Date(periodLog?.next_luteal?.start);  // Next Ovulation start date
    try {
      const lutealDaysLeft = calculateDaysLeft(nextLutealStartDate, new Date());
      setLutealLeftDays(lutealDaysLeft);
    } catch (error: any) {
      console.error('Error calculating days left:', error.message);
    }
  }, [periodLog]);



  // Parse the start and end dates
  const periodStartDate = periodLog?.prev_period?.start;
  const periodEndDate = periodLog?.prev_period?.end;

  const nextPeriodStartDate = periodLog?.next_period?.start;
  const nextPeriodEndDate = periodLog?.next_period?.end;

  const ovulationStartDate = periodLog?.prev_ovulation?.start;
  const ovulationEndDate = periodLog?.prev_ovulation?.end;

  const follicularStartDate = periodLog?.prev_follicular?.start;
  const follicularEndDate = periodLog?.prev_follicular?.end;

  const lutealStartDate = periodLog?.prev_luteal?.start;
  const lutealEndDate = periodLog?.prev_luteal?.end;

  const [date, setDate] = useState(new Date());


  const tileContent = ({ date, view }: any) => {
    const formatDate = (d: Date) => {
      const year = d.getFullYear();
      const month = `${d.getMonth() + 1}`.padStart(2, '0');
      const day = `${d.getDate()}`.padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    if (view === 'month') {
      const dateStr = formatDate(date);

      const formattedPeriodStartDate = formatDate(new Date(periodStartDate));
      const formattedPeriodEndDate = formatDate(new Date(periodEndDate));
      const formattedNextPeriodStartDate = formatDate(new Date(nextPeriodStartDate));
      const formattedNextPeriodEndDate = formatDate(new Date(nextPeriodEndDate));
      const formattedOvulationStartDate = formatDate(new Date(ovulationStartDate));
      const formattedOvulationEndDate = formatDate(new Date(ovulationEndDate));
      const formattedFollicularStartDate = formatDate(new Date(follicularStartDate));
      const formattedFollicularEndDate = formatDate(new Date(follicularEndDate));
      const formattedLutealStartDate = formatDate(new Date(lutealStartDate));
      const formattedLutealEndDate = formatDate(new Date(lutealEndDate));

      if (
        phase?.name === undefined ?
          dateStr >= formattedNextPeriodStartDate &&
          dateStr <= formattedNextPeriodEndDate :
          dateStr >= formattedPeriodStartDate &&
          dateStr <= formattedPeriodEndDate
      ) {
        return (
          <div className="period-date-marker">
            <span className="period-date-text absolute">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="15" viewBox="0 0 8 12" fill="none">
                <path d="M6.9261 6.34468L3.61807 0.933594L0.552715 6.30769C-0.161063 7.44649 -0.223356 8.92726 0.526435 10.1537C1.59223 11.8969 3.88865 12.4566 5.65623 11.405C7.42315 10.3538 7.9919 8.08922 6.9261 6.34468Z" fill="#F3282B" style={{ filter: 'contrast(60%)' }} />
              </svg>

            </span>
          </div>
        );
      }
      if (dateStr >= formattedOvulationStartDate && dateStr <= formattedOvulationEndDate) {
        return (
          <div className="ovulation-date-marker">
            <span className="ovulation-date-text absolute">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" viewBox="0 0 7 8" fill="none">
                <path style={{ filter: 'contrast(60%)' }} d="M3.86296 7.83105C3.05046 7.83105 2.36115 7.548 1.79504 6.98189C1.22893 6.41578 0.946011 5.72661 0.946289 4.91439C0.946289 4.37967 1.0349 3.84147 1.21212 3.2998C1.38934 2.75814 1.61851 2.26675 1.89962 1.82564C2.18073 1.3848 2.4949 1.0255 2.84212 0.747721C3.18934 0.469944 3.52962 0.331055 3.86296 0.331055C4.20323 0.331055 4.54532 0.469944 4.88921 0.747721C5.23309 1.0255 5.54559 1.38494 5.82671 1.82605C6.10782 2.26689 6.33698 2.75814 6.51421 3.2998C6.69143 3.84147 6.7799 4.37967 6.77962 4.91439C6.77962 5.72689 6.49657 6.41619 5.93046 6.9823C5.36434 7.54841 4.67518 7.83133 3.86296 7.83105ZM4.27962 6.58105C4.39768 6.58105 4.49671 6.54105 4.57671 6.46105C4.65671 6.38105 4.69657 6.28217 4.69629 6.16439C4.69629 6.04633 4.65629 5.9473 4.57629 5.8673C4.49629 5.7873 4.3974 5.74744 4.27962 5.74772C3.9324 5.74772 3.63726 5.62619 3.39421 5.38314C3.15115 5.14008 3.02962 4.84494 3.02962 4.49772C3.02962 4.37967 2.98962 4.28064 2.90962 4.20064C2.82962 4.12064 2.73073 4.08078 2.61296 4.08105C2.4949 4.08105 2.39587 4.12105 2.31587 4.20105C2.23587 4.28105 2.19601 4.37994 2.19629 4.49772C2.19629 5.07411 2.39948 5.5655 2.80587 5.97189C3.21226 6.37828 3.70351 6.58133 4.27962 6.58105Z" fill="#FFC700" />
              </svg>
            </span>
          </div>
        );
      }
      if (dateStr >= formattedFollicularStartDate && dateStr <= formattedFollicularEndDate) {
        return (
          <div className="ovulation-date-marker">
            <span className="ovulation-date-text absolute">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 8 9" fill="none">
                <path style={{ filter: 'contrast(60%)' }} d="M7.2573 4.38551C7.22882 4.36898 7.19753 4.35316 7.16519 4.3377C7.19753 4.32223 7.22882 4.30641 7.2573 4.28988C7.41852 4.19822 7.56001 4.07557 7.67364 3.929C7.78727 3.78243 7.87078 3.61483 7.91937 3.43586C7.96796 3.25688 7.98067 3.07006 7.95677 2.88615C7.93286 2.70224 7.87282 2.52487 7.78009 2.36427C7.68736 2.20366 7.56378 2.06298 7.41646 1.95032C7.26913 1.83767 7.10099 1.75527 6.92169 1.70787C6.74239 1.66047 6.55549 1.649 6.37175 1.67412C6.188 1.69924 6.01104 1.76046 5.85105 1.85426C5.82257 1.87078 5.79304 1.88941 5.76386 1.91016C5.76667 1.875 5.76843 1.83984 5.76843 1.80469C5.76843 1.43173 5.62027 1.07404 5.35655 0.810319C5.09283 0.546596 4.73514 0.398438 4.36218 0.398438C3.98922 0.398438 3.63153 0.546596 3.36781 0.810319C3.10409 1.07404 2.95593 1.43173 2.95593 1.80469C2.95593 1.83773 2.95593 1.87289 2.9605 1.91016C2.93132 1.89012 2.90179 1.87078 2.87331 1.85426C2.71332 1.76046 2.53636 1.69924 2.35261 1.67412C2.16887 1.649 1.98197 1.66047 1.80267 1.70787C1.62337 1.75527 1.45522 1.83767 1.3079 1.95032C1.16058 2.06298 1.037 2.20366 0.94427 2.36427C0.85154 2.52487 0.791494 2.70224 0.76759 2.88615C0.743686 3.07006 0.756395 3.25688 0.804986 3.43586C0.853577 3.61483 0.937091 3.78243 1.05072 3.929C1.16435 4.07557 1.30584 4.19822 1.46706 4.28988C1.49554 4.30641 1.52683 4.32223 1.55917 4.3377C1.52683 4.35316 1.49554 4.36898 1.46706 4.38551C1.30584 4.47717 1.16435 4.59982 1.05072 4.74639C0.937091 4.89296 0.853577 5.06056 0.804986 5.23953C0.756395 5.41851 0.743686 5.60533 0.76759 5.78924C0.791494 5.97315 0.85154 6.15052 0.94427 6.31112C1.037 6.47173 1.16058 6.61241 1.3079 6.72507C1.45522 6.83772 1.62337 6.92012 1.80267 6.96752C1.98197 7.01493 2.16887 7.02639 2.35261 7.00127C2.53636 6.97615 2.71332 6.91493 2.87331 6.82113C2.90179 6.80461 2.93132 6.78598 2.9605 6.76523C2.95769 6.80039 2.95593 6.83555 2.95593 6.86895C2.95593 7.24191 3.10409 7.59959 3.36781 7.86331C3.63153 8.12704 3.98922 8.2752 4.36218 8.2752C4.73514 8.2752 5.09283 8.12704 5.35655 7.86331C5.62027 7.59959 5.76843 7.24191 5.76843 6.86895C5.76843 6.8359 5.76667 6.80074 5.76386 6.76523C5.79304 6.78527 5.82257 6.80461 5.85105 6.82113C6.06407 6.94454 6.30588 7.00954 6.55206 7.00957C6.67576 7.00941 6.79891 6.9931 6.91839 6.96105C7.18705 6.88905 7.42832 6.73899 7.61169 6.52986C7.79506 6.32073 7.91229 6.06192 7.94857 5.78616C7.98485 5.5104 7.93853 5.23007 7.81549 4.98063C7.69244 4.73119 7.49819 4.52384 7.2573 4.3848V4.38551ZM4.36218 5.32207C4.16749 5.32207 3.97717 5.26434 3.81529 5.15617C3.65341 5.04801 3.52724 4.89427 3.45274 4.7144C3.37823 4.53453 3.35874 4.3366 3.39672 4.14565C3.4347 3.9547 3.52845 3.7793 3.66612 3.64164C3.80379 3.50397 3.97919 3.41022 4.17014 3.37223C4.36109 3.33425 4.55901 3.35375 4.73888 3.42825C4.91875 3.50276 5.07249 3.62893 5.18066 3.79081C5.28882 3.95269 5.34655 4.143 5.34655 4.3377C5.34655 4.59877 5.24284 4.84915 5.05824 5.03375C4.87363 5.21836 4.62325 5.32207 4.36218 5.32207Z" fill="#FF49B4" />
              </svg>
            </span>
          </div>
        );
      }
      if (dateStr >= formattedLutealStartDate && dateStr <= formattedLutealEndDate) {
        return (
          <div className="ovulation-date-marker">
            <span className="ovulation-date-text absolute">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 8 8" fill="none">
                <circle cx="3.72363" cy="4.29688" r="3.5" fill="#45C0DB" style={{ filter: 'contrast(60%)' }} />
              </svg>
            </span>
          </div>
        );
      }
    }
    return null;
  };


  // Get Weekly Tasks
  const fetchWeeklyTask = async () => {
    try {
      const res = await makeTaskRequest({
        url: API.userTask + '?filter=week',
        method: 'GET',
      });
      const { status, data } = res.data;

      const allTasks = data?.tasks || [];

      // Filter pending tasks from allTasks
      const newTasks = allTasks?.filter((task: { status: string }) => task?.status === 'pending');

      setWeeklyTasks(newTasks);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchWeeklyTask();
  }, []);

  const createTask = () => {
    router.push('/task/new');
  }

  const goToLogPeriod = () => {
    router.push('/period-log');
  }


  return (
    <>
      {!isUser ? (
        <SplashScreen />
      ) : (
        <div className='px-5 pb-20 relative h-[100vh] overflow-y-auto bg-white'>
          <div className="fixed top-0 right-0 left-0 z-50">
            <MobileNavbar />
          </div>
          <div className='mt-28'>
            <p className="font-[700] text-[3.8vw] text-[#17181C]">Hello {profile?.data?.user?.firstname}, get closer to your best self!</p>
            {isLoading ? (
              <div className="w-full h-[150px] rounded-[16px] mt-5 flex justify-center items-center"
                style={{ background: 'linear-gradient(90deg, #2B0A60 99.99%, #FFD4ED 100%)' }}>
                <InfinitySpin
                  width='200'
                  color="#ffffff"
                />
              </div>
            ) : (
              <div className="w-full h-auto rounded-[16px] mt-5 px-[20px] py-[28px] mb-7 relative"
                style={{ background: 'linear-gradient(90deg, #2B0A60 99.99%, #FFD4ED 100%)' }}>
                <div className="absolute right-3 top-3">
                  <Image src={
                    phase?.name === 'Period' ?
                      Assets.periodPhase :
                      phase?.name === 'Ovulatory' ?
                        Assets.ovulationPhase :
                        phase?.name === 'Follicular' ?
                          Assets.follicularPhase :
                          phase?.name === 'Luteal' ?
                            Assets.lutealPhase : Assets.periodPhase
                  } alt="" width={20} height={20} />
                </div>
                <h1 className="text-[5vw] font-[600] text-white">Your Cycle Phase</h1>
                <div className="mt-7 flex items-center justify-between">
                  {phase?.name === undefined ? (
                    <div className="space-y-2">
                      <p className="text-[3.5vw] font-[400] text-white">{phase} 🩸</p>
                      <button
                        onClick={goToLogPeriod}
                        className="rounded-full px-5 py-[6px] bg-primaryColor border-[0.75px] border-[#E3E4E8] text-[2.5vw] text-white">
                        Log Period
                      </button>
                    </div>
                  ) : (
                    <p className="text-[3.5vw] font-[400] text-white">You’re currently in your <span className="font-[800]">{phase?.name || '-----'} Phase</span>... <br /> <span>Learn More</span></p>
                  )}

                </div>
                <button
                  onClick={goToLogPeriod}
                  className="rounded-full absolute right-2 bottom-2 px-5 py-[6px] bg-primaryColor border-[0.75px] border-[#E3E4E8] text-[2.5vw] text-white">
                  Log Period
                </button>
              </div>
            )}

            {/* Calendar */}
            <CustomCalendar
              date={date}
              setDate={setDate}
              selectRange={false}
              setSelectRange={setSelectRange}
              periodStartDate={periodStartDate}
              periodEndDate={periodEndDate}
              tileContent={tileContent}
            />

            <div className="grid grid-cols-2 gap-5 items-center mt-10">
              <div className="w-full h-auto px-[19px] py-[27px] bg-violet-100 rounded-2xl shadow border-t border-neutral-200 justify-center items-center inline-flex">
                <div className="self-stretch flex-col justify-start items-center gap-[3px] inline-flex">
                  <div className="justify-start items-center inline-flex">
                    <div className="text-stone-900 text-[3.5vw] font-semibold font-['Manrope'] leading-normal flex items-center space-x-1.5 justify-center -mr-4"><span>Period</span> <Image src={Assets.periodPhase} alt="" width={15} height={15} style={{ filter: 'contrast(60%)' }} /></div>
                    <div className="w-4 h-4 relative" />
                  </div>
                  <div className="text-stone-900 text-[3vw] font-normal font-['Montserrat'] leading-[18px] text-center">{periodLeftDays} days left: {formattedPeriodDate}</div>
                </div>
              </div>

              <div className="w-full h-auto px-[19px] py-[27px] bg-violet-100 rounded-2xl shadow border-t border-neutral-200 justify-center items-center inline-flex">
                <div className="self-stretch flex-col justify-start items-center gap-[3px] inline-flex">
                  <div className="justify-start items-center inline-flex">
                    <div className="text-stone-900 text-[3.5vw] font-semibold font-['Manrope'] leading-normal flex items-center space-x-1.5 justify-center -mr-4"><span>Ovulatory</span> <Image src={Assets.ovulationPhase} alt="" width={17} height={17} style={{ filter: 'contrast(60%)' }} /></div>
                    <div className="w-4 h-4 relative" />
                  </div>
                  <div className="text-stone-900 text-[3vw] font-normal font-['Montserrat'] leading-[18px] text-center">{ovulationLeftDays} days left: {formattedOvulationDate}</div>
                </div>
              </div>

              <div className="w-full h-auto px-[19px] py-[27px] bg-violet-100 rounded-2xl shadow border-t border-neutral-200 justify-center items-center inline-flex">
                <div className="self-stretch flex-col justify-start items-center gap-[3px] inline-flex">
                  <div className="justify-start items-center inline-flex">
                    <div className="text-stone-900 text-[3.5vw] font-semibold font-['Manrope'] leading-normal flex items-center space-x-1.5 justify-center -mr-4"><span>Follicular</span> <Image src={Assets.follicularPhase} alt="" width={17} height={17} style={{ filter: 'contrast(60%)' }} /></div>
                    <div className="w-4 h-4 relative" />
                  </div>
                  <div className="text-stone-900 text-[3vw] font-normal font-['Montserrat'] leading-[18px] text-center">{follicularLeftDays} days left: {formattedFollicularDate}</div>
                </div>
              </div>

              <div className="w-full h-auto px-[19px] py-[27px] bg-violet-100 rounded-2xl shadow border-t border-neutral-200 justify-center items-center inline-flex">
                <div className="self-stretch flex-col justify-start items-center gap-[3px] inline-flex">
                  <div className="justify-start items-center inline-flex">
                    <div className="text-stone-900 text-[3.5vw] font-semibold font-['Manrope'] leading-normal flex items-center space-x-1.5 justify-center -mr-4"><span>Luteal</span> <Image src={Assets.lutealPhase} alt="" width={17} height={17} style={{ filter: 'contrast(60%)' }} /></div>
                    <div className="w-4 h-4 relative" />
                  </div>
                  <div className="text-stone-900 text-[3vw] font-normal font-['Montserrat'] leading-[18px] text-center">{lutealLeftDays} days left: {formattedLutealDate}</div>
                </div>
              </div>

            </div>




            <div className="w-full h-auto rounded-[16px] mt-7 px-[10px] py-[20px]"
              style={{
                background: 'linear-gradient(90deg, #2B0A60 99.99%, #FFD4ED 100%)',
                boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
              }}>
              <div className="flex justify-between items-center">
                <h1 className="text-[3.7vw] font-[600] text-white">This Week’s Tasks</h1>
                <button
                  onClick={createTask}
                  className="rounded-full px-5 py-[6px] bg-primaryColor border-[0.75px] border-[#E3E4E8] text-[2.5vw] text-white">
                  Plan task
                </button>
              </div>

              {weeklyTasks?.length <= 0 ? (
                <div className="w-full flex flex-col justify-center items-center space-y-2 pb-7 mt-7">
                  <Image src={Assets.cat} alt="No coping tips" width={120} height={120} />
                  <p className="font-[600] text-[2.5vw] text-white">You’re yet to setup a task</p>
                </div>
              ) : (
                <ul className="mt-7 grid grid-cols-2 gap-y-4">
                  {weeklyTasks?.map((task, i) => (
                    <li key={i} className="text-[3.2vw] font-[400] text-white">
                      &bull; {task?.name}
                    </li>
                  ))}
                </ul>
              )}

            </div>

            {/* <div className="w-full h-auto rounded-[16px] mt-7 px-[10px] py-[20px]"
          style={{ 
            background: 'linear-gradient(90deg, #2B0A60 99.99%, #FFD4ED 100%)',
            boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
             }}>
          <div className="flex justify-between items-center">
            <h1 className="text-[3.7vw] font-[600] text-white">Symptoms</h1>
            <button className="rounded-full px-5 py-[6px] bg-primaryColor border-[0.75px] border-[#E3E4E8] text-[2.5vw] text-white">Track Symptom</button>
          </div>
          <div className="mt-7 grid grid-cols-2 gap-y-4">
            {tasks.map((item, i) => (
              <p key={i} className="text-[3.5vw] font-[400] text-white">{item.title}</p>
            ))}
          </div>
        </div>

        <div className="w-full h-auto rounded-[16px] mt-5 px-[20px] py-[28px]"
          style={{ background: 'linear-gradient(90deg, #2B0A60 99.99%, #FFD4ED 100%)' }}>
          <h1 className="text-[5vw] font-[600] text-white">Your Cycle Phase</h1>
          <div className="mt-7 flex items-center jsutify-between">
            <p className="text-[3.5vw] font-[400] text-white">You’re currently in your <span className="font-[800]">Follicular Phase</span>, the best time to plan your activities.....<span>Learn More</span></p>
          </div>
        </div> */}
          </div>
        </div>
      )}
    </>
  )
}

export default Dashboard