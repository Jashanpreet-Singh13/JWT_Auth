const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();

// dummy database
let users = [];

router.post('/register', async (req, res) => {
    const {username, email, password} = req.body;

    // check if user already exist
    const existingUser = users.find(user => user.email === email);
    if(existingUser) {
        return res.status(400).json({msg: 'User already exists'});
    } 

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    const newUser = {username, email, password: hashedPassword};
    users.push(newUser);

    res.status(201).json({msg: 'User registered successfully'});
})

router.post('/login', async (req, res) => {
    const {email, password} = req.body;

    // find user
    const user = users.find(u => u.email === email);
    if(!user) {
        return res.status(400).json({msg: 'User not found'});
    }

    // check pass
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        return res.status(400).json({msg: 'Invalid Credentials'});
    }

    const token = jwt.sign(
        {username: user.username, email: user.email},
        process.env.JWT_SECRET,
        {expiresIn: '1h'}
    );

    console.log("Toekn = " + token);


    res.cookie('authToken', token, {
        httpOnly: true,
        secure: true,
        maxAge: 3600000
    });

    res.status(200).json({msg: 'Login Successfull'});
})

router.get("/register", (req, res) => {
    res.render("register");
})

router.get("/login", (req, res) => {
    res.render("login");
})

module.exports = router;
