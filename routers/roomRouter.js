const roomRouter = require('express').Router()
const authguard = require('../services/authguard')
const roomController = require('../controllers/roomController')


roomRouter.post('/editRoom', authguard(), roomController.createRoom )//ne pas oublier le authguard
roomRouter.get('/roomDelete/:roomid', authguard(), roomController.deleteRoom)
roomRouter.post('/plantAddToRoom/:plantid', authguard(), roomController.addPlantToRoom)
roomRouter.get('/plantDelete/:plantid', authguard(), roomController.deletePlantRoom)
module.exports = roomRouter