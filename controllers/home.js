const mongoose = require('mongoose');

module.exports = function (app) {
    //var Usuario = app.models.usuario;

    let HomeController = {
        index: function (req, res) {
            var drinks = [
            { nome: 'Bloody Mary', capa: 3 },
            { nome: 'Martini', capa: 5 },
            { nome: 'Scotch', capa: 10 }
            ];
            const Filmes = mongoose.model("filme");
            Filmes.find({}, (err, response) => {
                if(err) res.send(err);
                res.render('home/index', {
                    filmes: response
                });
            })
        },
        

        sinopse: function (req, res) {
            res.render('sinopse/index');
        }, 
       
    }; 
    return HomeController;
};

