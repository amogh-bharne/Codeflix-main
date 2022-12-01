const asyncHandler= require('express-async-handler');
const User = require('../models/userModel.js');
const createToken = require('../utils/createToken.js');

const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password,Organization,pic} = req.body;
    // check if user exists
    const userExists = await User.findOne({ email});
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }
    // create user
    const user = await User.create({
        name,
        email,
        password,
        Organization
    });
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            Organization: user.Organization,
            token: createToken(user._id)

        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }


    
});

const authUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    // check if user exists
    const user= await User.findOne({ email});
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            Organization: user.Organization,
            token: createToken(user._id)

        });
        } else {
        res.status(400);
        throw new Error('Invalid email or password'); 
    }
    
    
});

module.exports = {registerUser,authUser};