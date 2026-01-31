const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create a simple script to check admin account
const dbPath = path.join(__dirname, '..', 'database', 'database.sqlite');
const db = new sqlite3.Database(dbPath);

console.log('🔍 Checking for Admin Account:\n');

// Check for admin user
db.get("SELECT * FROM Users WHERE email = 'admin@mentis24.com'", [], (err, admin) => {
    if (err) {
        console.error('Error:', err);
    } else if (admin) {
        console.log('✅ Admin account found!');
        console.log(`   ID: ${admin.id}`);
        console.log(`   Name: ${admin.name}`);
        console.log(`   Email: ${admin.email}`);
        console.log(`   Password: ${admin.password}`);
        console.log(`   Role: ${admin.role}`);
    } else {
        console.log('❌ Admin account NOT found!');
        console.log('   Creating admin account manually...');

        db.run(
            "INSERT INTO Users (name, email, password, role, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)",
            ['Admin', 'admin@mentis24.com', 'admin123', 'admin', new Date().toISOString(), new Date().toISOString()],
            function (err) {
                if (err) {
                    console.error('   Error creating admin:', err);
                } else {
                    console.log('   ✅ Admin account created successfully!');
                    console.log('   Email: admin@mentis24.com');
                    console.log('   Password: admin123');
                }
                db.close();
            }
        );
        return;
    }

    db.close();
});
