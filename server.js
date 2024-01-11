const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3000;
app.use(cors());
const users = [];

function registerUser(email, password) {
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return { success: false, message: 'E-Mail bereits registriert.' };
    }

    const newUser = { email, password };
    users.push(newUser);
    return { success: true, message: 'Registrierung erfolgreich.' };
}

function loginUser(email, password) {
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        return { success: true, message: 'Anmeldung erfolgreich.' };
    } else {
        return { success: false, message: 'Ungültige Anmeldeinformationen.' };
    }
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/register', (req, res) => {
    const { email, password } = req.body;
    const result = registerUser(email, password);
    res.json(result);
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const result = loginUser(email, password);
    res.json(result);
});

app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});
