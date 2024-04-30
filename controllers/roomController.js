const roomModel = require('../models/roomModel')



exports.createRoom = async (req, res) => {
    try {
        const newRoom = new roomModel(req.body)
        newRoom.user = req.session.user._id
        newRoom.validateSync()
        await newRoom.save()
        res.redirect('/collection')


    } catch (error) {

        res.render('./room/index.html.twig', {
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
        }else if(req.body.plant){
            plantid = req.body.plant
        }else{
            throw new Error('Aucun id de plante')
        }
        let addPlant = await roomModel.updateOne(

            { _id: req.body.room },
            { $addToSet: { plants_collection: {plantid : plantid, dateAdd: Date.now()} } }
        )
        
        res.redirect('/room/'+ req.body.room)// permet de rediriger vers la piece.
    } catch (error) {
        res.send(error.message)
        console.log(error)
    }
}
exports.deletePlantRoom = async (req, res) => {
    try {
        const deletePlant = await roomModel.updateOne(
            { _id: req.body.room._id },
            { $pull: { plants_collection: {plantid : req.params.plantid }} });
        res.redirect('/collection')
    } catch (error) {
        res.send(error.message)
    }
}
exports.updatedRoom = async (req, res) => {
    try {
        const room = await roomModel.findById({ _id: req.params.roomid })
        await roomModel.updateOne({ _id: req.params.roomid }, req.body)
        let collections = room.plants_collection.map(async (plantid) => {//on utilise map car probleme au niveau de l'asyncronicité avec une foreach
            let response = await fetch(`https://perenual.com/api/species/details/${plantid}?key=sk-36pu66263ce98512c5214`)
            let data = await response.json()
            return data
        });
        collections = await Promise.all(collections)
        
        res.render("./room/index.html.twig", {
            homeButton: true,//Permet de donner des conditions selon les éléments que l'on veut afficher dans notre vue
            headerFooter: true,
            title: "Room",
            room : room,
            collection: collections,
        })

    } catch (error) {
        res.render('room/index.html.twig',
            {
                errorDelete: "probleme survenue",
                // enterprise: await enterpriseModel.findById(req.session.enterprise._id)
            })

    }
}
