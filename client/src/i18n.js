import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translations
const resources = {
    en: {
        translation: {
            "title": "Mental Health Screening (India Support)",
            "age": "Age",
            "gender": "Gender",
            "start": "Start Assessment",
            "submit": "Submit Assessment",
            "analyzing": "AI Analysis in Progress...",
            "consent_label": "I consent to anonymous AI screening and understand this is not a medical diagnosis.",
            "privacy_notice": "Your data is encrypted. We adhere to data privacy standards fitting for sensitive health data.",
            "dashboard_title": "Realtime Community Insights (India)",
            "questions": {
                "phq_1": "Little interest or pleasure in doing things?",
                "phq_2": "Feeling down, depressed, or hopeless?",
                "phq_3": "Trouble falling or staying asleep, or sleeping too much?",
                "phq_4": "Feeling tired or having little energy?",
                "phq_5": "Poor appetite or overeating?",
                "phq_6": "Feeling bad about yourself (failure)?",
                "phq_7": "Trouble concentrating on things?",
                "phq_8": "Moving/speaking slowly or too fast?",
                "phq_9": "Thoughts that you would be better off dead?",
                "gad_1": "Feeling nervous, anxious, or on edge?",
                "gad_2": "Not being able to stop or control worrying?",
                "gad_3": "Worrying too much about different things?",
                "gad_4": "Trouble relaxing?",
                "gad_5": "Being so restless that it is hard to sit still?",
                "gad_6": "Becoming easily annoyed or irritable?",
                "gad_7": "Feeling afraid, as if something awful might happen?",
                "pss_1": "How often have you been upset because of something that happened unexpectedly?",
                "pss_2": "How often have you felt that you were unable to control the important things in your life?",
                "pss_3": "How often have you felt nervous and 'stressed'?",
                "pss_4": "How often have you felt confident about your ability to handle your personal problems?"
            },
            "categories": {
                "phq": "PHQ-9 (Depression Screening)",
                "gad": "GAD-7 (Anxiety Screening)",
                "pss": "PSS (Perceived Stress Scale)"
            },
            "options": {
                "0": "Not at all / Never",
                "1": "Several days / Almost Never",
                "2": "More than half / Sometimes",
                "3": "Nearly every day / Fairly Often",
                "4": "Very Often"
            }
        }
    },
    es: {
        translation: {
            "title": "Evaluación de Salud Mental",
            "age": "Edad",
            "gender": "Género",
            "start": "Comenzar Evaluación",
            "submit": "Enviar Evaluación",
            "analyzing": "Analizando...",
            "consent_label": "Doy mi consentimiento para el procesamiento anónimo.",
            "privacy_notice": "Sus datos son anónimos.",
            "dashboard_title": "Perspectivas de la Comunidad",
            "questions": {
                "phq_1": "¿Poco interés o placer?",
                "phq_2": "¿Deprimido o sin esperanza?",
                "phq_9": "¿Pensamientos de muerte?",
                // Placeholder for full translations
            },
            "categories": {
                "phq": "PHQ-9 (Depresión)",
                "gad": "GAD-7 (Ansiedad)",
                "pss": "PSS (Estrés)"
            },
            "options": {
                "0": "Para nada",
                "1": "Varios días",
                "2": "Más de la mitad",
                "3": "Casi todos los días",
                "4": "Muy a menudo"
            }
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "en",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
