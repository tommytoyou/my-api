const mongoose = require('mongoose');
// Schema class from mongoose
const Schema = mongoose.Schema;

// Make a albumSchema
const albumSchema = new Schema({
    artist: String,
    genre: String,
    name: String
});

// Model
const Album = mongoose.model('Album', albumSchema);

module.exports = Album;