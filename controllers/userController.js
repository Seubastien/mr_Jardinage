const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const fs = require('fs')//permet de supprimer des fichiers 

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
exports.deleteUser = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.params.userid })
        await userModel.deleteOne({ _id: req.params.userid })
        if (user.picture) {
            fs.unlink('public/images/uploads/' + user.picture, (err) => {
                if (err) throw err;

            });
        }
        res.redirect("/dashboard")

    } catch (error) {
        res.render('admin/index.html.twig'), {
            errorDelete: "un probleme est survenue pendant la suppression",
        }
    }
}
exports.findToUpdate = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.userid)
        res.render('subscribe/index.html.twig',
            {
                // enterprise: await enterpriseModel.findById(req.session.enterprise._id),
                user: user
            })

    } catch (error) {
        res.render('dashBoard/_dashBoard.html.twig',
            {
                errorMessage: "L'utilisateur' souhaitez modifier n'existe pas",
                // enterprise: await enterpriseModel.findById(req.session.enterprise._id)
            })

    }
}
exports.updatedUser = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.params.userid })

        if (req.file && user.picture) {
            fs.unlink('public/images/uploads/' + user.picture, (err) => {
                if (err) throw err;
            });
            if (req.multerError) {
                throw { errorUpload: "le fichier n'est pas valide" }
            }
            req.body.picture = req.file.filename

        }
        await userModel.updateOne({ _id: req.params.userid }, req.body)
        res.redirect("/dashboard")

    } catch (error) {
        res.render('dashBoard/index.html.twig',
            {
                errorDelete: "probleme survenue",
                // enterprise: await enterpriseModel.findById(req.session.enterprise._id)
            })

    }
}

exports.loginUser = async (req, res) => {
    try {
        let user = await userModel.findOne({ mail: req.body.mail })//1er mail objet du modele et 2eme mail c'est le name dans form login
        if (user) {
            if (await bcrypt.compare(req.body.password, user.password)) {

                req.session.user = user
                req.session.user.password = null
                if (user.is_admin == true) {
                    res.redirect("/dashboard")
                } else {
                    res.redirect("/plants")
                }

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
        
    }

}
exports.logOut = (req, res) => {
    try {
        delete req.session.user

        res.redirect("/home")

    } catch (error) {

        res.send(error.message)
    }
}
exports.addPlantToCollection = async (req, res) => {
    try {

        let addPlant = await userModel.updateOne(
            { _id: req.session.user._id },
            { $addToSet: { plants_collection: req.params.plantid } }
        )
        res.redirect('/plants')
    } catch (error) {
        res.send(error.message)
    }
}
exports.deletePlantCollection = async (req, res) => {
    try {
        const deletePlant = await userModel.updateOne(
            { _id: req.session.user._id },
            { $pull: { plants_collection: req.params.plantid }});
        res.redirect('/collection')
    } catch (error) {
        res.send(error.message)
    }
}