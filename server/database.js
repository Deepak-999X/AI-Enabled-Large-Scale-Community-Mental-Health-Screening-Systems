const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '..', 'database', 'database.sqlite'),
    logging: console.log // Enable logging to see what's happening
});

// Define SurveyResult model
const SurveyResult = sequelize.define('SurveyResult', {
    userId: { type: DataTypes.INTEGER, allowNull: true },
    age: { type: DataTypes.INTEGER },
    gender: { type: DataTypes.STRING },
    responses: {
        type: DataTypes.JSON,
        allowNull: false
    },
    riskLevel: { type: DataTypes.STRING },
    riskScore: { type: DataTypes.FLOAT },
    notes: { type: DataTypes.TEXT }
});

// Define User model directly here to avoid circular dependency
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: true
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'user', // 'admin' or 'user'
        allowNull: false
    }
});

const initDb = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connection established successfully.');

        // Sync all models - force: false to preserve data, alter: true to update schema
        await sequelize.sync({ alter: true });
        console.log('✅ Database synced (User and SurveyResult tables created/updated).');

        // Create default admin account if it doesn't exist
        const adminExists = await User.findOne({ where: { email: 'admin@mentis24.com' } });
        if (!adminExists) {
            await User.create({
                name: 'Admin',
                email: 'admin@mentis24.com',
                password: 'admin123', // In production, this should be hashed
                role: 'admin'
            });
            console.log('✅ Default admin account created:');
            console.log('   Email: admin@mentis24.com');
            console.log('   Password: admin123');
        }
    } catch (error) {
        console.error('❌ Unable to connect to the database:', error);
    }
};

module.exports = { sequelize, SurveyResult, User, initDb };
