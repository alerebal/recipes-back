const router = require('express').Router()

const {
    signUp,
    signIn,
    getUser
} = require('../controllers/user.controllers');

router.get('/user/:id', getUser)

router.post('/signUp', signUp)
router.post('/signIn', signIn)


module.exports = router;