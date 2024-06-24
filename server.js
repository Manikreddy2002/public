const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'Manik',
    password: 'Manik@1906',
    database: 'food_pickup_db'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static('public'));

// Handle form submission
app.post('/submit-donation', (req, res) => {
    console.log('Received form data:', req.body); // Debugging statement

    const { name, address, 'food-description': foodDescription, 'pickup-time': pickupTime } = req.body;

    if (!name || !address || !foodDescription || !pickupTime) {
        console.error('Missing required form fields');
        return res.status(400).send('Missing required form fields');
    }

    // Proceed with database insertion
    const query = 'INSERT INTO food_pickups (name, address, food_description, pickup_time) VALUES (?, ?, ?, ?)';
    db.execute(query, [name, address, foodDescription, pickupTime], (err, results) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).send('An error occurred while submitting your donation.');
        }
        res.send('Donation submitted successfully.');
    });
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
