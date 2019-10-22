const { check, validationResult } = require('express-validator');
module.exports = function (app) {
    var Livro = app.models.livro;
    var LivroController = {
        index: function (req, res) {
            app.models.livro.find(function (erro, livro) {
                var resultado = { livros: livro };
                res.render('livro/index', resultado);
            });
        },
        create: function (req, res) {
            res.render('livro/create', { filmes: {} });
        },
        store: function (req, res) {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                var resultado = { errors: errors.array(), livros: req.body.livro };
                res.render('livro/create', resultado);
                return;
            }
            var dados = req.body.livro;

            var livro = new app.models.livro(dados);
            livro.save(function () {
                req.flash('success', 'Livro salvo!', '/livro');
            });
        },
        show: function (req, res) {
            //
        },
        edit: function (req, res) {
            var _id = req.params.id;
            app.models.livro.findById(_id, function (erro, livro) {
                if (erro) {
                    res.sendStatus(404)
                    return;
                }
                var resultado = { livros: livro };
                res.render('livro/edit', resultado);
            });
        },
        update: function (req, res) {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                req.body.livro._id = req.params.id;
                var resultado = { errors: errors.array(), livros: req.body.livro };
                res.render('livro/edit', resultado);
                return;
            }
            var _id = req.params.id;
            app.models.livro.findById(_id, function (erro, livro) {
                livro.nome = req.body.livro.nome;
                livro.autor = req.body.livro.autor;
                livro.genero = req.body.livro.genero;
                livro.sinopse = req.body.livro.sinopse;
                livro.nota = req.body.livro.nota;
                livro.ano = req.body.livro.ano;
                livro.paginas = req.body.livro.paginas;
                //livro.capitulos = req.body.livro.capitulos;
                
                contato.save(function () {
                    req.flash('success', 'Livro atualizado!', '/livro');
                });
            });
        },
        destroy: function (req, res) {
            var _id = req.params.id;
            app.models.livro.deleteOne({ _id: _id }, function (erro) {
                req.flash('success', 'Livro apagado!', '/livro');
            });
        },
        validate: [
            check('livro[nome]', 'Campo nome é obrigatório').not().isEmpty(),
            check('livro[sinopse]', 'Campo sinopse é obrigatório').not().isEmpty()
        ]
    }
    return LivroController;
};