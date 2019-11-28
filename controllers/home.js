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


        sinopse: function (req, res, next) {
            const Filme = mongoose.model("filme"); //
            Filme.findOne({ '_id': req.params.id }, (err, response) => { //
                //  if(err) res.send(err);
                res.render('sinopse/index', {
                    filme: response
                });
            }) 
        },
        search: function (req, res) {
            var searchParams = req.query.query.toUpperCase().split(' ');
            console.log(searchParams);
            const Filme = mongoose.model("filme");
            filme.find({ 'nome': { $in: searchParams }}, function(e , docs){
                res.render('home/search', { 
                    results: true,
                    search: req.query.query,
                    list: docs
                })
            })
        }
}
        return HomeController;
    };

