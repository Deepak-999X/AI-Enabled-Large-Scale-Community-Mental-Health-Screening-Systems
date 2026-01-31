import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function AboutAI() {
    const { t } = useTranslation();

    return (
        <div className="max-w-4xl mx-auto p-8 my-10 bg-white shadow-xl rounded-xl border border-blue-50">
            <h1 className="text-3xl font-bold text-blue-900 mb-6">About Our AI & Privacy</h1>

            <div className="space-y-8">

                <section>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-3">🛡️ Screen Monitoring & Privacy</h2>
                    <p className="text-gray-700 leading-relaxed">
                        Our system uses a <strong>Privacy-First Screen Monitoring</strong> approach. Unlike traditional monitoring, our AI does <strong>not</strong> record your screen or store video. Instead, it analyzes <em>behavioral patterns</em> and text inputs locally within the secure session to detect signs of:
                    </p>
                    <ul className="list-disc pl-5 mt-3 space-y-2 text-gray-600">
                        <li>High emotional distress markers in responses.</li>
                        <li>Latency patterns that may indicate hesitation or cognitive fatigue.</li>
                        <li>Key triggers related to self-harm or severe anxiety.</li>
                    </ul>
                    <div className="mt-4 bg-green-50 p-4 rounded-lg border border-green-200">
                        <p className="text-sm text-green-800 font-medium">
                            ✅ Zero-Knowledge Storage: Your raw inputs are processed momentarily for scoring and then discarded. Only anonymized risk scores are stored for community statistics.
                        </p>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-3">🤖 How the AI "Thinks"</h2>
                    <p className="text-gray-700 leading-relaxed">
                        We utilize <strong>Natural Language Processing (NLP)</strong> and <strong>Pattern Matching Algorithms</strong> trained on clinical datasets (like PHQ-9 and GAD-7).
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <h3 className="font-bold text-blue-700">Detection Accuracy</h3>
                            <p className="text-sm text-gray-600 mt-2">
                                The system cross-references your answers against established clinical thresholds. It flags inconsistencies and high-risk combinations (e.g., high anxiety + sleep deprivation).
                            </p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <h3 className="font-bold text-blue-700">Continuous Learning</h3>
                            <p className="text-sm text-gray-600 mt-2">
                                With community consent, anonymized aggregate data helps retrain the model to better understand regional idioms and cultural expressions of distress, specifically tuned for an <strong>Indian demographic</strong>.
                            </p>
                        </div>
                    </div>
                </section>

                <div className="text-center pt-6 border-t">
                    <Link to="/" className="text-blue-600 font-bold hover:underline">Return to Home</Link>
                </div>

            </div>
        </div>
    );
}
