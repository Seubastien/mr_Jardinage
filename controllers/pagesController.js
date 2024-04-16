exports.displayHome = (req, res) => {
    try {

        res.render("./home/index.html.twig", {
            action: "home",//Permet de donner des conditions selon les éléments que l'on veut afficher dans notre vue
            title: "Accueil"
        })
    } catch (error) {
        res.send(error)
    }
}
exports.displaySubscribe = (req, res) =>{
    try {
        res.render("./subscribe/index.html.twig", {
            title: "Inscription"
        })
    } catch (error) {
        res.send(error)
    }
}