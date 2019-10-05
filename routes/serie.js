module.exports = function (app) {
    var livros = app.controllers.livros;
    app.get('/serie', serie.index);
    app.get('/serie/create', serie.create);
    app.post('/serie/create', serie.validate, serie.store);
    app.get('/serie/:id/editar', serie.edit);
    app.put('/serie/:id', serie.validate, serie.update);
    app.delete('/serie/:id', serie.destroy);
};