const jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticateJWT(req, res, next) {
    const token = req.cookies.authToken;

    if(!token) {
        return res.redirect("/login")
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) {
            return res.redirect("/login");
        }

        req.user = decoded;
        next();
    })
}

module.exports = authenticateJWT;

