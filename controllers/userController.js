const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')

exports.createUser = async (req, res) => {

    try {
        const confirmpassword = req.body.password
        if (confirmpassword === req.body.confirmPassword) {
            const newUser = new userModel(req.body)
            if (req.file) {
                if (req.multerError) {
                    throw { errorUpload: "le fichier n'est pas valide" }
                }

                req.body.picture = req.file.filename
                newUser.picture = req.file.filename
            }
            newUser.validateSync()
            await newUser.save()
            res.redirect('/home')
        } else throw { confirmPassword: "Les mots de passe ne correspondent pas" }
    } catch (error) {

        res.render('subscribe/index.html.twig', {
            error: error,
            title: "Inscription"

        })
    }
}

exports.loginUser = async (req, res) => {
    console.log('test');
    try {
        let user = await userModel.findOne({ mail: req.body.mail })//1er mail objet du modele et 2eme mail c'est le name dans form login
        if (user) {
            if (await bcrypt.compare(req.body.password, user.password)) {
                req.session.user = user._id
                res.redirect("/plants")
            } else {
                throw { password: "Mauvais mot de passe" }
            }
        } else {
            throw { mail: "Cet utilisateur n'est pas enregistré" }
        }
    }
    catch (error) {

        res.render('home/index.html.twig', {
            homeButton: true,
            error: error
        })
        console.log(error)
    }

}