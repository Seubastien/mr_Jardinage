const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "le nom est requis"]
    },
    firstName:{
        type: String,
        required:[true, "le Prénom est requis"]
    },
    userName:{
        type: String,
        required:[true, "Un Nom d'utilsateur est requis"]
    },
    mail:{
        type: String,
        required:[true, "le mail est requis"]
    },
    password:{
        type: String,
        required:[true, "Un mot de passe est requis"]
    },
    is_admin:{
        type: Boolean,
        default: false
    }

})

const userModel = mongoose.model('Users', userSchema)