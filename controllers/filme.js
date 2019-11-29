const { check, validationResult } = require('express-validator');
module.exports = function (app) {
    var Filme = app.models.filme;
    var FilmeController = {
        index: function (req, res) {
            app.models.filme.find(function (erro, filme) {
                var resultado = { filme: filme };
                res.render('filme/index', resultado);
            });
        },



        create: function (req, res) {
            var dados = {
                'nome' : req.body.filme.nome,
                'diretor' : req.body.filme.diretor,
                'genero' : req.body.filme.genero,
                'sinopse' : req.body.filme.sinopse,
                'ano' : req.body.filme.ano,
                'capa' : req.body.filme.capa,
                }
            filme = new app.models.filme(dados);
            filme.save(function (err) {
            if (err) {
                console.log("Error! " + err.message);
                return err;
            }else {
                console.log("Created movie");
                res.redirect('/');
            }
        });
        },
        store: function (req, res) {
            res.render('filme/create', { filme: {} });
        },
        /*show: function (req, res) {
            //
        },
        */edit: function (req, res) {
            var _id = req.params.id;
            app.models.filme.findById(_id, function (erro, filme) {
                if (erro) {
                    res.sendStatus(404)
                    return;
                }
                var resultado = { filme: filme };
                res.render('filme/edit', resultado);
            });
        },
        update: function (req, res) {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                req.body.filme._id = req.params.id;
                var resultado = { errors: errors.array(), filmes: req.body.filme };
                res.render('/filme/edit/:id', resultado);
                return;
            }
            var _id = req.params.id;
            app.models.filme.findById(_id, function (erro, filme) {
                filme.nome = req.body.filme.nome;
                filme.diretor = req.body.filme.diretor;
                filme.genero = req.body.filme.genero;
                filme.sinopse = req.body.filme.sinopse;
                filme.ano = req.body.filme.ano;
                filme.capa = req.body.filme.capa;
                
                filme.save(function (err) {
                    if (err) {
                        console.log("Error! " + err.message);
                        return err;
                    }
                    else {
                        console.log("Atualize movie");
                        Filme.find({}, function(erro, docs){
                            res.redirect('/usuario/logado');
                        })                       
                    }
                    
                });
            });
        },
        destroy: function (req, res) {
            var _id = req.params.id;
            app.models.filme.deleteOne({ _id: _id }, function (erro) {
                if (erro) {
                    console.log("Error! " + err.message);
                    return err;
                }
                else {
                    console.log("Delete movie");
                    res.redirect('/usuario/logado');
                    }                       
                })
        },
        validate: [
            check('filme[nome]', 'Campo nome é obrigatório').not().isEmpty(),
            check('filme[ano]', 'Campo sinopse é obrigatório').not().isEmpty()
        ]
    };
    return FilmeController;
};