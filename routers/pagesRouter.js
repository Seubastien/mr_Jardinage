const pagesRouter = require('express').Router()

const pagesController = require('../controllers/pagesController')

pagesRouter.get('/home', pagesController.displayHome)

module.exports = pagesRouter