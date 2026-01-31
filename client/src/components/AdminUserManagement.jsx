import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function AdminUserManagement() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Check if user is admin
        const userData = localStorage.getItem('user');
        if (!userData) {
            navigate('/login');
            return;
        }

        const user = JSON.parse(userData);
        if (user.role !== 'admin') {
            alert('Access Denied: Admin privileges required');
            navigate('/');
            return;
        }

        loadUsers();
    }, [navigate]);

    const loadUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/admin/users');
            if (response.data.success) {
                setUsers(response.data.users);
            }
        } catch (error) {
            console.error('Failed to load users:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadUserDetails = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/admin/users/${userId}`);
            if (response.data.success) {
                setUserDetails(response.data);
                setSelectedUser(userId);
            }
        } catch (error) {
            console.error('Failed to load user details:', error);
        }
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getRiskColor = (level) => {
        switch (level) {
            case 'High': return 'bg-red-100 text-red-700';
            case 'Medium': return 'bg-orange-100 text-orange-700';
            case 'Low': return 'bg-green-100 text-green-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">👥 User Management</h1>
                    <p className="text-gray-600">Monitor registered users and their mental health assessment progress</p>
                    <div className="mt-2 bg-blue-50 border border-blue-200 rounded-lg p-3 inline-block">
                        <span className="text-sm text-blue-800">🔒 Admin Access Only</span>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="text-sm text-gray-600 mb-1">Total Users</div>
                        <div className="text-3xl font-bold text-gray-900">{users.length}</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="text-sm text-gray-600 mb-1">Active This Week</div>
                        <div className="text-3xl font-bold text-blue-600">
                            {users.filter(u => {
                                if (!u.lastAssessment) return false;
                                const weekAgo = new Date();
                                weekAgo.setDate(weekAgo.getDate() - 7);
                                return new Date(u.lastAssessment) > weekAgo;
                            }).length}
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="text-sm text-gray-600 mb-1">High Risk Users</div>
                        <div className="text-3xl font-bold text-red-600">
                            {users.filter(u => u.lastRiskLevel === 'High').length}
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="text-sm text-gray-600 mb-1">Total Assessments</div>
                        <div className="text-3xl font-bold text-purple-600">
                            {users.reduce((sum, u) => sum + u.totalAssessments, 0)}
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">

                    {/* Users List */}
                    <div className="md:col-span-2">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100">

                            {/* Search */}
                            <div className="p-6 border-b border-gray-100">
                                <input
                                    type="text"
                                    placeholder="🔍 Search by name or email..."
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            {/* Users Table */}
                            <div className="overflow-x-auto">
                                {loading ? (
                                    <div className="p-8 text-center text-gray-500">Loading users...</div>
                                ) : filteredUsers.length === 0 ? (
                                    <div className="p-8 text-center text-gray-500">No users found</div>
                                ) : (
                                    <table className="w-full">
                                        <thead className="bg-gray-50 border-b border-gray-200">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">User</th>
                                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Assessments</th>
                                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Last Risk</th>
                                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {filteredUsers.map((user) => (
                                                <tr
                                                    key={user.id}
                                                    className={`hover:bg-gray-50 transition ${selectedUser === user.id ? 'bg-blue-50' : ''}`}
                                                >
                                                    <td className="px-6 py-4">
                                                        <div>
                                                            <div className="font-bold text-gray-900">{user.name}</div>
                                                            <div className="text-sm text-gray-500">{user.email}</div>
                                                            <div className="text-xs text-gray-400 mt-1">
                                                                Joined: {new Date(user.joinedDate).toLocaleDateString()}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="font-bold text-gray-900">{user.totalAssessments}</div>
                                                        {user.lastAssessment && (
                                                            <div className="text-xs text-gray-500">
                                                                Last: {new Date(user.lastAssessment).toLocaleDateString()}
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-2 py-1 rounded text-xs font-bold ${getRiskColor(user.lastRiskLevel)}`}>
                                                            {user.lastRiskLevel}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <button
                                                            onClick={() => loadUserDetails(user.id)}
                                                            className="text-blue-600 hover:text-blue-700 font-bold text-sm"
                                                        >
                                                            View Details →
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* User Details Panel */}
                    <div>
                        {userDetails ? (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">User Details</h3>

                                {/* Profile */}
                                <div className="mb-6">
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-3">
                                        {userDetails.user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <h4 className="font-bold text-gray-900 text-lg">{userDetails.user.name}</h4>
                                    <p className="text-sm text-gray-600">{userDetails.user.email}</p>
                                    <div className="mt-3 space-y-1 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Age:</span>
                                            <span className="font-bold">{userDetails.user.age || 'N/A'}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Gender:</span>
                                            <span className="font-bold">{userDetails.user.gender || 'N/A'}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Joined:</span>
                                            <span className="font-bold">{new Date(userDetails.user.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Assessment History */}
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-3">Assessment History</h4>
                                    {userDetails.assessments.length === 0 ? (
                                        <p className="text-sm text-gray-500">No assessments yet</p>
                                    ) : (
                                        <div className="space-y-3 max-h-96 overflow-y-auto">
                                            {userDetails.assessments.map((assessment, idx) => (
                                                <div key={idx} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <span className={`px-2 py-1 rounded text-xs font-bold ${getRiskColor(assessment.riskLevel)}`}>
                                                            {assessment.riskLevel}
                                                        </span>
                                                        <span className="text-xs text-gray-500">
                                                            {new Date(assessment.createdAt).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                    {assessment.riskScore && (
                                                        <div className="text-sm text-gray-600">
                                                            Score: <span className="font-bold">{assessment.riskScore.toFixed(1)}</span>
                                                        </div>
                                                    )}
                                                    {assessment.notes && (
                                                        <p className="text-xs text-gray-600 mt-2">{assessment.notes}</p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <button
                                    onClick={() => setUserDetails(null)}
                                    className="mt-4 w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition"
                                >
                                    Close
                                </button>
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center text-gray-500">
                                <div className="text-4xl mb-3">👤</div>
                                <p>Select a user to view details</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Back Link */}
                <div className="mt-8 text-center">
                    <Link to="/admin-dashboard" className="text-blue-600 hover:text-blue-700 font-bold">
                        ← Back to Admin Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}
