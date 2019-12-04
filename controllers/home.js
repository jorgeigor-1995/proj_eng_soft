const mongoose = require('mongoose');

module.exports = function (app) {
    //var Usuario = app.models.usuario;

    let HomeController = {
        index: function (req, res) {
            const Filmes = mongoose.model("filme");
            Filmes.find({}, (err, response) => {
                if (err){ res.send(err);
                }else{
                    const Livros = mongoose.model("livro");
                    Livros.find({}, (err, livro) => {
                        res.render('home/index', {
                            filmes: response,
                            results: false,
                            search: '',
                            livro: livro
                        });
                    })
                
            }
            })
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

