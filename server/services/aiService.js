const natural = require('natural');
const tokenizer = new natural.WordTokenizer();

// Standardized Scales Logic
const SCALES = {
    PHQ9: {
        max: 27,
        thresholds: { 5: 'Mild Depression', 10: 'Moderate Depression', 15: 'Moderately Severe Depression', 20: 'Severe Depression' }
    },
    GAD7: {
        max: 21,
        thresholds: { 5: 'Mild Anxiety', 10: 'Moderate Anxiety', 15: 'Severe Anxiety' }
    },
    PSS: {
        max: 40,
        thresholds: { 14: 'Moderate Stress', 27: 'High Perceived Stress' }
    }
};

// Simulated Distress Patterns for "AI Pattern Matching"
// In a real ML model, this would be a trained classifier.
const distressPatterns = [
    { pattern: ['die', 'suicide', 'end', 'kill'], category: 'CRITICAL', weight: 50 },
    { pattern: ['hopeless', 'worthless', 'guilty'], category: 'Depressive Cognition', weight: 5 },
    { pattern: ['panic', 'fear', 'scared', 'breath'], category: 'Anxiety Attack', weight: 5 },
    { pattern: ['alone', 'lonely', 'isolated'], category: 'Social Isolation', weight: 3 }
];

exports.analyzeResponse = (responses) => {
    let scores = { PHQ9: 0, GAD7: 0, PSS: 0 };
    let criticalFlags = [];
    let detectedPatterns = [];

    // 1. Calculate Standard Scores
    for (const [key, value] of Object.entries(responses)) {
        const val = parseInt(value) || 0;
        if (key.startsWith('phq_')) scores.PHQ9 += val;
        if (key.startsWith('gad_')) scores.GAD7 += val;
        if (key.startsWith('pss_')) scores.PSS += val;

        // Critical Check: PHQ-9 Question 9 (Self-harm) which is usually the last one or mapped specifically
        if (key === 'phq_9' && val > 0) {
            criticalFlags.push("User reported thoughts of self-harm (PHQ-9 Q9 > 0)");
        }
    }

    // 2. Determine Severity Labels
    const getLabel = (score, scale) => {
        let label = 'Normal/Low';
        for (const [thresh, text] of Object.entries(SCALES[scale].thresholds)) {
            if (score >= parseInt(thresh)) label = text;
        }
        return label;
    };

    const results = {
        depression: { score: scores.PHQ9, label: getLabel(scores.PHQ9, 'PHQ9') },
        anxiety: { score: scores.GAD7, label: getLabel(scores.GAD7, 'GAD7') },
        stress: { score: scores.PSS, label: getLabel(scores.PSS, 'PSS') }
    };

    // 3. AI Pattern Matching (Simulated NLP on open text or aggregate concepts)
    // For this demo, we check if any specific high-value keys were triggered implicitly or via simulated text input if we had it.
    // We will check the 'notes' or raw response values if available, otherwise rely on the structured data patterns.

    // Check for high distress based on aggregate high scores
    if (results.depression.score > 15 && results.anxiety.score > 10) {
        detectedPatterns.push("Comorbid Depression and Anxiety pattern detected.");
    }

    let riskLevel = 'Low';
    if (criticalFlags.length > 0 || results.depression.score >= 20 || results.anxiety.score >= 15) {
        riskLevel = 'High';
    } else if (results.depression.score >= 10 || results.anxiety.score >= 10 || results.stress.score >= 14) {
        riskLevel = 'Medium';
    }

    return {
        riskLevel,
        scores: results,
        criticalFlags,
        patterns: detectedPatterns,
        summary: `Assessment: ${results.depression.label}, ${results.anxiety.label}. Risk: ${riskLevel}.`
    };
};
