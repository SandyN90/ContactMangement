import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { useEffect, useState } from 'react';
  import { Line } from 'react-chartjs-2';
  import { AllRecord } from '../types';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
  export function ChartPage() {
    const [data, setData] = useState(
      {
        labels: [""],
        datasets: [
          {
            label: 'Cases',
            data: [""],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      }
    )
  
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        title: {
          display: true,
          text: 'Cases On the Daily basis',
        },
      },
    };
  
    useEffect(() => {
      const formatData = (value: AllRecord) => {
  
        const labels = Object.keys(value.cases);
        const dataValue = {
          labels,
          datasets: [
            {
              label: 'Cases',
              data: labels.map((key) => value.cases[key]),
              borderColor: 'rgb(255,255,0)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
              label: 'Deaths',
              data: labels.map((key) => value.deaths[key]),
              borderColor: 'rgb(255, 0, 0)',
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
              label: 'Recovered',
              data: labels.map((key) => value.recovered[key]),
              borderColor: 'rgb(53, 162, 23)',
              backgroundColor: 'rgba(0, 0, 0, 0)',
            },
          ],
        };
        setData(dataValue);
      }
  
  
  
      const dataFetching = async () => {
        const url = "https://disease.sh/v3/covid-19/historical/all?lastdays=all";
        const newData = await (await fetch(url)).json();
        formatData(newData);
      }
      dataFetching();
    }, []);
  
    return (
      <>
        <div className='p-20 w-full lg:w-9/12 pr-5'>
          <Line options={options} data={data} />
          <p className='pt-5 text-center'>Cases report on daily basis</p>
        </div>
  
      </>
    );
  }
  