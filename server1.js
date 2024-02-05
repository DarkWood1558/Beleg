const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 4009;

app.use(bodyParser.json());

app.use(express.static('public_html'));

app.post('/api/register', (req, res) => {
    const { email, password } = req.body;

    try {
        // Read existing user data from the JSON file
        const userData = fs.readFileSync('users.json', 'utf8');
        const users = JSON.parse(userData);

        // Check if the user already exists
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            return res.json({ success: false, message: 'User already exists' });
        }

        // Add the new user
        users.push({ email, password });

        // Write updated user data back to the JSON file
        fs.writeFileSync('users.json', JSON.stringify(users, null, 2), 'utf8');

        res.json({ success: true, message: 'Registration successful' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
