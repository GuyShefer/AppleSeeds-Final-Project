const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/finalProjectAPI', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log('connected succsessful');
});


// mongoose.connect('mongodb+srv://admin:Aa123456@appleseads-app.p0wze.mongodb.net/bankAPI?retryWrites=true&w=majority', {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false
// }).then (() => {
//     console.log('connected succsessful');
// })