const router = require('express').Router();

const { verifyToken } = require('../helpers/helpers');

const {
    getRecipe,
    getRecipes,
    addRecipe,
    copyRecipe,
    addPhoto,
    deletePhoto,
    editRecipe,
    deleteRecipe,
    getUserRecipes,
    index
} = require('../controllers/recipes.controller');

router.get('/recipe/:id', getRecipe),
router.get('/recipes', getRecipes),
router.get('/userRecipes/:id', getUserRecipes)
router.get('/', index)

router.post('/recipe', addRecipe)
router.post('/addPhoto', addPhoto)
router.post('/copyRecipe/:id', copyRecipe)

router.put('/recipeEdit/:id', editRecipe)

router.delete('/recipeDelete/:id', deleteRecipe)
router.delete('/deletePhoto/:imageId', deletePhoto)


module.exports = router;