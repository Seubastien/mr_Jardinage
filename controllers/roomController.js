const roomModel = require('../models/roomModel')
const moment = require('moment') 



exports.createRoom = async (req, res) => {
    try {
        const newRoom = new roomModel(req.body)
        newRoom.user = req.session.user._id
        newRoom.validateSync()
        await newRoom.save()
        res.redirect('/collection')


    } catch (error) {

        res.render('./addRoom/index.html.twig', {
            error: error,
            title: "Collection"
        })
        console.log(error)

    }
}
exports.deleteRoom = async (req, res) => {
    try {
        const room = await roomModel.findById({ _id: req.params.roomid })
        await roomModel.deleteOne({ _id: req.params.roomid })
        res.redirect("/collection")
    } catch (error) {
        res.render('collection/index.html.twig'), {
            errorDelete: "un probleme est survenue pendant la suppression",
            homeButton: true,
            headerFooter: true,
        }
        console.log(error);
    }
}
exports.addPlantToRoom = async (req, res) => {
    try {
        let plantid = null//A COMMENTER
        if (req.params.plantid) {
            plantid = req.params.plantid
        } else if (req.body.plant) {
            plantid = req.body.plant
        } else {
            throw new Error('Aucun id de plante')
        }
        let addPlant = await roomModel.updateOne(

            { _id: req.body.room },
            { $addToSet: { plants_collection: { plantid: plantid, dateAdd: Date.now() } } }
        )
        if (req.params.plantid) {
            res.redirect('/collection')
        } else {
            res.redirect('/room/' + req.body.room)
        }
    } catch (error) {
        res.send(error.message)
        console.log(error)
    }
}
exports.deletePlantRoom = async (req, res) => {
    try {
        const deletePlant = await roomModel.updateOne(
            { _id: req.params.roomid },
            { $pull: { plants_collection: { _id: req.params.id } } });
        res.redirect('/room/' + req.params.roomid)// permet de rediriger vers la piece.

    } catch (error) {
        res.send(error.message)
    }
}
exports.updatedRoom = async (req, res) => {
    try {
        const room = await roomModel.findById({ _id: req.params.roomid })
        await roomModel.updateOne({ _id: req.params.roomid }, req.body)
        res.redirect('/room/' + req.params.roomid)
    } catch (error) {
        res.render('room/index.html.twig',
            {
                errorDelete: "probleme survenue",
            })

    }
}
exports.addWatering = async (req, res) => {
    try {
        const roomid = req.params.roomid
        const plantId = req.params.plantId
        const wateringDate = req.body
        const waterDate = moment(wateringDate.date)
        const room = await roomModel.findById(roomid)
        const now = moment();


        if (waterDate.isAfter(now)){
            console.log(waterDate.isAfter(now));
            const addWatering = await roomModel.updateOne(
                { _id: roomid, 'plants_collection._id': plantId },
                { $addToSet: { 'plants_collection.$.watering_collection': wateringDate } },
                
            )
            
        }else {
            throw new Error("Veuillez programmer une date postérieure à aujourd'hui")
        };
        
res.redirect('/dataPlant/' + plantId + '/room/' + roomid)

    } catch (error) {
        res.send(error.message)
        console.log(error.message)
    }
}
