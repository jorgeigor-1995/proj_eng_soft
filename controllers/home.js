const mongoose = require('mongoose');

module.exports = function (app) {
    //var Usuario = app.models.usuario;

    let HomeController = {
        index: function (req, res) {
            const Filmes = mongoose.model("filme");
            Filmes.find({}, (err, response) => {
                if (err) res.send(err);
                res.render('home/index', {
                    filmes: response
                });
            })
        },


        sinopse: function (req, res) {
            const Filme = mongoose.model("filme"); //
            Filme.findOne({ '_id': req.params.id }, (err, response) => { //
                //  if(err) res.send(err);
                res.render('sinopse/index', {
                    filme: response
                });
            }) 
    }
}
        return HomeController;
    };

