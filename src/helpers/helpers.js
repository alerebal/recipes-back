const helpers = {}

const cloudinary = require('cloudinary');


helpers.cloud = cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
})


module.exports = helpers;