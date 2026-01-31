import React from 'react';

export default function AIIntroAnimation() {
    return (
        <div className="flex flex-col items-center justify-center p-8 bg-blue-50/50 rounded-xl border border-blue-100 shadow-inner my-8">
            <div className="relative w-64 h-64 mb-6">
                {/* Central Brain/AI Node */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-full shadow-lg shadow-blue-500/50 animate-pulse flex items-center justify-center z-10">
                        <span className="text-4xl text-white">🧠</span>
                    </div>
                </div>

                {/* Orbiting Nodes */}
                <div className="absolute inset-0 animate-spin-slow">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 bg-green-400 rounded-full shadow-md flex items-center justify-center text-xs font-bold text-white">NLP</div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-8 bg-purple-400 rounded-full shadow-md flex items-center justify-center text-xs font-bold text-white">ML</div>
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-orange-400 rounded-full shadow-md flex items-center justify-center text-xs font-bold text-white">Data</div>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-red-400 rounded-full shadow-md flex items-center justify-center text-xs font-bold text-white">Risk</div>
                </div>

                {/* Connection Lines (SVG) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none animate-pulse opacity-50">
                    <circle cx="50%" cy="50%" r="40%" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" />
                    <circle cx="50%" cy="50%" r="25%" fill="none" stroke="#6366f1" strokeWidth="1" />
                </svg>
            </div>

            <div className="text-center max-w-md space-y-2">
                <h3 className="text-xl font-bold text-gray-800">Powered by Advanced Pattern Recognition</h3>
                <p className="text-sm text-gray-500">
                    Our AI continuously analyzes response patterns against clinical datasets to identify early distress signals without compromising privacy.
                </p>
            </div>
        </div>
    );
}
