const { check, validationResult } = require('express-validator');
module.exports = function (app) {
    var Filme = app.models.filme;
    var FilmeController = {
        index: function (req, res) {
            app.models.filme.find(function (erro, filme) {
                var resultado = { filmes: filme };
                res.render('filmes/index', resultado);
            });
        },
        create: function (req, res) {
            res.render('filmes/create', { filmes: {} });
        },
        store: function (req, res) {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                var resultado = { errors: errors.array(), filmes: req.body.filme };
                res.render('filmes/create', resultado);
                return;
            }
            var dados = req.body.filme;

            var filme = new app.models.filme(dados);
            filme.save(function () {
                req.flash('success', 'Filme salvo!', '/filmes');
            });
        },
        show: function (req, res) {
            //
        },
        edit: function (req, res) {
            var _id = req.params.id;
            app.models.filme.findById(_id, function (erro, filme) {
                if (erro) {
                    res.sendStatus(404)
                    return;
                }
                var resultado = { filmes: filme };
                res.render('filmes/edit', resultado);
            });
        },
        update: function (req, res) {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                req.body.filme._id = req.params.id;
                var resultado = { errors: errors.array(), filmes: req.body.filme };
                res.render('filmes/edit', resultado);
                return;
            }
            var _id = req.params.id;
            app.models.filme.findById(_id, function (erro, filme) {
                filme.nome = req.body.filme.nome;
                filme.diretor = req.body.filme.diretor;
                filme.genero = req.body.filme.genero;
                filme.sinopse = req.body.filme.sinopse;
                filme.nota = req.body.filme.nota;
                filme.ano = req.body.filme.ano;
                filme.duracao = req.filme.duracao;
                
                contato.save(function () {
                    req.flash('success', 'Filme atualizado!', '/filmes');
                });
            });
        },
        destroy: function (req, res) {
            var _id = req.params.id;
            app.models.filme.deleteOne({ _id: _id }, function (erro) {
                req.flash('success', 'Filme apagado!', '/filmes');
            });
        },
        validate: [
            check('filme[nome]', 'Campo nome é obrigatório').not().isEmpty(),
            check('filme[sinopse]', 'Campo sinopse é obrigatório').not().isEmpty()
        ]
    }
    return FilmeController;
};