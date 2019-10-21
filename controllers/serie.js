const { check, validationResult } = require('express-validator');
module.exports = function (app) {
    var Serie = app.models.serie;
    var SerieController = {
        index: function (req, res) {
            app.models.serie.find(function (erro, serie) {
                var resultado = { series: serie };
                res.render('series/index', resultado);
            });
        },
        create: function (req, res) {
            res.render('series/create', { series: {} });
        },
        store: function (req, res) {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                var resultado = { errors: errors.array(), series: req.body.serie };
                res.render('series/create', resultado);
                return;
            }
            var dados = req.body.serie;

            var serie = new app.models.serie(dados);
            serie.save(function () {
                req.flash('success', 'Serie salvo!', '/series');
            });
        },
        show: function (req, res) {
            //
        },
        edit: function (req, res) {
            var _id = req.params.id;
            app.models.serie.findById(_id, function (erro, serie) {
                if (erro) {
                    res.sendStatus(404)
                    return;
                }
                var resultado = { series: serie };
                res.render('series/edit', resultado);
            });
        },
        update: function (req, res) {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                req.body.serie._id = req.params.id;
                var resultado = { errors: errors.array(), series: req.body.serie };
                res.render('series/edit', resultado);
                return;
            }
            var _id = req.params.id;
            app.models.serie.findById(_id, function (erro, serie) {
                serie.nome = req.body.serie.nome;
                serie.autor = req.body.serie.autor;
                serie.genero = req.body.serie.genero;
                serie.sinopse = req.body.serie.sinopse;
                serie.nota = req.body.serie.nota;
                serie.temporada = req.body.serie.temporada;
                serie.episodios = req.body.serie.episodios;
                serie.lancamento = req.body.serie.lancamento;
                
                contato.save(function () {
                    req.flash('success', 'Serie atualizado!', '/series');
                });
            });
        },
        destroy: function (req, res) {
            var _id = req.params.id;
            app.models.serie.deleteOne({ _id: _id }, function (erro) {
                req.flash('success', 'Serie apagado!', '/series');
            });
        },
        validate: [
            check('serie[nome]', 'Campo nome é obrigatório').not().isEmpty(),
            check('serie[sinopse]', 'Campo sinopse é obrigatório').not().isEmpty()
        ]
    }
    return SerieController;
};