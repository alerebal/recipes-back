const {Schema, model} = require('mongoose');

const recipeSchema = new Schema({
    userId: Schema.Types.ObjectId,
    name: {type: String, required: true},
    preparation: [String],
    ingredients: [Schema.Types.Mixed],
    kcalTot: Number,
    servings: Number,
    filePath: String,
    fileId: String
}, {
    timestamps: true
})


module.exports = model('Recipe', recipeSchema);