import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
    const [user, setUser] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        setShowDropdown(false);
        navigate('/');
    };

    return (
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">M</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900">MENTIS 24</span>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition">Home</Link>
                        <Link to="/survey" className="text-gray-700 hover:text-blue-600 font-medium transition">Take Assessment</Link>
                        <Link to="/ai-playground" className="text-gray-700 hover:text-blue-600 font-medium transition">AI Engine</Link>
                        <Link to="/admin-dashboard" className="text-gray-700 hover:text-blue-600 font-medium transition">Community Stats</Link>
                    </nav>

                    {/* User Actions */}
                    <div className="flex items-center gap-4">
                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setShowDropdown(!showDropdown)}
                                    className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition"
                                >
                                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="font-medium text-gray-900">{user.name}</span>
                                </button>

                                {showDropdown && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                                        <Link
                                            to="/user-dashboard"
                                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                            onClick={() => setShowDropdown(false)}
                                        >
                                            My Dashboard
                                        </Link>
                                        {user.role === 'admin' && (
                                            <>
                                                <div className="border-t border-gray-200 my-1"></div>
                                                <div className="px-4 py-1 text-xs text-gray-500 uppercase font-bold">Admin</div>
                                                <Link
                                                    to="/admin/users"
                                                    className="block px-4 py-2 text-blue-700 hover:bg-blue-50"
                                                    onClick={() => setShowDropdown(false)}
                                                >
                                                    👥 User Management
                                                </Link>
                                                <Link
                                                    to="/admin-dashboard"
                                                    className="block px-4 py-2 text-blue-700 hover:bg-blue-50"
                                                    onClick={() => setShowDropdown(false)}
                                                >
                                                    📊 Community Stats
                                                </Link>
                                            </>
                                        )}
                                        <div className="border-t border-gray-200 my-1"></div>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="text-gray-700 hover:text-blue-600 font-medium transition"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg transition"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
