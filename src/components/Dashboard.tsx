import { ChartPage } from "./ChartPage";
import { WorldChart } from "./WorldChart";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { WorldData } from "../types";

const Dashboard = () => {
    const [data, setData] = useState([] as WorldData[])

    useEffect(() => {
        const dataFetching = async () => {
            const url = "https://disease.sh/v3/covid-19/countries";
            const newData: WorldData[] = await (await fetch(url)).json();
            setData(newData);
        }
        dataFetching();
    }, []);
    return (
        <div className="max-w-xl lg:max-w-5xl xl:max-w-7xl mx-auto">
            <h1 className="text-3xl lg:text-5xl text-center py-10 font-bold md:py-12 xl:py-20">Covid cases Analysis</h1>
            <div className="">
                <div className="grid-col-1 md:flex justify-between col-4">
                    <ChartPage />
                    <div className="flex justify-center items-center pb-10 xl:pb-0">
                        <WorldChart />
                    </div>
                </div>
            </div>
            <div className="">
                <h1 className="text-3xl lg:text-5xl text-center py-20 font-bold">World Wide Cases</h1>
                <p className="text-base md:text-lg mb-10">To get detailed Analysis of covid cases, <Link to={'/dashboard/world-list'} className="text-blue-500 text-lg md:text-xl">click here</Link></p>
                <div className="flex flex-col">
                    <div className="-my-2 max-h-screen sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle min-w-full sm:px-6 lg:px-8 flex justify-center">
                            <div className="shadow overflow-scroll border-b border-gray-200 sm:rounded-lg table-wrp bg-gray-300">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                                Country Name
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                                Cases
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                                Today Cases
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                                Deaths
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                                Recovered
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                                Today Recovered
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                                Active
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                                Critical
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                                Cases/1M
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                                Deaths/1M
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                                Tests
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                                Tests/1M
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                                                Population
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 overflow-scroll">

                                        {
                                            data.slice(0, 8).map((covid, index) =>
                                                <tr key={index}>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0 h-10 w-10">
                                                                <img className="h-10 w-10 rounded-full" src={`${covid.countryInfo.flag}`} alt="" />
                                                            </div>
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-gray-900">
                                                                    {covid.country}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {covid.cases}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {covid.todayCases}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {covid.deaths}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {covid.recovered}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {covid.todayRecovered}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                            {covid.active}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {covid.critical}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {covid.casesPerOneMillion}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {covid.deathsPerOneMillion}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {covid.tests}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {covid.testsPerOneMillion}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {covid.population}
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div >
            </div>
        </div>
    );
}

export default Dashboard;