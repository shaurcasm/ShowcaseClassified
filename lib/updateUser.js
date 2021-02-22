const Users = require('../database/Users.js'),
    bcrypt = require('bcrypt');

function updateUser(promptingUser, done) {
    var { id, username, password, name, phone, newPassword } = promptingUser;

    Users.findById(id, function(err, user) {
        if(err) return done(err)

        // If the passwords' hashes don't match...
        if (!bcrypt.compareSync(password, user.password)) {
            console.error('User with ID (' + user.id + ') could not match password.');
            return done('Incorrect Password')
        }

        if(username) user.username = username;
        if(name) user.name = name;
        if(phone) user.phone = phone;
        if(newPassword) user.password = newPassword;

        user.save(function(err, updatedUser) {
            if(err) return done(err);

            // If callback neeeded
            return done(null, 'Success!');
        })
    })
}

module.exports = updateUser;