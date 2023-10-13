import { roundToNearest10 } from '@/helpers';
import { alpha } from '@mui/material';
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const getData = (x: string[] = [], y: number[] = []) => ({
    labels: x,
    datasets: [
        {
            label: '',
            data: y,
            borderColor: '#2B0A60',
            pointStyle: 'circle',
            pointRadius: 5,
            pointBackgroundColor: '#fff',
            pointBorderColor: '#753FF5',
            pointBorderWidth: 3,
            tension: 0.5,
            fill: false,
        },
    ],
});

const getOptions = (step = 5) => ({
    scales: {
        x: {
            display: true,
            ticks: {
                stepSize: 1,
                font: {
                    size: 12,
                    family: 'Satoshi',
                },
            },
            grid: {
                drawOnChartArea: false,
            },
        },
        y: {
            display: false,
            // max: 1000,
            min: 0,
            ticks: {
                stepSize: step,
                font: {
                    size: 14,
                    family: 'Satoshi',
                },
                // callback: (value) => {
                //   return value + " taps";
                // },
            },
            grid: {
                drawTicks: false,
                display: true,
            },
        },
    },
    plugins: {
        legend: {
            display: false,
        },
    },
    responsive: true,
    maintainAspectRatio: false,
});

export default function Chart({ data }: any) {
    const y = data.map((data: { dataCount: any; }) => data.dataCount);
    const x = data.map((data: { id: any; }) => data.id);

    return (
        <div className="h-[300px]">
            <Line data={getData(x, y)} options={getOptions(roundToNearest10(data?.length ?? 4 / 4))} />
        </div>
    )
}
