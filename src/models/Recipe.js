const {Schema, model} = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const recipeSchema = new Schema({
    userId: Schema.Types.ObjectId,
    name: String,
    preparation: [String],
    ingredients: [Schema.Types.Mixed],
    weightTot: Number,
    kcalTot: Number,
    servings: Number,
    filePath: String,
    fileId: String
}, {
    timestamps: true
})

recipeSchema.plugin(uniqueValidator)


module.exports = model('Recipe', recipeSchema);