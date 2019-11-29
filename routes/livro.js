module.exports = function (app) {
    var livro = app.controllers.livro;
   // app.get('/filme', filme.index);
       app.post('/livro/create',  livro.create);
       app.get('/usuario/livro/edit/:id', livro.edit );
       app.post('/usuario/livro/:id', livro.validate, livro.update);
       app.get('/usuario/livro/:id', livro.destroy);

 };