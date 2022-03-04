const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://root:root@cluster0.m99k1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB');
    });

module.exports = db;