// Common Modules
const path = require('path'),
    session = require('express-session');

// To access .env file's contents
require('dotenv').config();

// MongoDB
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

// Initialise Express
const express = require('express'),
    app = express(),
    port = process.env.PORT || 9000;

// Middlewares
const flash = require('connect-flash'),
    passportControl = require('./lib/passport-control');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    cookies: { maxAge: 60000 },
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use('/public', express.static(path.join(__dirname + '/public')));
app.use(passportControl.initialize());
app.use(passportControl.session())
app.use(flash());

// Routes
app.use('/api', require('./routes'));

// For production build, serve the compiled build 
if(process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, '/build')));

    // Will need to look further with react-router
    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, '/build', 'index.html'));
    })
}

// Last fallback
app.get('/', (req, res) => {
    res.render('./index.html');
});

// Log that the server is running.
app.listen(port, () => console.log(`Listening on port ${port}`));