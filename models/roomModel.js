const mongoose = require('mongoose');
const userModel = require('../models/userModel');

const roomSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "le nom est requis"]
    },
    sunlight: {
        type: String,
        required: [true, "Le niveau de luminosité de la pièce est requis"]
    },
    humidity: {
        type: String,
        required: [true, "Le niveau d'humidité de la pièce est requis"]
    },
    plants_collection: [{

        type: Number,
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    is_interior: {
        type: Boolean,
        default: false
    },
    // background_url: {
    //     type: String,
    //     required: [true, "L'image de fond de la pièce est requise"]
    // }
})
roomSchema.pre("save", async function (next) {

    await userModel.updateOne(
        { _id: this.user},
        { $addToSet: { rooms_collection: this._id } }//addToset permet de rajouter la piece si cette derniere n'est pas deja présente dans la collection
        
    );
   
    next();
})
roomSchema.post("deleteOne", async function(doc,next){// ne pas oublier doc, meme si non utilisé.
    const deletedRoomId = this.getQuery()._id;
    await userModel.updateOne({rooms_collection: {$in:[deletedRoomId]}}, {$pull: {rooms_collection: deletedRoomId}});
    next();
})

const roomModel = mongoose.model('Rooms', roomSchema)
module.exports = roomModel