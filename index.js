const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 8000;
const app = express();
const usersRoute = require('./src/routes/users.routes');
const productRoute = require('./src/routes/products.routes');
require('./src/db/mongoose');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use('/api/users', usersRoute);
app.use('/api/products', productRoute);


app.listen(port, () => {
    console.log(`application start at ${port}`);
})

if (process.env.NODE_ENV === 'production') {
    // Exprees will serve up production assets
    app.use(express.static('client/build'));
  
    // Express serve up index.html file if it doesn't recognize route
    const path = require('path');
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
