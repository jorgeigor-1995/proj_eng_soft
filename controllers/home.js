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
            let id = req.params.id;
       //     console.log(id);
            const Filme = mongoose.model("filme"); //
            Filme.findById(id, function (err, response) { //
                // console.log(Filme.nome)
                if (err) res.send(err);
                let resultado = { filme: response }
                res.render('sinopse/index', resultado);
            });
        }
    }
    return HomeController;
};

