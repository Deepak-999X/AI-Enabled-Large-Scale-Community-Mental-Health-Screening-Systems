import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SentimentPlayground() {
    const [inputText, setInputText] = useState('');
    const [analysis, setAnalysis] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [terminalLog, setTerminalLog] = useState([]);

    // Simulated AI Logic (Frontend-side for demo speed, matching backend logic)
    const analyzeText = (text) => {
        const lower = text.toLowerCase();

        // Simple Keyword matching simulation
        const distressWords = ['sad', 'lonely', 'depressed', 'anxious', 'scared', 'fail', 'hopeless', 'die', 'pain'];
        const positiveWords = ['happy', 'joy', 'excited', 'good', 'great', 'hope', 'better', 'strong'];

        let distressScore = 0;
        let positiveScore = 0;
        let matches = [];

        distressWords.forEach(w => {
            if (lower.includes(w)) {
                distressScore += 10;
                matches.push({ word: w, type: 'negative' });
            }
        });

        positiveWords.forEach(w => {
            if (lower.includes(w)) {
                positiveScore += 10;
                matches.push({ word: w, type: 'positive' });
            }
        });

        let sentiment = 'Neutral';
        if (distressScore > positiveScore) sentiment = 'Concerned';
        if (positiveScore > distressScore) sentiment = 'Positive';

        return { sentiment, distressScore, positiveScore, matches };
    };

    const handleAnalyze = async () => {
        if (!inputText.trim()) return;

        setIsAnalyzing(true);
        setAnalysis(null);
        setTerminalLog([]);

        // Simulate terminal processing steps
        const logs = [
            '[INIT] Loading NLP module...',
            '[TOKENIZE] Breaking text into tokens...',
            '[ANALYZE] Scanning for emotional markers...',
            '[CLASSIFY] Computing sentiment vectors...',
            '[COMPLETE] Analysis ready.'
        ];

        for (let i = 0; i < logs.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 300));
            setTerminalLog(prev => [...prev, logs[i]]);
        }

        await new Promise(resolve => setTimeout(resolve, 200));
        const result = analyzeText(inputText);
        setAnalysis(result);
        setIsAnalyzing(false);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-cyan-400 font-mono p-6 flex flex-col items-center selection:bg-cyan-900">

            {/* Header */}
            <div className="max-w-4xl w-full flex justify-between items-end mb-8 border-b border-cyan-800 pb-4">
                <div>
                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                        SYSTEM_CORE // NLP_ENGINE_V2
                    </h1>
                    <p className="text-xs text-cyan-600 mt-1">SENTIMENT_ANALYSIS_MODULE :: ACTIVE</p>
                </div>
                <div className="text-right hidden sm:block">
                    <div className="text-xs text-cyan-700">UPTIME: 99.9%</div>
                    <div className="text-xs text-cyan-700">LATENCY: 12ms</div>
                </div>
            </div>

            <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8">

                {/* Input Console */}
                <div className="space-y-4">
                    <div className="bg-gray-800/50 border border-cyan-800 rounded-lg p-1">
                        <div className="bg-gray-900 p-2 text-xs text-cyan-700 flex justify-between rounded-t">
                            <span>INPUT_STREAM</span>
                            <span>READY</span>
                        </div>
                        <textarea
                            className="w-full bg-transparent text-cyan-100 p-4 outline-none h-48 resize-none text-sm placeholder-cyan-900/50"
                            placeholder="// Enter raw text data here for pattern extraction...
