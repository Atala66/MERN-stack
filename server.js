const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

// init app with express
const app = express();
// connect database
connectDB();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// enable CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// home route
app.get('/', (req, res) => res.send('APP running'));

// Define routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/posts', require('./routes/api/posts'));


const PORT = process.env.PORT || 5000;
// testing commit
app.listen(PORT, () => { console.log(`Server started on port ${PORT}`) });