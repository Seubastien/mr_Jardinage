const pagesRouter = require('express').Router()

const pagesController = require('../controllers/pagesController')

pagesRouter.get('/home', pagesController.displayHome)
pagesRouter.get('/subscribe', pagesController.displaySubscribe)

module.exports = pagesRouter