import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Simple Breathing Exercise Component
function BreathingExercise() {
    const [phase, setPhase] = useState('inhale');
    const [count, setCount] = useState(4);

    useEffect(() => {
        const timer = setInterval(() => {
            setCount(prev => {
                if (prev === 1) {
                    setPhase(current => {
                        if (current === 'inhale') return 'hold';
                        if (current === 'hold') return 'exhale';
                        return 'inhale';
                    });
                    return 4;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const getMessage = () => {
        if (phase === 'inhale') return 'Breathe In';
        if (phase === 'hold') return 'Hold';
        return 'Breathe Out';
    };

    return (
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-12 text-white text-center">
            <h3 className="text-2xl font-bold mb-8">Deep Breathing Exercise</h3>
            <div className="relative w-48 h-48 mx-auto mb-8">
                <div
                    className={`absolute inset-0 rounded-full bg-white/20 transition-transform duration-1000 ${phase === 'inhale' ? 'scale-150' : phase === 'exhale' ? 'scale-75' : 'scale-125'
                        }`}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl font-bold">{count}</div>
                </div>
            </div>
            <div className="text-3xl font-bold">{getMessage()}</div>
            <p className="mt-4 text-sm opacity-80">Follow the circle to regulate your breathing</p>
        </div>
    );
}

// Memory Card Game
function MemoryGame() {
    const emojis = ['🌸', '🌺', '🌻', '🌷', '🌹', '🌼', '🌿', '🍀'];
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [matched, setMatched] = useState([]);
    const [moves, setMoves] = useState(0);

    useEffect(() => {
        initializeGame();
    }, []);

    const initializeGame = () => {
        const shuffled = [...emojis, ...emojis]
            .sort(() => Math.random() - 0.5)
            .map((emoji, index) => ({ id: index, emoji }));
        setCards(shuffled);
        setFlipped([]);
        setMatched([]);
        setMoves(0);
    };

    const handleCardClick = (id) => {
        if (flipped.length === 2 || flipped.includes(id) || matched.includes(id)) return;

        const newFlipped = [...flipped, id];
        setFlipped(newFlipped);

        if (newFlipped.length === 2) {
            setMoves(moves + 1);
            const [first, second] = newFlipped;
            if (cards[first].emoji === cards[second].emoji) {
                setMatched([...matched, first, second]);
                setFlipped([]);
            } else {
                setTimeout(() => setFlipped([]), 1000);
            }
        }
    };

    const isComplete = matched.length === cards.length && cards.length > 0;

    return (
        <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Memory Match</h3>
                <div className="text-sm text-gray-600">
                    Moves: <span className="font-bold text-blue-600">{moves}</span>
                </div>
            </div>

            {isComplete && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4 text-center">
                    <p className="text-green-700 font-bold">🎉 Congratulations! You completed it in {moves} moves!</p>
                    <button
                        onClick={initializeGame}
                        className="mt-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    >
                        Play Again
                    </button>
                </div>
            )}

            <div className="grid grid-cols-4 gap-4">
                {cards.map((card) => (
                    <button
                        key={card.id}
                        onClick={() => handleCardClick(card.id)}
                        className={`aspect-square rounded-lg text-4xl font-bold transition-all transform hover:scale-105 ${flipped.includes(card.id) || matched.includes(card.id)
                                ? 'bg-white border-2 border-blue-500'
                                : 'bg-gradient-to-br from-purple-500 to-pink-500'
                            }`}
                    >
                        {(flipped.includes(card.id) || matched.includes(card.id)) ? card.emoji : '?'}
                    </button>
                ))}
            </div>
        </div>
    );
}

// Color Therapy
function ColorTherapy() {
    const colors = [
        { name: 'Calm Blue', bg: 'from-blue-400 to-cyan-300', effect: 'Reduces anxiety and promotes calmness' },
        { name: 'Peaceful Green', bg: 'from-green-400 to-emerald-300', effect: 'Brings balance and harmony' },
        { name: 'Warm Orange', bg: 'from-orange-400 to-yellow-300', effect: 'Energizes and uplifts mood' },
        { name: 'Gentle Purple', bg: 'from-purple-400 to-pink-300', effect: 'Encourages creativity and peace' }
    ];

    const [selected, setSelected] = useState(colors[0]);

    return (
        <div className={`bg-gradient-to-br ${selected.bg} rounded-2xl p-8 text-white transition-all duration-500`}>
            <h3 className="text-2xl font-bold mb-4">Color Therapy</h3>
            <p className="text-lg mb-6 opacity-90">{selected.effect}</p>

            <div className="grid grid-cols-2 gap-4">
                {colors.map((color) => (
                    <button
                        key={color.name}
                        onClick={() => setSelected(color)}
                        className={`bg-gradient-to-br ${color.bg} p-4 rounded-lg font-bold transition-transform hover:scale-105 ${selected.name === color.name ? 'ring-4 ring-white' : ''
                            }`}
                    >
                        {color.name}
                    </button>
                ))}
            </div>
        </div>
    );
}

// Positive Affirmations
function Affirmations() {
    const affirmations = [
        "I am capable of handling whatever comes my way",
        "I choose peace and calm in this moment",
        "I am worthy of love and happiness",
        "I release what I cannot control",
        "I am growing stronger every day",
        "I deserve rest and relaxation",
        "I am doing my best, and that is enough",
        "I choose to focus on what I can change"
    ];

    const [current, setCurrent] = useState(0);

    const next = () => setCurrent((current + 1) % affirmations.length);

    return (
        <div className="bg-gradient-to-br from-pink-500 to-rose-400 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-6">Daily Affirmation</h3>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-8 mb-6 min-h-[120px] flex items-center justify-center">
                <p className="text-2xl font-medium italic">"{affirmations[current]}"</p>
            </div>
            <button
                onClick={next}
                className="bg-white text-pink-600 px-6 py-3 rounded-lg font-bold hover:bg-pink-50 transition"
            >
                Next Affirmation →
            </button>
        </div>
    );
}

export default function StressReliefGames({ riskLevel }) {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">🎮 Stress Relief Activities</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Take a moment to relax and recharge. These activities are designed to help reduce stress and improve your mental well-being.
                    </p>
                    {riskLevel === 'High' && (
                        <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-2xl mx-auto">
                            <p className="text-yellow-800 font-medium">
                                ⚠️ Your recent assessment showed elevated stress levels. We recommend spending 10-15 minutes on these activities.
                            </p>
                        </div>
                    )}
                </div>

                {/* Games Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <BreathingExercise />
                    <MemoryGame />
                    <ColorTherapy />
                    <Affirmations />
                </div>

                {/* Additional Resources */}
                <div className="bg-white rounded-2xl p-8 border border-gray-200">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">More Ways to Relax</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center p-6 bg-blue-50 rounded-xl">
                            <div className="text-4xl mb-3">🎵</div>
                            <h4 className="font-bold text-gray-900 mb-2">Calming Music</h4>
                            <p className="text-sm text-gray-600">Listen to soothing sounds and nature ambience</p>
                        </div>
                        <div className="text-center p-6 bg-green-50 rounded-xl">
                            <div className="text-4xl mb-3">🧘</div>
                            <h4 className="font-bold text-gray-900 mb-2">Guided Meditation</h4>
                            <p className="text-sm text-gray-600">5-minute mindfulness exercises</p>
                        </div>
                        <div className="text-center p-6 bg-purple-50 rounded-xl">
                            <div className="text-4xl mb-3">📝</div>
                            <h4 className="font-bold text-gray-900 mb-2">Journaling</h4>
                            <p className="text-sm text-gray-600">Express your thoughts and feelings</p>
                        </div>
                    </div>
                </div>

                {/* Back Button */}
                <div className="mt-8 text-center">
                    <Link to="/user-dashboard" className="text-blue-600 hover:text-blue-700 font-bold">
                        ← Back to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}
