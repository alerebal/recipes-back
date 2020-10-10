const userCtrl = {}

const User = require('../models/User');
const jwt = require('jsonwebtoken');

userCtrl.signUp = async (req, res) => {
    const {email, password} = req.body;
    const userEmail = await User.findOne({email})
    if(userEmail) {
        res.status(400).json({message: 'The email already exists'})
    } else {
        const newUser = new User({email, password});
        newUser.password = await newUser.encryptPassword(password)
        await newUser.save()
        const token = jwt.sign({_id: newUser._id}, process.env.JWT_KEY)
        res.status(200).json({token});
    }
}

userCtrl.signIn = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email})
    if(!user) {
        return res.status(400).json({message: 'Email not found'})
    } else {
        const match = await user.matchPassword(password)
        if(!match) {
            return res.status(400).json({message: 'Incorrect password'})
        } else {
            const token = jwt.sign({_id: user._id}, process.env.JWT_KEY)
            return res.status(200).json({token})
        }
    }
}


module.exports = userCtrl;