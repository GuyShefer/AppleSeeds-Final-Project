const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 8000;
const app = express();
const usersRoute = require('./src/routes/users.routes');
require('./src/db/mongoose');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use('/api/users', usersRoute);


app.listen(port, () => {
    console.log(`application start at ${port}`);
})
