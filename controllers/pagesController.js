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
exports.displayPlants = (req, res) => {
    try {
        res.render("./plants/index.html.twig", {
            homeButton: true,
            headerFooter: true,
            title: "Plants"
        })
    } catch (error) {
        res.send(error)
    }
}
exports.displayDashboard = async (req, res) => {
    try {
        res.render("./admin/index.html.twig", {
            users: await userModel.find(),
            homeButton: true,
            headerFooter: true,
            title: "Dashboard"
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