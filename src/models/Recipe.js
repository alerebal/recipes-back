const {Schema, model} = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const recipeSchema = new Schema({
    name: {type: String, required: true, unique: true},
    preparation: [String],
    ingredients: [Schema.Types.Mixed],
    kcalTot: Number,
    servings: Number,
    filePath: String,
    fileId: String
}, {
    timestamps: true
})

recipeSchema.plugin(uniqueValidator);

module.exports = model('Recipe', recipeSchema);