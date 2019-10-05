module.exports = function (app) {
    var filme = app.controllers.filme;
    app.get('/filme', filme.index);
    app.get('/filme/create', filme.create);
    app.post('/filme/create', filme.validate, filme.store);
    app.get('/filme/:id/editar', filme.edit);
    app.put('/filme/:id', filme.validate, filme.update);
    app.delete('/filme/:id', filme.destroy);
};