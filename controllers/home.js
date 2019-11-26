module.exports = function (app) {
    //var Usuario = app.models.usuario;

    let HomeController = {
        index: function (req, res) {
            res.render('home/index');
        },
        sinopse: function (req, res) {
            res.render('sinopse/index');
        }, 
       
    }; 
    return HomeController;
};