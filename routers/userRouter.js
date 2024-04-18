const userRouter = require('express').Router()
const authguard = require('../services/authguard')
const userController = require('../controllers/userController')
const multer = require('../services/multer-config')


userRouter.post('/subscribe', multer.single('image'), userController.createUser)
userRouter.post('/plants', userController.loginUser)


module.exports = userRouter