const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create a simple script to check database contents
const dbPath = path.join(__dirname, '..', 'database', 'database.sqlite');
const db = new sqlite3.Database(dbPath);

console.log('📊 Database Contents:\n');

// Check Users table
db.all('SELECT * FROM Users', [], (err, users) => {
    if (err) {
        console.error('Error reading Users:', err);
    } else {
        console.log('👥 USERS TABLE:');
        console.log(`Total users: ${users.length}`);
        users.forEach(user => {
            console.log(`  - ${user.name} (${user.email}) - ID: ${user.id}`);
        });
        console.log('');
    }
});

// Check SurveyResults table
db.all('SELECT * FROM SurveyResults', [], (err, surveys) => {
    if (err) {
        console.error('Error reading SurveyResults:', err);
    } else {
        console.log('📋 SURVEY RESULTS TABLE:');
        console.log(`Total surveys: ${surveys.length}`);
        surveys.forEach(survey => {
            console.log(`  - User ID: ${survey.userId}, Risk: ${survey.riskLevel}, Score: ${survey.riskScore}`);
        });
        console.log('');
    }

    // Close database after all queries
    db.close();
});
