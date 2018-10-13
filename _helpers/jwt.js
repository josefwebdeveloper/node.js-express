const expressJwt = require('express-jwt');
const config = require('config.json');
const userService = require('../users/user.service');

module.exports = jwt;

function jwt() {
    console.log("jwt");
    const secret = config.secret;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/users/authenticate',
            '/users/authenticate/google',
            '/users/register'
            // '/users'
        ]
    });
    
}

async function isRevoked(req, payload, done) {
    console.log("payload",payload);
    console.log("payload1",payload.sub);
    const user = await userService.getById(payload.sub);
    console.log("user",user);
    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }
    currentUser=user;
    console.log(currentUser,"currentUser2");
    done();
};