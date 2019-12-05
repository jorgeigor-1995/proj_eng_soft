module.exports = function (app) {
    var filme = app.controllers.filme;
    var usuario = app.controllers.usuario;
   // app.get('/filme', filme.index);
       app.post('/filme/create',  filme.create);
       app.get('/usuario/filme/edit/:id', filme.edit);
       app.post('/usuario/filme/:id', filme.validate, filme.update);
       app.get('/usuario/filme/:id', filme.destroy);

 };