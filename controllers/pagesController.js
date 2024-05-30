const roomModel = require("../models/roomModel")
const userModel = require("../models/userModel")
const mongoose = require('mongoose');


exports.displayHome = (req, res) => {
    try {

        res.render("./home/index.html.twig", {
            homeButton: true,//Permet de donner des conditions selon les éléments que l'on veut afficher dans notre vue
            title: "Accueil"
        })
    } catch (error) {
        res.send(error)
    }
}
exports.displaySubscribe = (req, res) => {
    try {
        res.render("./subscribe/index.html.twig", {
            title: "Inscription"
        })
    } catch (error) {
        res.send(error)
    }
}
exports.displayPlants = async (req, res) => {
    try {
        if (req.query.water) {
            const response = await fetch(`https://perenual.com/api/species-list?key=sk-36pu66263ce98512c5214&watering=${req.query.water}`)
            const data = await response.json()

            res.render("./plants/index.html.twig", {
                homeButton: true,
                headerFooter: true,
                title: "Plants",
                data: data.data,
            })

        } else if (req.query.expo) {

            const response = await fetch(`https://perenual.com/api/species-list?key=sk-36pu66263ce98512c5214&sunlight=${req.query.expo}`)
            const data = await response.json()

            res.render("./plants/index.html.twig", {
                homeButton: true,
                headerFooter: true,
                title: "Plants",
                data: data.data,
            })

        } else if (req.query.search) {

            const response = await fetch(`https://perenual.com/api/species-list?key=sk-36pu66263ce98512c5214&q=${req.query.search}`)
            const data = await response.json()

            res.render("./plants/index.html.twig", {
                homeButton: true,
                headerFooter: true,
                title: "Plants",
                data: data.data,
            })

        } else {
            const randomPage = Math.floor(Math.random() * (50 - 1 + 1)) + 1;

            const response = await fetch(`https://perenual.com/api/species-list?key=sk-36pu66263ce98512c5214&page=${randomPage}`)
            const data = await response.json()
            res.render("./plants/index.html.twig", {
                homeButton: true,
                headerFooter: true,
                title: "Plants",
                data: data.data,
            })
        }


    } catch (error) {
        console.log(error);
        res.send(error)
    }
}
// .data[0].default_image.original_url
exports.displayDashboard = async (req, res) => {
    try {
        res.render("./dashboard/index.html.twig", {
            users: await userModel.find(),
            homeButton: true,
            headerFooter: true,
            title: "Dashboard"
        })
    } catch (error) {
        res.send(error)
    }
}
exports.displayPlantDetails = async (req, res) => {
    try {

        const response = await fetch(`https://perenual.com/api/species/details/${req.params.plantid}?key=sk-36pu66263ce98512c5214`)
        const data = await response.json()
        console.log(data.sunlight);
        res.render("./plantDetails/index.html.twig", {
            homeButton: true,
            headerFooter: true,
            data: data,
            title: "PlantDetails"
        })

    } catch (error) {
        res.send(error)
    }
}
exports.displayCollection = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.session.user._id }).populate('rooms_collection')//va chercher dans _id l'id
        let collections = user.plants_collection.map(async (plantid) => {//on utilise map car probleme au niveau de l'asyncronicité avec une foreach
            let response = await fetch(`https://perenual.com/api/species/details/${plantid}?key=sk-36pu66263ce98512c5214`)
            let data = await response.json()
            return data
        });
        collections = await Promise.all(collections)
        res.render("./collection/index.html.twig", {
            user: user,
            collection: collections,
            homeButton: true,
            headerFooter: true,
            title: "Collection"
        })

    } catch (error) {
        res.send(error)
    }
}
exports.displayAddRoom = async (req, res) => {
    try {
        res.render("./room/index.html.twig", {
            homeButton: true,//Permet de donner des conditions selon les éléments que l'on veut afficher dans notre vue
            title: "AddRoom",

        })

    } catch (error) {
        res.send(error)
    }
}

exports.displayRoom = async (req, res) => {
    try {
        const room = await roomModel.findById({ _id: req.params.roomid })//.populate('plante_collection')
        let collections = room.plants_collection.map(async (plant) => {//on utilise map car probleme au niveau de l'asyncronicité avec une foreach
            let response = await fetch(`https://perenual.com/api/species/details/${plant.plantid}?key=sk-36pu66263ce98512c5214`)
            let data = await response.json()
            data.date = plant.dateAdd//On fait passer aux data un .date qu'on crée, plant.dateAdd donc la date stockée dans la base de données
            data.idPLantRoom = plant._id//De la même manière on fait passer l'id propre à la plante dans la pièce aux data de l'api.
            return data

        });
        collections = await Promise.all(collections)


        const user = await userModel.findOne({ _id: req.session.user._id })//.populate('rooms_collection')//va chercher dans _id l'id
        let userCollections = user.plants_collection.map(async (plantid) => {//on utilise map car probleme au niveau de l'asyncronicité avec une foreach
            let response = await fetch(`https://perenual.com/api/species/details/${plantid}?key=sk-36pu66263ce98512c5214`)
            let data = await response.json()
            return data
        });
        userCollections = await Promise.all(userCollections)
        res.render("./room/index.html.twig", {
            homeButton: true,//Permet de donner des conditions selon les éléments que l'on veut afficher dans notre vue
            headerFooter: true,
            title: "Room",
            userCollection: userCollections,
            room: room,
            collection: collections,
        })


    } catch (error) {
        res.send(error)
        console.log(error)
    }

}
exports.displayDataPlant = async (req, res) => {
    try {
        const room = await roomModel.findById({ _id: req.params.roomid })//.populate('plante_collection')

        let plant = room.plants_collection.find(e => e._id == req.params.plantid);

        const response = await fetch(`https://perenual.com/api/species/details/${plant.plantid}?key=sk-36pu66263ce98512c5214`)
        const data = await response.json()
        console.log(plant);
        // console.log(room)
        // console.log(data)


        res.render("./dataPlant/index.html.twig", {
            homeButton: true,//Permet de donner des conditions selon les éléments que l'on veut afficher dans notre vue
            title: "Room",
            homeButton: true,//Permet de donner des conditions selon les éléments que l'on veut afficher dans notre vue
            headerFooter: true,
            room: room,
            plant: plant,
            data: data

        })
    } catch (error) {
        res.send(error.message)
    }
}
