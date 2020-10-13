const { Schema, model } = require('mongoose');


const productSchema = new Schema({
    name: {type: String, uppercase: true},
    userId: Schema.Types.ObjectId,
    kcal: Number
})

module.exports = model('Product', productSchema)

