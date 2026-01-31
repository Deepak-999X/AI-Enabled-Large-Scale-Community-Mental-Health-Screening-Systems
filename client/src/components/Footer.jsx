import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid md:grid-cols-4 gap-8">
                    {/* About */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">MENTIS 24</h3>
                        <p className="text-sm text-gray-400">
                            AI-powered mental health screening platform providing anonymous, scientifically-backed assessments for the Indian community.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
                            <li><Link to="/survey" className="hover:text-white transition">Take Assessment</Link></li>
                            <li><Link to="/user-dashboard" className="hover:text-white transition">My Dashboard</Link></li>
                            <li><Link to="/about" className="hover:text-white transition">About AI</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">Resources</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/admin-dashboard" className="hover:text-white transition">Community Stats</Link></li>
                            <li><Link to="/org-login" className="hover:text-white transition">Workplace Portal</Link></li>
                            <li><Link to="/ai-playground" className="hover:text-white transition">AI Playground</Link></li>
                        </ul>
                    </div>

                    {/* Helplines */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">🇮🇳 24/7 Helplines</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="tel:18005990019" className="hover:text-white transition">
                                    KIRAN: 1800-599-0019
                                </a>
                            </li>
                            <li>
                                <a href="tel:9999666555" className="hover:text-white transition">
                                    Vandrevala: 9999-666-555
                                </a>
                            </li>
                            <li>
                                <a href="tel:9152987821" className="hover:text-white transition">
                                    iCall: 9152-987-821
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
                    <p>&copy; 2026 MENTIS 24. All rights reserved. | Privacy-First Mental Health Platform</p>
                    <p className="mt-2 text-xs">
                        Disclaimer: This platform provides screening tools only. For diagnosis and treatment, please consult a licensed mental health professional.
                    </p>
                </div>
            </div>
        </footer>
    );
}
