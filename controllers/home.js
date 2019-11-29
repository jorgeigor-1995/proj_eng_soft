const mongoose = require('mongoose');

module.exports = function (app) {
    //var Usuario = app.models.usuario;

    let HomeController = {
        index: function (req, res) {
            const Filmes = mongoose.model("filme");
            Filmes.find({}, (err, response) => {
                if (err) res.send(err);
                res.render('home/index', {
                    filmes: response,
                    results: false,
                    search: '',

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
        },
        search: function (req, res) {
            const Filme = mongoose.model("filme");
            var searchParams = req.query.query.toUpperCase();
            var item = String(searchParams);
            console.log(String(searchParams));
            Filme.find({ }, function (e, docs) {
                res.render('home/search', { list: docs, results: true, search: req.query.query })
            });

        }
    }
    return HomeController;
};

