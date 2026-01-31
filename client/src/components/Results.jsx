import React, { useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function Results() {
    const location = useLocation();
    const { result } = location.state || {};
    const resultRef = useRef(null);

    if (!result) {
        return <div className="p-10 text-center">No results found. <Link to="/survey" className="text-blue-600 underline">Take Survey</Link></div>;
    }

    const { analysis } = result;

    const downloadPDF = () => {
        const input = resultRef.current;
        html2canvas(input).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save("my-risk-assessment.pdf");
        });
    };

    const getRiskColor = (level) => {
        switch (level) {
            case 'High': return 'text-red-700 bg-red-50 border-red-300';
            case 'Medium': return 'text-orange-700 bg-orange-50 border-orange-300';
            case 'Low': return 'text-green-700 bg-green-50 border-green-300';
            default: return 'text-gray-600 bg-gray-50';
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 my-10" ref={resultRef}>
            <div className="flex justify-between items-center mb-6 no-print">
                <h1 className="text-2xl font-bold">Assessment Report</h1>
                <button onClick={downloadPDF} className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-bold shadow hover:bg-gray-800">
                    ⬇ Download PDF
                </button>
            </div>

            {/* Header Summary */}
            <div className={`p-8 rounded-2xl border-2 ${getRiskColor(analysis.riskLevel)} mb-8 text-center shadow-sm`}>
                <h2 className="text-4xl font-extrabold mb-3">Overall Risk: {analysis.riskLevel}</h2>
                <p className="text-lg font-medium opacity-90">{analysis.summary}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">

                {/* Detailed Scores */}
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">🧠 Clinical Analysis</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Depression (PHQ-9)</span>
                            <span className="font-bold text-gray-900 bg-gray-100 px-3 py-1 rounded">{analysis.scores.depression.label}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Anxiety (GAD-7)</span>
                            <span className="font-bold text-gray-900 bg-gray-100 px-3 py-1 rounded">{analysis.scores.anxiety.label}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Stress (PSS)</span>
                            <span className="font-bold text-gray-900 bg-gray-100 px-3 py-1 rounded">{analysis.scores.stress.label}</span>
                        </div>
                    </div>
                    {analysis.patterns.length > 0 && (
                        <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                            <h4 className="font-bold text-yellow-800 text-sm mb-2">⚠ AI Pattern Detection</h4>
                            <ul className="text-xs text-yellow-700 space-y-1">
                                {analysis.patterns.map((p, i) => <li key={i}>• {p}</li>)}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Resources & Indian Support */}
                <div className="space-y-6">

                    {/* Dynamic Awareness Content - MENTIS 24 Feature */}
                    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-100 shadow-sm">
                        <h3 className="text-xl font-bold text-purple-900 mb-3">💡 Personalized Insights</h3>

                        {analysis.scores.stress.label.includes('High') || analysis.scores.stress.label.includes('Moderate') ? (
                            <div className="mb-4 bg-white p-4 rounded-lg border border-purple-200">
                                <h4 className="font-bold text-purple-800">Understanding Workplace Burnout</h4>
                                <p className="text-sm text-gray-600 mt-1">
                                    Your stress scores indicate potential burnout. In a workplace setting, this often manifests as exhaustion and cynicism.
                                </p>
                                <h5 className="font-bold text-xs mt-3 text-purple-700 uppercase">Quick Tips:</h5>
                                <ul className="list-disc pl-4 text-sm text-gray-600 mt-1">
                                    <li>Set strict boundaries for "offline" time.</li>
                                    <li>Speak to a manager about workload redistribution.</li>
                                    <li>Practice the "3-Minute Breathing Space" technique.</li>
                                </ul>

                                {/* Stress Relief Games CTA */}
                                <Link
                                    to="/stress-relief"
                                    state={{ riskLevel: analysis.riskLevel }}
                                    className="mt-4 block bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-3 px-4 rounded-lg font-bold hover:from-purple-700 hover:to-pink-700 transition shadow-lg"
                                >
                                    🎮 Try Stress-Relief Games & Activities →
                                </Link>
                            </div>
                        ) : null}

                        {analysis.scores.anxiety.label.includes('Severe') || analysis.scores.anxiety.label.includes('Moderate') ? (
                            <div className="mb-4 bg-white p-4 rounded-lg border border-indigo-200">
                                <h4 className="font-bold text-indigo-800">Coping with Chronic Anxiety</h4>
                                <p className="text-sm text-gray-600 mt-1">
                                    High anxiety can affect concentration and sleep. It is valid to seek accommodation or support.
                                </p>
                                <ul className="list-disc pl-4 text-sm text-gray-600 mt-1">
                                    <li>Identify your specific triggers using a journal.</li>
                                    <li>Grounding exercise: Name 5 things you can see right now.</li>
                                </ul>
                            </div>
                        ) : null}

                        {analysis.riskLevel === 'Low' && (
                            <div className="bg-white p-4 rounded-lg border border-green-200">
                                <h4 className="font-bold text-green-800">Maintaining Mental Wellness</h4>
                                <p className="text-sm text-gray-600 mt-1">
                                    You're in a good place! Focus on "Preventative Care" to stay resilient.
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                        <h3 className="text-xl font-bold text-blue-800 mb-4">🇮🇳 Indian Helplines (24/7)</h3>

                        <div className="space-y-3">
                            <div className="p-3 bg-blue-50 rounded-lg flex justify-between items-center">
                                <div>
                                    <p className="font-bold text-blue-900">KIRAN (Govt of India)</p>
                                    <p className="text-xs text-blue-600">Mental Health Rehabilitation</p>
                                </div>
                                <a href="tel:18005990019" className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-bold hover:bg-blue-700">1800-599-0019</a>
                            </div>

                            <div className="p-3 bg-green-50 rounded-lg flex justify-between items-center">
                                <div>
                                    <p className="font-bold text-green-900">iCall (Tata Institute)</p>
                                    <p className="text-xs text-green-600">Psychosocial Support</p>
                                </div>
                                <a href="tel:9152987821" className="bg-green-600 text-white px-3 py-1 rounded text-sm font-bold hover:bg-green-700">91529-87821</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 text-center space-x-4 no-print">
                <Link to="/" className="text-gray-500 hover:text-gray-800 text-sm font-medium">Back to Home</Link>
                <Link to="/user-dashboard" className="text-blue-500 hover:text-blue-800 text-sm font-bold">Go to Dashboard</Link>
            </div>
        </div>
    );
}
