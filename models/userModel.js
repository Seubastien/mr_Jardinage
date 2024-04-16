const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

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
        required:[true, "Un Nom d'utilsateur est requis"],
        unique: true
    },
    mail:{
        type: String,
        required:[true, "le mail est requis"],
        unique: true,
        validate: {
            validator: function(v){
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g.test(v)
            },
            message : "Entrez unmail valide"
        }
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

userSchema.pre("save", function (next){
    if(!this.isModified("password")){
        return next()

    }
    bcrypt.hash(this.password , 10, (error,hash) =>{
        if(error){
            return next(error)
        }
        this.password = hash
        next()
    })
})

const userModel = mongoose.model('Users', userSchema)
module.exports = userModel