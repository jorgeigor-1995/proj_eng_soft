const { check, validationResult } = require('express-validator');
module.exports = function (app) {
    var Livro = app.models.livro;
    var LivroController = {
        index: function (req, res) {
            app.models.livro.find(function (erro, livro) {
                var resultado = { livro: livro };
                res.render('livro/index', resultado);
            });
        },

        create: function (req, res) {
            var dados = {
                'nome' : req.body.livro.nome,
                'autor' : req.body.livro.autor,
                'genero' : req.body.livro.genero,
                'sinopse' : req.body.livro.sinopse,
                'ano' : req.body.livro.ano,
                'capa' : req.body.livro.capa,
                }
            livro = new app.models.livro(dados);
            livro.save(function (err) {
            if (err) {
                console.log("Error! " + err.message);
                return err;
            }else {
                console.log("Created livro");
                res.redirect('/usuario/logado');
            }
        });
        },
        store: function (req, res) {
            res.render('livro/create', { livro: {} });
        },
        /*show: function (req, res) {
            //
        },
        */edit: function (req, res) {
            var _id = req.params.id;
            app.models.livro.findById(_id, function (erro, livro) {
                if (erro) {
                    res.sendStatus(404)
                    return;
                }
                var resultado = { livro: livro };
                res.render('livro/edit', resultado);
            });
        },
        update: function (req, res) {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                req.body.livro._id = req.params.id;
                var resultado = { errors: errors.array(), filmes: req.body.livro };
                res.render('/livro/edit/:id', resultado);
                return;
            }
            var _id = req.params.id;
            app.models.livro.findById(_id, function (erro, livro) {
                livro.nome = req.body.livro.nome;
                livro.autor = req.body.livro.autor;
                livro.genero = req.body.livro.genero;
                livro.sinopse = req.body.livro.sinopse;
                livro.ano = req.body.livro.ano;
                livro.capa = req.body.livro.capa;
                
                livro.save(function (err) {
                    if (err) {
                        console.log("Error! " + err.message);
                        return err;
                    }
                    else {
                        console.log("Atualize livro");
                        Filme.find({}, function(erro, docs){
                            res.redirect('/usuario/logado');
                        })                       
                    }
                    
                });
            });
        },
        destroy: function (req, res) {
            var _id = req.params.id;
            app.models.livro.deleteOne({ _id: _id }, function (erro) {
                if (erro) {
                    console.log("Error! " + err.message);
                    return err;
                }
                else {
                    console.log("Delete livro");
                    res.redirect('/usuario/logado');
                    }                       
                })
        },
        validate: [
            check('livro[nome]', 'Campo nome é obrigatório').not().isEmpty(),
            check('livro[ano]', 'Campo sinopse é obrigatório').not().isEmpty()
        ]
    };
    return LivroController;
};