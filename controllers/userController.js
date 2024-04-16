const userModel = require('../models/userModel')

exports.createUser = async (req, res) => {

    const confirmpassword = req.body.password
    try {
        if (confirmpassword === req.body.confirmPassword) {
            const newUser = new userModel(req.body)
            newUser.validateSync()
            await newUser.save()
            res.redirect('/login')
        } else throw { confirmPassword: "Les mots de passe ne correspondent pas" }
    } catch (error) {
        console.log(error);
        res.render('subscribe/index.html.twig', {
            error: error,
            title: "Inscription"

        })
        console.log(error);
    }
}