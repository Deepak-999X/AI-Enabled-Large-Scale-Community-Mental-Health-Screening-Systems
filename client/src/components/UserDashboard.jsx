import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function UserDashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [surveys, setSurveys] = useState([]);
    const [note, setNote] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (!userData) {
            navigate('/login');
        } else {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);
            loadSurveys(parsedUser.id);
        }
    }, [navigate]);

    const loadSurveys = async (userId) => {
        try {
            setLoading(true);
            console.log('Loading surveys for user:', userId);
            const response = await axios.get(`http://localhost:5000/api/user/surveys/${userId}`);
            console.log('Survey response:', response.data);
            if (response.data.success) {
                setSurveys(response.data.surveys);
            }
        } catch (error) {
            console.error('Failed to load surveys:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveNote = () => {
        if (!note.trim()) return;
        const newEntry = {
            date: new Date().toISOString().split('T')[0],
            riskLevel: 'Journal',
            notes: note,
            createdAt: new Date()
        };
        setSurveys([newEntry, ...surveys]);
        setNote('');
    };

    const handleRefresh = () => {
        if (user) {
            loadSurveys(user.id);
        }
    };

    // Prepare chart data
    const chartData = {
        labels: surveys.slice(0, 10).reverse().map((s, i) => `Assessment ${i + 1}`),
        datasets: [
            {
                label: 'Risk Score',
                data: surveys.slice(0, 10).reverse().map(s => s.riskScore || 0),
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'Your Mental Health Trend'
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100
            }
        }
    };

    // Calculate statistics
    const avgRiskScore = surveys.length > 0
        ? (surveys.reduce((sum, s) => sum + (s.riskScore || 0), 0) / surveys.length).toFixed(1)
        : 0;

    const riskDistribution = {
        High: surveys.filter(s => s.riskLevel === 'High').length,
        Medium: surveys.filter(s => s.riskLevel === 'Medium').length,
        Low: surveys.filter(s => s.riskLevel === 'Low').length
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900">My Wellness Dashboard</h1>
                        <p className="text-gray-500 mt-1">Welcome back, <strong>{user.name}</strong></p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={handleRefresh}
                            className="bg-gray-600 text-white px-4 py-3 rounded-lg font-bold shadow hover:bg-gray-700 transition"
                        >
                            🔄 Refresh
                        </button>
                        <Link to="/survey" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold shadow hover:bg-blue-700 transition">
                            + New Assessment
                        </Link>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="text-sm text-gray-600 mb-1">Total Assessments</div>
                        <div className="text-3xl font-bold text-gray-900">{surveys.length}</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="text-sm text-gray-600 mb-1">Average Risk Score</div>
                        <div className="text-3xl font-bold text-blue-600">{avgRiskScore}</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="text-sm text-gray-600 mb-1">High Risk Count</div>
                        <div className="text-3xl font-bold text-red-600">{riskDistribution.High}</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="text-sm text-gray-600 mb-1">Low Risk Count</div>
                        <div className="text-3xl font-bold text-green-600">{riskDistribution.Low}</div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">

                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-6">

                        {/* Chart */}
                        {surveys.length > 0 && (
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <Line data={chartData} options={chartOptions} />
                            </div>
                        )}

                        {/* Journal */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-800 mb-4">📝 Private Journal</h3>
                            <textarea
                                className="w-full p-4 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-100 outline-none resize-none"
                                rows="3"
                                placeholder="How are you feeling today?"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                            ></textarea>
                            <div className="flex justify-end mt-2">
                                <button onClick={handleSaveNote} className="text-sm bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900">Save Note</button>
                            </div>
                        </div>

                        {/* Assessment History */}
                        <div className="space-y-4">
                            <h3 className="font-bold text-gray-800 text-lg">Assessment History</h3>
                            {loading ? (
                                <div className="text-center py-8 text-gray-500">Loading...</div>
                            ) : surveys.length === 0 ? (
                                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
                                    <p className="text-gray-600 mb-4">No assessments yet</p>
                                    <Link to="/survey" className="text-blue-600 hover:text-blue-700 font-bold">
                                        Take your first assessment →
                                    </Link>
                                </div>
                            ) : (
                                surveys.map((entry, idx) => (
                                    <div key={idx} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                                        {new Date(entry.createdAt).toLocaleDateString()}
                                                    </span>
                                                    <span className={`text-xs font-bold px-2 py-1 rounded ${entry.riskLevel === 'High' ? 'bg-red-100 text-red-700' :
                                                            entry.riskLevel === 'Medium' ? 'bg-orange-100 text-orange-700' :
                                                                entry.riskLevel === 'Low' ? 'bg-green-100 text-green-700' :
                                                                    'bg-gray-100 text-gray-700'
                                                        }`}>
                                                        {entry.riskLevel}
                                                    </span>
                                                    {entry.riskScore && (
                                                        <span className="text-xs text-gray-500">Score: {entry.riskScore.toFixed(1)}</span>
                                                    )}
                                                </div>
                                                {entry.notes && (
                                                    <p className="text-sm text-gray-600 mt-1">{entry.notes}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">

                        {/* Profile Card */}
                        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-xl text-white shadow-lg">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl font-bold mb-4">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <h3 className="font-bold text-xl mb-1">{user.name}</h3>
                            <p className="text-sm opacity-90">{user.email}</p>
                            <div className="mt-4 pt-4 border-t border-white/20 text-sm">
                                <div className="flex justify-between mb-1">
                                    <span>Age:</span>
                                    <span className="font-bold">{user.age || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Gender:</span>
                                    <span className="font-bold">{user.gender || 'N/A'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white p-6 rounded-xl border shadow-sm">
                            <h3 className="font-bold text-gray-800 mb-4">Quick Actions</h3>
                            <Link to="/survey" className="w-full border border-blue-600 bg-blue-50 text-blue-600 rounded-lg p-3 flex items-center justify-center gap-2 hover:bg-blue-100 text-sm font-medium mb-2">
                                📋 New Assessment
                            </Link>
                            <Link to="/ai-playground" className="w-full border border-gray-300 rounded-lg p-3 flex items-center justify-center gap-2 hover:bg-gray-50 text-sm font-medium mb-2">
                                ⚡ Try AI Engine
                            </Link>
                            <Link to="/stress-relief" className="w-full border border-purple-300 bg-purple-50 text-purple-600 rounded-lg p-3 flex items-center justify-center gap-2 hover:bg-purple-100 text-sm font-medium mb-2">
                                🎮 Stress Relief Games
                            </Link>
                            <button className="w-full border border-gray-300 rounded-lg p-3 flex items-center justify-center gap-2 hover:bg-gray-50 text-sm font-medium">
                                📄 Export Data (PDF)
                            </button>
                        </div>

                        {/* Helplines */}
                        <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
                            <h3 className="font-bold text-gray-800 mb-3">🇮🇳 Need Help?</h3>
                            <div className="space-y-2 text-sm">
                                <div>
                                    <div className="font-bold text-gray-900">KIRAN</div>
                                    <a href="tel:18005990019" className="text-blue-600">1800-599-0019</a>
                                </div>
                                <div>
                                    <div className="font-bold text-gray-900">Vandrevala</div>
                                    <a href="tel:9999666555" className="text-blue-600">9999-666-555</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
