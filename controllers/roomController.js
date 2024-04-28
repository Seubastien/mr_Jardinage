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
// exports.addPlantToRoom = async (req, res) => {
//     try {

//         let addPlant = await user.updateOne(
//             { _id: req.session.user._id },
//             { $addToSet: { plants_collection: req.params.plantid } }
//         )
//         res.redirect('/plants')
//     } catch (error) {
//         res.send(error.message)
//     }
// }
// exports.deletePlantCollection = async (req, res) => {
//     try {
//         const deletePlant = await userModel.updateOne(
//             { _id: req.session.user._id },
//             { $pull: { plants_collection: req.params.plantid }});
//         res.redirect('/collection')
//     } catch (error) {
//         res.send(error.message)
//     }
// }