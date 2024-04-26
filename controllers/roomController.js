const roomModel = require('../models/roomModel')



exports.createRoom = async (req, res) => {
    try {
        const newRoom = new roomModel(req.body)
        newRoom.user = req.session.user._id
        newRoom.validateSync()
        await newRoom.save()
        res.render('./room/index.html.twig',{
            room: true
           
        })

    } catch (error) {

        res.render('./room/index.html.twig', {
            error: error,
            title: "Room"
        })
        console.log(error)

    }
}