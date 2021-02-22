const passport = require('passport'),
    Strategy = require('passport-local').Strategy,
    Users = require('../database/Users'),
    passportJWT = require('passport-jwt'),
    JWTStrategy = passportJWT.Strategy,
    ExtractJWT = passportJWT.ExtractJwt,
    bcrypt = require('bcrypt');

require('dotenv').config();

// Local Strategy - Logging in with a username and password.
passport.use(new Strategy((username, password, done) => {
    Users.findOne({ username: username }, (err, user) => {

        // Error Handling
        if (err) return done(err);

        // If the username is not found in database
        if (!user) {
            return done(null, false, {
                // content-flash for localStrategy
                message: 'No user found.'
            });
        }

        // If the passwords' hashes don't match...
        if (!bcrypt.compareSync(password, user.password)) {
            return done(null, false, {
                message: 'Password not matched.'
            });
        }

        return done(null, user);
    });
}));

passport.serializeUser( (user, done) => done(null, user.id) )
passport.deserializeUser( (id, done) => {
  Users.findById(id, (err, user) => {
    if (err) { return done(err) }
    done(null, user)
  })
})

// JWT Strategy for persistent authentication through JSON Web Token.
// A session cookie alternative that works well with client-side front-end framework.
//Reference: https://github.com/mikenicholson/passport-jwt#extracting-the-jwt-from-the-request
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}, (jwt_payload, done) => {
    Users.findById(jwt_payload.id).then(user => {
        return done(null, user);
    }).catch(err => {
        return done(err, false, {
            message: 'Token not matched.'
        });
    });
}));

module.exports = passport;