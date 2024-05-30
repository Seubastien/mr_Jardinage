const roomRouter = require('express').Router()
const authguard = require('../services/authguard')
const roomController = require('../controllers/roomController')


roomRouter.post('/addRoom', authguard(), roomController.createRoom )//ne pas oublier le authguard
roomRouter.get('/roomDelete/:roomid', authguard(), roomController.deleteRoom)
roomRouter.post('/plantAddToRoom/:plantid', authguard(), roomController.addPlantToRoom)
roomRouter.post('/plantAddToRoom', authguard(), roomController.addPlantToRoom)
roomRouter.get('/plantDeleteToRoom/:roomid/plant/:id', authguard(), roomController.deletePlantRoom)
roomRouter.post('/roomUpdate/:roomid', authguard(), roomController.updatedRoom)
roomRouter.post('/addWatering/:plantId', authguard(), roomController.addWatering)




module.exports = roomRouter