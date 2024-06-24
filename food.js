const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'Manik',
    password: 'Manik@1906',
    database: '' // Use underscore or backticks if there are spaces in the database name

});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1); // Exit the process with an error code
    }
    console.log('Connected to the database.');
});

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Serve static files (like HTML, CSS, and JS)
app.use(express.static('public'));

// Define a route to handle form submissions
app.post('/submit-donation', (req, res) => {
    const formData = req.body;

    // Insert the form data into the database
    connection.query('INSERT INTO donations SET ?', formData, (error, results) => {
        if (error) {
            console.error('Error inserting data:', error);
            res.status(500).send('Error inserting data');
            return;
        }
        console.log('Data inserted successfully');
        res.status(200).send('Data inserted successfully');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
