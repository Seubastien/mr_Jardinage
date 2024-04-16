const apiTest  = require('../controllers/apiExternalController')

const apiRouter = require('express').Router()

apiRouter.get("/test" , apiTest.apiTest)

module.exports = apiRouter