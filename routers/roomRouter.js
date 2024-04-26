const roomRouter = require('express').Router()
const authguard = require('../services/authguard')
const roomController = require('../controllers/roomController')

roomRouter.post('/editRoom', authguard(), roomController.createRoom )//ne pas oublier le authguard
module.exports = roomRouter