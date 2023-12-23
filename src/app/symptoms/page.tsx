"use client"

import React, { useEffect, useState } from 'react'
import MobileNavbar from '../components/Navbar/MobileNavbar';
import Image from 'next/image';
import { Checkbox, IconButton } from '@mui/material';
import Assets from '@/constants/assets.constant';
import SymptomTracker from '../components/SymptomTracker/SymptomTracker';
import { UserMenu } from '../components/Menu/Menu';
import { useRouter } from 'next/navigation';
import API from '@/constants/api.constant';
import useRequest from '@/services/request.service';
import { InfinitySpin } from 'react-loader-spinner'
import Loader from '../components/Loader/Loader';
import toast from 'react-hot-toast';

export default function Symptoms() {
    const { makeRequest: makeSymptomRequest, isLoading: isLoadingSymptom } = useRequest();
    const { makeRequest: makeTipRequest, isLoading: isLoadingTip } = useRequest();
    const [allSymptoms, setAllSymptoms] = useState<any>([]);
    const [allSymptomsCard, setAllSymptomsCard] = useState<any>([]);
    const [completedTipsData, setCompletedTipsData] = useState<any>([]);



    const router = useRouter();
    const symptoms = [
        {
            icon: Assets.menstrual,
            title: 'Menstrual Cramps',
        },
        {
            icon: Assets.bloating,
            title: 'Bloating',
        },
        {
            icon: Assets.backPain,
            title: 'Back Pain',
        },
        {
            icon: Assets.fatigue,
            title: 'Fatigue',
        },
        {
            icon: Assets.headache,
            title: 'Headache',
        },
        {
            icon: Assets.fever,
            title: 'Fever',
        },
    ];


    // Health Watch
    const healthWatch: any = [
        {
            image: 'https://images.pexels.com/photos/6542700/pexels-photo-6542700.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            title: 'My period vs my mood swings'
        },
        {
            image: 'https://images.pexels.com/photos/3807733/pexels-photo-3807733.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            title: 'My mood swing vs my period'
        },
    ];

    // menu
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleMenuOpen = (event: any) => {
        setAnchorEl(event.currentTarget);
        event.stopPropagation();
    };
    const handleMenuClose = () => setAnchorEl(null);

    const goToAddSymptom = () => {
        router.push('symptoms/add');
    }


    // Get Symptoms
    // Get Symptoms
    useEffect(() => {
        const fetchSymptoms = async () => {
            try {
                const res = await makeSymptomRequest({
                    url: API.userSymptom + '?include=symptoms,symptoms.tips',
                    method: 'GET',
                });
                const { data } = res.data;

                // Extract all 'symptoms' arrays from the response data
                const allSymptomsArrays = data?.symptoms;
                const allSymptomsArraysNew = data?.symptoms.map((item: { symptoms: any; }) => item?.symptoms) || [];
                const c = data?.symptoms.map((item: any) => item?.completed_tips) || [];
                setCompletedTipsData(c[0])

                const mergedSymptoms = [].concat(...allSymptomsArraysNew);

                // Filter out duplicate symptoms based on 'name'
                const uniqueSymptoms = mergedSymptoms.reduce((acc: any, current: any) => {
                    const x = acc.find((item: any) => item?.name === current?.name);
                    if (!x) {
                        return acc.concat([current]);
                    } else {
                        return acc;
                    }
                }, []);

                // Set the updated 'symptoms' array to the state
                setAllSymptoms(allSymptomsArrays);
                setAllSymptomsCard(uniqueSymptoms)
            } catch (e) {
                console.log(e);
            }
        };

        fetchSymptoms();
    }, []);






    // Create an object to store tips based on symptom names
    const [checkedStates, setCheckedStates] = useState<{ [key: string]: boolean }>({});


    const handleSymptomCheckbox = (symptomId: string, tipId: string) => {
        const key = `${symptomId}-${tipId}`;
        setCheckedStates(prevStates => ({
            ...prevStates,
            [key]: !prevStates[key] // Toggle the checked state
        }));
    };




    const handleSymptomComplete = async (id: string, tipId: string) => {
        try {
            const res = await makeTipRequest({
                url: `${API.userSymptom}/${id}/complete-tip/${tipId}`,
                method: 'PUT',
            });
            const { message, data } = res.data;
            setCompletedTipsData(data?.task?.completed_tips)

            toast.success('Tip completed successfully!');

        } catch (e) {
            console.log(e);
        }
    };

    const completedTips = completedTipsData || [];

    // Render tips based on symptom names
    const TipsBySymptom = () => {
        return (
            <div>
                {allSymptoms.map((symptomCategoryKey: { symptoms: any[]; id: string; }, index: React.Key | null | undefined) => (
                    <React.Fragment key={index}>
                        {symptomCategoryKey?.symptoms?.map((symptom: any, i: React.Key | null | undefined) => (
                            <div key={i} className="mt-5">
                                <h3 className="text-[2.8vw] font-[600] text-[#1E1E1E]">{symptom?.name}</h3>
                                <div className="w-full grid grid-cols-1 gap-y-2 mt-3">
                                    {symptom?.tips?.map((tip: any, tipIndex: number) => {
                                        const isChecked = completedTips.includes(tip?.name);
                                        const isChecked2 = completedTipsData.includes(tip?.name);

                                        return (
                                            <div key={tipIndex} className="flex items-center justify-between bg-white p-3 space-x-1 rounded-[8px] relative">
                                                <p
                                                    className={`text-[2.5vw] font-[500] text-[#1E1E1E] text-start ${checkedStates[`${symptomCategoryKey?.id}-${tip?.id}`] || isChecked || isChecked2 ? 'line-through' : ''
                                                        }`}
                                                >
                                                    {tip?.name}
                                                </p>
                                                <div className="">
                                                    <Checkbox
                                                        size="small"
                                                        className="translate-x-3"
                                                        checked={checkedStates[`${symptomCategoryKey?.id}-${tip?.id}`] || isChecked || isChecked2}
                                                        onChange={() => handleSymptomCheckbox(symptomCategoryKey?.id, tip?.id)}
                                                        onClick={() => handleSymptomComplete(symptomCategoryKey?.id, tip?.id)}
                                                        sx={{
                                                            color: '#939393',
                                                            '&.Mui-checked': {
                                                                color: '#392768',
                                                            },
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        )

                                    })}
                                </div>
                            </div>
                        ))}
                    </React.Fragment>
                ))}
            </div>
        );
    };



    return (
        <>
            {isLoadingSymptom ? (
                <Loader />
            ) : (
                <div className='px-5 pb-20 relative h-[100vh] overflow-y-auto w-full bg-white'>
                    <div className="fixed top-0 right-0 left-0 z-50">
                        <MobileNavbar />
                    </div>
                    <div className='mt-28 w-full'>
                        <div className="flex justify-between items-center w-full">
                            <p className="font-[700] text-[3.8vw] text-[#17181C]">Symptoms</p>
                            <IconButton onClick={handleMenuOpen}>
                                <Image src={Assets.dotMenu} alt="" width={6} height={6} />
                            </IconButton>
                        </div>

                        {/* Menu */}
                        <>
                            <UserMenu
                                open={open}
                                anchorEl={anchorEl}
                                handleClose={handleMenuClose}
                                onDelete={() => { }}
                                onAdd={goToAddSymptom}
                            />
                        </>


                        <>
                            {/* Symptoms */}
                            {allSymptomsCard?.length > 0 ? (
                                <div className="mt-7 grid grid-cols-3 gap-x-3 gap-y-5">
                                    {Array.from(new Map(allSymptomsCard?.map((item: any) => [item['name'], item])).values()).map((symptom: any, index) => (
                                        <div key={index} className="flex flex-col items-center space-y-2">
                                            <div
                                                className="flex justify-center items-center rounded-[12px] w-full h-[100px]"
                                                style={{ background: 'linear-gradient(90deg, #2B0A60 99.99%, #FFD4ED 100%)' }}
                                            >
                                                <Image
                                                    src={
                                                        symptom?.name === 'Mood swings' ?
                                                            'https://res.cloudinary.com/dtuims4ku/image/upload/v1703131269/icons8-mood-swing-64_onbszf.png' :
                                                            symptom?.name === 'Anxiety' ?
                                                                'https://res.cloudinary.com/dtuims4ku/image/upload/v1703131267/icons8-anxiety-64_nfczcc.png' :
                                                                symptom?.name === 'Bloating' ?
                                                                    'https://res.cloudinary.com/dtuims4ku/image/upload/v1703131267/icons8-bloating-100_j8dusk.png' :
                                                                    symptom?.name === 'Acne flare-ups' ?
                                                                        'https://res.cloudinary.com/dtuims4ku/image/upload/v1703131269/icons8-improves-acne-64_i40mxn.png' :
                                                                        symptom?.name === 'Fatigue' ?
                                                                            'https://res.cloudinary.com/dtuims4ku/image/upload/v1703131268/icons8-fatigue-64_pncsfc.png' :
                                                                            symptom?.name === 'Food craving' ?
                                                                                'https://res.cloudinary.com/dtuims4ku/image/upload/v1703131268/icons8-eating-64_r5zte4.png' :
                                                                                symptom?.name === 'Period pains' ?
                                                                                    'https://res.cloudinary.com/dtuims4ku/image/upload/v1703131271/icons8-stomach-pain-100_uckljh.png' :
                                                                                    symptom?.name === 'Heavy period' ?
                                                                                        'https://res.cloudinary.com/dtuims4ku/image/upload/v1703131271/icons8-stomach-pain-64_lf8vzd.png' :
                                                                                        symptom?.name === 'Diarrhoea' ?
                                                                                            'https://res.cloudinary.com/dtuims4ku/image/upload/v1703131271/icons8-stomach-pain-100_uckljh.png' :
                                                                                            symptom?.name === 'Dizziness' ?
                                                                                                'https://res.cloudinary.com/dtuims4ku/image/upload/v1703131267/dizziness_oscc2d.png' :
                                                                                                symptom?.name === 'Depression' ?
                                                                                                    'https://res.cloudinary.com/dtuims4ku/image/upload/v1703131268/icons8-depression-64_bnk3uy.png' :
                                                                                                    symptom?.name === 'High Energy' ?
                                                                                                        'https://res.cloudinary.com/dtuims4ku/image/upload/v1703131268/icons8-energy-64_ffukkh.png' :
                                                                                                        symptom?.name === 'Glowing Skin' ?
                                                                                                            'https://res.cloudinary.com/dtuims4ku/image/upload/v1703131268/icons8-girl-96_qgczbb.png' :
                                                                                                            symptom?.name === 'Sex Drive' ?
                                                                                                                'https://res.cloudinary.com/dtuims4ku/image/upload/v1703131270/icons8-skin-64_f3vnnt.png' :
                                                                                                                symptom?.name === 'Mild Cramps' ?
                                                                                                                    'https://res.cloudinary.com/dtuims4ku/image/upload/v1703131267/icons8-cramps-64_nus4if.png' :
                                                                                                                    symptom?.name === 'Pregnancy' ?
                                                                                                                        'https://res.cloudinary.com/dtuims4ku/image/upload/v1703131270/icons8-pregnant-64_kiz0wv.png' :
                                                                                                                        symptom?.name === 'Discharge' ?
                                                                                                                            'https://res.cloudinary.com/dtuims4ku/image/upload/v1703131268/icons8-giving-birth-96_zthnyt.png' :
                                                                                                                            ''}
                                                    alt={symptom?.name}
                                                    width={50}
                                                    height={50}
                                                />
                                            </div>
                                            <p className="font-[800] text-[2.8vw] text-primaryColor">{symptom?.name || '-----'}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="mt-7 w-full h-auto rounded-[16px] px-[20px] py-[28px]"
                                    style={{ background: 'linear-gradient(90deg, #2B0A60 99.99%, #FFD4ED 100%)' }}>
                                    <h1 className="text-[4.5vw] font-[600] text-white">Your Symptoms</h1>
                                    <div className="mt-5 flex items-center justify-between">
                                        <p className="text-[3vw] font-[400] text-white">Ooops! No symptoms found. Add your symptoms to get started.</p>
                                    </div>
                                </div>
                            )}

                        </>


                        {/* <div className="mt-10">
                    <SymptomTracker title="Track Symptom" subTitle="Menstrual Cramps" />
                </div> */}

                        {/* Coping Tips */}
                        <div className="mt-7 bg-[#F0EDF8] rounded-[16px] px-4 py-5 w-full h-auto" style={{ boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}>
                            <h1 className="text-[#1E1E1E] text-[14px] font-[800]">Coping Tips</h1>
                            <p className="text-[2.8vw] font-[400] text-[#1E1E1E] mt-1.5">Based on your symptoms, Closer suggests you do the following this week.</p>


                            {allSymptoms?.length <= 0 ? (
                                <div className="w-full flex flex-col justify-center items-center space-y-2 mt-8 pb-7">
                                    <Image src={Assets.cat} alt="No coping tips" width={120} height={120} />
                                    <p className="font-[600] text-[2.5vw]">You’re yet to add your symptoms</p>
                                </div>
                            ) : (
                                <div className="mt-5">
                                    <p className="text-[2.8vw] font-[600] text-[#1E1E1E] mt-1.5">Select Checkbox once an activity is completed</p>
                                    <div className="w-full mt-5">
                                        <TipsBySymptom />
                                    </div>
                                </div>
                            )}

                        </div>

                        {/* Health Watch */}
                        {/* {healthWatch.length > 0 && symptoms.length > 0 && (
                            <div className="mt-7">
                                <div className="flex items-center justify-between">
                                    <h1 className="text-[#17181C] font-[700] text-[4vw]">Health Watch</h1>
                                    <p className="font-[400] text-[3vw] text-primaryColor">See all</p>
                                </div>
                                <div className="mt-3 grid grid-cols-2 gap-4">
                                    {healthWatch?.map((item: any, index: React.Key | null | undefined) => (
                                        <div
                                            key={index}
                                            className="w-full h-[157px] rounded-[10px] px-3 py-4"
                                            style={{
                                                backgroundImage: `url(${item.image})`,
                                                backgroundSize: 'cover',  // Adjust to your needs
                                                backgroundPosition: 'center',  // Adjust to your needs
                                                position: 'relative',
                                            }}
                                        >
                                            <div
                                                className="linear-overlay px-3 py-4"
                                                style={{
                                                    background: 'linear-gradient(136deg, rgba(52, 2, 132, 0.70) 45.39%, rgba(43, 10, 96, 0.48) 98.89%)',
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    borderRadius: '10px',
                                                }}
                                            >
                                                <p className="font-[700] text-white text-[3vw]">{item.title}</p>
                                            </div>
                                        </div>

                                    ))}
                                </div>
                            </div>
                        )} */}


                    </div>
                </div>
            )}
        </>

    )
}
