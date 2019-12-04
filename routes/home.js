module.exports = app => {
    var home = app.controllers.home;
    var usuario = app.controllers.usuario;
    var filme = app.controllers.filme;
    var livro = app.controllers.livro;
    app.get('/', home.index);
   // app.post('/entrar', home.login);
 //   app.get('/sair', home.logout); // teste
    app.get('/filme/create', filme.store);
    app.get('/livro/create', livro.store);
    app.get('/filme/sinopse/index/:id',filme.sinopse);
    app.get('/livro/sinopse/index/:id',livro.sinopse);
    app.get('/home/search', home.search);
    

};