Example: 'I feel overwhelmed by the deadlines and isolated from my team.'"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            spellCheck="false"
                        ></textarea>
                    </div>

                    <button
                        onClick={handleAnalyze}
                        className="w-full bg-cyan-900/20 border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500 hover:text-gray-900 font-bold py-3 rounded uppercase tracking-widest text-sm transition-all shadow-[0_0_10px_rgba(6,182,212,0.2)] hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]"
                    >
                        Execute Analysis Sequence
                    </button>
                </div>

                {/* Output Visualization */}
                <div className="bg-black/40 border border-cyan-900 rounded-lg relative overflow-hidden min-h-[300px] flex flex-col">
                    {/* Scanline Effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/5 to-transparent bg-[length:100%_4px] pointer-events-none animate-pulse"></div>

                    {/* Terminal Header */}
                    <div className="bg-gray-900 p-2 text-xs text-cyan-700 flex justify-between border-b border-cyan-900/50">
                        <span>OUTPUT_STREAM</span>
                        <span className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${isAnalyzing ? 'bg-yellow-500 animate-pulse' : analysis ? 'bg-green-500' : 'bg-gray-600'}`}></span>
                            {isAnalyzing ? 'PROCESSING' : analysis ? 'READY' : 'IDLE'}
                        </span>
                    </div>

                    {/* Terminal Log */}
                    <div className="flex-1 p-4 font-mono text-xs space-y-1 overflow-auto">
                        {terminalLog.map((log, i) => (
                            <div key={i} className="text-cyan-500 opacity-80 animate-fade-in">
                                <span className="text-cyan-700">{`>`}</span> {log}
                            </div>
                        ))}
                        {isAnalyzing && (
                            <div className="text-cyan-400 flex items-center gap-1">
                                <span className="animate-pulse">▊</span>
                            </div>
                        )}
                    </div>

                    {/* Results Display */}
                    {!isAnalyzing && !analysis && terminalLog.length === 0 && (
                        <div className="flex-1 flex flex-col items-center justify-center opacity-30 p-6">
                            <div className="text-6xl mb-4">⚡</div>
                            <p className="text-xs tracking-widest text-cyan-800">AWAITING_INPUT...</p>
                        </div>
                    )}

                    {analysis && !isAnalyzing && (
                        <div className="p-4 space-y-4 relative z-10 animate-fade-in border-t border-cyan-900/30">

                            <div className="text-xs text-cyan-600 mb-2">
                                <span className="text-cyan-700">{`>`}</span> ANALYSIS_COMPLETE :: {new Date().toLocaleTimeString()}
                            </div>

                            <div className="flex justify-between items-center bg-gray-900/50 p-3 rounded border border-cyan-900/50">
                                <span className="text-xs text-cyan-600 uppercase">Primary Sentiment</span>
                                <span className={`text-sm font-bold tracking-wider px-3 py-1 rounded ${analysis.sentiment === 'Concerned' ? 'bg-red-900/30 text-red-400 border border-red-800' : analysis.sentiment === 'Positive' ? 'bg-green-900/30 text-green-400 border border-green-800' : 'bg-gray-800 text-gray-400 border border-gray-700'}`}>
                                    {analysis.sentiment.toUpperCase()}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-900/50 p-3 rounded border border-cyan-900/50">
                                    <div className="text-[10px] text-cyan-600 mb-1">POS_VECTOR</div>
                                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-green-500/50 transition-all duration-1000" style={{ width: `${Math.min(analysis.positiveScore * 2, 100)}%` }}></div>
                                    </div>
                                    <div className="text-right text-xs text-green-500 mt-1">{analysis.positiveScore}</div>
                                </div>
                                <div className="bg-gray-900/50 p-3 rounded border border-cyan-900/50">
                                    <div className="text-[10px] text-cyan-600 mb-1">NEG_VECTOR</div>
                                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-red-500/50 transition-all duration-1000" style={{ width: `${Math.min(analysis.distressScore * 2, 100)}%` }}></div>
                                    </div>
                                    <div className="text-right text-xs text-red-500 mt-1">{analysis.distressScore}</div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <p className="text-xs text-cyan-600">PATTERN_MATCHES_DETECTED:</p>
                                <div className="flex flex-wrap gap-2">
                                    {analysis.matches.length > 0 ? (
                                        analysis.matches.map((m, i) => (
                                            <span key={i} className={`text-xs border px-2 py-1 rounded font-mono ${m.type === 'negative' ? 'border-red-900 text-red-400 bg-red-900/10' : 'border-green-900 text-green-400 bg-green-900/10'}`}>
                                                [{m.word.toUpperCase()}]
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-xs text-gray-600">[NULL]</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </div>

            <div className="mt-12 text-center text-xs text-cyan-900">
                <Link to="/" className="hover:text-cyan-400 transition">← RETURN_TO_HOME_MODULE</Link>
            </div>
        </div>
    );
}

