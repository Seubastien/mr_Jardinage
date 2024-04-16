const userRouter = require('express').Router()
const userController = require('../controllers/userController')

userRouter.post('/subscribe', userController.createUser)


module.exports = userRouter