const { Router } = require('express');
const authenticateJWT = require('../middleware/authenticateJwt');
const router = Router();

router.get("/", authenticateJWT, (req, res) => {
    const user = {username: req.user.username, email: req.user.email};
    res.render('home', { user });
})

module.exports = router;
