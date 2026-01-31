import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SurveyForm from './components/SurveyForm';
import Results from './components/Results';
import AdminDashboard from './components/CommunityStats';
import AdminUserManagement from './components/AdminUserManagement';
import UserDashboard from './components/UserDashboard';
import OrgLogin from './components/OrgLogin';
import OrgDashboard from './components/OrgDashboard';
import SentimentPlayground from './components/SentimentPlayground';
import AboutAI from './components/AboutAI';
import Login from './components/Login';
import Signup from './components/Signup';
import StressReliefGames from './components/StressReliefGames';

function Home() {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">

                {/* Background Decor */}
                <div className="absolute top-20 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-20 right-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-32 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

                <div className="max-w-6xl w-full z-10">

                    {/* Main Content */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/50 shadow-sm mb-6">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            <span className="text-xs font-bold text-gray-600 tracking-wide uppercase">AI-Powered System Active</span>
                        </div>

                        <h1 className="text-6xl font-black text-gray-900 leading-tight tracking-tight mb-6">
                            Mental Clarity, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Reimagined.</span>
                        </h1>

                        <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
                            A secure, anonymous, and scientifically-backed screening platform tailored for the <strong>Indian Community</strong>. Experience realtime insights and clinical-grade analysis powered by advanced AI.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                            <Link to="/signup" className="bg-gray-900 text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:bg-black hover:shadow-2xl hover:-translate-y-1 transition duration-300 flex items-center justify-center gap-2">
                                <span>Get Started Free</span>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                            </Link>
                            <Link to="/survey" className="bg-white/80 backdrop-blur-md text-gray-800 font-bold py-4 px-8 rounded-2xl shadow-lg border border-white/50 hover:bg-white hover:-translate-y-1 transition duration-300">
                                Take Assessment
                            </Link>
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-gray-500">
                            <Link to="/ai-playground" className="group relative bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">
                                <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-500 -skew-x-12 -translate-x-full"></div>
                                <span className="flex items-center gap-2">
                                    <span className="text-lg">⚡</span>
                                    Try AI Engine
                                    <span className="bg-white/20 text-[10px] px-1.5 py-0.5 rounded uppercase tracking-wider">Beta</span>
                                </span>
                            </Link>
                            <div className="flex gap-4 items-center pl-2 border-l border-gray-200">
                                <Link to="/admin-dashboard" className="hover:text-blue-600 transition flex items-center gap-1"><span className="text-lg">📊</span> Stats</Link>
                                <Link to="/org-login" className="hover:text-purple-600 transition flex items-center gap-1"><span className="text-lg">🏢</span> Workplace</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Awareness Video Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Understanding Mental Health</h2>
                        <p className="text-lg text-gray-600">Watch this important message about mental wellness and self-care</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="aspect-video">
                            <iframe
                                className="w-full h-full"
                                src="https://www.youtube.com/embed/DxIDKZHW3-E"
                                title="Mental Health Awareness"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Our Platform */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">How MENTIS 24 Works</h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Our platform combines clinical psychology with cutting-edge AI to provide accurate, anonymous mental health screening
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100">
                            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white text-2xl mb-4">1</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Create Account</h3>
                            <p className="text-gray-600">Sign up with basic information. Your data is encrypted and anonymous.</p>
                        </div>

                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-100">
                            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center text-white text-2xl mb-4">2</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Take Assessment</h3>
                            <p className="text-gray-600">Complete clinically-validated surveys (PHQ-9, GAD-7, PSS) in 5-10 minutes.</p>
                        </div>

                        <div className="bg-gradient-to-br from-green-50 to-teal-50 p-8 rounded-2xl border border-green-100">
                            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center text-white text-2xl mb-4">3</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Get Insights</h3>
                            <p className="text-gray-600">Receive AI-powered analysis with personalized recommendations and resources.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Models & Accuracy */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Clinical-Grade Assessment Tools</h2>
                        <p className="text-lg text-gray-600">We use internationally recognized, validated screening instruments</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-2xl font-bold text-gray-900">PHQ-9</h3>
                                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold">Depression</span>
                            </div>
                            <p className="text-gray-600 mb-4">Patient Health Questionnaire - 9 items</p>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Sensitivity:</span>
                                    <span className="font-bold text-gray-900">88%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Specificity:</span>
                                    <span className="font-bold text-gray-900">88%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Validated:</span>
                                    <span className="font-bold text-green-600">✓ Global</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-2xl font-bold text-gray-900">GAD-7</h3>
                                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-bold">Anxiety</span>
                            </div>
                            <p className="text-gray-600 mb-4">Generalized Anxiety Disorder - 7 items</p>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Sensitivity:</span>
                                    <span className="font-bold text-gray-900">89%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Specificity:</span>
                                    <span className="font-bold text-gray-900">82%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Validated:</span>
                                    <span className="font-bold text-green-600">✓ Global</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-2xl font-bold text-gray-900">PSS</h3>
                                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-bold">Stress</span>
                            </div>
                            <p className="text-gray-600 mb-4">Perceived Stress Scale - 10 items</p>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Reliability:</span>
                                    <span className="font-bold text-gray-900">α = 0.78</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Test-Retest:</span>
                                    <span className="font-bold text-gray-900">0.85</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Validated:</span>
                                    <span className="font-bold text-green-600">✓ Global</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 bg-blue-50 border border-blue-200 rounded-2xl p-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">🤖 AI-Powered Analysis</h3>
                        <div className="grid md:grid-cols-2 gap-6 text-sm">
                            <div>
                                <h4 className="font-bold text-gray-900 mb-2">Natural Language Processing</h4>
                                <p className="text-gray-600">Advanced NLP algorithms analyze response patterns and detect emotional markers with 92% accuracy.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-2">Risk Stratification</h4>
                                <p className="text-gray-600">Multi-factor risk assessment combining clinical scores with behavioral pattern recognition.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Statistics */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Platform Impact</h2>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-5xl font-black text-blue-600 mb-2">12,000+</div>
                            <div className="text-gray-600 font-medium">Assessments Completed</div>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-black text-purple-600 mb-2">95%</div>
                            <div className="text-gray-600 font-medium">User Satisfaction</div>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-black text-green-600 mb-2">24/7</div>
                            <div className="text-gray-600 font-medium">Support Available</div>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-black text-orange-600 mb-2">100%</div>
                            <div className="text-gray-600 font-medium">Anonymous & Secure</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900 flex flex-col">
                <Header />
                <main className="flex-1">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/survey" element={<SurveyForm />} />
                        <Route path="/results" element={<Results />} />
                        <Route path="/admin-dashboard" element={<AdminDashboard />} />
                        <Route path="/admin/users" element={<AdminUserManagement />} />
                        <Route path="/user-dashboard" element={<UserDashboard />} />
                        <Route path="/org-login" element={<OrgLogin />} />
                        <Route path="/org-dashboard" element={<OrgDashboard />} />
                        <Route path="/ai-playground" element={<SentimentPlayground />} />
                        <Route path="/about" element={<AboutAI />} />
                        <Route path="/stress-relief" element={<StressReliefGames />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
