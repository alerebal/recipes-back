const recipeCtrl = {};

const fs = require('fs-extra');
const { cloud } = require('../helpers/helpers');
const cloudinary = require('cloudinary');

const Recipe = require('../models/Recipe');

cloudinary.cloud

recipeCtrl.index = (req, res) => {
    res.send(`<h1>Index backend recipes</h1>`)
}

// get recipe, recipes and userRecipes
recipeCtrl.getRecipe = async (req, res) => {
    const {id} = req.params;
    const recipe = await Recipe.findById(id)
    res.json(recipe);
}

recipeCtrl.getRecipes = async (req, res) => {
    const recipes = await Recipe.find({userId: '5f835e2ba4c29a1c15c59da2'}).sort({createdAt: -1});
    res.json(recipes)
}

recipeCtrl.getUserRecipes = async (req, res) => {
    const {id} = req.params;
    const recipes = await Recipe.find({userId: id}).sort({createdAt: -1})
    res.json(recipes);
}

// add a new recipe
recipeCtrl.addRecipe = async (req, res) => {
    const {userId, name, preparation, kcalTot, servings} = req.body.recipe;
    const {ingredients} = req.body;
    // recipe with image
    if (req.body.image) {
        const {image, imageId} = req.body.image;
        const recipe = new Recipe({ userId, name, preparation, ingredients, kcalTot, servings, filePath: image, fileId: imageId});
        const recipes = await Recipe.find({userId: userId})
        // if user alredy has a recipe with the same name
        const nameExists = recipes.filter(item => item.name === name)
        if (nameExists.length > 0) {
            await cloudinary.v2.uploader.destroy(imageId)
            return res.status(400).json({message: 'You already have a recipe with that name'})
        } else {
            await recipe.save()
            return res.status(200).json(recipe)
        }
    }
    // recipe without image
    if (!req.body.image) {
        const recipe = new Recipe({userId, name, preparation, ingredients, kcalTot, servings, filePath: null});
        const recipes = await Recipe.find({userId: userId});
        // if user alredy has a recipe with the same name
        const nameExists = recipes.filter(item => item.name === name)
        if (nameExists.length > 0) {
            return res.status(400).json({message: 'You already have a recipe with that name'})
        } else {
            await recipe.save()
            return res.status(200).json(recipe)
        }
    }

}

// add and delete a photo to cloudinary
recipeCtrl.addPhoto = async (req, res) => {
    const img = await cloudinary.v2.uploader.upload(req.file.path);
    const image = img.secure_url
    const imageId = img.public_id;
    fs.unlink(req.file.path)
    res.json({image, imageId})
}

recipeCtrl.deletePhoto = async (req, res) => {
    const {imageId} = req.params;
    await cloudinary.v2.uploader.destroy(imageId);
    res.json({message: 'done'})
}

// edit recipe
recipeCtrl.editRecipe = async (req, res) => {
    const {id} = req.params
    const {name, preparation, kcalTot, servings, ingredients, filePath, fileId} = req.body;
    // get the old recipe to compare if it has been renamed
    const oldRecipe = await Recipe.findById(id);
    // if not
    if (oldRecipe.name === name) {
        const recipe = await Recipe.findByIdAndUpdate( id, { name: oldRecipe.name, preparation, kcalTot, servings, ingredients, filePath, fileId}, {new: true})
        return res.status(200).send({recipe});
    } 
    // if the name changed I need to know if the new name already exists
    if (oldRecipe.name !== name) {
        const recipe = await Recipe.findByIdAndUpdate( id, {name, preparation, kcalTot, servings, ingredients, filePath, fileId}, {runValidators: true, context: 'query', new: true}, 
        function(err) {
            if (err) {
                return res.status(400).send({message: 'The name already exists'})
            }
        })
    }
    return res.status(200);
}

// delete recipe
recipeCtrl.deleteRecipe = async (req, res) => {
    const {id} = req.params
    const recipe = await Recipe.findById(id);
    if (recipe.filePath) {
        await cloudinary.v2.uploader.destroy(recipe.fileId);
    } 
    await Recipe.findByIdAndRemove(id)
    res.json({message:'Recipe deleted'});
}



module.exports = recipeCtrl;