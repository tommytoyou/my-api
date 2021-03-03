const express = require('express');
const axios = require('axios');

// Set up App
const app = express();
const PORT = process.env.PORT || 8000;

// Database
const db = require('./models');


// Route
app.get('/v1', (req, res) => {
    res.send('Welcome to My Spotify Album API');
});

app.get('/v1/fetch-albums', async (req, res) => {
    // Run axios
    const response = await axios.get('https://api.spotify.com/v1/albums');
    const data = response.data; // array of objects [{}, {}, {}]
    // add each object info to DB
    for (let i = 0; i < data.length; i++) {
        let albumObject = data[i]; // object
        const { serial, type, water_landings } = albumObject; // destructuring

        db.Capsule.create({
            serial: serial,
            type: type,
            waterLandings: water_landings
        }, (err, newCapsule) => {
            console.log(newCapsule);
        });
    }

    res.json(data);
});

const server = app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});