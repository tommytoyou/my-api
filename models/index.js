const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/gaSpaceX', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;

db.once('open', () => {
    console.log(`Connected to MongoDB at ${db.host}: ${db.port}`);
});

db.on('error', (err) => {
    console.log('======> Oh My.');
    console.log(err);
});


module.exports = {
    Capsule: require('./albums')
}