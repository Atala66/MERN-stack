const jwt = require('jsonwebtoken');
const config = require('config');


// @description : Implements jwt to access private routes
// acceso a objetos req, res
// next: callback: triggers once is done and acces to the next piece of middleware
module.exports = function(req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token');
    // check if no token
    if (!token) {
        return res.status(401).json({ msg: 'No token; authorization denied' });
    }
    // verify token
    try {
        const decoded = jwt.verify(token, config.get('jwtToken'));
        req.user = decoded.user; // ?
        next();
    } catch (error) {
        // if there is a token but is invalid
        return res.status(401).json({ msg: 'Invalid token' });
    }

}