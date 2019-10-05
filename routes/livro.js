module.exports = function (app) {
    var livro = app.controllers.livro;
    app.get('/livro', livro.index);
    app.get('/livro/create', livro.create);
    app.post('/livro/create', livro.validate, livros.store);
    app.get('/livro/:id/editar', livro.edit);
    app.put('/livro/:id', livro.validate, livros.update);
    app.delete('/livro/:id', livro.destroy);
};