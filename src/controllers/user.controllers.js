const userCtrl = {}

const User = require('../models/User');
const jwt = require('jsonwebtoken');

userCtrl.signUp = async (req, res) => {
    const {email, name, password} = req.body;
    const newUser = new User({email, name, password});
    newUser.password = await newUser.encryptPassword(password)
    await newUser.save(function(err) {
        if(err) {
            return res.status(400).json({message: 'The email already exists'})
        }
        const token = jwt.sign({_id: newUser._id}, process.env.JWT_KEY)
        res.status(200).json({token, newUser});
    })
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
            return res.status(200).json({token, user})
        }
    }
}

userCtrl.getUser = async (req, res) => {
    const {id} = req.params;
    const user = await User.findById(id)
    res.json(user);
}


module.exports = userCtrl;