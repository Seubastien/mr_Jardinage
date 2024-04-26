const pagesRouter = require('express').Router()
const authguard = require('../services/authguard')
const pagesController = require('../controllers/pagesController')


pagesRouter.get('/home', pagesController.displayHome)
pagesRouter.get('/subscribe', pagesController.displaySubscribe)
pagesRouter.get('/plants', pagesController.displayPlants)
pagesRouter.get('/dashboard', authguard(true), pagesController.displayDashboard)
pagesRouter.get('/plantDetails/:plantid', pagesController.displayPlantDetails)
pagesRouter.get('/collection', authguard(), pagesController.displayCollection )
pagesRouter.get('/room',authguard(), pagesController.displayRoom)//ne pas oublier le authguard

module.exports = pagesRouter