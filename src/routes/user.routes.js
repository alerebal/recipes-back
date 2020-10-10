const router = require('express').Router()

const {
    signUp,
    signIn
} = require('../controllers/user.controllers');

router.post('/signUp', signUp)
router.post('/signIn', signIn)


module.exports = router;