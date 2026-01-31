import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

// Grouped Question IDs
const surveySections = [
    {
        id: 'phq',
        title: 'Depression Assessment (PHQ-9)',
        questions: [
            { id: 'phq_1', text: 'Little interest or pleasure in doing things' },
            { id: 'phq_2', text: 'Feeling down, depressed, or hopeless' },
            { id: 'phq_3', text: 'Trouble falling or staying asleep, or sleeping too much' },
            { id: 'phq_4', text: 'Feeling tired or having little energy' },
            { id: 'phq_5', text: 'Poor appetite or overeating' },
            { id: 'phq_6', text: 'Feeling bad about yourself or that you are a failure' },
            { id: 'phq_7', text: 'Trouble concentrating on things' },
            { id: 'phq_8', text: 'Moving or speaking slowly, or being fidgety/restless' },
            { id: 'phq_9', text: 'Thoughts that you would be better off dead' }
        ]
    },
    {
        id: 'gad',
        title: 'Anxiety Assessment (GAD-7)',
        questions: [
            { id: 'gad_1', text: 'Feeling nervous, anxious, or on edge' },
            { id: 'gad_2', text: 'Not being able to stop or control worrying' },
            { id: 'gad_3', text: 'Worrying too much about different things' },
            { id: 'gad_4', text: 'Trouble relaxing' },
            { id: 'gad_5', text: 'Being so restless that it is hard to sit still' },
            { id: 'gad_6', text: 'Becoming easily annoyed or irritable' },
            { id: 'gad_7', text: 'Feeling afraid, as if something awful might happen' }
        ]
    },
    {
        id: 'pss',
        title: 'Stress Assessment (PSS-4)',
        questions: [
            { id: 'pss_1', text: 'Felt unable to control important things in your life' },
            { id: 'pss_2', text: 'Felt confident about handling personal problems' },
            { id: 'pss_3', text: 'Felt that things were going your way' },
            { id: 'pss_4', text: 'Felt difficulties were piling up so high you could not overcome them' }
        ]
    }
];

const options = ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'];

export default function SurveyForm() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [responses, setResponses] = useState({});
    const [consent, setConsent] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (!userData) {
            alert('Please login to take the assessment');
            navigate('/login');
        } else {
            setUser(JSON.parse(userData));
        }
    }, [navigate]);

    const handleResponseChange = (id, value) => {
        setResponses(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!consent) {
            alert("Please provide consent to proceed.");
            return;
        }

        setLoading(true);
        try {
            const { data } = await axios.post('http://localhost:5000/api/survey', {
                responses,
                demographic: { age: user.age, gender: user.gender },
                userId: user.id
            });
            navigate('/results', { state: { result: data } });
        } catch (error) {
            alert('Error submitting survey: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-xl border-t-4 border-blue-600">

                <div className="mb-6 border-b pb-4">
                    <h2 className="text-3xl font-bold text-gray-900">Mental Health Assessment</h2>
                    <p className="text-sm text-gray-500 mt-1">Powered by AI & Clinical Standards (PHQ-9, GAD-7, PSS)</p>
                    <p className="text-sm text-blue-600 mt-2">Welcome, <strong>{user.name}</strong></p>
                </div>

                <div className="mb-8 bg-blue-50 p-5 rounded-lg border border-blue-200 text-sm text-blue-900">
                    <h3 className="font-bold flex items-center mb-2">
                        <span className="mr-2">🔒</span> Privacy & Consent
                    </h3>
                    <p className="mb-3">
                        Your responses are confidential and will be used only for analysis. All data is encrypted and stored securely.
                        This assessment is for screening purposes only and does not replace professional diagnosis.
                    </p>
                    <label className="flex items-start mt-2 cursor-pointer p-2 bg-white rounded border border-blue-100 hover:border-blue-300 transition">
                        <input
                            type="checkbox"
                            checked={consent}
                            onChange={e => setConsent(e.target.checked)}
                            className="mt-1 mr-3 h-4 w-4 text-blue-600"
                        />
                        <span className="font-medium">I consent to participate in this assessment and understand my data will be kept confidential</span>
                    </label>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* Questions Sections */}
                    {surveySections.map((section) => (
                        <div key={section.id} className="space-y-4">
                            <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mt-8">{section.title}</h3>
                            <p className="text-sm text-gray-600 mb-4">Over the last 2 weeks, how often have you been bothered by the following?</p>
                            {section.questions.map((question) => (
                                <div key={question.id} className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition">
                                    <p className="text-gray-900 font-medium mb-3">{question.text}</p>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600">
                                        {options.map((option, val) => (
                                            <label key={val} className="flex flex-col items-center cursor-pointer p-2 rounded hover:bg-white shadow-sm border border-transparent hover:border-gray-200 transition">
                                                <input
                                                    type="radio"
                                                    name={question.id}
                                                    value={val}
                                                    onChange={() => handleResponseChange(question.id, val.toString())}
                                                    required
                                                    className="mb-1"
                                                />
                                                <span className="text-center text-xs">{option}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}

                    <button
                        type="submit"
                        disabled={loading || !consent}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Analyzing Your Responses...' : 'Submit Assessment'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <Link to="/" className="text-gray-500 hover:text-gray-700 text-sm">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
