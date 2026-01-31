import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import io from 'socket.io-client';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

ChartJS.register(ArcElement, Tooltip, Legend);

const socket = io('http://localhost:5000');

export default function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [liveUpdates, setLiveUpdates] = useState([]);
    const dashboardRef = useRef(null);

    useEffect(() => {
        axios.get('http://localhost:5000/api/stats')
            .then(res => setStats(res.data))
            .catch(err => console.error(err));

        socket.on('newSurvey', (data) => {
            setStats(prevStats => {
                if (!prevStats) return prevStats;
                const newStats = { ...prevStats };
                newStats.total += 1;
                newStats.riskDistribution[data.riskLevel] += 1;
                return newStats;
            });
            setLiveUpdates(prev => [`New screening: ${data.riskLevel} at ${new Date(data.timestamp).toLocaleTimeString()}`, ...prev].slice(0, 5));
        });

        return () => socket.off('newSurvey');
    }, []);

    const downloadPDF = () => {
        const input = dashboardRef.current;
        html2canvas(input).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save("community-report.pdf");
        });
    };

    const generateGoogleForm = () => {
        alert("Simulation: A Google Form template link has been generated and sent to your email.");
    };

    if (!stats) return <div className="p-10 text-center">Loading Dashboard...</div>;

    const data = {
        labels: ['High Risk', 'Medium Risk', 'Low Risk'],
        datasets: [{
            data: [stats.riskDistribution.High, stats.riskDistribution.Medium, stats.riskDistribution.Low],
            backgroundColor: ['rgba(239, 68, 68, 0.6)', 'rgba(249, 115, 22, 0.6)', 'rgba(34, 197, 94, 0.6)'],
            borderColor: ['rgba(239, 68, 68, 1)', 'rgba(249, 115, 22, 1)', 'rgba(34, 197, 94, 1)'],
            borderWidth: 1,
        }],
    };

    return (
        <div className="max-w-7xl mx-auto p-6" ref={dashboardRef}>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Admin Control Panel</h1>
                    <p className="text-gray-500">Realtime Community Monitoring & Tools</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={generateGoogleForm} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-bold shadow text-sm">
                        Generate Survey Link
                    </button>
                    <button onClick={downloadPDF} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold shadow text-sm">
                        Download Report PDF
                    </button>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Charts Section */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-1">
                    <h3 className="text-lg font-bold mb-4 text-center">Risk Distribution</h3>
                    <div className="w-full max-w-xs mx-auto">
                        <Pie data={data} key={stats.total} />
                    </div>
                    <div className="mt-6 text-center">
                        <p className="text-4xl font-bold text-gray-800">{stats.total}</p>
                        <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Total Screenings</p>
                    </div>
                </div>

                {/* Live Feed & Tools */}
                <div className="lg:col-span-2 space-y-6">

                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
                            <h3 className="font-bold text-blue-800 mb-2">👥 User Management</h3>
                            <p className="text-sm text-blue-700 mb-3">Monitor registered users and their progress.</p>
                            <Link to="/admin/users" className="text-xs bg-blue-600 text-white px-3 py-1 rounded inline-block hover:bg-blue-700">View All Users</Link>
                        </div>
                        <div className="bg-purple-50 p-5 rounded-lg border border-purple-100">
                            <h3 className="font-bold text-purple-800 mb-2">School & Workplace</h3>
                            <p className="text-sm text-purple-700 mb-3">Distribute standardized survey links to organizations.</p>
                            <button className="text-xs bg-purple-600 text-white px-3 py-1 rounded">Manage Links</button>
                        </div>
                        <div className="bg-indigo-50 p-5 rounded-lg border border-indigo-100">
                            <h3 className="font-bold text-indigo-800 mb-2">Resources</h3>
                            <p className="text-sm text-indigo-700 mb-3">Update helpline numbers and awareness content.</p>
                            <button className="text-xs bg-indigo-600 text-white px-3 py-1 rounded">Edit Content</button>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 h-64 overflow-y-auto">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-gray-700">Live Activity Log</h3>
                            <span className="flex items-center text-xs text-green-600 font-bold"><span className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span> Online</span>
                        </div>
                        <ul className="space-y-2">
                            {liveUpdates.length === 0 ? <li className="text-gray-400 text-sm italic">Monitoring for new submissions...</li> :
                                liveUpdates.map((u, i) => <li key={i} className="text-sm border-l-2 border-blue-400 pl-3 py-1 bg-white rounded shadow-sm">{u}</li>)}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
