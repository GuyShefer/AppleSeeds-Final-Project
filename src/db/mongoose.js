const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.DB_URL;
const localUrl = 'mongodb://127.0.0.1:27017/finalProjectAPI';

mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then (() => {
    console.log('connected succsessful.');
}).catch((err) => {
    console.log('db connection failed.');
});