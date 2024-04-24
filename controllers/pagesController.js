const userModel = require("../models/userModel")

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
// exports.displayDashboard = async (req, res) => {
//     try {
//         if (req.query.search) {
//             const employeeQuery = { name: { $regex: new RegExp(req.query.search, 'i') } }
//             res.render("./dashBoard/dashBoard.html.twig", {
//                 enterprise: await enterpriseModel.findById(req.session.enterprise).populate({ path: "employeeCollection", match: employeeQuery })
//             })
//         } else {
//             res.render("./dashBoard/dashBoard.html.twig", {
//                 enterprise: await enterpriseModel.findById(req.session.enterprise).populate("employeeCollection")
//             })

//         }


//     } catch (error) {

//         res.send(error.message)
//     }
// }