import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function OrgDashboard() {

    // Simulated Data for "Realtime" Department Analytics
    const deptData = {
        labels: ['Engineering', 'Sales', 'HR', 'Support', 'Marketing'],
        datasets: [
            {
                label: 'High Risk (Anxiety/Burnout)',
                data: [12, 8, 3, 9, 5],
                backgroundColor: 'rgba(239, 68, 68, 0.7)',
            },
            {
                label: 'Moderate Stress',
                data: [15, 20, 8, 12, 10],
                backgroundColor: 'rgba(249, 115, 22, 0.7)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Mental Health Risk by Department' },
        },
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <header className="flex justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Acme Corp - Wellness Overview</h1>
                        <p className="text-sm text-gray-500">Realtime Employee Pulse Check</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="text-right">
                            <p className="text-2xl font-bold text-blue-600">87%</p>
                            <p className="text-xs text-gray-500">Participation Rate</p>
                        </div>
                        <div className="text-right border-l pl-4">
                            <p className="text-2xl font-bold text-green-600">4.2</p>
                            <p className="text-xs text-gray-500">Avg Wellness Score</p>
                        </div>
                    </div>
                </header>

                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                    {/* Heatmap / Main Chart */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <Bar options={options} data={deptData} />
                    </div>

                    {/* Action Items */}
                    <div className="space-y-6">
                        <div className="bg-red-50 p-6 rounded-xl border border-red-100">
                            <h3 className="font-bold text-red-800 mb-2">⚠ Focus Area: Engineering</h3>
                            <p className="text-sm text-red-700 mb-4">
                                High levels of burnout markers detected in the Engineering department (Late night logins + High PSS scores).
                            </p>
                            <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow hover:bg-red-700">
                                Deploy "Burnout Breaker" Campaign
                            </button>
                        </div>

                        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                            <h3 className="font-bold text-blue-800 mb-2">💡 Recommended Intervention</h3>
                            <p className="text-sm text-blue-700 mb-4">
                                Based on aggregate data, 40% of staff report "Poor Sleep". Consider organizing a Sleep Hygiene Workshop.
                            </p>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow hover:bg-blue-700">
                                Schedule Workshop
                            </button>
                        </div>
                    </div>
                </div>

                {/* Detailed Metrics Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <h3 className="p-6 font-bold text-gray-800 border-b">Department Health Metrics</h3>
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-500 uppercase font-medium">
                            <tr>
                                <th className="px-6 py-3">Department</th>
                                <th className="px-6 py-3">Stress Level</th>
                                <th className="px-6 py-3">Engagement</th>
                                <th className="px-6 py-3">Primary Concern</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 font-bold">Engineering</td>
                                <td className="px-6 py-4 text-red-600">High</td>
                                <td className="px-6 py-4">92%</td>
                                <td className="px-6 py-4">Burnout / Fatigue</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 font-bold">Sales</td>
                                <td className="px-6 py-4 text-orange-500">Moderate</td>
                                <td className="px-6 py-4">88%</td>
                                <td className="px-6 py-4">Anxiety</td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="px-6 py-4 font-bold">Marketing</td>
                                <td className="px-6 py-4 text-green-600">Low</td>
                                <td className="px-6 py-4">85%</td>
                                <td className="px-6 py-4">Work-Life Balance</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
