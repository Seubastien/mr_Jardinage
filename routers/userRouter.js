const userRouter = require('express').Router()
const authguard = require('../services/authguard')
const userController = require('../controllers/userController')
const multer = require('../services/multer-config')


userRouter.post('/subscribe', multer.single('image'), userController.createUser)
userRouter.post('/plants', userController.loginUser)
userRouter.get('/logout', userController.logOut)
userRouter.get('/userDelete/:userid', authguard(true), userController.deleteUser)
userRouter.get('/userUpdate/:userid', authguard(true), userController.findToUpdate)
userRouter.post('/userUpdate/:userid',multer.single('image'), authguard(true),userController.updatedUser)


module.exports = userRouter