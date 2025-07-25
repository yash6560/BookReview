const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const signUp = async (req, res) => {
    const {name, email, password} = req.body;

    try {
        if(!name || !email || !password) {
            return res.status(400).json({message: "All fields are required"});
        }

        if(password.length <6){
            return res.status(400).json({message: "Password must be at least 6 characters"});
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({message: "Email is not valid"});
        }

        // Check if user already exists
        const existUser = await userModel.findOne({email});
        if(existUser){
            return res.status(400).json({message: "User already exists"});
        }

        const newUser = await userModel.create({
            name,
            email,
            password,
        });

        return res.status(201).json({success: true, message: "User created successfully"});

    } catch (error) {
        console.log("signup error : ", error);
        return res.status(500).json({message: "Internal server error in signup"});
    }
}

const logIn = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({message: "All fields are required"});
        }

        const user = await userModel.findOne({email});

        if(!user){
            return res.status(400).json({message: "Invalide email or password"});
        }  

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(400).json({message: "Invalid email or password"});
        }

        const token = await jwt.sign({userID: user._id}, process.env.JWT_SECRET, {
            expiresIn : "7d",
        })

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite : "strict",
            secure: process.env.NODE_ENV === "production",
        })

        return res.status(200).json({success: true, message: "User login successfully"});

    } catch (error) {
        console.log("login error : ", error);
        return res.status(500).json({message: "Internal server error in login"});
    }
}

const logOut = (req, res) => {
    res.clearCookie("jwt");
    return res.status(200).json({success: true, message: "User logged out successfully"});
}

module.exports = {signUp, logIn, logOut}