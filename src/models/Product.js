const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const productSchema = new Schema({
    name: {type: String, unique: true, uppercase: true},
    kcal: Number
})
productSchema.plugin(uniqueValidator);

module.exports = model('Product', productSchema)

