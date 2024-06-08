const pagesRouter = require('express').Router()
const authguard = require('../services/authguard')
const pagesController = require('../controllers/pagesController')


pagesRouter.get('/home', pagesController.displayHome)
pagesRouter.get('/subscribe', pagesController.displaySubscribe)
pagesRouter.get('/plants', pagesController.displayPlants)
pagesRouter.get('/dashboard', authguard(true), pagesController.displayDashboard)
pagesRouter.get('/plantDetails/:plantid', pagesController.displayPlantDetails)
pagesRouter.get('/collection', authguard(), pagesController.displayCollection)
pagesRouter.get('/room', authguard(), pagesController.displayAddRoom)//ne pas oublier le authguard
pagesRouter.get('/room/:roomid', authguard(), pagesController.displayRoom)
pagesRouter.get('/dataPlant/:plantid/room/:roomid', authguard(), pagesController.displayDataPlant)


module.exports = pagesRouter