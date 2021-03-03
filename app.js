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
    const response = await axios.get('https://api.spotify.com/v1/albums/{31mrydjjdeup5fbw3ltr2ak7bgry}');
    const data = response.data; // array of objects [{}, {}, {}]
    // add each object info to DB
    for (let i = 0; i < data.length; i++) {
        let albumObject = data[i]; // object
        const { artist, genre, name } = albumObject; // destructuring

        db.Album.Create({
            artist: artist,
            genre: genre,
            name: name
        }, (err, newAlbum) => {
            console.log(newAlbum);
        });
    }

    res.json(data);
});

const server = app.listen(PORT, () => {
    console.log(`We have some great tunes on PORT: ${PORT}`);
});