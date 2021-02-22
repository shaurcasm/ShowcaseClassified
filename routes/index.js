const express = require('express'),
    multer = require('multer'),
    upload = multer({ dest: __dirname + '/images' }),
    passport = require('passport'),
    jwt = require('jsonwebtoken'),
    Users = require('../database/Users'),
    router = express.Router(),
    updateUser = require('../lib/updateUser.js');

require('dotenv').config();

// API entry points

// Sign up
router.post('/signup', (req, res) => {
    var name = req.body.name || undefined;
    var phone = req.body.phone || undefined;

    var user = new Users({
        username: req.body.username,
        password: req.body.password,
        name: name,
        phone: phone
    });

    user.save().then(() => {
        // Create a JWT token to save in memory; Signifies a log in by the user id
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        res.json({ token: token });
    }).catch(err => {
        console.log(err);
    });
});

router.post('/update-user', (req, res) => {
    var user = req.body;
    updateUser(user, function(err, status) {
        if(err) { res.json({ message: status }) }

        if(!status) {
            return console.log('Mission callback argument');
        }

        res.json({ message: status });
    });
});

router.post('/add-ad', upload.single('image_file'), (req, res) => {
    var file = req.file;
    var body = req.body;

    console.log('file', file);
    console.log('file path', file.path);
    console.log('body', body);
})

// Log in
/* First we log in using passport's local strategy, i.e. username and password, through
the middleware. If successful, make the JWT token, like the sign up route and 
send the token to the front-end as json. Not storing in cookies, so don't need session */
router.post('/login', passport.authenticate('local', {
    failureFlash: true
}), (req, res) => {
    const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET);
    
    res.json({ token: token });
});

router.get('/login', (req, res) => {
    console.log(req.flash('error'))
    res.json(req.flash('error'));
})

/*  WARNING: Careful here. This route gets the access to the whole user object,
    containing password etc.
*/
router.get('/user', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    // If the token wasn't set req wouldn't have the user object
    if(!req.user) {
        res.json({
            username: 'Nobody.'
        });
    }

    // TODO: And add their checkout array or other details
    res.json({
        username: req.user.username,
        id: req.user._id
    });
});

module.exports = router;