import { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { WorldWide } from '../types';

ChartJS.register(ArcElement, Tooltip, Legend);

export function WorldChart() {

  const [data, setData] = useState({
    labels: [""],
    datasets: [
      {
        label: '',
        data: [1],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          // 'rgba(153, 102, 255, 0.2)',
          // 'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          // 'rgba(153, 102, 255, 1)',
          // 'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  });


  useEffect(() => {

    const dataToShow = {
      labels: ['Deaths', 'Recovered', 'Active', 'critical'],
      datasets: [
        {
          label: '# of Votes',
          data: [12, 19, 3, 5,],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            // 'rgba(153, 102, 255, 0.2)',
            // 'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            // 'rgba(153, 102, 255, 1)',
            // 'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    }
    async function fetchData() {
      const url = "https://disease.sh/v3/covid-19/all";
      const res: WorldWide = await (await fetch(url)).json();
      const {
        active,
        critical,
        deaths,
        recovered,
      } = res;
      const newData = [deaths, recovered, active, critical];
      // const casePerOneMillion = [deathsPerOneMillion, activePerOneMillion, recoveredPerOneMillion, criticalPerOneMillion];
      dataToShow.datasets[0].data = newData;
      setData(dataToShow);
    }
    fetchData();
  }, []);

  return (
    <>
      <div className='grid gap-y-3'>
        <div className='flex gap-5'>
          <div className='w-11/12 lg:w-full'>
            <Pie data={data} />
          </div>
        </div>
        <p className='my-5 text-center'>Case on the base of total cases</p>
      </div>
    </>
  )
}
