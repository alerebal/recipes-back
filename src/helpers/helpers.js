const helpers = {}

const cloudinary = require('cloudinary');
const jwt = require('jsonwebtoken');


helpers.cloud = cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
})

helpers.verifyToken = (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(400).send('Unauthorized request');
        }

        const token = req.headers.authorization.split(' ')[1];
        if (token === null) {
            return res.status(400).send('Unauthorized request');
        }

        const payload = jwt.verify(token, process.env.JWT_KEY);
        if (!payload) {
            return res.status(400).send('Unauthorized request');
        }

        req.userId = payload._id;
        next();

    } catch {
        return res.status(400).send('Unauthorized request');
    }
}


module.exports = helpers;