const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
require ('dotenv').config()

const pagesRouter = require('./routers/pagesRouter')
const userRouter = require('./routers/userRouter')
const roomRouter = require('./routers/roomRouter')

const app = express()
app.use(express.json())
app.use(express.static("./public"))
app.use(express.urlencoded({extented:true}))

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
}))
app.use((req,res,next)=>{
    res.locals.session = req.session;
    next()
})
app.use(pagesRouter)
app.use(userRouter)
app.use(roomRouter)

app.listen(process.env.PORT, (err) => {

    console.log(err ? err : "La connexion au serveur est établie");

})

mongoose.connect("mongodb://localhost:27017/mr_jardinage")