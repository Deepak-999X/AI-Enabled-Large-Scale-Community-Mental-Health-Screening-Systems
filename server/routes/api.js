const express = require('express');
const router = express.Router();
const { SurveyResult, User } = require('../database');
const aiService = require('../services/aiService');

// Submit Survey
router.post('/survey', async (req, res) => {
    try {
        const { responses, demographic, userId } = req.body;

        // AI Analysis
        const analysis = aiService.analyzeResponse(responses);

        // Save to DB
        const result = await SurveyResult.create({
            userId: userId || null,
            age: demographic?.age,
            gender: demographic?.gender,
            responses: responses,
            riskLevel: analysis.riskLevel,
            riskScore: analysis.score,
            notes: analysis.summary
        });

        // Emit realtime update
        if (req.io) {
            req.io.emit('newSurvey', {
                riskLevel: analysis.riskLevel,
                timestamp: new Date()
            });
        }

        res.json({ success: true, result, analysis });
    } catch (error) {
        console.error('Error submitting survey:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// Get Community Stats (Anonymized)
router.get('/stats', async (req, res) => {
    try {
        const results = await SurveyResult.findAll();

        // Aggregate data
        const total = results.length;
        const riskDistribution = {
            High: results.filter(r => r.riskLevel === 'High').length,
            Medium: results.filter(r => r.riskLevel === 'Medium').length,
            Low: results.filter(r => r.riskLevel === 'Low').length,
        };

        res.json({ total, riskDistribution });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch stats' });
    }
});

// User Registration
router.post('/auth/register', async (req, res) => {
    try {
        console.log('Registration attempt:', req.body);
        const { name, email, password, age, gender } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, error: 'Name, email, and password are required' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            console.log('Email already exists:', email);
            return res.status(400).json({ success: false, error: 'Email already registered' });
        }

        // Create user (password stored as plain text for simplicity - in production use bcrypt)
        const user = await User.create({
            name,
            email,
            password, // In production: await bcrypt.hash(password, 10)
            age: age ? parseInt(age) : null,
            gender: gender || null
        });

        console.log('User created successfully:', user.id);
        res.json({
            success: true,
            user: { id: user.id, name: user.name, email: user.email, age: user.age, gender: user.gender }
        });
    } catch (error) {
        console.error('Registration error details:', error.message, error.stack);
        res.status(500).json({ success: false, error: error.message || 'Registration failed' });
    }
});

// User Login
router.post('/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ success: false, error: 'Invalid email or password' });
        }

        // In production, use bcrypt.compare(password, user.password)
        if (user.password !== password) {
            return res.status(401).json({ success: false, error: 'Invalid email or password' });
        }

        res.json({
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                age: user.age,
                gender: user.gender,
                role: user.role // Include role in response
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, error: 'Login failed' });
    }
});

// Get User Profile
router.get('/user/profile/:userId', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.userId);

        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        res.json({
            success: true,
            user: { id: user.id, name: user.name, email: user.email, age: user.age, gender: user.gender }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch profile' });
    }
});

// Get User's Survey History
router.get('/user/surveys/:userId', async (req, res) => {
    try {
        const surveys = await SurveyResult.findAll({
            where: { userId: req.params.userId },
            order: [['createdAt', 'DESC']]
        });

        res.json({ success: true, surveys });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch surveys' });
    }
});

// Admin: Get all users with their stats
router.get('/admin/users', async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'name', 'email', 'age', 'gender', 'createdAt'],
            order: [['createdAt', 'DESC']]
        });

        // Get survey counts for each user
        const usersWithStats = await Promise.all(users.map(async (user) => {
            const surveyCount = await SurveyResult.count({ where: { userId: user.id } });
            const surveys = await SurveyResult.findAll({
                where: { userId: user.id },
                order: [['createdAt', 'DESC']],
                limit: 1
            });

            const lastAssessment = surveys.length > 0 ? surveys[0].createdAt : null;
            const lastRiskLevel = surveys.length > 0 ? surveys[0].riskLevel : 'N/A';

            return {
                id: user.id,
                name: user.name,
                email: user.email,
                age: user.age,
                gender: user.gender,
                joinedDate: user.createdAt,
                totalAssessments: surveyCount,
                lastAssessment: lastAssessment,
                lastRiskLevel: lastRiskLevel
            };
        }));

        res.json({ success: true, users: usersWithStats });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch users' });
    }
});

// Admin: Get detailed user info with all assessments
router.get('/admin/users/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findByPk(userId, {
            attributes: ['id', 'name', 'email', 'age', 'gender', 'createdAt']
        });

        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        const surveys = await SurveyResult.findAll({
            where: { userId: userId },
            order: [['createdAt', 'DESC']]
        });

        res.json({
            success: true,
            user: user,
            assessments: surveys
        });
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch user details' });
    }
});

// Admin: Get complete database dump (for debugging)
router.get('/admin/database-dump', async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] } // Don't send passwords
        });
        const surveys = await SurveyResult.findAll();

        res.json({
            success: true,
            timestamp: new Date(),
            database: {
                users: users,
                surveys: surveys,
                stats: {
                    totalUsers: users.length,
                    totalSurveys: surveys.length
                }
            }
        });
    } catch (error) {
        console.error('Error dumping database:', error);
        res.status(500).json({ success: false, error: 'Failed to dump database' });
    }
});

module.exports = router;
